// main.js - Đã được tối ưu và gộp các sự kiện load/DOMContentLoaded

// Hiệu ứng header ẩn/hiện khi cuộn
let lastScrollTop = 0;
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const distanceToBottom = documentHeight - (scrollTop + windowHeight);

  if (distanceToBottom < 300) {
    header.style.top = "-300px";
  } else {
    header.style.top = scrollTop > lastScrollTop ? "-55px" : "0";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Tính padding cho nội dung dưới header
function updateMainPadding() {
  const header = document.querySelector("header");
  const main = document.querySelector(".intro-container");
  if (header && main) {
    main.style.paddingTop = header.offsetHeight + "px";
  }
}

// Format giá tiền
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ";
}

// Chuyển hướng sang trang thanh toán
function goToCheckout(tourKey) {
  localStorage.setItem('selectedTour', tourKey);
  window.location.href = '../Thanh Toán/thanhtoan.html';
}

// Hiển thị slide banner dưới
let underbannerIndex = 0;
let underbannerSlides;
let underbannerTimer;
function showUnderbannerSlides() {
  if (!underbannerSlides) return;
  for (let slide of underbannerSlides) {
    slide.classList.remove("active");
  }
  underbannerIndex++;
  if (underbannerIndex > underbannerSlides.length) underbannerIndex = 1;
  underbannerSlides[underbannerIndex - 1].classList.add("active");
  underbannerTimer = setTimeout(showUnderbannerSlides, 4000);
}
function plusUnderbannerSlides(n) {
  clearTimeout(underbannerTimer);
  underbannerIndex += n - 1;
  if (underbannerIndex < 0) underbannerIndex = underbannerSlides.length - 1;
  showUnderbannerSlides();
}

// Hiệu ứng hiện dần review items
function revealReviewItems() {
  const reviewItems = document.querySelectorAll('.review-item');
  const triggerBottom = window.innerHeight * 0.9;

  reviewItems.forEach((item, index) => {
    const boxTop = item.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      setTimeout(() => item.classList.add('active'), index * 200);
    }
  });
}

// Slider tin tức
let newsSlideIndex = 0;
let totalNewsSlides = 0;
const slidesPerView1 = 4;
function moveNewsSlide(direction) {
  newsSlideIndex += direction;
  const newsSlides = document.querySelectorAll('.news-slide');
  totalNewsSlides = newsSlides.length;
  if (newsSlideIndex < 0) newsSlideIndex = totalNewsSlides - slidesPerView1;
  else if (newsSlideIndex > totalNewsSlides - slidesPerView1) newsSlideIndex = 0;

  const offset = -newsSlideIndex * (100 / slidesPerView1);
  const newsSlider = document.querySelector('.news-slider');
  if (newsSlider) {
    newsSlider.style.transform = `translateX(${offset}%)`;
  }
}

// Sự kiện khi tải trang và DOM đã sẵn sàng
window.addEventListener('load', () => {
  updateMainPadding();
  revealReviewItems();
  underbannerSlides = document.getElementsByClassName("underbanner-slide");
  showUnderbannerSlides();
  moveNewsSlide(0);
});

window.addEventListener("resize", updateMainPadding);
window.addEventListener('scroll', revealReviewItems);

// DOMContentLoaded gộp
document.addEventListener('DOMContentLoaded', function () {
  // Toggle nav
  const btn = document.getElementById('hamburger-btn');
  const nav = document.getElementById('main-nav');
  btn?.addEventListener('click', () => nav.classList.toggle('active'));

  // Giỏ hàng
  const cartLink = document.getElementById('cartLink');
  const cartDropdown = document.getElementById('cartDropdown');
  const cartItemsDiv = document.getElementById('cartItems');

  cartLink?.addEventListener('click', function (e) {
    e.preventDefault();
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItemsDiv.innerHTML = '';

    if (cartItems.length === 0) {
      cartItemsDiv.innerHTML = '<p style="text-align: center;">Giỏ hàng trống</p>';
    } else {
      cartItems.forEach(tourKey => {
        const tour = dataTour[tourKey];
        if (tour) {
          cartItemsDiv.innerHTML += `
            <div class="cart-item-details" onclick="goToCheckout('${tourKey}')">
              <img src="${tour.image}" alt="${tour.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
              <div>
                <p style="font-weight: bold;">${tour.name}</p>
                <p>Giá: ${formatPrice(tour.price)}</p>
                <p>Thời gian: ${tour.duration}</p>
                <p>Phương tiện: ${tour.transport}</p>
              </div>
            </div>
          `;
        }
      });
    }
    cartDropdown.style.display = cartDropdown.style.display === 'none' ? 'block' : 'none';
  });

  document.addEventListener('click', function(e) {
    if (!cartDropdown.contains(e.target) && e.target !== cartLink) {
      cartDropdown.style.display = 'none';
    }
  });

  // Nút về đầu trang
  const backToTopBtn = document.getElementById("backToTopBtn");
  window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  };

  // Hot sale slider
  const prevBtn = document.querySelector('.hot-sale-slider .prev');
  const nextBtn = document.querySelector('.hot-sale-slider .next');
  prevBtn?.addEventListener('click', () => moveHotSaleSlide(-1));
  nextBtn?.addEventListener('click', () => moveHotSaleSlide(1));

  // Search
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.querySelector('.search-btn');

  function performSearch() {
    const keyword = searchInput.value.trim().toLowerCase();
    const tourItems = document.querySelectorAll('.tour-item');
    tourItems.forEach(item => {
      const title = item.querySelector('h3')?.textContent.toLowerCase() || "";
      const itinerary = item.querySelector('.itinerary')?.textContent.toLowerCase() || "";
      item.style.display = (title.includes(keyword) || itinerary.includes(keyword)) ? "block" : "none";
    });
  }

  searchInput?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });

  searchBtn?.addEventListener('click', function (e) {
    e.preventDefault();
    performSearch();
  });
});

// datatours
const dataTour = {
  "ha-noi-cua-lo": {
    name: "Tour Hà Nội - Cửa Lò 3N2Đ",
    price: 2899000,
    itinerary: "Hà Nội - Cửa Lò - Đảo Lan Châu - Quê Bác - Giếng Cốc - Chùa Đại Tuệ - Hà Nội",
    transport: "Xe khách giường nằm",
    duration: "3 ngày 2 đêm",
    image: "images/cua_lo.webp"
  },
  "ha-noi-nha-trang": {
    name: "Tour Hà Nội - Nha Trang 4N3Đ",
    price: 7389000,
    itinerary: "Hà Nội - Nha Trang - Hòn Mun - Tháp Bà Ponagar - Thủy cung Vinpearl - Chùa Long Sơn - Hà Nội",
    transport: "Máy bay, ô tô du lịch",
    duration: "4 ngày 3 đêm",
    image: "images/nha_trang.jpg"
  },
  "tp-ho-chi-minh-da-lat": {
    name: "Tour TP. Hồ Chí Minh - Đà Lạt 3N2Đ",
    price: 3899000,
    itinerary: "TP. Hồ Chí Minh - Đà Lạt - Dinh Bảo Đại - Thác Datanla - Núi Langbiang - Ga xe lửa cổ - TP. Hồ Chí Minh",
    transport: "Ô tô du lịch đời mới",
    duration: "3 ngày 2 đêm",
    image: "images/da_lat.jpg"
  },
  "ha-noi-quang-binh": {
    name: "Tour Hà Nội - Quảng Bình 4N3Đ",
    price: 4389000,
    itinerary: "Hà Nội - Quảng Bình - Làng Bích họa Cảnh Dương - Động Thiên Đường - Nhà lưu niệm Đại Tướng Võ Nguyên Giáp - Tháp Chuông - Hà Nội",
    transport: "Máy bay, ô tô du lịch",
    duration: "4 ngày 3 đêm",
    image: "images/dong_thien_duong.jpg"
  },
  "ha-noi-sam-son": {
    name: "Tour Hà Nội - Sầm Sơn 3N2Đ",
    price: 2399000,
    itinerary: "Hà Nội - Sầm Sơn - Chùa Cô Tiên - Đền Độc Cương - Biển Sầm Sơn - Hà Nội",
    transport: "Xe khách du lịch",
    duration: "3 ngày 2 đêm",
    image: "images/sam_son.jpg"
  },
  "tp-ho-chi-minh-da-nang-hue-hoi-an": {
    name: "Tour TP. Hồ Chí Minh - Đà Nẵng - Huế - Hội An 5N4Đ",
    price: 8199000,
    itinerary: "TP. Hồ Chí Minh - Đà Nẵng - Linh Ứng Bãi Bụt - Bán đảo Sơn Trà - Chùa Cầu - Nhà cổ - Huế - Lăng Khải Định - Đại Nội Triều Nguyễn - Chùa Thiên Mụ - TP. Hồ Chí Minh",
    transport: "Máy bay, ô tô du lịch",
    duration: "5 ngày 4 đêm",
    image: "images/hoi_an.jpg"
  },
  "tp-ho-chi-minh-vung-tau": {
    name: "Tour TP.HCM - Vũng Tàu 2N1Đ",
    price: 599000,
    itinerary: "Đồi cừu Suối Nghệ - Bãi Sau - Đảo Long Sơn - Mũi Nghinh Phong",
    transport: "Xe khách",
    duration: "2 ngày 1 đêm",
    image: "images/vung_tau.jpg"
  },
  "ha-noi-phu-quoc": {
    name: "Tour Hà Nội - Phú Quốc 4N3Đ",
    price: 8500000,
    itinerary: "Hà Nội - Phú Quốc - Vinpearland - Đảo Ngọc - Hà Nội",
    transport: "Xe du lịch đời mới & Máy bay",
    duration: "4 ngày 3 đêm",
    image: "images/phu_quoc.jpg"
  },
  "tp-ho-chi-minh-con-dao": {
    name: "Tour TP.HCM - Côn Đảo 4N3Đ",
    price: 7850000,
    itinerary: "TP.HCM - Địa ngục trần gian Côn Đảo - Khu Nam Đảo - Khu Bắc Đảo - Vịnh Côn Sơn - TPHCM",
    transport: "Máy bay",
    duration: "4 ngày 3 đêm",
    image: "images/con_dao.jpg"
  },
  "tp-ho-chi-minh-long-an-dong-thap-chau-doc": {
    name: "Tour TP.HCM - Long An - Đồng Tháp - Châu Đốc 4N3Đ",
    price: 3200000,
    itinerary: "TPHCM - Long An - Đồng Tháp - Châu Đốc - TPHCM",
    transport: "Xe khách",
    duration: "4 ngày 3 đêm",
    image: "images/chau_doc.jpg"
  },
  "ha-noi-soc-trang-bac-lieu-ca-mau": {
    name: "Tour Hà Nội - Sóc Trăng - Bạc Liêu - Cà Mau 4N3Đ",
    price: 6200000,
    itinerary: "Hà Nội - Cần Thơ - Mỹ Tho - Sóc Trăng - Bạc Liêu - Cà Mau - Cần Thơ - Hà Nội",
    transport: "Xe du lịch & Máy bay",
    duration: "4 ngày 3 đêm",
    image: "images/ca_mau.jpg"
  },
  "tp-ho-chi-minh-an-giang-can-tho": {
    name: "Tour TP.HCM - An Giang - Cần Thơ 2N2Đ",
    price: 2186000,
    itinerary: "TPHCM - Châu Đốc - Rừng Tràm Trà Sư - Cần Thơ - TPHCM",
    transport: "Xe du lịch",
    duration: "2 ngày 2 đêm",
    image: "images/tra_su.jpg"
  },
  "ha-noi-sapa": {
    name: "Tour Hà Nội - Sapa 3N2Đ",
    price: 2599000,
    itinerary: "Hà Nội - Sapa - Bản Cát Cát - Đỉnh Fansipan - Núi Hàm Rồng - Hà Nội",
    transport: "Xe khách du lịch",
    duration: "3 ngày 2 đêm",
    image: "images/fansipan.jpg"
  },
  "ha-noi-moc-chau": {
    name: "Tour Hà Nội - Mộc Châu 2N1Đ",
    price: 1599000,
    itinerary: "Hà Nội - Mộc Châu - Thác Dải Yếm - Rừng thông Bản Áng - Trang trại bò sữa Mộc Châu - Hà Nội",
    transport: "Xe khách du lịch",
    duration: "2 ngày 1 đêm",
    image: "images/moc_chau.jpg"
  },
  "ha-noi-cat-ba": {
    name: "Tour Hà Nội - Cát Bà 3N2Đ",
    price: 2599000,
    itinerary: "Hà Nội - Cát Bà - Vịnh Lan Hạ - Hà Nội",
    transport: "Xe khách du lịch",
    duration: "3 ngày 2 đêm",
    image: "images/cat_ba.jpg"
  },
  "ha-noi-1-ngay": {
    name: "Tour Hà Nội - Tơng Ngày",
    price: 699000,
    itinerary: "Điểm đón - Lăng Chủ tịch Hồ Chí Minh - Văn Miếu Quốc Tử Giám - Nhà tù Hỏa Lò - Hoàng thành Thăng Long - Điểm đón",
    transport: "Xe khách du lịch",
    duration: "1 ngày",
    image: "images/ho_chi_minh_mausoleum.jpg"
  },
  "ha-noi-tam-dao": {
    name: "Tour Hà Nội - Tam Đảo 2N1Đ",
    price: 1299000,
    itinerary: "Hà Nội - Tam Đảo - Nhà thờ đá - Cầu Mây - Vườn quốc gia Tam Đảo - Đền Bà Chúa Thượng Ngàn - Hà Nội",
    transport: "Xe khách du lịch",
    duration: "2 ngày 1 đêm",
    image: "images/tam_dao.jpg"
  },
  "ha-noi-ha-long": {
    name: "Tour Hà Nội - Hạ Long 3N2Đ",
    price: 3099000,
    itinerary: "Hà Nội - Hạ Long - Bãi Cháy - Vịnh Hạ Long - Hà Nội",
    transport: "Xe khách du lịch",
    duration: "3 ngày 2 đêm",
    image: "images/ha_long.jpg"
  },
  "ha-noi-ninh-binh": {
    name: "Tour Hà Nội - Ninh Bình 3N2Đ",
    price: 2799000,
    itinerary: "Hà Nội - Chùa Bái Đính - Hang Múa - Vườn chim Thung Nham - Tam Cốc - Hà Nội",
    transport: "Xe khách",
    duration: "3 ngày 2 đêm",
    image: "images/chua_bai_dinh.jpg"
  },
  "da-nang-quang-nam": {
    name: "Tour Đà Nẵng - Quảng Nam 3N2Đ",
    price: 5499000,
    itinerary: "Đà Nẵng - Ngũ Hành Sơn - Biển Mỹ Khê - Bà Nà Hills - Phố cổ Hội An - Thánh địa Mỹ Sơn - Đà Nẵng",
    transport: "Xe khách",
    duration: "3 ngày 2 đêm",
    image: "images/hoi_an.jpg"
  },
  "ha-noi-cao-bang": {
    name: "Tour Hà Nội - Cao Bằng 2N1Đ",
    price: 2199000,
    itinerary: "Hà Nội - Cao Bằng - Thác Bản Giốc - Pác Bó - Hà Nội",
    transport: "Xe khách",
    duration: "2 ngày 1 đêm",
    image: "images/thac_ban_gioc.jpg"
  },
  "tp-ho-chi-minh-phan-thiet-mui-ne": {
    name: "Tour TpHCM - Phan Thiết - Mũi Né 3N2Đ",
    price: 3299000,
    itinerary: "TP. Hồ Chí Minh - Mũi Né - Suối Tiên - Đồi Cát Bay - Làng Chài Mũi Né - Tháp Chăm Poshanur - Mua đặc sản - Về TP. Hồ Chí Minh",
    transport: "Xe khách",
    duration: "3 ngày 2 đêm",
    image: "images/mui_ne.jpg"
  },
  "tp-ho-chi-minh-phu-quoc-vinpearl-land": {
    name: "Tour TpHCM - Phú Quốc - Vinpearl Land - Đảo Ngọc 4N3Đ",
    price: 6499000,
    itinerary: "TP. Hồ Chí Minh - Phú Quốc - Vin Wonders - Làng Chài Hàm Ninh - Sunset Sanato - Dinh Cậu Nam Đảo - Vinpearl Safari - Nhà Tù Phú Quốc - Bãi Sao - TP. Hồ Chí Minh",
    transport: "Xe khách du lịch & Máy bay",
    duration: "4 ngày 3 đêm",
    image: "images/phu_quoc.jpg"
  },
  "tp-ho-chi-minh-phu-yen-quy-nhon": {
    name: "Tour TP. Hồ Chí Minh - Phú Yên - Quy Nhơn 3N2Đ",
    price: 3499000,
    itinerary: "TP. Hồ Chí Minh - Phú Yên - Gành Đá Dĩa - Bãi Xép - Quy Nhơn - Eo Gió - Kỳ Co - Tháp Đôi - Tháp Nhạn - TP. Hồ Chí Minh",
    transport: "Xe khách",
    duration: "3 ngày 2 đêm",
    image: "images/ganh_da_dia.jpg"
  }
};
