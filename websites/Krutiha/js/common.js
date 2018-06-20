"use strict";

// ========>> FUNCTIONS <<========

var cardCarousel = function cardCarousel() {
  if ($(".product").length) {
    $(".product #light-slider").lightSlider({
      gallery: true,
      item: 1,
      loop: true,
      thumbMargin: 30,
      thumbItem: 3
    });
  }
};

var certsGallery = function certsGallery() {
  if ($(".certs-gallery").length) {
    $(".certs-gallery").lightGallery({});
  }
};

var mainGallery = function mainGallery() {
  if ($(".gallery").length) {
    $(".gallery").lightGallery({});
  }
};

function lazyLoadMap() {
  if ($(".map").length) {
    var mapFrame = $(".map iframe");
    var src = mapFrame.attr("data-src");
    mapFrame.attr("src", src);
  }
}

var equalWidth = function equalWidth(selectors) {
  selectors.forEach(function (s) {
    var group = document.querySelectorAll(s);

    if (group.length) {
      var h = Array.prototype.map.call(group, function (x) {
        return $(x).width();
      }).sort().pop();

      $(group).each(function (i, e) {
        return $(e).width(h);
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

    if ($(window).width() >= 991) {
      navListWrap.classList.add("animate");
      navOverlay.classList.remove("nav__overlay_visible");
    }
  }).resize(); // end resize

  // ========>> FUNCTIONS CALL <<========

  // TODO
  lazyLoadMap();
  cardCarousel();
  equalWidth([]);
  certsGallery();
  mainGallery();
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== "complete") setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();