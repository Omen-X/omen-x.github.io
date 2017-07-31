'use strict';

// ========>> DEFAULT VARIABLES <<========

// Define touch devices
var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

// ========>> FUNCTIONS <<========


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

  // ========>> ANIMATION <<========

  // Adding animation classes

  var animClasses = ['.select'];

  animClasses.forEach(function (select) {
    $(select).addClass('animate');
  });

  // fix transition effect after page reloading,
  // transition adds after animation class,
  // all transitions must be listed in this selector

  setTimeout(function () {
    $('selector').addClass('trs');
  }, 0);

  // ========>> FUNCTIONS CALL <<========


  // ========>> GLOBAL EVENTS <<========

  $(window).on('resize', function () {}).resize(); // end resize
}); // end document ready


// ========>> DETECTING CLIENT CONFIG <<========

// Detect touch devices

if (isTouch) $(document.body).addClass('touch');else $(document.body).addClass('no-touch');

// Detect disabled JS

$(document.body).removeClass('no-js');

// ========>> UTILS <<========