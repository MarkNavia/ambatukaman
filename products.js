function displayProducts(list) {
  let html = "";

  list.forEach(product => {
    html += `
      <div class="card">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>₱${product.price}</p>
        <button onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.getElementById("product-parent").innerHTML = html;
}

// initial display
displayProducts(products);

// SEARCH FUNCTION
document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
});