'use strict';

// ========>> FUNCTIONS <<========

function welcomeScroll() {
  if ($('.welcome__scroll').length) {
    var top = $('section.advantages').offset().top;

    $('.welcome__scroll-btn').click(function () {
      $('html, body').animate({
        scrollTop: '' + top
      }, 800);
    });
  }
}

function brandsCarousel() {
  if ($('.brands-carousel').length) {
    $('.brands-carousel__items').lightSlider({
      item: 7,
      pager: false,
      loop: true,
      controls: false,
      auto: true,
      speed: 800,
      pause: 4500,
      responsive: [{
        breakpoint: 899,
        settings: {
          item: 4
        }
      }, {
        breakpoint: 599,
        settings: {
          item: 3
        }
      }]
    });
  }
}

function feedbackTabs() {
  if ($('.feedback__nav').length) {
    var $link = $('.feedback__nav span');
    var $tabs = $('.feedback__tabs .feedback-tab');

    $link.click(function () {
      var $this = $(this);
      var currTab = $this.attr('data-tab-for');

      if ($this.hasClass('active')) return;

      $link.removeClass('active');
      $tabs.removeClass('active');

      $this.addClass('active');
      $('.feedback__tabs .feedback-tab[data-tab=' + currTab + ']').addClass('active');
    });
  }
}

// ========>> DOCUMENT READY <<========

function documentReady() {

  // ========>> MAIN NAV <<========

  var navListWrap = document.querySelector('nav .nav__list');
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

  // ========>> FUNCTIONS CALL <<========

  welcomeScroll();
  brandsCarousel();
  feedbackTabs();
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();