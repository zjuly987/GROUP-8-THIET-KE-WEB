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
  const header = document.querySelector('header');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const distanceToBottom = documentHeight - (scrollTop + windowHeight);

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


//ảnh slide giới thiệu tour
let slideIndex = 0;
let slides = document.getElementsByClassName("slide");
let autoSlideTimer;

function showSlide(n) {
  if (n >= slides.length) { slideIndex = 0 }
  if (n < 0) { slideIndex = slides.length - 1 }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex].style.display = "block";
}

function changeSlide(n) {
  clearTimeout(autoSlideTimer); // Dừng chạy tự động khi dùng nút
  slideIndex += n;
  showSlide(slideIndex);
  autoSlide(); // Tiếp tục chạy tự động
}

function autoSlide() {
  autoSlideTimer = setTimeout(() => {
    slideIndex++;
    showSlide(slideIndex);
    autoSlide(); // gọi lại chính nó
  }, 10000);
}

// Khởi tạo slide đầu tiên
document.addEventListener("DOMContentLoaded", () => {
  showSlide(slideIndex);
  autoSlide();
});

// Hiện gt chung lịch trình
window.addEventListener("scroll", function () {
  const reveals = document.querySelectorAll(".day-section");
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active"); // ẩn khi lướt qua
    }
  });
});


//Lưu ý về giá tour
function toggleDropdown(header) {
  const content = header.nextElementSibling;
  const isActive = header.classList.contains('active');

  // Toggle arrow and content
  header.classList.toggle('active');
  content.style.display = isActive ? 'none' : 'block';
}
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




// Giỏ hàng popup model
const cartData = [];

function openCartPopup() {
  // Xóa popup cũ nếu có
  document.querySelector('.cart-popup')?.remove();

  const popup = document.createElement('div');
  popup.className = 'cart-popup';

  const content = document.createElement('div');
  content.className = 'cart-content large'; // popup rộng 2/3 màn hình

  const header = document.createElement('h3');
  header.textContent = 'Giỏ Hàng';
  content.appendChild(header);

  if (cartData.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'Giỏ hàng hiện đang trống.';
    emptyMsg.style.margin = '20px 0';
    content.appendChild(emptyMsg);
  } else {
    const table = document.createElement('table');
    table.className = 'cart-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Giá</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${cartData.map((tour, index) => `
          <tr>
            <td>
              <div class="product-info">
                <img src="${tour.image}" alt="${tour.name}">
                <span>${tour.name}</span>
              </div>
            </td>
            <td>${tour.price.toLocaleString()} đ</td>
            <td><button class="remove-btn" onclick="removeFromCart(${index})">X</button></td>
          </tr>
        `).join('')}
      </tbody>
    `;
    content.appendChild(table);
  }

  const total = cartData.reduce((sum, item) => sum + item.price, 0);

  const footer = document.createElement('div');
  footer.className = 'cart-footer';
  footer.innerHTML = `
    <div class="total">Tổng cộng: <strong>${total.toLocaleString()} đ</strong></div>
    <div class="cart-actions">
      <button class="close-btn" onclick="closeCartPopup()">Đóng</button>
      <button class="checkout-btn" onclick="checkout()">Thanh Toán</button>
    </div>
  `;
  content.appendChild(footer);

  popup.appendChild(content);
  document.body.appendChild(popup);
}


function closeCartPopup() {
  document.querySelector('.cart-popup')?.remove();
  const actionDiv = document.createElement('div');
actionDiv.className = 'cart-actions';
actionDiv.innerHTML = `
  <button onclick="checkout()">Thanh toán</button>
  <button onclick="closeCartPopup()">Hủy</button>
`;

}

function removeFromCart(index) {
  cartData.splice(index, 1);
  closeCartPopup();
  openCartPopup();
}

// checkout
function checkout() {
  const latestTour = cartData[cartData.length - 1];
  if (latestTour) {
    localStorage.setItem("selectedTour", JSON.stringify(latestTour));
    window.location.href = "thanhtoan.html";
  } else {
    alert("Không có tour nào trong giỏ hàng!");
  }
}

// Nhận tư vấn
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form-container form');    
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn form submit mặc định        
    // Lấy các giá trị từ form
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const people = document.getElementById('people').value;
    const confirmation = document.getElementById('confirmation').checked;    
    // Kiểm tra validation cơ bản
    if (!name || !email || !phone) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc (Họ tên, Email, Số điện thoại)');
      return;
    }   
    // Kiểm tra checkbox xác nhận
    if (!confirmation) {
      alert('Vui lòng xác nhận thông tin trước khi gửi');
      return;
      }      
    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
        alert('Vui lòng nhập email hợp lệ (@gmail.com)');
        return;
    }      
    // Kiểm tra số điện thoại (cơ bản)
    const phoneRegex = /^0[0-9]{9}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Vui lòng nhập số điện thoại hợp lệ (10 số, bắt đầu bằng 0)');
        return;
    }
    // Hiển thị thông báo thành công
    showSuccessMessage();
    // Reset form sau khi gửi thành công
    form.reset();
  });
});
// Hàm hiển thị thông báo thành công
function showSuccessMessage() {
  // Tạo div thông báo
  const alertDiv = document.createElement('div');
  alertDiv.innerHTML = `
    <!-- Lớp overlay che toàn màn hình -->
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      animation: fadeIn 0.3s ease-in-out;">
    <!-- Hộp thông báo chính -->
    <div style="
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      text-align: center;
      max-width: 450px;
      margin: 20px;
      animation: slideIn 0.3s ease-out;">
      <!-- Icon tick xanh -->
      <div style="
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;">
        <span style="color: white; font-size: 30px; font-weight: bold;">✅</span></div>  
        <!-- Tiêu đề hiển thị -->  
        <h3 style="color: #28a745; margin-bottom: 15px; font-size: 24px;">Thành công!</h3>
        <p style="
          margin-bottom: 25px; 
          line-height: 1.6; 
          color: #333;
          font-size: 16px;">
          <strong>Đã gửi yêu cầu tư vấn thành công.</strong><br>Vui lòng chú ý điện thoại để nhận tư vấn.</p>
          <button onclick="this.closest('div').parentNode.remove()" style="
            background: linear-gradient(45deg, #28a745, #20a03a);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: transform 0.2s ease;
            min-width: 80px;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              OK
          </button>
      </div>
    </div>
    <!-- CSS cho các hiệu ứng animation -->
    <style>
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    </style>
`;
// Thêm modal vào cuối trang web    
document.body.appendChild(alertDiv);
}
// Tạo CSS cho hiệu ứng xoay (dùng cho loading)
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }    /* Từ 0 độ */
        to { transform: rotate(360deg); }    /* Xoay 360 độ */
    }
`;
document.head.appendChild(style); // Thêm CSS vào head của trang

// xử lý thêm giỏ hàng
document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.querySelector(".add-to-cart button");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      // Tự động lấy tên tour
      const name = document.querySelector(".intro h2")?.innerText.trim() || "Tour không rõ tên";
      // Lấy giá từ span.highlight
      const priceText = document.querySelector(".highlight")?.innerText || "0";
      const price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;
      // Lấy ảnh từ slide đầu tiên hoặc ảnh đầu intro
      const imageEl = document.querySelector(".slide img") || document.querySelector(".intro img");
      const image = imageEl ? imageEl.getAttribute("src") : "";
      
// 👉 Lấy thêm thời gian và phương tiện
      const duration = document.querySelector(".thoi-gian")?.innerText.replace("Thời gian:", "").trim() || "";
      const transport = document.querySelector(".phuong-tien")?.innerText.replace("Phương tiện:", "").trim() || "";

      const tour = {
        name,
        price,
        image,
        duration,
        transport
      };

      cartData.push(tour);
      alert("Thêm tour vào giỏ hàng thành công!");
    });
  }

  // Gắn sự kiện click vào icon giỏ hàng để mở popup
  const cartIcon = document.querySelector('a[href="cart.html"]');
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      openCartPopup();
    });
  }
});

// checkout
function checkout() {
  const latestTour = cartData[cartData.length - 1];
  if (latestTour) {
    localStorage.setItem("selectedTour", JSON.stringify(latestTour));
    window.location.href = "../Danh mục/thanhtoan.html"; 
  } else {
    alert("Không có tour nào trong giỏ hàng!");
  }
}


