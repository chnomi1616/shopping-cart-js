let shopItemsData = [
    { id: 1, name: "Casual Shirt", price: 45, img: "./images/img-1.jpg" },
    { id: 2, name: "Office Shirt", price: 41, img: "./images/img-2.jpg" },
    { id: 3, name: "T Shirt", price: 35, img: "./images/img-3.jpg" },
    { id: 4, name: "Men Suit", price: 45, img: "./images/img-4.jpg" },
    { id: 5, name: "Jacket", price: 55, img: "./images/img-1.jpg" },
    { id: 6, name: "Formal Pants", price: 60, img: "./images/img-2.jpg" },
    { id: 7, name: "Sweater", price: 40, img: "./images/img-3.jpg" },
    { id: 8, name: "Track Suit", price: 70, img: "./images/img-4.jpg" },
    { id: 9, name: "Winter Coat", price: 80, img: "./images/img-1.jpg" },
    { id: 10, name: "Denim Shirt", price: 42, img: "./images/img-2.jpg" },
    { id: 11, name: "Hoodie", price: 65, img: "./images/img-3.jpg" },
    { id: 12, name: "Kurta", price: 30, img: "./images/img-4.jpg" },
  ];
  
  let basket = JSON.parse(localStorage.getItem("data")) || [];
  
  document.addEventListener("DOMContentLoaded", () => {
    updateCartIcon();
  
    let shop = document.getElementById("shop");
    if (shop) renderShop(shop);
  
    let cartItemsContainer = document.getElementById("cart-items");
    if (cartItemsContainer) displayCartItems();
  });
  
  function renderShop(shop) {
    shop.innerHTML = shopItemsData.map(({ id, name, price, img }) => {
      let search = basket.find((x) => x.id === id) || {};
      return `
        <div class="item" id="product-id-${id}">
          <img width="220" src="${img}" alt="${name}" />
          <div class="details">
            <h3>${name}</h3>
            <div class="price">
              <h4>$ ${price}</h4>
              <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg">-</i>
                <div id="${id}" class="quantity">${search.item || 0}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg">+</i>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }
  
  function increment(id) {
    let selected = basket.find((x) => x.id === id);
    if (selected) {
      selected.item += 1;
    } else {
      basket.push({ id: id, item: 1 });
    }
  
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
  }
  
  function decrement(id) {
    let selected = basket.find((x) => x.id === id);
    if (!selected) return;
  
    selected.item -= 1;
    if (selected.item <= 0) {
      basket = basket.filter((x) => x.id !== id);
    }
  
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
  }
  
  function update(id) {
    let selected = basket.find((x) => x.id === id);
    if (document.getElementById(id)) {
      document.getElementById(id).innerText = selected?.item || 0;
    }
  
    updateCartIcon();
    displayCartItems();
  }
  
  function updateCartIcon() {
    let cartIcon = document.querySelector(".cartamount");
    if (cartIcon) {
      let total = basket.reduce((acc, x) => acc + x.item, 0);
      cartIcon.innerText = total;
    }
  }
  
  function displayCartItems() {
    let cartItemsContainer = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
  
    if (!cartItemsContainer || !cartTotal) return;
  
    if (basket.length === 0) {
      cartItemsContainer.innerHTML = "<h3>Your cart is empty</h3>";
      cartTotal.innerHTML = "";
      return;
    }
  
    cartItemsContainer.innerHTML = basket.map(({ id, item }) => {
      let product = shopItemsData.find((x) => x.id === id);
      return `
        <div class="cart-item">
          <img src="${product.img}" width="100" />
          <div>
            <h4>${product.name}</h4>
            <p>Price: $${product.price} × ${item} = $${item * product.price}</p>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg">-</i>
              <div id="${id}" class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg">+</i>
            </div>
          </div>
        </div>
      `;
    }).join("");
  
    let totalAmount = basket.reduce((acc, x) => {
      let product = shopItemsData.find((p) => p.id === x.id);
      return acc + product.price * x.item;
    }, 0);
  
    cartTotal.innerHTML = `
      <h3>Total: $${totalAmount}</h3>
      <button onclick="clearCart()">Clear Cart</button>
    `;
  }
  
  function clearCart() {
    basket = [];
    localStorage.setItem("data", JSON.stringify(basket));
    updateCartIcon();
    displayCartItems();
  }
  