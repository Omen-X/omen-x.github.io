"use strict";

// ========>> FUNCTIONS <<========

var certGallery = function certGallery() {
  var $items = $(".cert-items");

  if ($items.length) {
    $items.lightGallery({});
  }
};

var reviewsCarousel = function reviewsCarousel() {
  var $items = $(".reviews");

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

var productCarousel = function productCarousel() {
  if ($(".product").length) {
    $(".product #light-slider").lightSlider({
      gallery: true,
      item: 1,
      loop: true,
      thumbMargin: 30,
      thumbItem: 4,
      vertical: true,
      verticalHeight: 430,
      responsive: [{
        breakpoint: 991,
        settings: {
          thumbItem: 3,
          verticalHeight: 320
        }
      }, {
        breakpoint: 767,
        settings: {
          gallery: false,
          verticalHeight: 280
        }
      }, {
        breakpoint: 575,
        settings: {
          verticalHeight: 200,
          gallery: false
        }
      }]
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

var mainGallery = function mainGallery() {
  var $items = $(".gallery");

  if ($items.length) {
    $items.lightGallery({});
  }
};

var partnersReviewCarousel = function partnersReviewCarousel() {
  var $wrapper = $(".partners-reviews");

  if ($wrapper.length) {
    $wrapper.lightSlider({
      item: 3,
      loop: true,
      slideMargin: 30,
      controls: false,
      speed: 800,
      responsive: [{
        breakpoint: 767,
        settings: {
          item: 1
        }
      }],
      onSliderLoad: function onSliderLoad() {
        var maxHeight = 0;

        $wrapper.children().each(function () {
          var h = $(this).outerHeight();
          if (h > maxHeight) maxHeight = h;
        });

        $wrapper.height(maxHeight);
      }
    });

    $wrapper.lightGallery({});
  }
};

var loadMaps = function loadMaps() {
  var mapTabs = function mapTabs() {
    var $tabs = $(".maps__tabs");

    if ($tabs.length) {
      $tabs.children().each(function (i, e) {

        $(e).click(function () {
          var $this = $(this);

          if ($this.hasClass("active")) return;

          $this.siblings().removeClass("active");
          $this.addClass("active");

          $(".maps__items > *").removeClass("active");
          $(".maps__items > *:nth-child(" + (i + 1) + ")").addClass("active");
        });
      });
    }
  };

  try {
    if ($(window).width() >= 768 && $("#map-scripts").length) {
      var scriptsBlock = document.querySelector("#map-scripts");
      var mapScript = document.createElement("script");
      var googleScript = document.createElement("script");

      mapScript.setAttribute("src", "./js/map.min.js");
      googleScript.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyDmGXFr7VFYNEMCgCKeW2ucF7q8RodUxYQ&v=3.31&language=ru&libraries=places,geometry&callback=initMap");

      scriptsBlock.appendChild(mapScript);
      scriptsBlock.appendChild(googleScript);

      mapTabs();
    }
  } catch (e) {
    console.warn(e);
  }
};

var showContactsForPhones = function showContactsForPhones() {
  var $mobileContactsWrapper = $(".mobile-contacts");
  var $cards = $(".maps__item-card");
  console.log($cards);

  $mobileContactsWrapper.append($cards.each(function (i, e) {
    return e;
  }));
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
    } else {
      showContactsForPhones();
    }
  }).resize(); // end resize


  // ========>> FUNCTIONS CALL <<========

  // equalHeight(['.video-blog-item__card']);

  certGallery();
  reviewsCarousel();
  productCarousel();
  mainGallery();
  partnersReviewCarousel();
  loadMaps();
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== "complete") setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();