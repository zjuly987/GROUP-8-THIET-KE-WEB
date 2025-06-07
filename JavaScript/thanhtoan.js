let basePrice = 0;

// Hàm kiểm tra định dạng email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Hàm tính tiền đặt cọc
function calculateDeposit() {
  const adults = parseInt(document.getElementById("adults").value) || 0;
  const children = parseInt(document.getElementById("children").value) || 0;
  const totalDisplay = document.getElementById("total-price");

  const total = (adults * basePrice) + (children * basePrice * 0.8);
  const deposit = total * 0.1;

  totalDisplay.textContent = deposit.toLocaleString('vi-VN') + "đ";
}

// Sự kiện khi DOM tải xong
document.addEventListener("DOMContentLoaded", () => {
  // Lấy thông tin tour từ localStorage
  const stored = localStorage.getItem("selectedTour");
  if (stored) {
    const tour = JSON.parse(stored);
    document.querySelector(".order-summary strong").textContent = tour.name || "Tour không xác định";
    document.getElementById("slide-img").src = tour.image || "images/default.jpg";
    document.getElementById("base-price").textContent = tour.price.toLocaleString('vi-VN') + "đ";
    if (tour.description) {
  document.getElementById("tour-description").textContent = tour.description;
}

    basePrice = tour.price;
    calculateDeposit();
  }

  // Gắn sự kiện tính lại tiền khi thay đổi số lượng
  ["adults", "children", "infants"].forEach(id => {
    document.getElementById(id).addEventListener("input", calculateDeposit);
  });

  // Xử lý khi nhấn nút "Xác nhận đặt tour"
  document.querySelector(".checkout-button").addEventListener("click", () => {
    // Lấy dữ liệu từ các ô nhập
    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const paymentMethod = document.getElementById("payment-method").value;
    const adults = parseInt(document.getElementById("adults").value) || 0;
    const startDate = document.getElementById("start-date").value.trim();
    const endDate = document.getElementById("end-date").value.trim();

    let errors = [];

    // Kiểm tra từng ô dữ liệu
    if (!fullName) errors.push("• Vui lòng nhập họ tên.");
    if (!email || !validateEmail(email)) errors.push("• Vui lòng nhập email hợp lệ.");
    if (!phone || !/^[0-9]{9,11}$/.test(phone)) errors.push("• Vui lòng nhập số điện thoại hợp lệ (9-11 chữ số).");
    if (!address) errors.push("• Vui lòng nhập địa chỉ.");
    if (!paymentMethod) errors.push("• Vui lòng chọn phương thức thanh toán.");
    if (!startDate) errors.push("• Vui lòng chọn ngày bắt đầu.");
    if (!endDate) errors.push("• Vui lòng chọn ngày kết thúc.");
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      errors.push("• Ngày kết thúc phải sau ngày bắt đầu.");
    }
    if (adults <= 0) errors.push("• Phải có ít nhất 1 người lớn tham gia tour.");

    // Nếu có lỗi, hiển thị cảnh báo
    if (errors.length > 0) {
      alert("Vui lòng hoàn tất thông tin trước khi xác nhận:\n\n" + errors.join("\n"));
      return;
    }

    // Nếu mọi thứ hợp lệ
    alert("✅ Đặt tour thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.");
    localStorage.removeItem("selectedTour");
    window.location.href = "../index.html";
  });
});

// Slideshow nếu cần mở rộng
const tourImages = []; // danh sách ảnh mở rộng
let currentSlide = 0;

function changeSlide(n) {
  if (tourImages.length === 0) return;
  currentSlide = (currentSlide + n + tourImages.length) % tourImages.length;
  document.getElementById("slide-img").src = tourImages[currentSlide];
}
