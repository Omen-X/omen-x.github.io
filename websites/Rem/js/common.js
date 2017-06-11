'use strict';

// ========>> DEFAULT VARIABLES <<========

// Define touch devices
var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
// For scrollinkg optimization
var didScroll = false;

// ========>> DOCUMENT READY <<========

$(function () {
  // Preloader
  $('#loader').fadeOut(200);
  setTimeout(function () {
    $('#loader').remove();
  }, 210);

  // Prevent dragging img
  $('img').on('dragstart', function (event) {
    return event.preventDefault();
  });

  // ========>> ANIMATION <<========

  // Adding animation classes

  var animClasses = ['.select'];

  animClasses.forEach(function (select) {
    $(select).addClass('animate');
  });

  // fix transition effect after page reloading,
  // transition adds after animation class,
  // all transitions must be listed in this selector

  setTimeout(function () {
    $('selector').addClass('trs');
  }, 0);

  // ========>> FUNCTIONS CALL <<========

  // MAIN-NAV

  var navList = $('nav .nav__list');
  var navButton = $('nav .nav__mob-button');
  var navShade = $('nav .nav__overlay');

  navList.addClass('animate');
  setTimeout(function () {
    navList.addClass('trs');
  }, 0);

  function navToggle() {
    if (navList.hasClass('animate')) {
      $(navShade).on('click', navToggle);
      $(navList).toggleClass('animate');

      $(navShade).css('display', 'block');
      $(navShade).stop().animate({ opacity: '.7' }, 300);
    } else {
      $(navList).toggleClass('animate');
      $(navShade).stop().animate({ opacity: '0' }, 300);

      $(navShade).off('click', navToggle); // fix fast double-click

      setTimeout(function () {
        $(navShade).css('display', 'none');
      }, 300);
    }
  }

  $(navButton).on('click', navToggle);

  // end main nav


  // COPYRIGHT

  var copyrightDate = document.querySelector('.footer__copy p span');
  var today = new Date();

  copyrightDate.textContent = today.getFullYear();

  // end copyright


  // HEADER

  var header = document.querySelector('.header');
  var raf = window.requestAnimationFrame;
  var lastScrollTop = window.scrollX;

  function resizeHeader(scrollTop) {
    if (scrollTop > 0) header.classList.add('header_dense');else header.classList.remove('header_dense');
  }

  function loop() {
    // eslint-disable-line
    var scrollTop = window.scrollY;

    if (lastScrollTop === scrollTop) {
      raf(loop);
    } else {
      lastScrollTop = scrollTop;
      resizeHeader(scrollTop);
      raf(loop);
    }
  }

  if (raf) loop();

  // end header


  // ========>> GLOBAL EVENTS <<========

  $(window).on('resize', function () {
    // MAIN NAV
    if ($(window).width() >= 768) {
      $(navList).addClass('animate');
      $(navShade).css('display', '');
    }
  }).resize(); // end resize
}); // end document ready


// ========>> DETECTING CLIENT CONFIG <<========

// Detect touch devices

if (isTouch) $(document.body).addClass('touch');else $(document.body).addClass('no-touch');

// Detect disabled JS

$(document.body).removeClass('no-js');

// ========>> UTILS <<========