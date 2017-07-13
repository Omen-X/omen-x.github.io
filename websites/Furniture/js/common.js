'use strict';

// ========>> DEFAULT VARIABLES <<========

// Define touch devices
var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

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

  // ========>> POPUP FORM <<========

  var formTrigger = $('.form-trigger');
  var formPopup = $('.form-popup');

  formTrigger.click(function (event) {
    formPopup.fadeIn(250);
    $(document.documentElement).addClass('modal-open');
  });

  formPopup.click(function (event) {
    if ($(event.target).hasClass('form-popup')) formPopup.fadeOut(250);
    $(document.documentElement).removeClass('modal-open');
  });

  // ========>> SCROLL TO TOP BUTTON <<========

  var toTop = $('#to-top');

  function scrollToTop() {
    toTop.on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 550);
    });
  }

  function showScroll() {
    if (window.pageYOffset > document.documentElement.clientHeight) {
      toTop.addClass('to-top_visible');
    } else {
      toTop.removeClass('to-top_visible');
    }
  }
  showScroll();
  scrollToTop();

  // ========>> PRODUCTS <<========

  var productPopup = $('.product-popup');
  var productPopupTrigger = $('.product__more button');

  productPopupTrigger.click(function (event) {
    var currProduct = $(this).closest('.product').attr('data-product');
    console.log(currProduct);

    // $.ajax({
    //   url: '/path/to/file',
    //   type: 'default GET (Other values: POST)',
    //   dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    //   data: {param1: 'value1'},
    // })
    // .done(function() {
    //   console.log("success");
    // })
    // .fail(function() {
    //   console.log("error");
    // })
    // .always(function() {
    //   console.log("complete");
    // });


    productPopup.fadeIn(200);
    $(document.documentElement).addClass('modal-open');
  });

  productPopup.click(function (event) {
    if ($(event.target).hasClass('product-popup')) $(this).fadeOut(200);
    $(document.documentElement).removeClass('modal-open');
  });

  window.addEventListener('scroll', function (e) {
    showScroll();
  });
}); // end document ready