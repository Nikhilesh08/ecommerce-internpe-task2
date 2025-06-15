localStorage.removeItem('cart'); // Clear saved cart on page load

// Load cart from localStorage or empty
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartBtn = document.getElementById('cart-btn');

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productName, price) {
  const existing = cart.find(item => item.name === productName);
  if (existing) {
    existing.qty = Number(existing.qty) + 1;
  } else {
    cart.push({ name: productName, qty: 1, price: price });
  }
  saveCart();
  updateCartUI();
  alert(`✅ "${productName}" added to cart!`);
}

function updateCartUI() {
  cartCount.textContent = cart.reduce((acc, item) => acc + Number(item.qty), 0);

  cartItems.innerHTML = '';
  if (cart.length === 0) {
    cartItems.innerHTML = '<li>Your cart is empty.</li>';
    return;
  }
  cart.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} - ₹${(item.price * item.qty).toFixed(2)}`;
    cartItems.appendChild(li);
  });
}

function openCart() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  cartModal.classList.remove('hidden');
}

function closeCart() {
  cartModal.classList.add('hidden');
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);

updateCartUI();
