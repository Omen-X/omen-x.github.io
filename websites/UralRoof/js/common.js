'use strict';

// ========>> DOCUMENT READY <<========

function documentReady() {

  // ========>> MAIN NAV <<========

  var navListWrap = document.querySelector('nav .nav__list-wrap');
  var navButton = document.querySelector('.nav__mob-button');
  var navOverlay = document.querySelector('nav .nav__overlay');

  function navToggle() {
    // open
    if (navListWrap.classList.contains('animate')) {
      navOverlay.addEventListener('click', navToggle);
      navListWrap.classList.toggle('animate');
      document.documentElement.classList.add('modal-open');

      navOverlay.classList.add('nav__overlay_visible');
      setTimeout(function () {
        navOverlay.classList.add('nav__overlay_animate');
      }, 10);
      // hide
    } else {
      navListWrap.classList.toggle('animate');
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

    navListTitle.click(function () {
      var currInnerList = $(this).siblings('.nav__list-inner');

      navListInner.not(currInnerList).stop().slideUp(200);
      currInnerList.stop().slideToggle(200);
    });
  }

  // end main-nav


  // ========>> FORMS <<========

  var formWrap = document.querySelector('.form-wrap');

  document.body.addEventListener('click', function (event) {
    if (event.target.classList.contains('form-trigger')) {
      formWrap.classList.add('visible');
      document.documentElement.classList.add('modal-open');
    }
  });

  formWrap.addEventListener('click', function (event) {
    if (event.target.classList.contains('form-wrap') || event.target.classList.contains('form-main__close')) {
      formWrap.classList.remove('visible');
      document.documentElement.classList.remove('modal-open');
    }
  });

  // ========>> FUNCTIONS CALL <<========
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();