'use strict';

// ========>> FUNCTIONS <<========

function sideMenu() {
  if ($('.side-menu').length) {
    var navListWrap = document.querySelector('.side-menu');
    var $navButton = $('.side-menu-btn');
    var navOverlay = document.querySelector('.side-menu-overlay');
    var $close = $('.side-menu-close');

    var navToggle = function navToggle() {
      // open
      if (navListWrap.classList.contains('animate')) {
        navOverlay.addEventListener('click', navToggle);
        navListWrap.classList.toggle('animate');
        document.documentElement.classList.add('modal-open');

        navOverlay.classList.add('side-menu-overlay_visible');
        setTimeout(function () {
          navOverlay.classList.add('side-menu-overlay_animate');
        }, 10);
        // hide
      } else {
        navListWrap.classList.toggle('animate');
        navOverlay.classList.remove('side-menu-overlay_animate');
        document.documentElement.classList.remove('modal-open');

        // fix fast double-click on overlay
        navOverlay.removeEventListener('click', navToggle);

        setTimeout(function () {
          return navOverlay.classList.remove('side-menu-overlay_visible');
        }, 300);
      }
    };

    $navButton.click(navToggle);
    $close.click(navToggle);
  }
}

function carouselMain() {
  // Запускаем поле инициализации слайдеров
  setTimeout(function () {

    if ($('.slick-dots').length) {
      // Убираем навигацию на слайдере, если один элемент
      if ($('.slick-dots li').length < 2) $('.slick-dots').hide();
    }
  }, 0);
}

function welcomeCarousel() {
  if ($('.welcome-carousel').length) {
    $('.welcome-carousel').slick({
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 1000,
      arrows: true,
      dots: true,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>'
    });
  }
}

function reviewCarousel() {
  if ($('.review-carousel').length) {
    $('.review-carousel').slick({
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 1000,
      arrows: true,
      dots: true,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>'
    });
  }
}

function trainersCarousel() {
  if ($('.trainers-carousel').length) {
    $('.trainers-carousel').slick({
      slidesToShow: 3,
      centerMode: true,
      centerPadding: '-5px',
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 1000,
      arrows: true,
      dots: false,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>'
    });
  }
}

function eventsCarousel() {
  if ($('.events-carousel').length) {
    $('.events-carousel').slick({
      slidesToShow: 3,
      centerMode: true,
      centerPadding: '150px',
      speed: 1000,
      arrows: true,
      dots: false,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>'
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

  // ========>> FUNCTIONS CALL <<========

  sideMenu();
  carouselMain();
  welcomeCarousel();
  reviewCarousel();
  trainersCarousel();
  eventsCarousel();
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();