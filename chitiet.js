//slide ảnh
  window.onload = function () {
    let slideIndex = Math.floor(Math.random() * 3) + 1;
    showSlides(slideIndex);

    function changeSlide(n) {
      showSlides(slideIndex += n);
    }

    function showSlides(n) {
      const slides = document.getElementsByClassName("slide");
      if (n > slides.length) slideIndex = 1;
      if (n < 1) slideIndex = slides.length;

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      slides[slideIndex - 1].style.display = "block";
    }

    // để gọi được từ HTML
    window.changeSlide = changeSlide;
  };


//có thể bạn sẽ quan tâm
  function toggleMoreTours() {
    const more = document.getElementById("moreTours");
    const button = document.querySelector(".load-more");

    if (more.style.display === "none") {
      more.style.display = "block";
      button.textContent = "Thu gọn ▲";
    } else {
      more.style.display = "none";
      button.textContent = "Xem thêm ▼";
    }
  }

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
