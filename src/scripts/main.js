/* eslint-disable no-undef */
'use strict';

/* =========MENU============== */
const header = document.querySelector('.page__header');
const pageMenu = document.querySelector('.page__menu');
const body = document.body;

const toggleMenu = (event) => {
  const target = event.target;
  const menuBtnOpen = target.closest('.icon--menu');
  const menuBtnClose = target.closest('.icon--menu-close');

  const isClickInsideMenu = target.closest('.page__menu');
  const isMenuOpen = pageMenu.classList.contains('page__menu--open');
  const isLink = target.classList.contains('nav__link');

  const pageOffsetWidth = window.innerWidth;
  const pageClientWidth = document.documentElement.clientWidth;

  const scrollbarWidth = pageOffsetWidth - pageClientWidth;

  if (menuBtnOpen) {
    pageMenu.classList.add('page__menu--open');
    body.classList.add('page__body--hidden');

    body.style.marginRight = `${scrollbarWidth}px`;
    pageMenu.style.paddingRight = `${scrollbarWidth}px`;
    header.style.marginRight = `${scrollbarWidth}px`;

    document.querySelector('.page__overlay').style.display = 'block';
  }

  if (menuBtnClose || (isMenuOpen && !isClickInsideMenu) || isLink) {
    pageMenu.classList.remove('page__menu--open');
    body.classList.remove('page__body--hidden');

    body.style.marginRight = 0;
    pageMenu.style.paddingRight = 0;
    header.style.marginRight = 0;

    document.querySelector('.page__overlay').style.display = 'none';
  }
};

body.addEventListener('click', toggleMenu);

/* =========SWIPER============== */
const swiper = new Swiper('.gallery__swiper', {
  speed: 400,
  spaceBetween: 16,
  loop: true,
  loopAdditionalSlides: 2, // Add additional slides to loop to avoid duplicate slides

  // Configuration for the pagination component of the Swiper
  pagination: {
    el: '.swiper__pagination',
    clickable: true,
  },

  // Configuration for the navigation arrows of the Swiper
  navigation: {
    prevEl: '.swiper-button-prev', //
    nextEl: '.swiper-button-next', //
  },

  // Configuration for responsive design breakpoints
  breakpoints: {
    768: { // When the viewport width is 768 pixels or more
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});

// Define a function to toggle the Swiper functionality based on window width
const toggleSwiper = () => {
  const gallerySlides = document.querySelectorAll('.swiper__slide');
  
  const currentWidth = window.innerWidth;
  
  // Set the width threshold to determine when to toggle Swiper
  const targetWidth = 1280;

  // If the current window width is greater than or equal to the target width
  if (currentWidth >= targetWidth) {
    swiper.disable(); // Disable the Swiper

    // Add a class to each slide for desktop styling
    gallerySlides.forEach(slide => {
      slide.classList.add('swiper__slide--desktop');
    });
  } else {
    // If the window width is less than the target width, remove the desktop-specific class
    gallerySlides.forEach(slide => {
      slide.classList.remove('swiper__slide--desktop');
    });

    swiper.enable(); // Enable the Swiper
  }
};

// Attach the toggleSwiper function to the resize event of the window
// This ensures that the function runs every time the window size changes
window.addEventListener('resize', toggleSwiper);

// Attach the toggleSwiper function to the load event of the window
// This ensures that the function runs when the page is first loaded
window.addEventListener('load', toggleSwiper);

/* =========BUTTON TO TOP============== */
const topBtn = document.querySelector('.footer__btn-to-top');

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

topBtn.addEventListener('click', scrollToTop);
