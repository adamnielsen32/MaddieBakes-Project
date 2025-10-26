const cartIcon = document.querySelector('.cart-icon');
const closeCart = document.querySelector('.close');
const body = document.querySelector('body');
const listCartItems = document.querySelector('.listProduct');
const addBtn = document.querySelector('.addCart');

let listProducts = [];

cartIcon.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
addBtn.addEventListener('click', () => {
    console.log("button clicked");
})



const initApp = () => {
    fetch('data/recipes.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
    })
}

initApp();
