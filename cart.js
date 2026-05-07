let cart = JSON.parse(localStorage.getItem("cart")) || [];

window.addToCart = function(id) {
  const product = products.find(p => p.id == id);
  const existing = cart.find(item => item.id == id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  renderCart();
};

function renderCart() {
  let html = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    count += item.qty;

    html += `
      <div>
        ${item.name} - ₱${item.price} x ${item.qty}
        <br>
        <button onclick="changeQty(${item.id}, -1)">➖</button>
        <button onclick="changeQty(${item.id}, 1)">➕</button>
        <button onclick="removeItem(${item.id})">❌</button>
        <br>Subtotal: ₱${subtotal}
        <hr>
      </div>
    `;
  });

  document.getElementById("cart-items").innerHTML = html;
  document.getElementById("cart-total").textContent = total;
  document.getElementById("cart-count").textContent = count;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

window.changeQty = function(id, change) {
  const item = cart.find(i => i.id == id);
  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id != id);
  }

  saveCart();
  renderCart();
};

window.removeItem = function(id) {
  cart = cart.filter(i => i.id != id);
  saveCart();
  renderCart();
};

window.clearCart = function() {
  cart = [];
  saveCart();
  renderCart();
};

renderCart();
