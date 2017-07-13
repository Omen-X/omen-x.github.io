'use strict';

/*eslint-disable*/

// ========>> DEFAULT VARIABLES <<========

// Define touch devices
var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

// if (version === false) {
//   document.getElementById('result').innerHTML = '<s>IE/Edge</s>';
// } else if (version >= 12) {
//   document.getElementById('result').innerHTML = 'Edge ' + version;
// } else {
//   document.getElementById('result').innerHTML = 'IE ' + version;
// }

// // add details to debug result
// document.getElementById('details').innerHTML = window.navigator.userAgent;

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

// Get IE or Edge browser version
var isIe = detectIE();

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

  if (isIe) $(document.body).addClass('ie');

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