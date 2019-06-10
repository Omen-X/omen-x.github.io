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

    var currMenuHeight = $('.nav__inner-wrap[data-nav-list-id=' + currNavListId + '] .nav__columns').outerHeight();
    $('.nav-list-wrap').css('min-height', currMenuHeight + 'px');

    $nav.addClass('inner-list-visible');
    $('.my-nav').scrollTop(0);
  });

  // back-button handler
  $('.nav__back').click(function (event) {
    $nav.removeClass('inner-list-visible');
    $innerListWrap.removeClass('visible');
    $('.nav-list-wrap').css('min-height', 'auto');
    $('.my-nav').scrollTop(0);
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
    $('.nav-list-wrap').css('min-height', 'auto');

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
    });

    $innerNavLink.hover(function () {
      $(this).closest('.nav__inner-wrap').find('.nav__list-img img').attr('src', $(this).data('image'));
    });
  }

  // end main nav


  // ========>> FIXED HEADER <<========

  $('.main').css('padding-top', $('.header').innerHeight());

  var header = $('header.header');

  if (window.pageYOffset > 0) header.addClass('fixed');

  var fixedHeader = function fixedHeader(currentScrollTop) {
    if (currentScrollTop > 0) header.addClass('fixed');else header.removeClass('fixed');
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
      // scroll up
    } else if (lastScrollTop > currentScrollTop) {
      header.addClass('visible-mobile-search');
      // scroll down
    } else if (lastScrollTop < currentScrollTop) {
      header.removeClass('visible-mobile-search');
    }

    // fixed header
    fixedHeader(currentScrollTop);

    lastScrollTop = currentScrollTop;
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