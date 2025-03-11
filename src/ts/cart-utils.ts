export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number; 
}

export function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateTotalPrice();
}

export function updateCartCount(): void {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCounts = document.querySelectorAll('.cart-count');
  
  cartCounts.forEach(cartCount => {
    if (cartCount instanceof HTMLElement) {
      cartCount.textContent = totalItems.toString();
      cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
  });
}

export function updateTotalPrice(): void {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const totalPrice = document.getElementById("totalPrice");
  if (totalPrice) {
    totalPrice.textContent = cart.length > 0 ? `Total summa: ${total.toFixed(2)} kr` : "";
  }
  
  const cartTotalToPay = document.getElementById("cart-total-to-pay");
  if (cartTotalToPay) {
    cartTotalToPay.textContent = `${total.toFixed(2)} kr`;
  }
}

export function addToCart(product: Product, quantity: number = 1): void {
  const cart = getCart();
  const existingItem = cart.find(item => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  saveCart(cart);
}

export function removeFromCart(productId: number): void {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.product.id !== productId);
  saveCart(updatedCart);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateTotalPrice();
});
