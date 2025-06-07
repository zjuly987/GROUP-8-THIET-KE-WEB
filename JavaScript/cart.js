// Danh sách tour mẫu, bạn có thể tách riêng nếu cần
const dataTour = {
  "da-nang-quang-nam": {
    name: "Tour Đà Nẵng - Quảng Nam 3N2Đ",
    image: "images/Trang chủ/da_nang.jpg",
    price: 5499000,
    duration: "3 ngày 2 đêm",
    transport: "Xe khách"
  },
  // Thêm các tour khác nếu cần
};

let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

function addToCart(tourKey) {
  if (dataTour[tourKey]) {
    const tour = dataTour[tourKey];
    cartData.push(tour);
    localStorage.setItem('cartData', JSON.stringify(cartData));
    alert("🛒 Đã thêm vào giỏ hàng!");
  }
}

function openCartPopup() {
  document.querySelector('.cart-popup')?.remove();

  const popup = document.createElement('div');
  popup.className = 'cart-popup';

  const content = document.createElement('div');
  content.className = 'cart-content large';

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
      <button class="checkout-btn" onclick="goToCheckout()">Thanh Toán</button>
    </div>
  `;
  content.appendChild(footer);

  popup.appendChild(content);
  document.body.appendChild(popup);
}

function removeFromCart(index) {
  cartData.splice(index, 1);
  localStorage.setItem('cartData', JSON.stringify(cartData));
  closeCartPopup();
  openCartPopup();
}

function closeCartPopup() {
  document.querySelector('.cart-popup')?.remove();
}

function goToCheckout() {
  if (cartData.length === 0) {
    alert("Giỏ hàng đang trống!");
    return;
  }
  localStorage.setItem('selectedTour', JSON.stringify(cartData[0])); // hoặc truyền danh sách
  window.location.href = 'Thanh Toán/thanhtoan.html';
}
