'use strict';

// ========>> FUNCTIONS <<========

var certGallery = function certGallery() {
  var $items = $('.cert-items');

  if ($items.length) {
    $items.lightGallery({});
  }
};

var reviewsCarousel = function reviewsCarousel() {
  var $items = $('.reviews');

  if ($items.length) {
    $items.lightSlider({
      item: 2,
      loop: true,
      slideMargin: 30,
      controls: false,
      speed: 800,
      responsive: [{
        breakpoint: 991,
        settings: {
          item: 1
        }
      }],
      onSliderLoad: function onSliderLoad() {
        var maxHeight = 0;

        $items.children().each(function () {
          var h = $(this).outerHeight();
          if (h > maxHeight) maxHeight = h;
        });

        $items.height(maxHeight);
      }
    });
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

// ========>> DOCUMENT READY <<========

function documentReady() {

  // ========>> MAIN NAV <<========

  var navListWrap = document.querySelector("nav .nav__list");
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

      // fix fast double-click on overlay
      navOverlay.removeEventListener("click", navToggle);

      setTimeout(function () {
        return navOverlay.classList.remove("nav__overlay_visible");
      }, 300);
    }
  }

  $navButton.click(navToggle);

  $(window).on("resize", function () {

    if ($(window).width() >= 768) {
      navListWrap.classList.add("animate");
      navOverlay.classList.remove("nav__overlay_visible");
    }
  }).resize(); // end resize


  // ========>> FUNCTIONS CALL <<========

  // equalHeight(['.video-blog-item__card']);

  certGallery();
  reviewsCarousel();
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== "complete") setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();