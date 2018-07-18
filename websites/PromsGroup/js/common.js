'use strict';

// ========>> FUNCTIONS <<========

var basketPopover = function basketPopover() {
  if ($('.basket-block__popover').length) {
    var $incBtn = $('.basket-block__counter-inc');
    var $decBtn = $('.basket-block__counter-dec');

    // Counter buttons
    $incBtn.click(function () {
      var $currCounter = $(this).siblings('.basket-block__counter-val').children('span');
      $currCounter.text(Number($currCounter.text()) + 1);
    });

    $decBtn.click(function () {
      var $currCounter = $(this).siblings('.basket-block__counter-val').children('span');

      var currVal = Number($currCounter.text());
      if (currVal === 1) return;

      $currCounter.text(Number($currCounter.text()) - 1);
    });

    // Remove button

    var $delBtn = $('.basket-block__item-delete');

    $delBtn.click(function () {
      $(this).closest('.basket-block__item').remove();
    });
  }
};

var welcomeCarousel = function welcomeCarousel() {
  if ($('.welcome-carousel').length) {
    var activeClass = 'welcome__nav-item_active';

    var slider = $('.welcome-carousel').lightSlider({
      item: 1,
      controls: false,
      loop: true,
      speed: 1000,
      mode: 'fade',
      auto: true,
      pauseOnHover: true,
      pause: 4000,
      pager: false,
      enableDrag: false,
      onBeforeNextSlide: function onBeforeNextSlide() {
        var $nextItem = $('.' + activeClass + ' + .welcome__nav-item');

        if ($nextItem.length === 0) $nextItem = $('.welcome__nav-item:first-child');

        $('.welcome__nav-item').removeClass(activeClass);
        $nextItem.addClass(activeClass);
      }
    });

    $('.welcome__nav-item').each(function (i, e) {
      $(e).click(function () {
        $('.welcome__nav-item').removeClass(activeClass);

        slider.goToSlide(i + 1);
        $(e).addClass(activeClass);
      });
    });
  }
};

var productCarousel = function productCarousel() {
  if ($('.product').length) {
    $('.product #light-slider').lightSlider({
      gallery: true,
      item: 1,
      loop: true,
      thumbMargin: 10,
      thumbItem: 3
    });
  }
};

var mainCounter = function mainCounter() {
  var $class = '.main-counter';

  if ($($class).length) {
    var $incBtn = $('.main-counter__inc');
    var $decBtn = $('.main-counter__dec');

    $incBtn.click(function () {
      var $currCounter = $(this).siblings('.main-counter__value').children('span');
      $currCounter.text(Number($currCounter.text()) + 1);
    });

    $decBtn.click(function () {
      var $currCounter = $(this).siblings('.main-counter__value').children('span');

      var currVal = Number($currCounter.text());
      if (currVal === 1) return;

      $currCounter.text(Number($currCounter.text()) - 1);
    });
  }
};

// ========>> DOCUMENT READY <<========

function documentReady() {

  // Не грузим карты на девайсах
  try {
    if ($(window).width() >= 768 && $('#map-scripts').length) {
      var scriptsBlock = document.querySelector('#map-scripts');
      var mapScript = document.createElement('script');
      var googleScript = document.createElement('script');

      mapScript.setAttribute('src', './js/map.min.js');
      googleScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDmGXFr7VFYNEMCgCKeW2ucF7q8RodUxYQ&language=ru&callback=initMap');
      googleScript.setAttribute('async', true);
      googleScript.setAttribute('defer', true);

      scriptsBlock.appendChild(mapScript);
      scriptsBlock.appendChild(googleScript);
    } else {
      $('.contact-block__map').hide();
    }
  } catch (e) {
    console.warn(e);
  }

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

      // fix fast double-click on overlay
      navOverlay.removeEventListener('click', navToggle);

      setTimeout(function () {
        return navOverlay.classList.remove('nav__overlay_visible');
      }, 300);
    }
  }

  $navButton.click(navToggle);

  $(window).on('resize', function () {

    if ($(window).width() >= 991) {
      navListWrap.classList.add('animate');
      navOverlay.classList.remove('nav__overlay_visible');
    }
  }).resize(); // end resize

  // ========>> FUNCTIONS CALL <<========

  basketPopover();
  welcomeCarousel();
  productCarousel();
  mainCounter();
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();