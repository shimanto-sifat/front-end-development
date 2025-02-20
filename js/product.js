document.addEventListener('DOMContentLoaded', function () {
    /* ========= Select DOM Elements ========= */
    const searchButton = document.querySelector('.navbar-right button:nth-child(1)');
    const userButton   = document.querySelector('.navbar-right button:nth-child(2)');
    const cartButton   = document.querySelector('.navbar-right button:nth-child(3)');
  
    const searchBarBox = document.querySelector('.search-bar-box');
    const loginForm    = document.querySelector('.login-form');
    const cartCard     = document.querySelector('.cart-card');
  
    const loginCloseButton = document.querySelector('.login-form .btn-close');
    const cartCloseButton  = document.querySelector('.cart-card .btn-close');
  
    /* ========= Toggle Panels ========= */
    searchButton.addEventListener('click', function (e) {
      e.preventDefault();
      // Toggle search box; close others
      searchBarBox.classList.toggle('active');
      loginForm.classList.remove('active');
      cartCard.classList.remove('active');
    });
  
    userButton.addEventListener('click', function (e) {
      e.preventDefault();
      // Toggle login form; close others
      loginForm.classList.toggle('active');
      searchBarBox.classList.remove('active');
      cartCard.classList.remove('active');
    });
  
    cartButton.addEventListener('click', function (e) {
      e.preventDefault();
      // Toggle cart panel; close others
      cartCard.classList.toggle('active');
      searchBarBox.classList.remove('active');
      loginForm.classList.remove('active');
    });
  
    /* ========= Close Panels via Close Buttons ========= */
    loginCloseButton.addEventListener('click', function (e) {
      e.preventDefault();
      loginForm.classList.remove('active');
    });
  
    cartCloseButton.addEventListener('click', function (e) {
      e.preventDefault();
      cartCard.classList.remove('active');
    });
  
    /* ========= Close Panels When Clicking Outside ========= */
    document.addEventListener('click', function (e) {
      if (!searchBarBox.contains(e.target) && !searchButton.contains(e.target)) {
        searchBarBox.classList.remove('active');
      }
      if (!loginForm.contains(e.target) && !userButton.contains(e.target)) {
        loginForm.classList.remove('active');
      }
      if (!cartCard.contains(e.target) && !cartButton.contains(e.target)) {
        cartCard.classList.remove('active');
      }
    });
  
    /* ========= Initialize Swiper Slider ========= */
    if (document.querySelector('.product-slider')) {
      const swiper = new Swiper('.product-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        breakpoints: {
          // For tablets and smaller devices
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          }
        }
      });
    }
  
    /* ========= Optional: Add-to-Cart Functionality ========= */
    // This functionality assumes that product boxes have the class "box"
    // and that the add-to-cart button has the class "btn" within that box.
    const addToCartButtons = document.querySelectorAll('.box .btn');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        const productBox = button.closest('.box');
        if (!productBox) return;
        const productName = productBox.querySelector('h1').textContent;
        const productPrice = productBox.querySelector('.price').textContent;
        const productImage = productBox.querySelector('img').src;
  
        // Check if item already exists in the cart
        let cartItem = cartItemsContainer.querySelector(`.cart-item[data-name="${productName}"]`);
        if (cartItem) {
          const quantityElement = cartItem.querySelector('.quantity');
          quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
        } else {
          cartItem = document.createElement('li');
          cartItem.classList.add('cart-item');
          cartItem.setAttribute('data-name', productName);
          cartItem.innerHTML = `
            <img src="${productImage}" alt="${productName}">
            <div class="cart-item-details">
              <h4>${productName}</h4>
              <p>${productPrice}</p>
              <div class="quantity-controls">
                <button class="btn-decrease">-</button>
                <span class="quantity">1</span>
                <button class="btn-increase">+</button>
              </div>
            </div>
            <button class="btn-remove"><i class="fas fa-trash-alt"></i></button>
          `;
          cartItemsContainer.appendChild(cartItem);
  
          // Increase quantity event
          cartItem.querySelector('.btn-increase').addEventListener('click', function () {
            const quantityElement = cartItem.querySelector('.quantity');
            quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
            updateCartTotal();
          });
  
          // Decrease quantity event
          cartItem.querySelector('.btn-decrease').addEventListener('click', function () {
            const quantityElement = cartItem.querySelector('.quantity');
            if (parseInt(quantityElement.textContent) > 1) {
              quantityElement.textContent = parseInt(quantityElement.textContent) - 1;
              updateCartTotal();
            }
          });
  
          // Remove item event
          cartItem.querySelector('.btn-remove').addEventListener('click', function () {
            cartItem.remove();
            updateCartTotal();
          });
        }
        updateCartTotal();
      });
    });
  
    function updateCartTotal() {
      let total = 0;
      const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
      cartItems.forEach(item => {
        const priceText = item.querySelector('.cart-item-details p').textContent;
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        total += price * quantity;
      });
      cartTotal.textContent = `Total: £${total.toFixed(2)}`;
    }
  
    /* ========= Responsive Adjustments ========= */
    window.addEventListener('resize', function () {
      // Optional: Close open panels on window resize to enhance responsiveness
      if (window.innerWidth > 1024) {
        searchBarBox.classList.remove('active');
        loginForm.classList.remove('active');
        cartCard.classList.remove('active');
      }
    });
  });
  