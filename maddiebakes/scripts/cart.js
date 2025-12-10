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
    updateSubtotal();
}

// Listen globally for Add to Cart clicks from main.js cards
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('addCart')) {
        const card = event.target.closest('.recipe-card');

        const priceEl = card.querySelector(".price");
        const price = priceEl ? priceEl.innerText : "$0.00";
        const params = new URLSearchParams(window.location.search);
        const season = params.get('season') || "unknown";
        
        const item = {
            title: card.querySelector("h3").innerText,
            description: card.querySelector("p").innerText,
            image: card.querySelector("img").src,
            price: parseFloat(price.replace("$","")),
            season: season,
            qty: 1
        };

        console.log("Price FOund: " + price);
       
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
        updateSubtotal();
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
        updateSubtotal();
    }
})

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    localStorage.setItem("cartCounter", JSON.stringify(cartCount))
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.innerText = total;
}

function updateSubtotal() {
    const subtotalEl = document.querySelector(".subtotal-value");
    if (!subtotalEl) return;

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.qty;
    });

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}

// animate the add to cart button
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".addCart");
    if (!btn) return;

        btn.textContent = "✓ Added";
        btn.classList.add("added");

        setTimeout(() => {
            btn.textContent = "Add to Cart";
            btn.classList.remove("added");
        }, 1200);
});

function addToCart(item) {
    let exisiting = cart.find(cartItem => cartItem.title === item.title);

    if (exisiting) {
        exisiting.qty++;
    } else {
        cart.push(item);
    }

    saveCart();
    renderCartItems();
    updateSubtotal();
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
                <img src="${item.image}" alt="${item.title}">
            </div>

            <div class="name">${item.title}</div>

            <div class="totalPrice">$${(item.price * item.qty).toFixed(2)}</div>

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
 