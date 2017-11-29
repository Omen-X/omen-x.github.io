'use strict';

// ========>> WELCOME SLIDER <<========

function welcomeSlider() {
  if ($('.welcome-slider').length) {
    $('.welcome-slider').lightSlider({
      loop: true,
      item: 1,
      slideMove: 1,
      dots: true,
      arrows: false,
      pager: false,
      slideMargin: 0,
      // autoplay: true,
      autoplaySpeed: 5000,
      speed: 1100,
      cssEase: 'cubic-bezier(.38,.2,.25,.97)'
    });
  }
}

// ========>> GALLERY <<========

function mainGallery() {
  if ($('.gallery__items').length) {
    $('.gallery__items').lightSlider({
      loop: true,
      item: 6,
      slideMove: 2,
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [{
        breakpoint: 899,
        settings: {
          item: 3
        }
      }]
    });

    lightbox.option({
      resizeDuration: 400,
      fadeDuration: 400,
      showImageNumberLabel: false
    });
  }
}

// ========>> SCROLL TO TOP <<========

function scrollToTop() {
  var toTop = $('#to-top');

  toTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 550);
  });

  function showScroll() {
    if (window.pageYOffset > document.documentElement.clientHeight) {
      toTop.addClass('to-top_visible');
    } else {
      toTop.removeClass('to-top_visible');
    }
  }

  window.addEventListener('scroll', function () {
    showScroll();
  });

  showScroll();
}

// ========>> MAIN NAV <<========

var navList = $('nav .nav__list-wrap');
var navButton = $('nav .nav__mob-button, .nav-mob-button');
var navShade = $('nav .nav__shade');

function mainNavMenu() {
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
}
// ========>> DOCUMENT READY <<========

$(function () {

  // Preloader

  $('#loader').fadeOut(200);
  setTimeout(function () {
    $('#loader').remove();
  }, 210);

  // Min-height for page
  var heightDiffer = $('.footer').innerHeight() + $('.header').innerHeight();
  $('.main').css('min-height', 'calc(100vh - ' + heightDiffer + 'px)');

  // ========>> FUNCTION'S CALL <<========

  welcomeSlider();
  mainGallery();
  scrollToTop();
  mainNavMenu();

  // ========>> RESIZE <<========


  $(window).on('resize', function () {

    if ($(window).width() >= 768) {
      $(navList).addClass('animate');
      $(navShade).css('display', '');
    }
  }).resize(); // end resize
}); // end document ready