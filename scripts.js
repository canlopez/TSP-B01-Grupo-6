// Mostrar modal con información del producto
function openModal(nombre, precio, imagen) {
  document.getElementById('modal-title').textContent = nombre;
  document.getElementById('modal-price').textContent = `$${precio.toLocaleString('es-CO')},00`;
  document.getElementById('modal-img').src = imagen;
  document.getElementById('product-modal').style.display = 'block';
}

// Cerrar modal
function closeModal() {
  document.getElementById('product-modal').style.display = 'none';
}

// Cambiar cantidad en el modal
function changeQuantity(amount) {
  const input = document.getElementById('cantidad');
  let current = parseInt(input.value);
  current = isNaN(current) ? 1 : current;
  current += amount;
  if (current < 1) current = 1;
  input.value = current;
}

// Añadir producto al carrito y guardar en localStorage
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  alert(`Agregado: ${product.name} x${product.quantity}`);
  updateCartIcon(); // Actualiza el ícono del carrito
}

// Actualizar el ícono del carrito con la cantidad total
function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = `(${totalItems})`;
}

// Listener para botón "Agregar al carrito"
document.getElementById('addToCartBtn').addEventListener('click', () => {
  const product = {
    id: 'mochila_cuero_cafe',
    name: 'Mochila cuero Café',
    price: 179900,
    quantity: parseInt(document.getElementById('cantidad').value) || 1
  };

  addToCart(product);
});

// Cargar carrito en la página del carrito
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (document.getElementById('cartContainer')) {
    if (cart.length === 0) {
      document.getElementById('cartContainer').innerHTML = '<p>Tu carrito está vacío</p>';
    } else {
      cart.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<p>${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}</p>`;
        document.getElementById('cartContainer').appendChild(div);
      });
    }
  }

  // También actualiza el ícono del carrito al cargar
  updateCartIcon();
});

function renderCart() {
  const container = document.getElementById('cart-container');
  const subtotalEl = document.getElementById('subtotal-amount');
  const totalEl = document.getElementById('total-amount');

  container.innerHTML = '';

  if (carrito.length === 0) {
    container.innerHTML = '<p>Tu carrito está vacío.</p>';
    subtotalEl.textContent = '$0';
    totalEl.textContent = '$0';
    return;
  }

  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio * producto.cantidad;

    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="cart-item-info">
        <strong>${producto.nombre}</strong><br>
        <span>$${producto.precio.toLocaleString('es-CO')}</span><br>
        <div class="quantity-controls">
          <button onclick="cambiarCantidad(${index}, -1)">-</button>
          <span>${producto.cantidad}</span>
          <button onclick="cambiarCantidad(${index}, 1)">+</button>
        </div>
      </div>
      <button onclick="eliminarProducto(${index})" class="btn">🗑️</button>
    `;
    container.appendChild(item);
  });

  subtotalEl.textContent = `$${total.toLocaleString('es-CO')}`;
  totalEl.textContent = `$${total.toLocaleString('es-CO')}`;
}

function cambiarCantidad(index, delta) {
  if (carrito[index].cantidad + delta >= 1) {
    carrito[index].cantidad += delta;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCart();
  }
}
