//Js cho nút đóng mở nav
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('hamburger-btn');
    const nav = document.getElementById('main-nav');

    btn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  });