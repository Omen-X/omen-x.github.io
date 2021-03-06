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
    setTimeout(function () {
      $('.advantages__item-title').matchHeight();
    }, 0);
  }
}

// ========>> PRICE SECTION <<========

function priceSection() {
  if ($('.price').length) {
    setTimeout(function () {
      $('.price__item-img').matchHeight();
    }, 0);
  }
}

// ========>> SET SECTION <<========

function setSection() {
  if ($('.set').length) {
    setTimeout(function () {
      $('.set__item-img').matchHeight();
    }, 0);
  }
}

// ========>> LAZY LOADING FOR MAP <<========

function lazyLoadMap() {
  if ($('.map').length) {
    setTimeout(function () {
      var mapFrame = $('.map iframe');
      var src = mapFrame.attr('data-src');
      mapFrame.attr('src', src);
    }, 10000);
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
  // Prevent dragging img
  $('img').on('dragstart', function (event) {
    return event.preventDefault();
  });

  if ($(window).scrollTop() === 0) {
    setTimeout(function () {
      $('.lazy-img').removeClass('lazy-img');
      $('[data-img-src]').each(function (i, e) {
        $(e).attr('src', $(e).attr('data-img-src'));
      });
    }, 0);
  } else {
    $('.lazy-img').removeClass('lazy-img');
    $('[data-img-src]').each(function (i, e) {
      $(e).attr('src', $(e).attr('data-img-src'));
    });
  }

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