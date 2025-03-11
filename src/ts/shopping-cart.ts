import { getCart, saveCart, CartItem } from "./cart-utils";
import { updateTotalPrice } from "./checkout";

export function renderShoppingCart(): void {
  const cart = getCart();
  const cartContainer = document.getElementById("cartItem")!;
  const itemCount = document.getElementById("itemCount")!;
  const totalPrice = document.getElementById("totalPrice")!;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "Din varukorg är tom";
    itemCount.textContent = "";
    totalPrice.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-product");
    itemElement.innerHTML = `
      <img src="${item.product.image}" alt="${item.product.name}">
      <div class="item-info">
        <h3>${item.product.name}</h3>
        <p>${item.product.description}</p>
      </div>
      <div class="item-actions">
        <div class="quantity">
          <button data-id="${
            item.product.id
          }" class="decrease-quantity">-</button>
          <span>${item.quantity}</span>
          <button data-id="${
            item.product.id
          }" class="increase-quantity">+</button>
        </div>
        <p>${(item.product.price * item.quantity).toFixed(2)} kr</p>
      </div>
    `;
    cartContainer.appendChild(itemElement);
    total += item.product.price * item.quantity;
  });

  totalPrice.textContent = `Total summa: ${total.toFixed(2)} kr`;

  document.querySelectorAll(".decrease-quantity").forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const productId = Number(target.dataset.id);
      updateCartQuantity(productId, -1);
    });
  });

  document.querySelectorAll(".increase-quantity").forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const productId = Number(target.dataset.id);
      updateCartQuantity(productId, 1);
    });
  });
}

export function updateCartQuantity(productId: number, change: number): void {
  const cart = getCart();
  const item = cart.find((item) => item.product.id === productId);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
    }
    saveCart(cart);
    renderShoppingCart();
    updateTotalPrice();
  }
}

window.addEventListener("load", () => {
  renderShoppingCart();
});

document.getElementById("continueShopping")?.addEventListener("click", () => {
  window.location.href = "index.html#senaste-p-id";
});

document.getElementById("checkout")?.addEventListener("click", () => {
  window.location.href = "checkout.html";
});
