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


// ràng buộc ở trong điền thông tin
// Biến toàn cục


// Hàm kiểm tra định dạng email hợp lệ
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Hàm tính tiền đặt cọc
function calculateDeposit() {
  const adults = parseInt(document.getElementById("adults").value) || 0;
  const children = parseInt(document.getElementById("children").value) || 0;
  const infants = parseInt(document.getElementById("infants").value) || 0;

  const total = (adults * basePrice) + (children * basePrice * 0.8);
  const deposit = total * 0.1;

  const totalDisplay = document.getElementById("total-price");
  totalDisplay.textContent = deposit.toLocaleString('vi-VN') + "đ";
}

// Khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  // Hiển thị thông tin tour từ localStorage
  const stored = localStorage.getItem("selectedTour");
  if (stored) {
    const tour = JSON.parse(stored);
    document.querySelector(".order-summary strong").textContent = tour.name || "Tour không xác định";
    document.getElementById("slide-img").src = tour.image || "images/default.jpg";
    document.getElementById("base-price").textContent = tour.price.toLocaleString('vi-VN') + "đ";
    basePrice = tour.price;
    calculateDeposit();
  }

  // Gắn sự kiện cập nhật số lượng người => tính lại đặt cọc
  ["adults", "children", "infants"].forEach(id => {
    document.getElementById(id).addEventListener("input", calculateDeposit);
  });

  // Xử lý khi nhấn nút "Xác nhận đặt tour"
  document.querySelector(".checkout-button").addEventListener("click", () => {
    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const adults = parseInt(document.getElementById("adults").value) || 0;

    let errors = [];

    if (!fullName) errors.push("Vui lòng nhập họ tên.");
    if (!email || !validateEmail(email)) errors.push("Vui lòng nhập email hợp lệ.");
    if (!phone || !/^[0-9]{9,11}$/.test(phone)) errors.push("Vui lòng nhập số điện thoại hợp lệ (9-11 chữ số).");
    if (!address) errors.push("Vui lòng nhập địa chỉ.");
    if (adults <= 0) errors.push("Phải có ít nhất 1 người lớn tham gia tour.");

    if (errors.length > 0) {
      alert("Vui lòng điền đầy đủ thông tin:\n\n" + errors.join("\n"));
      return;
    }

    alert("Cảm ơn bạn đã đặt tour! Chúng tôi sẽ liên hệ sớm nhất.");
    localStorage.removeItem("selectedTour");
    window.location.href = "../index.html";
  });
});
