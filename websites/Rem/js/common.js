'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// ========>> DEFAULT VARIABLES <<========

// ========>> Array.from POLYFILL <<========
/*eslint-disable*/
if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;
    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // Свойство length метода from равно 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Положим C равным значению this.
      var C = this;

      // 2. Положим items равным ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. Если mapfn равен undefined, положим mapping равным false.
      var mapFn = arguments[1];
      if (typeof mapFn !== 'undefined') {
        mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        // 5. иначе
        // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Положим lenValue равным Get(items, "length").
      // 11. Положим len равным ToLength(lenValue).
      var len = toLength(items.length);

      // 13. Если IsConstructor(C) равен true, то
      // 13. a. Положим A равным результату вызова внутреннего метода [[Construct]]
      //     объекта C со списком аргументов, содержащим единственный элемент len.
      // 14. a. Иначе, положим A равным ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Положим k равным 0.
      var k = 0;
      // 17. Пока k < len, будем повторять... (шаги с a по h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Положим putStatus равным Put(A, "length", len, true).
      A.length = len;
      // 20. Вернём A.
      return A;
    };
  }();
}
/*eslint-enable*/

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


  // ========>> FORM <<========

  var feedback = document.querySelector('.form-feedback');
  var feedbackSuccesMsg = document.querySelector('.feedback__succes');

  feedback.addEventListener('submit', function (e) {
    // const formThank = $('.form__thank', e.target);
    e.preventDefault();

    // feedbackSuccesMsg.classList.add('active');
    // feedbackSuccesMsg.classList.remove('hidden');
    // setTimeout(() => {
    //   feedbackSuccesMsg.classList.remove('active');
    //   setTimeout(() => {
    //     feedbackSuccesMsg.classList.add('hidden');
    //   }, 300);
    // }, 1400);

    var inputs = [];
    [].concat(_toConsumableArray(feedback.elements)).map(function (elem) {
      if (elem.type !== 'submit') inputs.push(elem);
    });

    var body = inputs.reduce(function (acc, elem) {
      if (typeof acc !== 'string') return acc.name + '=' + acc.value + '&' + elem.name + '=' + elem.value;
      return acc + '&' + elem.name + '=' + elem.value;
    });

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'mail.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('SUCCES Request');
          feedback.reset();
          feedbackSuccesMsg.classList.remove('hidden');
          feedbackSuccesMsg.classList.add('active');
          setTimeout(function () {
            feedbackSuccesMsg.classList.remove('active');
            setTimeout(function () {
              feedbackSuccesMsg.classList.add('hidden');
            }, 300);
          }, 1400);
        } else console.log('FAILED Request');
      }
    };
  });

  // end form


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