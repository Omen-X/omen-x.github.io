'use strict';

/*eslint-disable*/

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
      mute: true,
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

// ========>> ABOUT-DOCUMENTS <<========

function showAboutDocs() {
  if ($('.about').length) {
    var docTriggers = $('.about__right-list > li > span');
    var docItems = $('.about__right-list > li');
    var docSubLists = $('.about__right-sublist');

    docTriggers.click(function (event) {
      var currItem = $(event.target).closest('.about__right-list > li');

      if (currItem.hasClass('active')) {
        currItem.removeClass('active');
        currItem.find('.about__right-sublist').stop().slideUp(300);
      } else {
        docItems.removeClass('active');
        docSubLists.stop().slideUp(300);

        currItem.addClass('active');
        currItem.find('.about__right-sublist').stop().slideDown(300);
      }
    });
  }
}

// ========>> ARTICLES  <<========

function articles() {
  if ($('.articles').length) {

    // tabs

    var tabs = $('.articles__tab');
    var tabLinks = $('.articles__link');

    tabLinks.click(function (event) {
      var target = $(event.target);
      var currTab = target.attr('data-tab');

      tabLinks.removeClass('active');
      tabs.removeClass('active');

      target.addClass('active');
      $('.articles__tab:nth-child(' + currTab + ')').addClass('active');
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
      navShade.on('click', navToggle);
      navList.toggleClass('animate');

      navShade.css('display', 'block');
      navShade.stop().animate({ opacity: '.7' }, 300);
      $(document.documentElement).addClass('modal-open');
    } else {
      navList.toggleClass('animate');
      navShade.stop().animate({ opacity: '0' }, 300);
      $(document.documentElement).removeClass('modal-open');

      navShade.off('click', navToggle); // fix fast double-click

      setTimeout(function () {
        $(navShade).css('display', 'none');
      }, 300);
    }
  }

  $(navButton).on('click', navToggle);

  // ========>> FORM <<========

  var form = $('.form');
  var formTrigger = $('.form-trigger');
  var formClose = $('.form__close');
  var formWrap = $('.form-wrap');

  formWrap.on('click', function (event) {
    if ($(event.target).hasClass('form-wrap')) {
      formWrap.fadeOut(200);
      $(document.documentElement).removeClass('modal-open');
    }
  });

  formClose.on('click', function (event) {
    formWrap.fadeOut(200);
    $(document.documentElement).removeClass('modal-open');
  });

  formTrigger.on('click', function (event) {
    formWrap.fadeIn(200);
    $(document.documentElement).addClass('modal-open');
  });

  form.submit(function (event) {
    event.preventDefault();
    // $.ajax({
    //     url: 'mail.php',
    //     type: 'POST',
    //     data: $(this).serialize()
    //   })
    //   .done(function() {
    //     formFeedback.trigger('reset');
    //     formFeedback.fadeOut(200);
    //     formFeedbackThank.fadeIn(200);

    //     setTimeout(function() {
    //       formFeedbackThank.fadeOut(200);
    //     }, 1500);
    //   })
    //   .fail(function() {
    //     feedbackForm.trigger("reset");
    //     alert("Form submission error");
    // });
  });

  // ========>> FUNCTIONS CALL <<========


  welcomeCarousel();
  categoriesEqualHeight();
  homeVideo();
  gallery();
  showAboutDocs();
  articles();

  $(window).on('resize', function () {

    // main nav
    if ($(window).width() >= 768) {
      $(navList).addClass('animate');
      $(navShade).css('display', '');
    }
  }).resize(); // end resize
}); // end document ready