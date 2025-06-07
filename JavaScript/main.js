// main.js đã làm sạch và sửa lỗi hiệu ứng header

// Xử lý hiệu ứng header ẩn/hiện khi cuộn
let lastScrollTop = 0;
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const distanceToBottom = documentHeight - (scrollTop + windowHeight);

  if (distanceToBottom < 300) {
    header.style.top = "-300px"; // Ẩn hoàn toàn khi gần cuối trang
  } else {
    if (scrollTop > lastScrollTop) {
      header.style.top = "-55px"; // Cuộn xuống: ẩn header
    } else {
      header.style.top = "0"; // Cuộn lên: hiện lại header
    }
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// JS padding cho nội dung không bị header che
function updateMainPadding() {
  const header = document.querySelector("header");
  const main = document.querySelector(".intro-container");
  if (header && main) {
    main.style.paddingTop = header.offsetHeight + "px";
  }
}
window.addEventListener("load", updateMainPadding);
window.addEventListener("resize", updateMainPadding);

// Mảng giỏ hàng
let cartItems = [];

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ";
}


document.getElementById('cartLink').addEventListener('click', function(e) {
  e.preventDefault();
  const cartDropdown = document.getElementById('cartDropdown');
  const cartItemsDiv = document.getElementById('cartItems');

  cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
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

function goToCheckout(tourKey) {
  localStorage.setItem('selectedTour', tourKey);
  window.location.href = '../Thanh Toán/thanhtoan.html';
}

document.addEventListener('click', function(e) {
  const cartDropdown = document.getElementById('cartDropdown');
  const cartLink = document.getElementById('cartLink');
  if (!cartDropdown.contains(e.target) && e.target !== cartLink) {
    cartDropdown.style.display = 'none';
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

// Reveal review items hiệu ứng hiện dần
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

//Js cho nút đóng mở nav
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('hamburger-btn');
    const nav = document.getElementById('main-nav');

    btn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  });

// Nút về đầu trang
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

// Slider tour hot sale
let hotSaleIndex = 0;
const hotSaleSlides = document.querySelectorAll('.hot-sale-slider .slide');
const hotSaleSlider = document.querySelector('.hot-sale-slider .slider');
const slidesPerViewHotSale = 4;

function moveHotSaleSlide(direction) {
  hotSaleIndex += direction;
  if (hotSaleIndex < 0) hotSaleIndex = hotSaleSlides.length - slidesPerViewHotSale;
  else if (hotSaleIndex > hotSaleSlides.length - slidesPerViewHotSale) hotSaleIndex = 0;

  const offset = -hotSaleIndex * 25;
  hotSaleSlider.style.transform = `translateX(${offset}%)`;
}

window.addEventListener('load', () => {
  moveHotSaleSlide(0);
});

// Slider tin tức
let newsSlideIndex = 0;
const newsSlides = document.querySelectorAll('.news-slide');
const newsSlider = document.querySelector('.news-slider');
const slidesPerView1 = 4;

function moveNewsSlide(direction) {
  newsSlideIndex += direction;
  if (newsSlideIndex < 0) newsSlideIndex = totalNewsSlides - slidesPerView1;
  else if (newsSlideIndex > totalNewsSlides - slidesPerView1) newsSlideIndex = 0;

  const offset = -newsSlideIndex * (100 / slidesPerView1);
  newsSlider.style.transform = `translateX(${offset}%)`;
}

window.addEventListener('load', () => {
  moveNewsSlide(0);
});

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




