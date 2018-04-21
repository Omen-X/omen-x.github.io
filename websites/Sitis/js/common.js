'use strict';

// ========>> FUNCTIONS <<========

var reviewsCarousel = function reviewsCarousel() {
  return $('.reviews-carousel').lightSlider({
    item: 3,
    slideMargin: 30,
    loop: true,
    pager: false,
    speed: 800,
    responsive: [{
      breakpoint: 991,
      settings: {
        item: 2
      }
    }, {
      breakpoint: 767,
      settings: {
        item: 1
      }
    }]
  });
};

var welcomeCarousel = function welcomeCarousel() {
  return $('.welcome-carousel').lightSlider({
    item: 1,
    slideMargin: 0,
    loop: true,
    controls: false,
    speed: 1000
  });
};

// ========>> LAZY LOADING FOR MAP <<========

function lazyLoadMap() {
  if ($('.map').length) {
    var mapFrame = $('.map iframe');
    var src = mapFrame.attr('data-src');
    mapFrame.attr('src', src);
  }
}

// ========>> DOCUMENT READY <<========

function documentReady() {
  // Loader
  var loader = document.getElementById('loader');

  loader.classList.remove('active');
  setTimeout(function () {
    document.body.removeChild(loader);
  }, 300);

  // Responsive main-nav

  var navList = document.querySelector('nav .nav__list');
  var navButton = document.querySelector('.nav__mob-button');
  var navOverlay = document.querySelector('nav .nav__overlay');

  // navList.classList.add('animate');
  // setTimeout(() => navList.classList.add('trs'), 0);

  function navToggle() {
    if (navList.classList.contains('animate')) {
      navOverlay.addEventListener('click', navToggle);
      navList.classList.toggle('animate');

      navOverlay.classList.add('nav__overlay_visible');
      setTimeout(function () {
        navOverlay.classList.add('nav__overlay_animate');
      }, 10);
    } else {
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

  // end responsive main-nav


  $(window).on('resize', function () {

    if ($(window).width() >= 768) {
      navList.classList.add('animate');
      navOverlay.classList.remove('nav__overlay_visible');
    }
  }).resize(); // end resize


  // ========>> FUNCTIONS CALL <<========

  reviewsCarousel();
  welcomeCarousel();
  lazyLoadMap();
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();