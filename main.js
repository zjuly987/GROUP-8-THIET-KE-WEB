// Mảng để lưu tour trong giỏ hàng (chỉ lưu key của tour)
let cartItems = [];

// Hàm định dạng số tiền (thêm dấu phân cách hàng nghìn)
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ";
}

// Hàm thêm tour vào giỏ hàng
function addToCart(tourKey) {
  if (dataTour[tourKey] && !cartItems.includes(tourKey)) {
    cartItems.push(tourKey);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}

// Hiển thị dropdown khi nhấp vào giỏ hàng
document.getElementById('cartLink').addEventListener('click', function(e) {
  e.preventDefault();
  const cartDropdown = document.getElementById('cartDropdown');
  const cartItemsDiv = document.getElementById('cartItems');

  // Lấy dữ liệu từ localStorage
  cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Hiển thị các tour trong dropdown
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

  // Toggle hiển thị dropdown
  cartDropdown.style.display = cartDropdown.style.display === 'none' ? 'block' : 'none';
});

// Chuyển đến trang thanh toán khi nhấp vào tour trong giỏ hàng
function goToCheckout(tourKey) {
  localStorage.setItem('selectedTour', tourKey);
  window.location.href = '../Thanh Toán/thanhtoan.html';
}

// Ẩn dropdown khi nhấp ra ngoài
document.addEventListener('click', function(e) {
  const cartDropdown = document.getElementById('cartDropdown');
  const cartLink = document.getElementById('cartLink');
  if (!cartDropdown.contains(e.target) && e.target !== cartLink) {
    cartDropdown.style.display = 'none';
  }
});

// JS header không che mất nội dung bên dưới
  function updateMainPadding() {
    const header = document.querySelector("header");
    const main = document.querySelector(".intro-container");
    if (header && main) {
      main.style.paddingTop = header.offsetHeight + "px";
    }
  }

  window.addEventListener("load", updateMainPadding);
  window.addEventListener("resize", updateMainPadding);

  window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  const scrollTop = window.pageYOffset;

  if (scrollTop > 100) {
    header.style.top = "-55px";  // Ẩn header khi cuộn xuống
  } else {
    header.style.top = "0";      // Hiện lại khi cuộn lên
  }
});

//ẩn đi
window.addEventListener('scroll', function () {
  const header = document.querySelector('header'); //Lấy phần tử <header> trong trang và gán vào biến header
  const scrollTop = window.pageYOffset; //Lấy vị trí cuộn hiện tại theo chiều dọc của trang (tính từ trên xuống)
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;//Chiều cao của vùng hiển thị (viewport)
  const distanceToBottom = documentHeight - (scrollTop + windowHeight); //khoảng cách còn lại từ đáy màn hình hiện tại đến đáy trang web

  // Nếu cách đáy trang < 300px thì ẩn header
  if (distanceToBottom < 300) {
    header.style.top = "-300px"; // đẩy header ra khỏi màn hình
  } else {
    header.style.top = "0";
  }
});

//chạy slide dưới banner
let underbannerIndex = 0;
let underbannerSlides = document.getElementsByClassName("underbanner-slide");
let underbannerTimer;
function showUnderbannerSlides() {
  for (let i = 0; i < underbannerSlides.length; i++) {
    underbannerSlides[i].classList.remove("active");
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
window.onload = showUnderbannerSlides;

// Search
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');

  if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const keyword = searchInput.value.trim().toLowerCase();
        const tourItems = document.querySelectorAll('.tour-item');

        tourItems.forEach(item => {
          const title = item.querySelector('h3')?.textContent.toLowerCase() || "";
          const itinerary = item.querySelector('.itinerary')?.textContent.toLowerCase() || "";

          if (title.includes(keyword) || itinerary.includes(keyword)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      }
    });
  }
});

// Slider for tours
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.querySelector('.slider');
const slidesPerView = 4;

function moveSlide(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalSlides - slidesPerView;
  } else if (currentIndex > totalSlides - slidesPerView) {
    currentIndex = 0;
  }

  const offset = -currentIndex * 25;
  slider.style.transform = `translateX(${offset}%)`;
}

// Hot sale slider
let hotSaleIndex = 0;
const hotSaleSlides = document.querySelectorAll('.hot-sale-slider .slide');
const hotSaleSlider = document.querySelector('.hot-sale-slider .slider');
const slidesPerViewHotSale = 4;

function moveHotSaleSlide(direction) {
  hotSaleIndex += direction;

  if (hotSaleIndex < 0) {
    hotSaleIndex = hotSaleSlides.length - slidesPerViewHotSale;
  } else if (hotSaleIndex > hotSaleSlides.length - slidesPerViewHotSale) {
    hotSaleIndex = 0;
  }

  const offset = -hotSaleIndex * 25;
  hotSaleSlider.style.transform = `translateX(${offset}%)`;
}

window.addEventListener('load', () => {
  moveHotSaleSlide(0);
});

// News slider
let newsSlideIndex = 0;
const newsSlides = document.querySelectorAll('.news-slide');
const totalNewsSlides = newsSlides.length;
const newsSlider = document.querySelector('.news-slider');
const slidesPerView1 = 4;

function moveNewsSlide(direction) {
  newsSlideIndex += direction;

  if (newsSlideIndex < 0) {
    newsSlideIndex = totalNewsSlides - slidesPerView1;
  } else if (newsSlideIndex > totalNewsSlides - slidesPerView1) {
    newsSlideIndex = 0;
  }

  const offset = -newsSlideIndex * (100 / slidesPerView1);
  newsSlider.style.transform = `translateX(${offset}%)`;
}

window.addEventListener('load', () => {
  moveNewsSlide(0);
});

// Modal handling
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

window.onclick = function (event) {
  const loginModal = document.getElementById('login-modal');
  const registerModal = document.getElementById('register-modal');

  if (event.target === loginModal) {
    loginModal.style.display = "none";
  } else if (event.target === registerModal) {
    registerModal.style.display = "none";
  }
};

// Reveal review items
function revealReviewItems() {
  const reviewItems = document.querySelectorAll('.review-item');
  const triggerBottom = window.innerHeight * 0.9;

  reviewItems.forEach((item, index) => {
    const boxTop = item.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      setTimeout(() => {
        item.classList.add('active');
      }, index * 200);
    }
  });
}

window.addEventListener('scroll', revealReviewItems);
window.addEventListener('load', revealReviewItems);

// Back to top button
window.onscroll = function () {
  const btn = document.getElementById("backToTopBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}