'use strict';

// ========>> FUNCTIONS <<========

var clientsCarousel = function clientsCarousel() {
  if ($('.clients-carousel').length) {
    $('.clients-carousel').lightSlider({
      item: 6,
      loop: true,
      pager: false
    });
  }
};

/**
 * Выравнивает элементы по высоте, на основе большей в группе
 * @param  {string[]} selectors - Массив с селекторами элементов
 * @return {undefined}
 */
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

// ========>> DOCUMENT READY <<========

function documentReady() {
  // Loader
  // const loader = document.getElementById('loader');

  // loader.classList.remove('active');
  // setTimeout(() => {
  //   document.body.removeChild(loader);
  // }, 300);


  // ========>> FUNCTIONS CALL <<========

  clientsCarousel();
  equalHeight(['.transport__item', '.services__item-img', '.flow-item__img']);
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();

// ========>> MAIN NAV <<========

var navListWrap = document.querySelector('nav .nav__list');
var $navButton = $('.nav__mob-button');
var navOverlay = document.querySelector('nav .nav__overlay');

function navToggle() {
  // open
  if (navListWrap.classList.contains('animate')) {
    navOverlay.addEventListener('click', navToggle);
    navListWrap.classList.toggle('animate');
    document.documentElement.classList.add('modal-open');

    navOverlay.classList.add('nav__overlay_visible');
    setTimeout(function () {
      navOverlay.classList.add('nav__overlay_animate');
    }, 10);
    // hide
  } else {
    navListWrap.classList.toggle('animate');
    navOverlay.classList.remove('nav__overlay_animate');
    document.documentElement.classList.remove('modal-open');
    $('nav .nav__list-inner').slideUp();

    // fix fast double-click on overlay
    navOverlay.removeEventListener('click', navToggle);

    setTimeout(function () {
      return navOverlay.classList.remove('nav__overlay_visible');
    }, 300);
  }
}

$navButton.click(navToggle);

// end main-nav

$(window).on('resize', function () {

  if ($(window).width() >= 768) {
    navListWrap.classList.add('animate');
    navOverlay.classList.remove('nav__overlay_visible');
  }
}).resize(); // end resize