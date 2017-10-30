'use strict';

// ========>> FUNCTIONS <<========

function welcomeScroll() {
  if ($('.welcome__scroll').length) {
    var $btn = $('.welcome__scroll');
    var $scrollTarget = $('.section.services');

    $btn.click(function () {
      $('html').animate({
        scrollTop: $scrollTarget.offset().top
      }, 700);
    });
  }
}

// ========>> DOCUMENT READY <<========

function documentReady() {
  // Loader
  function loader() {
    var loader = document.getElementById('loader');

    loader.classList.remove('active');
    setTimeout(function () {
      document.body.removeChild(loader);
    }, 300);
  }
  // loader();

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

  // Nested nav
  if (window.matchMedia('(max-width: 899px)').matches) {
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
  }).resize();

  // end main-nav

  // ========>> FUNCTIONS CALL <<========

  welcomeScroll();
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();