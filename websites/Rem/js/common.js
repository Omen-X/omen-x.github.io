'use strict';

// ========>> DEFAULT VARIABLES <<========
// Detect disabled JS

// Define touch devices

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;
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
// Define user agent
// Get IE or Edge browser version
var explorer = detectIE();
if (explorer) document.body.classList.add('ie');

// Svg polyfill, for external usage
svg4everybody(); // eslint-disable-line


// ========>> DOCUMENT READY <<========

var checkLoad = function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
};

checkLoad();

function documentReady() {
  // ========>> ANIMATION <<========

  // // Adding animation classes

  // const animClasses = [
  // '.select',
  // ];

  // animClasses.forEach((select) => {
  //   $(select).addClass('animate');
  // });

  // // fix transition effect after page reloading,
  // // transition adds after animation class,
  // // all transitions must be listed in this selector

  // setTimeout(() => {
  //   $('selector')
  //   .addClass('trs');
  // }, 0);


  // COPYRIGHT

  var copyrightDate = document.querySelector('.footer__copy p span');
  var today = new Date();

  copyrightDate.textContent = today.getFullYear();

  // end copyright


  // HEADER

  var header = document.querySelector('.header');
  var raf = window.requestAnimationFrame;

  function resizeHeader(currentScrollTop) {
    if (currentScrollTop > 0) header.classList.add('header_dense');else header.classList.remove('header_dense');
  }

  // end header


  // TO-TOP

  var toTop = document.getElementById('to-top');

  function scrollToTop() {
    var timer2 = setInterval(function () {
      var currentScrollTop = window.pageYOffset;
      if (currentScrollTop > 0) {
        if (currentScrollTop < 500) window.scrollTo(0, currentScrollTop - 25);else window.scrollTo(0, currentScrollTop - currentScrollTop / 13);
      } else clearInterval(timer2);
    }, 16);
  }

  toTop.onclick = scrollToTop;

  // shows button when window scroll > 100vh
  function showToTopBtn(currentScrollTop) {
    if (currentScrollTop > document.documentElement.clientHeight) toTop.classList.add('to-top_visible');else toTop.classList.remove('to-top_visible');
  }
  showToTopBtn();

  // end to-top


  // ========>> GLOBAL EVENTS <<========

  // Performance handling window scroll with requestAnimationFrame
  var lastScrollTop = window.pageYOffset;

  function handleWindowScroll() {
    // eslint-disable-line
    var currentScrollTop = window.pageYOffset;

    if (lastScrollTop === currentScrollTop) raf(handleWindowScroll);else {
      lastScrollTop = currentScrollTop;
      raf(handleWindowScroll);

      // resize header
      resizeHeader(currentScrollTop);
      // show to-top button
      showToTopBtn(currentScrollTop);
    }
  }

  if (raf) handleWindowScroll();
} // end document ready