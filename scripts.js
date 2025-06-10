function openModal(nombre, precio, imagen) {
  document.getElementById('modal-title').textContent = nombre;
  document.getElementById('modal-price').textContent = `$${precio.toLocaleString('es-CO')},00`;
  document.getElementById('modal-img').src = imagen;
  document.getElementById('product-modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('product-modal').style.display = 'none';
}

function updateCartIcon() {
  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
  document.getElementById('cart-count').textContent = `(${totalItems})`;
}

localStorage.setItem('carrito', JSON.stringify(cart));


