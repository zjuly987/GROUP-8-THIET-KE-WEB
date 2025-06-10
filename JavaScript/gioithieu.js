//header không che mất nội dung bên dưới
function updateMainPadding() {
  const header = document.querySelector("header");
  const main = document.querySelector(".intro-container");
  if (header && main) {
    main.style.paddingTop = header.offsetHeight + "px";
  }
}

window.addEventListener("load", updateMainPadding);
window.addEventListener("resize", updateMainPadding);
//ẩn đi
let lastScrollTop = 0;
window.addEventListener('scroll', function () {
  const header = document.querySelector('header'); //Lấy phần tử <header> trong trang và gán vào biến header
  const scrollTop = window.pageYOffset; //Lấy vị trí cuộn hiện tại theo chiều dọc của trang (tính từ trên xuống)
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;//Chiều cao của vùng hiển thị (viewport)
  const distanceToBottom = documentHeight - (scrollTop + windowHeight); //khoảng cách còn lại từ đáy màn hình hiện tại đến đáy trang web

  if (distanceToBottom < 300) {
    // Nếu gần đáy trang thì ẩn hoàn toàn
    header.style.top = "-300px";
  } else {
    if (scrollTop > lastScrollTop) {
      // Cuộn xuống → ẩn header ở -55px
      header.style.top = "-55px";
    } else {
      // Cuộn lên → hiện lại header
      header.style.top = "0";
    }
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
document.querySelectorAll('.contact-faq a').forEach(a => {
  a.addEventListener('click', e => {
    a.classList.add('visited');
  });
});
//slideshow
let currentIndex = 0;
let currentSlide = document.getElementsByClassName("slide");
let currentTimer

function showcurrentSlide() {
  for (let i = 0; i < currentSlide.length; i++) {
    currentSlide[i].classList.remove("active");
  }

  currentIndex++;
  if (currentIndex > currentSlide.length) currentIndex = 1;
  currentSlide[currentIndex - 1].classList.add("active");

  currentTimer = setTimeout(showcurrentSlide, 8000);
}

function pluscurrentSlide(n) {
  clearTimeout(currentTimer);
  currentIndex += n - 1;
  if (currentIndex < 0) currentIndex = currentSlide.length - 1;
  showcurrentSlide();
}

window.onload = showcurrentSlide;

//trở về đầu trang
// Hiển thị nút khi cuộn xuống 100px
window.onscroll = function () {
  const btn = document.getElementById("backToTopBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// Hàm cuộn về đầu trang
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const cartIcon = document.querySelector('a[href="cart.html"]');
if (cartIcon) {
  cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    openCartPopup();
  });
}

