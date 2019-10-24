(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/dist/app"],{

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(slick_carousel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vendors_sticky_kit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vendors/sticky-kit */ "./src/js/vendors/sticky-kit.js");
/* harmony import */ var _vendors_sticky_kit__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vendors_sticky_kit__WEBPACK_IMPORTED_MODULE_2__);


 // IE CustomEvent polyfill

(function () {
  if (typeof window.CustomEvent === 'function') return false; //If not IE

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})(); // Mobile nav bar


var mainNav = function mainNav() {
  var nav = document.querySelector('.mob-nav');
  var navOverlay = document.querySelector('.mob-nav__overlay');
  var navTrigger = nav.querySelector('.mob-nav-trigger-wrap'); // Toggle sidebar

  function navToggle() {
    // hide
    if (nav.classList.contains('active')) {
      document.documentElement.classList.remove('modal-open'); // open
    } else {
      document.documentElement.classList.add('modal-open');
    }

    nav.classList.toggle('active');
  }

  navTrigger.addEventListener('click', navToggle);
  navOverlay.addEventListener('click', navToggle);
}; // Home carousel


var mainCarousel = function mainCarousel() {
  var $carousel = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.carousel-main');
  var padding = window.innerWidth * 0.240;

  if ($carousel.length) {
    $carousel.slick({
      centerMode: true,
      centerPadding: "".concat(padding, "px"),
      slidesToShow: 1,
      speed: 1000,
      // autoplay: true,
      autoplaySpeed: 5000,
      nextArrow: '<span class="slick-next"></span>',
      prevArrow: '<span class="slick-prev"></span>',
      responsive: [{
        breakpoint: 1367,
        settings: {
          centerPadding: "".concat(window.innerWidth * 0.138, "px")
        }
      }, {
        breakpoint: 993,
        settings: {
          centerMode: false,
          speed: 500
        }
      }]
    });
    $carousel.on('beforeChange', function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.carousel-main__img-wrap').removeClass('active');
    });
    $carousel.on('afterChange', function (event, slick, currentSlide) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.carousel-main__img-wrap').removeClass('active');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-slick-index=".concat(currentSlide, "]"), $carousel).find('.carousel-main__img-wrap').addClass('active');
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slick-slide').click(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prev('.slick-slide').hasClass('slick-current')) {
        $carousel.slick('slickNext');
      }

      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).next('.slick-slide').hasClass('slick-current')) {
        $carousel.slick('slickPrev');
      }
    });
  }
};

var formSearch = function formSearch() {
  var form = document.querySelector('.form-search');

  if (form) {
    var submit = form.querySelector('.form-search__submit');
    var input = form.querySelector('.form-search__input');
    var close = form.querySelector('.form-search__close'); // Compact search form

    if (window.innerWidth <= 1366) {
      submit.addEventListener('click', function (event) {
        if (form.classList.contains('active')) {} else {
          event.preventDefault();
          document.querySelector('.mob-nav').classList.remove('active');
          document.documentElement.classList.remove('modal-open');
          form.classList.add('active');
          input.focus();
        }
      });
      close.addEventListener('click', function () {
        form.classList.remove('active');
        input.value = '';
        input.blur();
      });
    }
  }
}; // Customized select input
// source: https://codepen.io/wallaceerick/pen/ctsCz


var customSelect = function customSelect() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.select-main').each(function () {
    var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
        numberOfOptions = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('option').length;
    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');
    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
    var $list = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<ul />', {
      'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
    }

    var $listItems = $list.children('li');
    $styledSelect.click(function (e) {
      e.stopPropagation();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.select-styled.active').not(this).each(function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('active').next('ul.select-options').hide();
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).toggleClass('active').next('ul.select-options').toggle();
    });
    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text()).removeClass('active');
      $this.val(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('rel'));
      $list.hide();
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
    });
  });
};

function customCounter() {
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.my-counter').length) {
    var $btnUp = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.my-counter__btn-up');
    var $btnDown = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.my-counter__btn-down');
    var disabledClass = 'my-counter__btn_disabled';
    $btnUp.click(function (event) {
      var $btn = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target);
      var $field = $btn.siblings('.my-counter__value');
      var value = +$field.val();
      $field.val(value + 1);
      if (value > 1) $btn.siblings('.my-counter__btn-down').removeClass(disabledClass);
    });
    $btnDown.click(function (event) {
      var $btn = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target);
      var $field = $btn.siblings('.my-counter__value');
      var value = +$field.val();

      if (value <= 1) {
        $btn.addClass(disabledClass);
        return;
      }

      $field.val(value - 1);
    });
  }
}

var modals = function modals() {
  var modals = document.querySelector('.modals');

  if (modals) {
    (function () {
      var wrap = document.querySelector('.modal-wrap');
      var triggers = document.getElementsByClassName('modal-trigger');
      var close = document.querySelector('.modal-close');

      for (var i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener('click', function (event) {
          // Prevent 'click' event on a product card
          event.stopPropagation();
          event.preventDefault();
          var trigger = event.target;
          var modalId = trigger.dataset.modalId;
          document.documentElement.classList.add('modal-open');
          wrap.classList.add('visible');
          document.getElementById("".concat(modalId)).classList.add('visible');
        });
      }

      var hideModal = function hideModal() {
        document.querySelector('.modal-wrap.visible').classList.remove('visible');
        wrap.classList.remove('visible');
        document.documentElement.classList.remove('modal-open');
      };

      wrap.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal-wrap')) {
          hideModal();
        }
      });
      close.addEventListener('click', hideModal);
    })();
  }
};

var catFilter = function catFilter() {
  var $catFilter = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cat-filter');

  if ($catFilter.length) {
    var $trigger = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cat-filter__trigger');
    $trigger.click(function () {
      var $currFilter = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('.cat-filter');
      $currFilter.toggleClass('active');
      var isFiltersActive = $currFilter.hasClass('active');

      if ($currFilter.hasClass('cat-filter_cat')) {
        localStorage.setItem('catFilterStatus', isFiltersActive);
      } else if ($currFilter.hasClass('cat-filter_filter')) {
        localStorage.setItem('filterFilterStatus', isFiltersActive);
      }
    });

    if (window.innerWidth <= 576) {
      $catFilter.removeClass('active');
    } //


    var catFilterStatus = localStorage.getItem('catFilterStatus');
    var filterFilterStatus = localStorage.getItem('filterFilterStatus');

    if (catFilterStatus !== null) {
      if (catFilterStatus === 'true') jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cat-filter_cat').addClass('active');else jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cat-filter_cat').removeClass('active');
    }

    if (filterFilterStatus !== null) {
      if (filterFilterStatus === 'true') jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cat-filter_filter').addClass('active');else jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cat-filter_filter').removeClass('active');
    }
  }
}; // Lazy


var lazyLoad = function lazyLoad() {
  var lazyImg = document.querySelectorAll('[data-lazy-img-src]');

  for (var i = 0; i < lazyImg.length; i++) {
    var img = new Image();
    img.src = lazyImg[i].dataset.lazyImgSrc;
  }
};

var mobileCart = function mobileCart() {
  // Modal cart
  var formCart = document.querySelector('.form-cart');

  if (window.innerWidth <= 768 && formCart && !formCart.classList.contains('mobile-layout')) {
    var cartDesc = formCart.querySelector('.cart-desc');
    var addToCart = cartDesc.removeChild(cartDesc.querySelector('.form-cart__submit'));
    var cartCounter = cartDesc.removeChild(cartDesc.querySelector('.cart-counter'));
    var cartLink = cartDesc.removeChild(cartDesc.querySelector('.cart-desc__link'));
    formCart.appendChild(cartLink);
    formCart.appendChild(cartCounter);
    formCart.appendChild(addToCart);
    formCart.classList.add('mobile-layout');
  } else if (window.innerWidth > 768 && formCart && formCart.classList.contains('mobile-layout')) {
    var _cartDesc = formCart.querySelector('.cart-desc');

    var _addToCart = formCart.removeChild(formCart.querySelector('.form-cart__submit'));

    var _cartCounter = formCart.removeChild(formCart.querySelector('.cart-counter'));

    var _cartLink = formCart.removeChild(formCart.querySelector('.cart-desc__link'));

    _cartDesc.appendChild(_cartCounter);

    _cartDesc.appendChild(_cartLink);

    _cartDesc.appendChild(_addToCart);

    formCart.classList.remove('mobile-layout');
  } // Product cart


  var productWrap = document.querySelector('.product-wrap');

  if (window.innerWidth <= 768 && productWrap && !productWrap.classList.contains('mobile-layout')) {
    var productDesc = productWrap.querySelector('.product__content').removeChild(productWrap.querySelector('.product__desc'));
    productWrap.appendChild(productDesc);
    productDesc.classList.add('visible');
    productWrap.classList.add('mobile-layout');
  } else if (window.innerWidth > 768 && productWrap && productWrap.classList.contains('mobile-layout')) {
    var _productDesc = productWrap.removeChild(productWrap.querySelector('.product__desc'));

    document.querySelector('.product__content').appendChild(_productDesc);

    _productDesc.classList.add('visible');

    productWrap.classList.remove('mobile-layout');
  }
};

var cart = function cart() {
  var $cart = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cart');

  if ($cart.length) {
    var $close = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cart-product__close', $cart);
    $close.click(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('.cart__product').slideUp(200);
    });
    var $submit = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cart__submit');
    $submit.click(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.checkout').removeClass('hidden');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.documentElement).animate({
        scrollTop: $cart.offset().top + $cart.height() - 30
      }, 900);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cart__discount-submit').click(function () {
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          content: '<p>Your coupon is applied</p>'
        }
      }));
    });
  }
};

var toCart = function toCart() {
  var $toCartBtn = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.to-cart');

  if ($toCartBtn.length) {
    $toCartBtn.click(function (event) {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('active')) {} else {
        event.preventDefault();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('active');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text('GO TO CART');
      }
    });
  }
};

var catNav = function catNav() {
  var catNavWrap = document.querySelector('.categories-nav-wrap');

  if (catNavWrap) {
    var _catNav = document.querySelector('.categories-nav'); // If there are scrollable content


    if (_catNav.clientWidth < _catNav.scrollWidth) {
      // Show most right breadcrumb
      if (_catNav.classList.contains('categories-nav_breadcrumbs')) {
        _catNav.scrollLeft = _catNav.scrollWidth - _catNav.clientWidth;
      } // 'wheel'-scroll only on 'non-touch' devices


      if (document.body.classList.contains('no-touch')) {
        var scrollHorizontally = function scrollHorizontally(e) {
          e = window.event || e;
          var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
          _catNav.scrollLeft -= delta * 40;
          e.preventDefault();
        }; // IE9, Chrome, Safari, Opera


        _catNav.addEventListener('mousewheel', scrollHorizontally, false); // Firefox


        _catNav.addEventListener('DOMMouseScroll', scrollHorizontally, false);
      }
    }
  }
};

var ellipsizeText = function ellipsizeText(selector) {
  var elements = document.querySelectorAll(selector);

  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var wordArray = el.innerHTML.split(' ');

    while (el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.innerHTML = wordArray.join(' ') + '...';
    }
  }
};

var cardPage = function cardPage() {
  var productWrap = document.querySelector('.product-wrap');

  if (productWrap) {
    // Sticky blocks
    if (window.innerWidth > 1366) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.product-counter, .cart-options', jquery__WEBPACK_IMPORTED_MODULE_0___default()(productWrap)).stick_in_parent({
        recalc_every: 1,
        offset_top: 80,
        parent: '.product-wrap'
      });
    }

    if (window.innerWidth > 768 && window.innerWidth <= 1366) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.product-counter, .cart-options', jquery__WEBPACK_IMPORTED_MODULE_0___default()(productWrap)).trigger('sticky_kit:detach');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.product-aside-wrap').stick_in_parent({
        recalc_every: 1,
        offset_top: 80
      });
    }

    if (window.innerWidth <= 768) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.product-counter, .cart-options', jquery__WEBPACK_IMPORTED_MODULE_0___default()(productWrap)).trigger('sticky_kit:detach');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.product-aside-wrap').trigger('sticky_kit:detach');
    } //


    if (window.innerWidth <= 768) {
      document.body.style.paddingBottom = productWrap.querySelector('.product-counter').clientHeight + 'px';
    } else {
      document.body.style.paddingBottom = 0;
    }
  }
};

var notificationTimer;

var showNotification = function showNotification(content) {
  var el = document.querySelector('.notification');

  if (el) {
    var contentBlock = el.querySelector('.notification__text');

    if (el.classList.contains('active')) {
      clearTimeout(notificationTimer);
      el.classList.remove('active');
      notificationTimer = setTimeout(function () {
        showNotification(content);
      }, 500);
    } else {
      contentBlock.innerHTML = content;
      el.classList.add('active');
      notificationTimer = setTimeout(function () {
        el.classList.remove('active');
      }, 3000);
    }
  }
};

function documentReady() {
  var header = document.querySelector('.header'); // Optimized scroll handler

  var raf = window.requestAnimationFrame;
  var lastScrollTop = window.pageYOffset;

  var handleWindowScroll = function handleWindowScroll() {
    var currentScrollTop = window.pageYOffset;

    if (lastScrollTop === currentScrollTop) {
      raf(handleWindowScroll);
      return false; // scroll up
    }

    if (lastScrollTop > currentScrollTop) {
      if (window.innerWidth > 768 && window.scrollY === 0) header.classList.remove('fixed');else header.classList.add('fixed'); // scroll down
    } else if (lastScrollTop < currentScrollTop) {
      if (window.innerWidth > 768 && window.scrollY > 0) header.classList.add('fixed');
    }

    lastScrollTop = currentScrollTop;
    return raf(handleWindowScroll);
  };

  handleWindowScroll(); //

  window.addEventListener('showNotification', function (event) {
    showNotification(event.detail.content);
  }); //

  window.addEventListener('resize', function () {
    // Redraw the carousel 'onResize'
    var $carousel = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.carousel-main');

    if ($carousel.length) {
      $carousel.slick('unslick');
      setTimeout(function () {
        mainCarousel();
      }, 0);
    } //


    cart();
    cardPage();
    mobileCart();
    catNav(); //

    var $cartPrice = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cart__price-wrap');

    if ($cartPrice.length) {
      if (window.innerWidth > 768) {
        $cartPrice.stick_in_parent({
          recalc_every: 1,
          offset_top: 80
        });
      } else {
        $cartPrice.trigger('sticky_kit:detach');
      }
    } //

  }); //
  //

  mainNav();
  mainCarousel();
  formSearch();
  customSelect();
  customCounter();
  modals();
  catFilter();
  mobileCart();
  cart();
  toCart();
  ellipsizeText('.card__desc');
  lazyLoad();
  catNav();
  cardPage();
  document.body.classList.add('js-loaded');
} // eslint-disable-next-line no-unused-expressions


!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();

/***/ }),

/***/ "./src/js/vendors/sticky-kit.js":
/*!**************************************!*\
  !*** ./src/js/vendors/sticky-kit.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Generated by CoffeeScript 1.6.2

/**
 @license Sticky-kit v1.1.3 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
 */
(function (factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  var win;
  win = $(window);

  $.fn.stick_in_parent = function (opts) {
    var doc, elm, enable_bottoming, inner_scrolling, manual_spacer, offset_top, outer_width, parent_selector, recalc_every, sticky_class, _fn, _i, _len;

    if (opts == null) {
      opts = {};
    }

    sticky_class = opts.sticky_class, inner_scrolling = opts.inner_scrolling, recalc_every = opts.recalc_every, parent_selector = opts.parent, offset_top = opts.offset_top, manual_spacer = opts.spacer, enable_bottoming = opts.bottoming;

    if (offset_top == null) {
      offset_top = 0;
    }

    if (parent_selector == null) {
      parent_selector = void 0;
    }

    if (inner_scrolling == null) {
      inner_scrolling = true;
    }

    if (sticky_class == null) {
      sticky_class = "is_stuck";
    }

    doc = $(document);

    if (enable_bottoming == null) {
      enable_bottoming = true;
    }

    outer_width = function outer_width(el) {
      var computed, w, _el;

      if (window.getComputedStyle) {
        _el = el[0];
        computed = window.getComputedStyle(el[0]);
        w = parseFloat(computed.getPropertyValue("width")) + parseFloat(computed.getPropertyValue("margin-left")) + parseFloat(computed.getPropertyValue("margin-right"));

        if (computed.getPropertyValue("box-sizing") !== "border-box") {
          w += parseFloat(computed.getPropertyValue("border-left-width")) + parseFloat(computed.getPropertyValue("border-right-width")) + parseFloat(computed.getPropertyValue("padding-left")) + parseFloat(computed.getPropertyValue("padding-right"));
        }

        return w;
      } else {
        return el.outerWidth(true);
      }
    };

    _fn = function _fn(elm, padding_bottom, parent_top, parent_height, top, height, el_float, detached) {
      var bottomed, _detach, fixed, last_pos, last_scroll_height, offset, parent, recalc, recalc_and_tick, recalc_counter, spacer, tick;

      if (elm.data("sticky_kit")) {
        return;
      }

      elm.data("sticky_kit", true);
      last_scroll_height = doc.height();
      parent = elm.parent();

      if (parent_selector != null) {
        parent = parent.closest(parent_selector);
      }

      if (!parent.length) {
        throw "failed to find stick parent";
      }

      fixed = false;
      bottomed = false;
      spacer = manual_spacer != null ? manual_spacer && elm.closest(manual_spacer) : $("<div />");

      if (spacer) {
        spacer.css('position', elm.css('position'));
      }

      recalc = function recalc() {
        var border_top, padding_top, restore;

        if (detached) {
          return;
        }

        last_scroll_height = doc.height();
        border_top = parseInt(parent.css("border-top-width"), 10);
        padding_top = parseInt(parent.css("padding-top"), 10);
        padding_bottom = parseInt(parent.css("padding-bottom"), 10);
        parent_top = parent.offset().top + border_top + padding_top;
        parent_height = parent.height();

        if (fixed) {
          fixed = false;
          bottomed = false;

          if (manual_spacer == null) {
            elm.insertAfter(spacer);
            spacer.detach();
          }

          elm.css({
            position: "",
            top: "",
            width: "",
            bottom: ""
          }).removeClass(sticky_class);
          restore = true;
        }

        top = elm.offset().top - (parseInt(elm.css("margin-top"), 10) || 0) - offset_top;
        height = elm.outerHeight(true);
        el_float = elm.css("float");

        if (spacer) {
          spacer.css({
            width: outer_width(elm),
            height: height,
            display: elm.css("display"),
            "vertical-align": elm.css("vertical-align"),
            "float": el_float
          });
        }

        if (restore) {
          return tick();
        }
      };

      recalc();

      if (height === parent_height) {
        return;
      }

      last_pos = void 0;
      offset = offset_top;
      recalc_counter = recalc_every;

      tick = function tick() {
        var css, delta, recalced, scroll, will_bottom, win_height;

        if (detached) {
          return;
        }

        recalced = false;

        if (recalc_counter != null) {
          recalc_counter -= 1;

          if (recalc_counter <= 0) {
            recalc_counter = recalc_every;
            recalc();
            recalced = true;
          }
        }

        if (!recalced && doc.height() !== last_scroll_height) {
          recalc();
          recalced = true;
        }

        scroll = win.scrollTop();

        if (last_pos != null) {
          delta = scroll - last_pos;
        }

        last_pos = scroll;

        if (fixed) {
          if (enable_bottoming) {
            will_bottom = scroll + height + offset > parent_height + parent_top;

            if (bottomed && !will_bottom) {
              bottomed = false;
              elm.css({
                position: "fixed",
                bottom: "",
                top: offset
              }).trigger("sticky_kit:unbottom");
            }
          }

          if (scroll < top) {
            fixed = false;
            offset = offset_top;

            if (manual_spacer == null) {
              if (el_float === "left" || el_float === "right") {
                elm.insertAfter(spacer);
              }

              spacer.detach();
            }

            css = {
              position: "",
              width: "",
              top: ""
            };
            elm.css(css).removeClass(sticky_class).trigger("sticky_kit:unstick");
          }

          if (inner_scrolling) {
            win_height = win.height();

            if (height + offset_top > win_height) {
              if (!bottomed) {
                offset -= delta;
                offset = Math.max(win_height - height, offset);
                offset = Math.min(offset_top, offset);

                if (fixed) {
                  elm.css({
                    top: offset + "px"
                  });
                }
              }
            }
          }
        } else {
          if (scroll > top) {
            fixed = true;
            css = {
              position: "fixed",
              top: offset
            };
            css.width = elm.css("box-sizing") === "border-box" ? elm.outerWidth() + "px" : elm.width() + "px";
            elm.css(css).addClass(sticky_class);

            if (manual_spacer == null) {
              elm.after(spacer);

              if (el_float === "left" || el_float === "right") {
                spacer.append(elm);
              }
            }

            elm.trigger("sticky_kit:stick");
          }
        }

        if (fixed && enable_bottoming) {
          if (will_bottom == null) {
            will_bottom = scroll + height + offset > parent_height + parent_top;
          }

          if (!bottomed && will_bottom) {
            bottomed = true;

            if (parent.css("position") === "static") {
              parent.css({
                position: "relative"
              });
            }

            return elm.css({
              position: "absolute",
              bottom: padding_bottom,
              top: "auto"
            }).trigger("sticky_kit:bottom");
          }
        }
      };

      recalc_and_tick = function recalc_and_tick() {
        recalc();
        return tick();
      };

      _detach = function detach() {
        detached = true;
        win.off("touchmove", tick);
        win.off("scroll", tick);
        win.off("resize", recalc_and_tick);
        $(document.body).off("sticky_kit:recalc", recalc_and_tick);
        elm.off("sticky_kit:detach", _detach);
        elm.removeData("sticky_kit");
        elm.css({
          position: "",
          bottom: "",
          top: "",
          width: ""
        });
        parent.position("position", "");

        if (fixed) {
          if (manual_spacer == null) {
            if (el_float === "left" || el_float === "right") {
              elm.insertAfter(spacer);
            }

            spacer.remove();
          }

          return elm.removeClass(sticky_class);
        }
      };

      win.on("touchmove", tick);
      win.on("scroll", tick);
      win.on("resize", recalc_and_tick);
      $(document.body).on("sticky_kit:recalc", recalc_and_tick);
      elm.on("sticky_kit:detach", _detach);
      return setTimeout(tick, 0);
    };

    for (_i = 0, _len = this.length; _i < _len; _i++) {
      elm = this[_i];

      _fn($(elm));
    }

    return this;
  };
});

/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/sass/media.scss":
/*!*****************************!*\
  !*** ./src/sass/media.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!************************************************************************!*\
  !*** multi ./src/js/app.js ./src/sass/main.scss ./src/sass/media.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/omen-x/projects/web-sites/YetiBoost/src/js/app.js */"./src/js/app.js");
__webpack_require__(/*! /home/omen-x/projects/web-sites/YetiBoost/src/sass/main.scss */"./src/sass/main.scss");
module.exports = __webpack_require__(/*! /home/omen-x/projects/web-sites/YetiBoost/src/sass/media.scss */"./src/sass/media.scss");


/***/ })

},[[0,"/dist/manifest","/dist/vendor"]]]);