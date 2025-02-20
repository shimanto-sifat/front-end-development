document.addEventListener('DOMContentLoaded', function () {
    // ======= DOM ELEMENTS =======
    // Using nth-child to directly select buttons in the navbar
    const searchButton = document.querySelector('.navbar-right button:nth-child(1)');
    const userButton = document.querySelector('.navbar-right button:nth-child(2)');
    const cartButton = document.querySelector('.navbar-right button:nth-child(3)');
    const searchBarBox = document.querySelector('.search-bar-box');
    const searchBar = document.querySelector('.search-bar');
    const loginForm = document.querySelector('.login-form');
    const cartCard = document.querySelector('.cart-card');
    const loginCloseButton = document.querySelector('.login-form .btn-close');
    const cartCloseButton = document.querySelector('.cart-card .btn-close');
    const navbarRightButtons = document.querySelectorAll('.navbar-right .btn-outline-secondary');

    // ======= SEARCH BAR TOGGLE =======
    searchButton.addEventListener('click', function (e) {
      e.preventDefault();
      searchBarBox.classList.toggle('active');
      searchBar.classList.toggle('active');
      // Close other open components
      loginForm.classList.remove('active');
      cartCard.classList.remove('active');
    });

    navbarRightButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (searchBar.classList.contains('active')) {
                const recentInput = searchBar.value;
                searchBar.classList.remove('active');
                searchBarBox.classList.remove('active');
                searchBar.value = recentInput;
            }
        });
    });

    // ======= LOGIN FORM TOGGLE =======
    userButton.addEventListener('click', function (e) {
      e.preventDefault();
      loginForm.classList.toggle('active');
      // Close other open components
      searchBarBox.classList.remove('active');
      cartCard.classList.remove('active');
    });

    // ======= CART PANEL TOGGLE =======
    cartButton.addEventListener('click', function (e) {
      e.preventDefault();
      cartCard.classList.toggle('active');
      cartCard.style.transform = 'translateX(0)';
      // Close other open components
      searchBarBox.classList.remove('active');
      loginForm.classList.remove('active');
    });

    // ======= CLOSE BUTTONS =======
    loginCloseButton.addEventListener('click', function (e) {
      e.preventDefault();
      loginForm.classList.remove('active');
    });

    cartCloseButton.addEventListener('click', function (e) {
      e.preventDefault();
      cartCard.classList.remove('active');
      cartCard.style.transform = 'translateX(100%)';
    });

    // ======= OPTIONAL: Close any open component if clicked outside =======
    document.addEventListener('click', function (e) {
      // Check if click is outside the respective elements
      if (!searchBarBox.contains(e.target) && !searchButton.contains(e.target)) {
        searchBarBox.classList.remove('active');
        searchBar.classList.remove('active');
      }
      if (!loginForm.contains(e.target) && !userButton.contains(e.target)) {
        loginForm.classList.remove('active');
      }
      if (!cartCard.contains(e.target) && !cartButton.contains(e.target)) {
        cartCard.classList.remove('active');
      }
    });

    // ======= SWIPER RESPONSIVE SLIDER =======
    // Ensure that the element exists on the page
    if (document.querySelector('.product-slider')) {
      const swiper = new Swiper('.product-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        // Responsive breakpoints for different screen sizes
        breakpoints: {
          // For tablets and below (max width 768px)
          768: {
            slidesPerView: 1
          },
          // For small desktops (max width 1024px)
          1024: {
            slidesPerView: 2
          }
        }
      });
    }

    // ======= ADD-TO-CART FUNCTIONALITY =======
    // (Assumes that product buttons have a class "add-to-cart" and that product boxes use the class "box")
    const addToCartButtons = document.querySelectorAll('.btn.add-to-cart');
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

        // Check if item already exists in cart
        let cartItem = cartItemsContainer.querySelector(`.cart-item[data-name="${productName}"]`);
        if (cartItem) {
          const quantityElement = cartItem.querySelector('.quantity');
          quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
        } else {
          // Create a new cart item
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

    // Update the cart total based on items and quantities
    function updateCartTotal() {
      const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
      let total = 0;
      cartItems.forEach(item => {
        const priceText = item.querySelector('.cart-item-details p').textContent;
        // Remove any non-numeric characters (except dot and minus)
        const price = parseFloat(priceText.replace(/[^\d.-]/g, ''));
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        total += price * quantity;
      });
      cartTotal.textContent = `Total: ৳${total.toFixed(2)}`;
    }

    // ======= RESPONSIVE ADJUSTMENTS (OPTIONAL) =======
    // You can add any JS-based responsiveness if needed when the window resizes.
    window.addEventListener('resize', function () {
      // For example, close any open panels when resizing (if desired)
      if (window.innerWidth > 1024) {
        searchBarBox.classList.remove('active');
        loginForm.classList.remove('active');
        cartCard.classList.remove('active');
      }
    });
});
