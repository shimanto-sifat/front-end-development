document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.querySelector('.fa-search').parentElement;
    const searchBar = document.querySelector('.search-bar');
    const searchBarBox = document.querySelector('.search-bar-box');
    const navbarRightButtons = document.querySelectorAll('.navbar-right .btn-outline-secondary');

    searchButton.addEventListener('click', function () {
        searchBar.classList.toggle('active');
        searchBarBox.classList.toggle('active');
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

    const swiper = new Swiper('.product-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });

    const cartButton = document.querySelector('.fa-shopping-cart').parentElement;
    const cartCard = document.querySelector('.cart-card');
    const closeButton = document.querySelector('.cart-card .btn-close');
    const loginForm = document.querySelector('.login-form');

    cartButton.addEventListener('click', function () {
        cartCard.classList.add('active');
        cartCard.style.transform = 'translateX(0)';
        loginForm.classList.remove('active'); // Close login form if open
    });

    closeButton.addEventListener('click', function () {
        cartCard.classList.remove('active');
        cartCard.style.transform = 'translateX(100%)';
    });

    const userButton = document.querySelector('.fa-user').parentElement;

    userButton.addEventListener('click', function () {
        loginForm.classList.add('active');
        cartCard.classList.remove('active'); // Close cart if open
    });

    const loginCloseButton = document.querySelector('.login-form .btn-close');

    loginCloseButton.addEventListener('click', function () {
        loginForm.classList.remove('active');
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const productBox = button.closest('.box');
            const productName = productBox.querySelector('h1').textContent;
            const productPrice = productBox.querySelector('.price').textContent;
            const productImage = productBox.querySelector('img').src;

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

                // Increase quantity
                cartItem.querySelector('.btn-increase').addEventListener('click', function () {
                    const quantityElement = cartItem.querySelector('.quantity');
                    quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
                    updateCartTotal();
                });

                // Decrease quantity
                cartItem.querySelector('.btn-decrease').addEventListener('click', function () {
                    const quantityElement = cartItem.querySelector('.quantity');
                    if (parseInt(quantityElement.textContent) > 1) {
                        quantityElement.textContent = parseInt(quantityElement.textContent) - 1;
                        updateCartTotal();
                    }
                });

                // Remove item from cart
                cartItem.querySelector('.btn-remove').addEventListener('click', function () {
                    cartItem.remove();
                    updateCartTotal();
                });
            }
            updateCartTotal();
        });
    });

    function updateCartTotal() {
        const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
        let total = 0;
        cartItems.forEach(item => {
            const priceText = item.querySelector('.cart-item-details p').textContent;
            const price = parseFloat(priceText.replace(/[^\d.-]/g, ''));
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            total += price * quantity;
        });
        cartTotal.textContent = `Total: ৳${total.toFixed(2)}`;
    }

    // Hide cart when any navigation button is pressed
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            cartCard.classList.remove('active');
            cartCard.style.transform = 'translateX(100%)';
        });
    });
});
