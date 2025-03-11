import { addToCart, Product } from "./cart-utils";

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id") || "0");

function renderProduct(product: Product): string {
  return `
    <div class="product-image-container">
      <img class="product-image" src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-info">
      <h1 class="product-header">${product.name}</h1>
      <p class="product-scent">${product.description}</p>
      <p class="product-price">${product.price} kr</p>
      <div class="product-controls">
        <div class="quantity-container">
          <label for="quantity">Antal:</label>
          <div class="number-input">
            <input
              type="number"
              id="quantity"
              name="quantity"
              value="1"
              min="1"
              max="100"
              step="1"
            />
          </div>
        </div>
        <button id="add-to-cart">Lägg i varukorg</button>
      </div>
    </div>
  `;
}

fetch("src/assets/data/products.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Kunde inte ladda produktdata.");
    }
    return response.json();
  })
  .then((products: Product[]) => {
    const product = products.find(p => p.id === productId);
    const productContainer = document.getElementById("product-container");

    if (!productContainer) {
      console.error("Produktcontainern saknas i DOM.");
      return;
    }

    if (product) {
      productContainer.innerHTML = renderProduct(product);

      const addToCartButton = document.getElementById("add-to-cart");
      if (addToCartButton) {
        addToCartButton.addEventListener("click", () => {
          const quantityInput = document.getElementById("quantity") as HTMLInputElement;
          const quantity = parseInt(quantityInput.value, 10);

          if (!isNaN(quantity) && quantity > 0) {
            addToCart(product, quantity);
            alert("Produkten har lagts till i varukorgen!");
          } else {
            alert("Ange ett giltigt antal.");
          }
        });
      }
    } else {
      productContainer.innerHTML = `<p>Produkten hittades inte.</p>`;
    }
  })
  .catch(error => {
    console.error("Error loading product:", error);
    const productContainer = document.getElementById("product-container");
    if (productContainer) {
      productContainer.innerHTML = `<p>Ett fel inträffade vid hämtning av produktdata.</p>`;
    }
  });


