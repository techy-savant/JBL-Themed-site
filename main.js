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
  var removeCartButtons = document.querySelectorAll(".cart-remove");
  // console.log(removeCartButtons);
  removeCartButtons.forEach((removeBtn)=>{
    removeBtn.addEventListener("click", removeCartItem);
  });
 
  //Quantity Change
  var quantityInputs = document.querySelectorAll(".cart-number");
  quantityInputs.forEach((qInput)=>{
    qInput.addEventListener("change", quantityChanged);
  });
  
  //  Shop-Items cart button click Event
  var ItemButtons = document.querySelectorAll(".add-cart");
  ItemButtons.forEach((itemButton)=>{
    itemButton.addEventListener("click", CartClicked);
  });
  
  //Making Buy Button Work
  document.querySelector(".buy-btn").addEventListener("click", buyButtonClicked);
}
//BUY BUTTON Function
function buyButtonClicked() {
  alert("Order Placed successfully");
  var cartContent = document.querySelector(".cart-content");
  while (cartContent.hasChildNodes()) {
    //while there are cart elements, each one is removed till none remains, thereby clearing cart completely
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
function quantityChanged(e) {
  var input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}
//  Adding Item to Cart when cartbtn is clicked (function)
function CartClicked(e) {
  var button = e.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.querySelector(".product-title").innerText;
  var price = shopProducts.querySelector(".price").innerText;
  var productImg = shopProducts.querySelector(".product-img").src;
  addProductToCart(title, price, productImg);
  updateTotal();
}
function addProductToCart(title, price, productImg) {
  //function adds items to cart
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartContent = document.querySelector(".cart-content");
  var cartBoxes = cartContent.querySelectorAll(".cart-box");

  // This logs the title of the product to be added.
  // console.log("\ntitle of product to be added " + title + "\n***************");

 
  if (cartBoxes) {
    for (var i = 0; i < cartBoxes.length; i++) {
      var temp = cartBoxes[i].querySelector(".detail-box .cart-product-title").innerText;

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
  cartContent.append(cartShopBox);
  cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
  cartShopBox.querySelector(".cart-number").addEventListener("change", quantityChanged);
}

//Updating Total
function updateTotal() {
  var cartcontent = document.querySelector(".cart-content");
  var cartBoxes = cartcontent.querySelectorAll(".cart-box");
  var total = 0;
  cartBoxes.forEach((cartBox)=>{
    var priceElement = cartBox.querySelector(".cart-price");
    var quantityElement = cartBox.querySelector(".cart-number");
    var price = parseFloat(priceElement.innerText.replace("$", "")); //replace dollar sign with empty space
    var quantity = quantityElement.value;
    total = total + price * quantity;
    //if price Contain some Cents Value
    total = Math.round(total * 100) / 100;
  })

  updateCartNumber = document.querySelector(".cart-icon span"); //to update number on cart-icon
  updateCartNumber.textContent = cartBoxes.length;
  // console.log(updateCartNumber);
  document.querySelector(".total-price").innerText = "$" + total;
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
