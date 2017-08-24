'use strict';

// ========>> DEFAULT VARIABLES <<========


// ========>> FUNCTIONS <<========

function catalogTabs() {
  if (document.getElementById('catalog-tabs')) {
    var tabsButtonsWrap = document.getElementById('catalog-tabs');
    var tabsButtons = document.querySelectorAll('#catalog-tabs .tabs__btn');
    var tabs = document.querySelectorAll('*[data-tab^="catalog"]');

    tabsButtonsWrap.addEventListener('click', function (event) {
      if (event.target.classList.contains('tabs__btn')) {
        var target = event.target;
        var currTabId = target.getAttribute('data-tab-for');
        var currTab = document.querySelector('[data-tab=' + currTabId + ']');

        tabsButtons.forEach(function (btn) {
          btn.classList.remove('tabs__btn_active');
        });
        target.classList.add('tabs__btn_active');

        tabs.forEach(function (tab) {
          tab.classList.remove('tab_visible');
        });
        currTab.classList.add('tab_visible');
      }
    });
  }
}

function scrollBar() {
  if (document.querySelector('.sidebar')) {
    $('.sidebar').mCustomScrollbar({
      // theme: 'minimal-dark'
    });
  }
}

function cardCarousel() {
  if (document.querySelector('.card-info')) {
    $('#light-slider').lightSlider({
      gallery: true,
      item: 1,
      loop: true,
      slideMargin: 0,
      thumbItem: 3
    });
  }
}

// ========>> DOCUMENT READY <<========

function documentReady() {
  $('#loader').fadeOut(200);
  setTimeout(function () {
    $('#loader').remove();
  }, 210);

  // ========>> FUNCTIONS CALL <<========

  scrollBar();
  catalogTabs();
  cardCarousel();
} // end document ready


// ========>> UTILS <<========
/* eslint-disable */

(function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady();
})();

// Polyfill for IE
(function () {
  if (typeof NodeList.prototype.forEach === 'function') return false;
  NodeList.prototype.forEach = Array.prototype.forEach;
})();