'use strict';

/*eslint-disable*/

// ========>> FUNCTIONS <<========

// ========>> WELCOME CAROUSEL <<========

function welcomeCarousel() {
  if ($('.welcome__carousel').length) {
    $('.welcome__carousel.owl-carousel').owlCarousel({
      items: 1,
      dotsSpeed: 1200,
      dots: true
    });
  }
}

// ========>> CATEGORIES <<========

function categoriesEqualHeight() {
  if ($('.category__info').length) {
    $('.category__info').matchHeight({
      byRow: false
    });
  }
}

// ========>> VIDEO <<========

function homeVideo() {
  if ($('#videostream').length) {
    $("#videostream").YTPlayer({
      autoplay: true,
      showControls: false
    });
  }
}

// ========>> GALLERY <<========

function gallery() {
  if ($('.gallery').length) {
    lightbox.option({
      'resizeDuration': 200,
      'disableScrolling': true,
      'wrapAround': true,
      albumLabel: ''
    });

    // Tabs

    var tabs = $('.gallery__tab');
    var tabLinks = $('.gallery__link');

    tabLinks.click(function (event) {
      var target = $(event.target);
      var currTab = target.attr('data-tab');

      tabLinks.removeClass('active');
      tabs.removeClass('active');

      target.addClass('active');
      $('.gallery__tab:nth-child(' + currTab + ')').addClass('active');
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

  // ========>> MAIN NAV <<========

  var navList = $('nav .nav__list'),
      navButton = $('nav .nav__mob-button'),
      navShade = $('nav .nav__overlay');

  navList.addClass('animate');
  setTimeout(function () {
    navList.addClass('trs');
  }, 0);

  function navToggle() {

    if (navList.hasClass('animate')) {
      $(navShade).on('click', navToggle);
      $(navList).toggleClass('animate');

      $(navShade).css('display', 'block');
      $(navShade).stop().animate({ opacity: '.7' }, 300);
    } else {
      $(navList).toggleClass('animate');
      $(navShade).stop().animate({ opacity: '0' }, 300);

      $(navShade).off('click', navToggle); // fix fast double-click

      setTimeout(function () {
        $(navShade).css('display', 'none');
      }, 300);
    }
  }

  $(navButton).on('click', navToggle);

  // ========>> FUNCTIONS CALL <<========


  welcomeCarousel();
  categoriesEqualHeight();
  homeVideo();
  gallery();

  $(window).on('resize', function () {

    // main nav
    if ($(window).width() >= 768) {
      $(navList).addClass('animate');
      $(navShade).css('display', '');
    }
  }).resize(); // end resize
}); // end document ready