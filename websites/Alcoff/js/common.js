'use strict';

// ========>> FUNCTIONS <<========

var sidebar = document.querySelector('.sidebar');
var y = document.documentElement.scrollTop + sidebar.getBoundingClientRect().top;

function fixedSidebar() {
  if (document.documentElement.scrollTop > y) sidebar.classList.add('fixed');else sidebar.classList.remove('fixed');
}
if ($('.sidebar').length) fixedSidebar();

// ========>> DOCUMENT READY <<========

function documentReady() {

  // ========>> FUNCTIONS CALL <<========

  $(window).on('scroll', function () {
    if ($('.sidebar').length) fixedSidebar();
  });
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();