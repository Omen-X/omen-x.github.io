"use strict";

// ========>> FUNCTIONS <<========

var initCarouselNav = function initCarouselNav(carousel) {
  var $wrap = carousel.closest(".carousel-wrap");

  if ($wrap.length) {
    var $prev = $(".prev", $wrap);
    var $next = $(".next", $wrap);

    $prev.click(carousel.goToPrevSlide);
    $next.click(carousel.goToNextSlide);
  }
};

var reviewsCarousel = function reviewsCarousel() {
  var $items = $(".reviews");

  if ($items.length) {
    $items.lightSlider({
      item: 2,
      loop: true,
      slideMargin: 5,
      controls: false,
      pager: false,
      speed: 800,
      responsive: [{
        breakpoint: 991,
        settings: {
          item: 1
        }
      }],
      onSliderLoad: function onSliderLoad() {
        initCarouselNav($items);

        var maxHeight = 0;

        $items.css({ height: "auto" });

        $items.children().each(function () {
          var h = $(this).outerHeight(true);
          if (h > maxHeight) maxHeight = h;
        });

        $items.height(maxHeight);
      }
    });
  }
};

var toTop = function toTop() {
  var $btn = $(".to-top");

  if ($btn.length) {
    $btn.click(function () {
      $("body, html").animate({
        scrollTop: 0
      }, 500);
    });
  }
};

var handleModals = function handleModals() {
  var $hideModalTrigger = $(".modal-form-close");

  if ($hideModalTrigger.length) {
    $hideModalTrigger.click(function () {
      var $currModal = $(this).closest(".modal");
      $currModal.modal("hide");
    });
  }
};

var documentsGallery = function documentsGallery() {
  var $gallery = $('.documents');

  if ($gallery.length) {
    $gallery.lightGallery({});
  }
};

var equalHeight = function equalHeight(selectors) {
  selectors.forEach(function (s) {
    var group = document.querySelectorAll(s);

    if (group.length) {
      var h = Array.prototype.map.call(group, function (x) {
        return $(x).height();
      }).sort().pop();

      $(group).each(function (i, e) {
        return $(e).height(h);
      });
    }
  });
};

var productCarousel = function productCarousel() {
  if ($('.product').length) {
    $('.product-carousel').lightSlider({
      gallery: true,
      item: 1,
      loop: true,
      thumbMargin: 15,
      thumbItem: 3,
      responsive: [{
        breakpoint: 767,
        settings: {
          thumbItem: 2
        }
      }]
    });
  }
};

var similarCarousel = function similarCarousel() {
  var $carousel = $('.similar-carousel');

  if ($carousel.length) {
    $carousel.lightSlider({
      item: 3,
      loop: true,
      slideMargin: 30,
      controls: false,
      pager: false,
      speed: 800,
      onSliderLoad: function onSliderLoad() {
        initCarouselNav($carousel);
      },

      responsive: [{
        breakpoint: 991,
        settings: {
          item: 2
        }
      }, {
        breakpoint: 767,
        settings: {
          item: 1
        }
      }]
    });
  }
};

var mobileNav = function mobileNav() {
  //
  $('.nav__list .nav__link').click(function (event) {
    event.preventDefault();

    var currNavListId = $(this).data('nav-list-id');

    $('.nav__list-inner').removeClass('visible');
    $("[data-nav-list-id=" + currNavListId + "]").addClass('visible');

    $('.my-nav').addClass('inner-list-visible');
  });

  $('.nav__back').click(function (event) {
    $('.my-nav').removeClass('inner-list-visible');
    $('.nav__list-inner').removeClass('visible');
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

// ========>> DOCUMENT READY <<========

function documentReady() {

  $('html > body').click(function (event) {
    $('.phone-contact').removeClass('phone-contact_visible-modal');
  });

  // ========>> MAIN NAV <<========

  var nav = document.querySelector('.my-nav');
  var $navTrigger = $('.nav__mob-button, .nav__close');

  function navToggle() {
    // hide
    if (nav.classList.contains('visible')) {
      document.documentElement.classList.remove('modal-open');
      $(nav).removeClass('inner-list-visible');
      $('.nav__list-inner').removeClass('visible');

      // open
    } else {
      document.documentElement.classList.add('modal-open');
    }

    nav.classList.toggle('visible');
  }

  $navTrigger.click(navToggle);

  $(window).on('resize', function () {
    if ($(window).width() <= 991) {
      mobileNav();
      phonesModal();
    }
  }).resize(); // end resize


  // ========>> FUNCTIONS CALL <<========

  // reviewsCarousel();
  // toTop();
  // handleModals();
  // documentsGallery();
  // similarCarousel();
  // productCarousel();
} // end document ready


// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== "complete") setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();