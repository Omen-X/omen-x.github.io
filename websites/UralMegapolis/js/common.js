'use strict';

// ========>> FUNCTIONS <<========


// ========>> WELCOME CAROUSEL <<========

function welcomeCarousel() {
  if ($('.welcome-carousel').length) {
    $('.welcome-carousel .owl-carousel').owlCarousel({
      items: 1,
      nav: true,
      navText: '',
      dots: false,
      navSpeed: 700,
      lazyLoad: true
    });
  }
}

// ========>> ADVANTAGES SECTION <<========

function advantagesSection() {
  if ($('.advantages').length) {
    $('.advantages__item-title').matchHeight();
  }
}

// ========>> PRICE SECTION <<========

function priceSection() {
  if ($('.price').length) {
    $('.price__item-img').matchHeight();
  }
}

// ========>> SET SECTION <<========

function setSection() {
  if ($('.set').length) {
    $('.set__item-img').matchHeight();
  }
}

// ========>> LAZY LOADING FOR MAP <<========

function lazyLoadMap() {
  if ($('.map').length) {
    var mapFrame = $('.map iframe');
    var src = mapFrame.attr('data-src');
    mapFrame.attr('src', src);
  }
}

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

  // ========>> FUNCTIONS CALL <<========

  welcomeCarousel();
  advantagesSection();
  setSection();
  priceSection();
  lazyLoadMap();

  // ========>> GLOBAL EVENTS <<========

  $(window).on('resize', function () {}).resize(); // end resize
}); // end document ready