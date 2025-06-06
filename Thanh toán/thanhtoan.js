// Tính tiền đặt cọc
let basePrice = 0;
const totalDisplay = document.getElementById("total-price");

function calculateDeposit() {
  const adults = parseInt(document.getElementById("adults").value) || 0;
  const children = parseInt(document.getElementById("children").value) || 0;
  const infants = parseInt(document.getElementById("infants").value) || 0;

  const total = (adults * basePrice) + (children * basePrice * 0.8);
  const deposit = total * 0.1;

  totalDisplay.textContent = deposit.toLocaleString('vi-VN') + "đ";
}

["adults", "children", "infants"].forEach(id => {
  document.getElementById(id).addEventListener("input", calculateDeposit);
});

// Hiển thị thông tin tour từ localStorage
document.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("selectedTour");
  if (stored) {
    const tour = JSON.parse(stored);
    document.querySelector(".order-summary strong").textContent = tour.name || "Tour không xác định";
    document.getElementById("slide-img").src = tour.image || "images/default.jpg";
    document.getElementById("base-price").textContent = tour.price.toLocaleString('vi-VN') + "đ";
    basePrice = tour.price;
    calculateDeposit();
  }

  // Xác nhận đặt tour
  document.querySelector(".checkout-button").addEventListener("click", () => {
    alert("Cảm ơn bạn đã đặt tour! Chúng tôi sẽ liên hệ sớm nhất.");
    localStorage.removeItem("selectedTour");
    window.location.href = "../index.html";
  });
});

// Slideshow đơn ảnh (nếu cần mở rộng)
const tourImages = []; // sẽ mở rộng nếu có danh sách ảnh
let currentSlide = 0;

function changeSlide(n) {
  if (tourImages.length === 0) return;
  currentSlide = (currentSlide + n + tourImages.length) % tourImages.length;
  document.getElementById("slide-img").src = tourImages[currentSlide];
}
