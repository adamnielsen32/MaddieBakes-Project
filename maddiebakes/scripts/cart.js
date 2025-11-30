const cartIcon = document.querySelector('.cart-icon');
const closeCart = document.querySelector('.close');
const body = document.querySelector('body');
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const listCartItems = document.querySelector(".listCart");
const cartCount = document.querySelector(".cart-icon span");

cartIcon.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.querySelector(".cart-icon span");

  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function init() {
    renderCartItems();
    updateCartCount();
}

// Listen globally for Add to Cart clicks from main.js cards
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('addCart')) {
        const card = event.target.closest('.recipe-card');
        
        const item = {
            title: card.querySelector("h3").innerText,
            description: card.querySelector("p").innerText,
            image: card.querySelector("img").src,
            url: card.querySelector("a").href,
            qty: 1
        };
       
        addToCart(item);
    }
});

// Listen for + and - in the cart
listCartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains("plus")) {
        let i = event.target.dataset.index;
        cart[i].qty++;
        saveCart();
        renderCartItems();
    }

    if (event.target.classList.contains("minus")) {
        let i = event.target.dataset.index;

        if (cart[i].qty > 1) {
            cart[i].qty--;
        } else {
            cart.splice(i, 1);
        }

        saveCart();
        renderCartItems();
    }
})

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.innerText = total;
}

function addToCart(item) {
    let exisiting = cart.find(cartItem => cartItem.title === item.title);

    if (exisiting) {
        exisiting.qty++;
        inCart++;
    } else {
        cart.push(item);
    }

    saveCart();
    renderCartItems();
}

function renderCartItems() {
    listCartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("item");

        const cartTab = document.querySelector(".cartTab");
        cartTab.setAttribute("aria-hidden", false);
        cartTab.setAttribute("aria-label", "Cart tab open");

        div.innerHTML = `
            <div class="image">
                <img src="${item.image} alt="${item.title}">
            </div>

            <div class="name">${item.title}</div>

            <div class="totalPrice">$${item.price || 0}</div>

            <div class="quantity">
                <span class="minus" data-index="${index}">-</span>
                <span>${item.qty}</span>
                <span class="plus" data-index="${index}">+</span>
            </div>
        `;

        listCartItems.appendChild(div);
    });
}


init();
 