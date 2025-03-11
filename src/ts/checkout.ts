import { getCart } from "./cart-utils";
import { renderShoppingCart, updateCartQuantity } from "./shopping-cart";
import "../scss/style.scss";

function handleQuantityChange(productId: number, change: number): void {
  updateCartQuantity(productId, change);
  updateTotalPrice();

  document.getElementById("increaseButton")?.addEventListener("click", () => {
    handleQuantityChange(productId, 1);
  });

  document.getElementById("decreaseButton")?.addEventListener("click", () => {
    handleQuantityChange(productId, -1);
  });

  window.addEventListener("load", () => {
    renderShoppingCart();
    updateTotalPrice();
  });
}

export function updateTotalPrice(): void {
  const cart = getCart();
  let total = 0;

  cart.forEach((item) => {
    total += item.product.price * item.quantity;
  });

  const cartTotalToPay = document.getElementById(
    "cart-total-to-pay"
  ) as HTMLElement;
  if (cartTotalToPay) {
    cartTotalToPay.textContent = `${total.toFixed(2)} kr`;
  }
}

window.addEventListener("load", () => {
  renderShoppingCart();
  updateTotalPrice(); // Uppdatera totalsumman när sidan laddas första gången
});

// const payButton = document.getElementById("pay-button") as HTMLButtonElement;

// payButton.addEventListener("click", () => {
//   window.location.href = "confirmation.html";
// });
