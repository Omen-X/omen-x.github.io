"use strict";

// ========>> FUNCTIONS <<========

var basketPopover = function basketPopover() {
  if ($(".basket-block__popover").length) {}
};

var welcomeCarousel = function welcomeCarousel() {
  if ($(".welcome-carousel").length) {
    var activeClass = "welcome__nav-item_active";

    var slider = $(".welcome-carousel").lightSlider({
      item: 1,
      controls: false,
      loop: true,
      speed: 1000,
      mode: 'fade',
      auto: true,
      pauseOnHover: true,
      pause: 4000,
      pager: false,
      onBeforeNextSlide: function onBeforeNextSlide() {
        var $nextItem = $("." + activeClass + " + .welcome__nav-item");

        if ($nextItem.length === 0) $nextItem = $('.welcome__nav-item:first-child');

        $('.welcome__nav-item').removeClass(activeClass);
        $nextItem.addClass(activeClass);
      }
    });

    $(".welcome__nav-item").each(function (i, e) {
      $(e).click(function () {
        $(".welcome__nav-item").removeClass(activeClass);

        slider.goToSlide(i + 1);
        $(e).addClass(activeClass);
      });
    });
  }
};

// ========>> DOCUMENT READY <<========

function documentReady() {

  // ========>> FUNCTIONS CALL <<========

  basketPopover();
  welcomeCarousel();
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== "complete") setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();