// Giỏ hàng dùng chung
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

// Mở popup giỏ hàng
function openCartPopup() {
  document.querySelector(".cart-popup")?.remove();

  const popup = document.createElement("div");
  popup.className = "cart-popup";

  const content = document.createElement("div");
  content.className = "cart-content large";

  const header = document.createElement("h3");
  header.textContent = "Giỏ Hàng";
  content.appendChild(header);

  if (cartData.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "Giỏ hàng hiện đang trống.";
    emptyMsg.style.margin = "20px 0";
    content.appendChild(emptyMsg);
  } else {
    const table = document.createElement("table");
    table.className = "cart-table";
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

  const footer = document.createElement("div");
  footer.className = "cart-footer";
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

// Đóng popup
function closeCartPopup() {
  document.querySelector(".cart-popup")?.remove();
}

// Xoá item khỏi giỏ hàng
function removeFromCart(index) {
  cartData.splice(index, 1);
  localStorage.setItem("cartData", JSON.stringify(cartData));
  closeCartPopup();
  openCartPopup();
}

// Thêm tour hiện tại (tự động lấy thông tin từ trang)
function handleAddCurrentTourToCart() {
  const name = document.querySelector(".intro h2")?.innerText.trim() || "Tour không rõ tên";
  const priceText = document.querySelector(".highlight")?.innerText || "0";
  const price = parseInt(priceText.replace(/[^\d]/g, "")) || 0;
  const imageEl = document.querySelector(".slide img") || document.querySelector(".intro img");
  const image = imageEl ? imageEl.getAttribute("src") : "";

const tour = {
  name,
  price,
  image,
  description
};
document.getElementById("tour-description").textContent = tour.description;
const description = document.querySelector(".loi-dan")?.innerText || "";


  cartData.push(tour);
  localStorage.setItem("cartData", JSON.stringify(cartData));
  alert("🛒 Đã thêm tour vào giỏ hàng!");
}

// Checkout — chuyển sang trang thanh toán
function checkout() {
  const latestTour = cartData[cartData.length - 1];
  if (latestTour) {
    localStorage.setItem("selectedTour", JSON.stringify(latestTour));
    window.location.href = "../Danh mục/thanhtoan.html";
  } else {
    alert("Không có tour nào trong giỏ hàng!");
  }
}


// Tự động gắn sự kiện sau khi trang load
document.addEventListener("DOMContentLoaded", () => {
  // Gắn nút thêm vào giỏ hàng (nếu có)
  const addToCartBtn = document.querySelector(".add-to-cart button");
  if (addToCartBtn) {
    addToCartBtn.addEvfentListener("click", handleAddCurrentTourToCart);
  }

  // Gắn nút mở giỏ hàng nếu có
  const cartIcon = document.querySelector('a[href="cart.html"], a[href="#cart"], a[onclick*="openCartPopup"]');
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      openCartPopup();
    });
  }

  // Gửi form tư vấn (nếu có)
  const form = document.querySelector(".form-container form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Yêu cầu tư vấn đã được gửi thành công!");
      form.reset();
    });
  }
});
