import "./../scss/style.scss";
import { loadComponent } from "./load-components";
import setupHeader from "./header";
import "./products";
import "./product";
import "./checkout";
import "./shopping-cart";
import { updateCartCount } from "./cart-utils";

document.addEventListener("DOMContentLoaded", async () => {
  // Ladda header och initiera dess funktionalitet
  await loadComponent("#header-place", "/src/components/header.html");
  setupHeader();
  updateCartCount(); // Initiera cart-count

  // Ladda footer
  await loadComponent("#footer-place", "/src/components/footer.html");
});
