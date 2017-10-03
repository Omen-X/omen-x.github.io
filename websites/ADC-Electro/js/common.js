'use strict';

// ========>> FUNCTIONS <<========

// ========>> WELCOME CAROUSEL <<========

function welcomeCarousel() {
  if ($('.welcome-carousel').length) {
    $('.welcome-carousel #lightSlider').lightSlider({
      item: 1,
      loop: true,
      speed: 800
    });
  }
}

// ========>> CLIENTS CAROUSEL <<========

function clientsCarousel() {
  if ($('.clients-carousel').length) {
    var carousel = $('.clients-carousel #lightSlider').lightSlider({
      pager: false,
      controls: false,
      item: 5,
      loop: true,
      speed: 800,
      slideMargin: 30,
      responsive: [{
        breakpoint: 1199,
        settings: {
          item: 4
        }
      }, {
        breakpoint: 767,
        settings: {
          item: 3
        }
      }, {
        breakpoint: 568,
        settings: {
          item: 1
        }
      }]
    });

    // navigation

    var next = $('.clients-carousel__nav-btn_next');
    var prev = $('.clients-carousel__nav-btn_prev');

    next.click(function () {
      carousel.goToNextSlide();
    });

    prev.click(function () {
      carousel.goToPrevSlide();
    });
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

// ========>> CARD CAROUSEL <<========

var cardCarousel = function cardCarousel() {
  if ($('.card').length) {
    $('#light-slider').lightSlider({
      gallery: true,
      item: 1,
      controls: false,
      loop: true,
      thumbMargin: 15,
      thumbItem: 2
    });
  }
};

// ========>> COUNT-OPTIONS <<========

function countOptions() {
  if ($('.count-options').length) {
    var counterAdd = $('.count-options_add');
    var counterRemove = $('.count-options_remove');
    var counters = $('.count-options__value');
    var disabledClass = 'count-options__btn_disabled';

    // Handler for removeButton-status
    counters.on('changeValue', function (event) {
      var $counter = $(event.target);
      var value = parseInt($counter.val(), 10);

      if (value < 2) {
        $counter.siblings('.count-options_remove').addClass(disabledClass);
      } else {
        $counter.siblings('.count-options_remove').removeClass(disabledClass);
      }

      // fallback
      if (value < 0) $counter.val('1');
    });

    // Init

    // adds disabled class
    counters.each(function (i, counter) {
      $(counter).trigger('changeValue');
    });

    // Change value

    counterAdd.click(function (event) {
      var currCounter = $(event.target).siblings('.count-options__value');
      var currValue = parseInt(currCounter.val(), 10);

      currCounter.val(currValue + 1);
      currCounter.trigger('changeValue');
    });

    counterRemove.click(function (event) {
      var currCounter = $(event.target).siblings('.count-options__value');
      var currValue = parseInt(currCounter.val(), 10);

      if (currValue > 1) currCounter.val(currValue - 1);
      currCounter.trigger('changeValue');
    });
  }
}

// ========>> RADIO-OPTIONS <<========

function radioOptions() {
  if ($('.radio-options').length) {
    var option = $('.radio-option');
    var activeClass = 'radio-option_active';

    option.click(function (event) {
      $(event.target).siblings('.radio-option').removeClass(activeClass);
      $(event.target).addClass(activeClass);
    });
  }
}

// ========>> TOOLTIPS <<========

function tooltips() {
  if ($('.tooltip').length) {
    var tooltip = $('.tooltip');

    tooltip.each(function (i, elem) {
      var text = $(elem).attr('data-text');
      var textWrap = document.createElement('span');
      var targetRect = elem.getBoundingClientRect();

      textWrap.classList.add('tooltip__text');
      textWrap.textContent = text;

      elem.appendChild(textWrap);

      // revert positioning for mobile devices
      var tooltipTextWidth = textWrap.clientWidth;

      if (document.body.clientWidth - targetRect.right < tooltipTextWidth) {
        textWrap.classList.add('tooltip__text_pos_revert');
      }
    });

    // handler for mobile devices
    if ($(document.body).hasClass('touch')) {
      tooltip.click(function (event) {
        var textWrap = event.target.firstChild;

        event.stopPropagation();
        textWrap.classList.add('tooltip__text_visible');
      });
    }
  }
}

// ========>> TABS-NAV <<========

var tabsNav = function tabsNav() {
  if ($('.tabs').length) {
    var tabsLinks = $('.tabs__nav-item');
    var tabs = $('.tabs__item');
    var activeClass = 'tabs__item_active';

    tabsLinks.click(function () {
      var target = $(this);
      var currTabNum = target.prevAll().length + 1;

      tabsLinks.removeClass('tabs__nav-item_active');
      tabs.removeClass(activeClass);

      target.addClass('tabs__nav-item_active');
      target.closest('.tabs').find('.tabs__item:nth-child(' + currTabNum + ')').addClass(activeClass);
    });
  }
};

// ========>> PRODUCTS FILTER <<========

function productsFilter() {
  if ($('.filter').length) {
    var filterTitle = $('.filter-item__title');
    var activeClass = 'filter-item_opened';

    filterTitle.click(function (event) {
      var $target = $(event.target);
      var currFilter = $target.closest('.filter-item');

      currFilter.find('.filter-item__content').stop().slideToggle('200');
      currFilter.toggleClass(activeClass);
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

  var navList = document.querySelector('nav .nav__list');
  var navButton = document.querySelector('nav .nav__mob-button');
  var navOverlay = document.querySelector('nav .nav__overlay');

  // navList.classList.add('animate');
  // setTimeout(() => navList.classList.add('trs'), 0);

  function navToggle() {
    // open
    if (navList.classList.contains('animate')) {
      navOverlay.addEventListener('click', navToggle);
      navList.classList.toggle('animate');
      document.documentElement.classList.add('modal-open');

      navOverlay.classList.add('nav__overlay_visible');
      setTimeout(function () {
        navOverlay.classList.add('nav__overlay_animate');
      }, 10);
      // hide
    } else {
      navList.classList.toggle('animate');
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
  if (window.matchMedia('(max-width: 991px)').matches) {
    var navListTitle = $('nav .nav__list-title');
    var navListInner = $('nav .nav__list-inner');

    navListTitle.click(function (event) {
      var currInnerList = $(this).siblings('.nav__list-inner');

      navListInner.not(currInnerList).stop().slideUp(200);
      currInnerList.stop().slideToggle(200);
    });
  }

  // end responsive main-nav

  $(window).on('resize', function () {
    if ($(window).width() >= 768) {
      navList.classList.add('animate');
      navOverlay.classList.remove('nav__overlay_visible');
    }
  }).resize(); // end resize

  $(document.body).click(function () {
    // hide tooltips
    $('.tooltip__text').removeClass('tooltip__text_visible');
  });

  // ========>> FUNCTIONS CALL <<========

  welcomeCarousel();
  clientsCarousel();
  lazyLoadMap();
  cardCarousel();
  countOptions();
  radioOptions();
  tooltips();
  tabsNav();
  productsFilter();
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();