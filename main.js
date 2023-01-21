//Header on Scoll Color Change

let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

// Scroll RevealAnimation
const scrollReveal = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true
});

scrollReveal.reveal(".home-text.one", { delay: "500" });
scrollReveal.reveal(".home-img.one", { delay: "600" });
scrollReveal.reveal(".home-text.two", { origin: "left" }); //scrollreveal for headphone.html home section
scrollReveal.reveal(".home-img.two", { origin: "right" }); //scrollreveal for headphone.html home section
scrollReveal.reveal(".heading", { delay: "300" });
scrollReveal.reveal(".feature-details .box", { origin: "left", interval: 200 });
scrollReveal.reveal(".feature-img", { delay: 600 });
scrollReveal.reveal(
  ".shop-container .box, .footer .logo, .footer .footer-box",
  { interval: 100 }
);

// Note : For scroll reveal, delay makes it seem like its falling from the top
// While origin left makes the animation flow to left, and origin left makes the animation flow to right,
// Interval is used to set the speed of the animation, but interval alone can similar to delay to make elements flow out smoothly
// Use interval for multiple elements at once eg shop boxes, use delay for single elements eg headings and titles

//Menu
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
  cart_icon.classList.toggle("active"); // to toggle off cart icon
};

//Remove Menu
window.onscroll = () => {
  menu.classList.remove("bx-x"); //to toggle menu icon
  navbar.classList.remove("active");
};

//Cart
let cart_icon = document.querySelector(".cart-icon");
let cart = document.querySelector(".cart");
let close_cart = document.querySelector("#close-cart");

cart_icon.onclick = () => {
  // major_container.classList.toggle("cont-active"); //blurs other components when cart is clicked
  cart.classList.add("active");
  cart_icon.classList.add("active");
  menu.classList.add("active"); //to remove menu icon
};
close_cart.onclick = () => {
  // major_container.classList.remove("cont-active");
  cart.classList.remove("active");
  cart_icon.classList.remove("active");
  menu.classList.remove("active"); //to remove menu icon
};

//JS for cart

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making Function
function ready() {
  //Remove Items from cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //Quantity Change
  var quantityInputs = document.getElementsByClassName("cart-number");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Add to Cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  //Making Buy Button Work
  document
    .getElementsByClassName("buy-btn")[0]
    .addEventListener("click", buyButtonClicked);
}
//BUY BUTTON Function
function buyButtonClicked() {
  alert("Order Placed successfully");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

//Remove Items from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

//Quantity Changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}
// ADDING TO CART
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}
function addProductToCart(title, price, productImg) {
  //function adds items to cart
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.querySelector(".cart-content");
  var cartBoxes = cartItems.getElementsByClassName("cart-box");

  // This logs the title of the product to be added.
  // console.log("\ntitle of product to be added " + title + "\n***************");

  if (cartBoxes) {
    for (var i = 0; i < cartBoxes.length; i++) {
      var temp = cartBoxes[i]
        .getElementsByClassName("detail-box")[0]
        .querySelector(".cart-product-title").innerText;

      // This logs the title of products in the cart already.
      // console.log("Title of product " + (i + 1) + " in cart is " + temp);

      if (title.toLowerCase() == temp.toLowerCase()) {
        alert("item already added to cart");
        return;
      }
    }
  }

  var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-number">

    </div>
    <!--Remove Cart-->
    <i class="bx bxs-trash cart-remove"></i>
    `;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-number")[0]
    .addEventListener("change", quantityChanged);
}

//Updating Total
function updateTotal() {
  var cartcontent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartcontent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-number")[0];
    var price = parseFloat(priceElement.innerText.replace("$", "")); //replace dollar sign with empty space
    var quantity = quantityElement.value;
    total = total + price * quantity;
    //if price Contain some Cents Value
    total = Math.round(total * 100) / 100;
  }
  updateCartNumber = document.querySelector(".cart-icon span"); //to update number on cart-icon
  updateCartNumber.textContent = cartBoxes.length;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

//Swiper

var swiper = new Swiper(".home", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
