"use strict";

// ========>> FUNCTIONS <<========

var basketPopover = function basketPopover() {
  if ($(".basket-block__popover").length) {}
};

// ========>> DOCUMENT READY <<========

function documentReady() {

  // ========>> FUNCTIONS CALL <<========

  basketPopover();
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== "complete") setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();