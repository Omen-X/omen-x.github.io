'use strict';

// ========>> FUNCTIONS <<========

function welcomeCarousel() {
  if ($('.welcome-carousel').length) {
    $('.welcome-carousel').slick({
      // fade: true
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 1600
    });
  }
}

function portfolioCarousel() {
  if ($('.portfolio__items').length) {
    $('.portfolio__items').slick({
      slidesToShow: 3,
      arrows: true,
      dots: false,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>',
      responsive: [{
        breakpoint: 899,
        settings: {
          slidesToShow: 1
        }
      }]
    });
  }
}

function galleryCarousel() {
  if ($('.gallery-carousel').length) {
    $('.gallery-carousel').slick({
      slidesToShow: 8,
      arrows: true,
      dots: false,
      centerMode: true,
      centerPadding: '100px',
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>',
      responsive: [{
        breakpoint: 1600,
        settings: {
          slidesToShow: 6
        }
      }, {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4
        }
      }, {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }]
    });

    $('.gallery-carousel').lightGallery({
      selector: '.gallery-carousel__item',
      getCaptionFromTitleOrAlt: false,
      mode: 'lg-fade'
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

  var navListWrap = document.querySelector('nav .nav__list-wrap');
  var $navButton = $('.nav__mob-button');
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
  $navButton.click(navToggle);

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


  // ========>> FUNCTIONS CALL <<========

  welcomeCarousel();
  portfolioCarousel();
  galleryCarousel();
} // end document ready


// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();