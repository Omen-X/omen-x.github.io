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

// ========>> DOCUMENT READY <<========

function documentReady() {

  // ========>> MAIN NAV <<========

  var navListWrap = document.querySelector("nav .nav__list-wrap");
  var $navButton = $(".nav__mob-button");
  var navOverlay = document.querySelector("nav .nav__overlay");

  function navToggle() {
    // open
    if (navListWrap.classList.contains("animate")) {
      navOverlay.addEventListener("click", navToggle);
      navListWrap.classList.toggle("animate");
      document.documentElement.classList.add("modal-open");

      navOverlay.classList.add("nav__overlay_visible");
      setTimeout(function () {
        navOverlay.classList.add("nav__overlay_animate");
      }, 10);
      // hide
    } else {
      navListWrap.classList.toggle("animate");
      navOverlay.classList.remove("nav__overlay_animate");
      document.documentElement.classList.remove("modal-open");
      $("nav .nav__list-inner").slideUp();

      // fix fast double-click on overlay
      navOverlay.removeEventListener("click", navToggle);

      setTimeout(function () {
        return navOverlay.classList.remove("nav__overlay_visible");
      }, 300);
    }
  }

  $navButton.click(navToggle);

  // Nested nav
  if (window.matchMedia("(max-width: 991px)").matches) {
    var navListTitle = $("nav .nav__list-title");
    var navListInner = $("nav .nav__list-inner");

    navListTitle.click(function () {
      var currInnerList = $(this).siblings(".nav__list-inner");

      navListInner.not(currInnerList).stop().slideUp(200);
      currInnerList.stop().slideToggle(200);
    });
  }

  // end main-nav

  $(window).on("resize", function () {

    if ($(window).width() >= 992) {
      navListWrap.classList.add("animate");
      navOverlay.classList.remove("nav__overlay_visible");

      equalHeight(['.documents__img-wrap']);
    }
  }).resize(); // end resize

  // ========>> FUNCTIONS CALL <<========

  reviewsCarousel();
  toTop();
  handleModals();
  documentsGallery();
  similarCarousel();
  productCarousel();
} // end document ready


// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== "complete") setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();