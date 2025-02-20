document.addEventListener('DOMContentLoaded', function () {
  // ======= DOM ELEMENTS =======
  const searchButton = document.querySelector('.navbar-right button:nth-child(1)');
  const userButton = document.querySelector('.navbar-right button:nth-child(2)');
  const cartButton = document.querySelector('.navbar-right button:nth-child(3)');

  const searchBarBox = document.querySelector('.search-bar-box');
  const searchBar = document.querySelector('.search-bar');
  const loginForm = document.querySelector('.login-form');
  const cartCard = document.querySelector('.cart-card');

  const loginCloseButton = document.querySelector('.login-form .btn-close');
  const cartCloseButton = document.querySelector('.cart-card .btn-close');

  // ======= SEARCH BAR TOGGLE =======
  searchButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent click from bubbling up to the document
    searchBarBox.classList.toggle('active');

    // Optionally focus the search input when opened
    if (searchBarBox.classList.contains('active')) {
      searchBar.focus();
    }

    // Close other panels
    loginForm.classList.remove('active');
    cartCard.classList.remove('active');
  });

  // Prevent clicks within the search bar box from closing it
  searchBarBox.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  // ======= LOGIN FORM TOGGLE =======
  userButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    loginForm.classList.toggle('active');

    // Close other panels
    searchBarBox.classList.remove('active');
    cartCard.classList.remove('active');
  });

  // ======= CART PANEL TOGGLE =======
  cartButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    cartCard.classList.toggle('active');

    // Close other panels
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
  });

  // ======= CLICK OUTSIDE TO CLOSE PANELS =======
  document.addEventListener('click', function (e) {
    // Close search bar if the click is outside the search area and icon
    if (!searchBarBox.contains(e.target) && !searchButton.contains(e.target)) {
      searchBarBox.classList.remove('active');
    }
    // Close login form if click is outside login form and user icon
    if (!loginForm.contains(e.target) && !userButton.contains(e.target)) {
      loginForm.classList.remove('active');
    }
    // Close cart panel if click is outside cart panel and cart icon
    if (!cartCard.contains(e.target) && !cartButton.contains(e.target)) {
      cartCard.classList.remove('active');
    }
  });

  // ======= RESPONSIVE ADJUSTMENTS (OPTIONAL) =======
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) {
      searchBarBox.classList.remove('active');
      loginForm.classList.remove('active');
      cartCard.classList.remove('active');
    }
  });
});
