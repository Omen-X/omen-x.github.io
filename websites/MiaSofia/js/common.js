'use strict';

// ========>> FUNCTIONS <<========


var mobileNav = function mobileNav() {
  var $innerListWrap = $('.nav__inner-wrap');
  var $nav = $('.my-nav');

  // outer link handler
  $('.nav__list .nav__link[data-nav-list-id]').click(function (event) {
    event.preventDefault();

    var currNavListId = $(this).data('nav-list-id');

    $innerListWrap.removeClass('visible');
    $('.nav__inner-wrap[data-nav-list-id=' + currNavListId + ']').addClass('visible');

    $nav.addClass('inner-list-visible');
  });

  // back-button handler
  $('.nav__back').click(function (event) {
    $nav.removeClass('inner-list-visible');
    $innerListWrap.removeClass('visible');
  });
};

var phonesModal = function phonesModal() {
  if ($('.phone-contact').length) {
    $('.phone-contact').click(function (event) {
      $(this).toggleClass('phone-contact_visible-modal');
      event.stopPropagation();
    });

    $('.phone-contact__modal').click(function (event) {
      event.stopPropagation();
    });
  }
};

var searchModal = function searchModal() {
  if ($('.main-search__modal').length) {
    $('.main-search__btn').click(function (event) {
      event.stopPropagation();

      var $modal = $(this).siblings('.main-search__modal');

      $modal.toggleClass('visible');
      if ($modal.hasClass('visible')) $modal.find('.search-form__field').focus();
    });
  }
};

// ========>> DOCUMENT READY <<========

function documentReady() {

  $('html > body').click(function (event) {
    $('.phone-contact').removeClass('phone-contact_visible-modal');
    $('.main-search__modal').removeClass('visible');
  });

  // ========>> MAIN NAV <<========

  var nav = document.querySelector('.my-nav');
  var $navTrigger = $('.nav__mob-button, .nav__close');

  function navToggle() {
    // hide
    if (nav.classList.contains('visible')) {
      document.documentElement.classList.remove('modal-open');
      $(nav).removeClass('inner-list-visible');
      $('.nav__inner-wrap').removeClass('visible');

      // open
    } else {
      document.documentElement.classList.add('modal-open');
    }

    nav.classList.toggle('visible');
  }

  $navTrigger.click(navToggle);

  // Inner nav-list preview
  if ($(window).width() > 991) {
    var $outerNavLink = $('.nav__list > .nav__item > .nav__link');
    var $innerNavLink = $('.nav__list-inner .nav__link');

    $outerNavLink.hover(function () {
      var $innerWrap = $(this).siblings('.nav__inner-wrap');

      $innerWrap.find('.nav__list-img img').attr('src', $(this).data('image'));

      var availableWidth = $('.nav__list').outerWidth() - $(this).closest('.nav__item').position().left;
      var innerWrapWidth = $innerWrap.outerWidth();

      if (availableWidth < innerWrapWidth) $innerWrap.css({ left: 'auto', right: 0 });
    });

    $innerNavLink.hover(function () {
      $(this).closest('.nav__inner-wrap').find('.nav__list-img img').attr('src', $(this).data('image'));
    });
  }

  // end main nav


  // ========>> FIXED HEADER <<========

  $('.main').css('padding-top', $('.header').innerHeight());

  var headerTop = $('header.header');

  // if (window.matchMedia('(min-width: 992px)').matches) {
  if (window.pageYOffset > 0) headerTop.addClass('fixed');
  // }

  var fixedHeader = function fixedHeader(currentScrollTop) {
    if (currentScrollTop > 0) headerTop.addClass('fixed');else headerTop.removeClass('fixed');
  };

  // end fixed header


  // Scroll handler

  var raf = window.requestAnimationFrame;
  var lastScrollTop = window.pageYOffset;

  var handleWindowScroll = function handleWindowScroll() {
    var currentScrollTop = window.pageYOffset;

    // skip calculations when the page doesn't scroll
    if (lastScrollTop === currentScrollTop) {
      raf(handleWindowScroll);
      return false;
    }
    lastScrollTop = currentScrollTop;

    // fixed header
    // if (window.matchMedia('(min-width: 992px)').matches) {
    fixedHeader(currentScrollTop);
    // }

    return raf(handleWindowScroll);
  };

  handleWindowScroll();

  // end scroll handler

  $(window).on('resize', function () {
    if ($(window).width() <= 991) {
      mobileNav();
      phonesModal();
    } else {}
  }).resize(); // end resize


  // ========>> FUNCTIONS CALL <<========

  searchModal();
} // end document ready


// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== "complete") setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();