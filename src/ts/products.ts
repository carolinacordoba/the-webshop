fetch('src/assets/data/products.json')
  .then(response => response.json())
  .then(products => {
    const productsContainer = document.querySelector('.products')!;

    products.forEach((product: any) => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <a href="product-page.html?id=${product.id}" class="product-link">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="price">${product.price} kr</span>
          </div>
        </a>
      `;
      productsContainer.appendChild(productDiv);
    });
  })
  .catch(error => console.error('Error loading products:', error));

localStorage.setItem("testKey", "testValue");
console.log("Hämtar från Local Storage:", localStorage.getItem("testKey"));
