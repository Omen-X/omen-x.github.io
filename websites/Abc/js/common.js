'use strict';

// ========>> FUNCTIONS <<========

// ========>> HOME CAROUSEL <<========

var homeCarousel = function homeCarousel() {
  if ($('.home-carousel').length) {
    $('.home-carousel__items').slick({
      infinity: true,
      slidesToShow: 1,
      speed: 1400
    });
  }
};

// ========>> DOCUMENT READY <<========

function documentReady() {
  // Loader
  var loader = document.getElementById('loader');

  loader.classList.remove('active');
  setTimeout(function () {
    document.body.removeChild(loader);
  }, 300);

  // ========>> MAIN NAV <<========

  var navList = document.querySelector('nav .nav__list');
  var navButton = document.querySelector('.nav-mob-button');
  var navOverlay = document.querySelector('nav .nav__overlay');

  // navList.classList.add('animate');
  // setTimeout(() => navList.classList.add('trs'), 0);

  function navToggle() {
    if (navList.classList.contains('animate')) {
      $(document.documentElement).addClass('modal-open');
      navOverlay.addEventListener('click', navToggle);
      navList.classList.toggle('animate');

      navOverlay.classList.add('nav__overlay_visible');
      setTimeout(function () {
        navOverlay.classList.add('nav__overlay_animate');
      }, 10);
    } else {
      $(document.documentElement).removeClass('modal-open');
      navList.classList.toggle('animate');
      navOverlay.classList.remove('nav__overlay_animate');

      // fix fast double-click on overlay
      navOverlay.removeEventListener('click', navToggle);

      setTimeout(function () {
        return navOverlay.classList.remove('nav__overlay_visible');
      }, 300);
    }
  }
  navButton.onclick = navToggle;

  // end main-nav


  // ========>> FIXED HEADER <<========

  var headerTop = $('.header-top');

  if (window.pageYOffset > 0) headerTop.addClass('header-top_fixed');

  var fixedHeader = function fixedHeader(currentScrollTop) {
    if (currentScrollTop > 0) headerTop.addClass('header-top_fixed');else headerTop.removeClass('header-top_fixed');
  };

  // end fixed header


  // ========>> GLOBAL EVENTS <<========

  // Scroll

  var raf = window.requestAnimationFrame;
  var lastScrollTop = window.pageYOffset;

  var handleWindowScroll = function handleWindowScroll() {
    var currentScrollTop = window.pageYOffset;

    // skip calculations when the page doesn't scroll
    if (lastScrollTop === currentScrollTop) {
      raf(handleWindowScroll);
      return false;
    }
    lastScrollTop = currentScrollTop;

    // fixed header
    if (window.matchMedia('(min-width: 899px)').matches) fixedHeader(currentScrollTop);

    return raf(handleWindowScroll);
  };

  handleWindowScroll();

  // Resize

  $(window).on('resize', function () {
    if ($(window).width() >= 768) {
      navList.classList.add('animate');
      navOverlay.classList.remove('nav__overlay_visible');
    }
  }).resize(); // end resize


  // ========>> FUNCTIONS CALL <<========

  homeCarousel();
} // end document ready


// ========>> UTILS <<========

!function checkLoad() {
  // eslint-disable-line
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();