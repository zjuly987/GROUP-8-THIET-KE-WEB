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
