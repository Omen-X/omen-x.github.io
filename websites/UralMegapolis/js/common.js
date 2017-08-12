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

// ========>> TECHNOLOGY NAV <<========

function technologyNav() {
  if ($('.technology__nav').length) {
    var nav = $('.technology__nav');
    var navLinks = $('.technology__link');
    var tabs = $('[data-technology-nav]', '.technology');

    navLinks.click(function (event) {
      event.preventDefault();
      navLinks.removeClass('technology__link_active');

      var target = $(event.target);
      target.addClass('technology__link_active');

      var curr = target.attr('href');
      if (curr === '#') $('html, body').animate({ scrollTop: 0 }, 750);else {
        var scroll = $('[data-technology-nav="' + curr + '"]').offset().top - 30;
        $('html, body').animate({ scrollTop: scroll }, 750);
      }
    });
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
  technologyNav();

  // ========>> GLOBAL EVENTS <<========

  $(window).on('resize', function () {}).resize(); // end resize
}); // end document ready