'use strict';

// ========>> FUNCTIONS <<========

// ========>> HOME CAROUSEL <<========

function homeCarousel() {
  if ($('.carousel__items').length) {
    $('.carousel__items').lightSlider({
      item: 1,
      loop: true,
      speed: 600
    });
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

  // ========>> MAIN NAV <<========

  var navList = document.querySelector('nav .nav__list');
  var navButton = document.querySelector('nav .nav__mob-button');
  var navOverlay = document.querySelector('nav .nav__overlay');

  // navList.classList.add('animate');
  // setTimeout(() => navList.classList.add('trs'), 0);

  function navToggle() {
    // open
    if (navList.classList.contains('animate')) {
      navOverlay.addEventListener('click', navToggle);
      navList.classList.toggle('animate');
      document.documentElement.classList.add('modal-open');

      navOverlay.classList.add('nav__overlay_visible');
      setTimeout(function () {
        navOverlay.classList.add('nav__overlay_animate');
      }, 10);
      // hide
    } else {
      navList.classList.toggle('animate');
      navOverlay.classList.remove('nav__overlay_animate');
      document.documentElement.classList.remove('modal-open');
      $('nav .nav__list-inner').slideUp();

      // fix fast double-click on overlay
      navOverlay.removeEventListener('click', navToggle);

      setTimeout(function () {
        return navOverlay.classList.remove('nav__overlay_visible');
      }, 300);
    }
  }
  navButton.onclick = navToggle;

  // end responsive main-nav

  // Nested nav
  if (window.matchMedia('(max-width: 991px)').matches) {
    var navListTitle = $('nav .nav__list-title');
    var navListInner = $('nav .nav__list-inner');

    navListTitle.click(function (event) {
      var currInnerList = $(this).siblings('.nav__list-inner');

      navListInner.not(currInnerList).stop().slideUp(200);
      currInnerList.stop().slideToggle(200);
    });
  }

  $(window).on('resize', function () {

    if ($(window).width() >= 768) {
      navList.classList.add('animate');
      navOverlay.classList.remove('nav__overlay_visible');
    }
  }).resize(); // end resize


  // ========>> FORMS <<========

  var formTrigger = $('.form-trigger');

  // PopUp
  var formPopupClose = $('.form-popup__close');
  var formPopupOverlay = $('.form-popup-wrap');

  formTrigger.click(function (event) {
    var currForm = this.getAttribute('data-form');

    $(document.documentElement).addClass('modal-open');
    $('#' + currForm).fadeIn(200);
  });

  formPopupOverlay.click(function (event) {
    if ($(event.target).hasClass('form-popup-wrap')) {
      $(document.documentElement).removeClass('modal-open');
      $(this).fadeOut(200);
    }
  });

  formPopupClose.click(function (event) {
    $(document.documentElement).removeClass('modal-open');
    $(this).closest('.form-popup-wrap').fadeOut(200);
  });

  // ========>> FUNCTIONS CALL <<========

  homeCarousel();
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();