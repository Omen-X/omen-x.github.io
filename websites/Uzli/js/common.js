'use strict';

// ========>> FUNCTIONS <<========

function welcomeCarousel() {
  if ($('.welcome-carousel').length && window.matchMedia('(min-width: 900px)').matches) {
    $('.welcome-carousel').lightSlider({
      item: 1,
      slideMargin: 0,
      loop: true
    });
  }
}

function catalogProductsCarousel() {
  if ($('.catalog-products').length && window.matchMedia('(max-width: 899px)').matches) {
    $('.catalog-products').lightSlider({
      item: 1,
      loop: true,
      pager: false
    });
  }
}

function clientsCarousel() {
  if ($('.clients__items').length && window.matchMedia('(max-width: 899px)').matches) {
    $('.clients__items').lightSlider({
      item: 1,
      loop: true,
      pager: false
    });
  }
}

function myCounter() {
  if ($('.my-counter').length) {
    var $btnUp = $('.my-counter__btn-up');
    var $btnDown = $('.my-counter__btn-down');
    var disabledClass = 'my-counter__btn_disabled';

    $btnUp.click(function (event) {
      var $btn = $(event.target);
      var $field = $btn.siblings('.my-counter__value');
      var value = +$field.text();

      $field.text(value + 1);
      if (value > 1) $btn.siblings('.my-counter__btn-down').removeClass(disabledClass);
    });

    $btnDown.click(function (event) {
      var $btn = $(event.target);
      var $field = $btn.siblings('.my-counter__value');
      var value = +$field.text();

      if (value <= 1) {
        $btn.addClass(disabledClass);
        return;
      }

      $field.text(value - 1);
    });
  }
}

function mySelect() {
  if ($('.my-select').length) {
    var $values = $('.my-select__values span');

    $values.click(function () {
      var $target = $(this);
      var $field = $target.parent().siblings('.my-select__value');

      $field.text($target.text());
    });
  }
}

function mySearch() {
  if ($('.my-search').length) {
    var form = $('.my-search');
    var input = $('.my-search__field');

    if (window.matchMedia('(min-width: 900px)').matches) {
      form.hover(function () {
        form.addClass('my-search_hover');
        input.focus();
      }, function () {
        if (input[0].value.length > 0) return;
        form.removeClass('my-search_hover');
      });
    }
    if (window.matchMedia('(max-width: 899px)').matches) {
      input[0].placeholder = 'Поиск';
    }
  }
}

function advantages() {
  if ($('.advantages').length) {
    if (window.matchMedia('(max-width: 899px)').matches) {
      var imgs = $('.advantages__item-img img');

      $.each(imgs, function (i, img) {
        var src = $(img).data('mob-img');
        $(img).attr('src', src);
      });
    }
  }
}

function basketPage() {
  if ($('.basket-wrap').length) {
    var $btnRemove = $('.product-table__btn-remove');

    $btnRemove.click(function () {
      var $target = $(this);

      $target.closest('.product-table__row').slideUp(320);
    });
  }
}

// ========>> DOCUMENT READY <<========

function documentReady() {
  // Loader
  var loader = document.getElementById('loader');

  loader.classList.remove('active');
  setTimeout(function () {
    document.body.removeChild(loader);
  }, 300);

  // ========>> MAIN NAV <<========

  var navListWrap = document.querySelector('nav .nav__list-wrap');
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

  // Nested nav
  if (window.matchMedia('(max-width: 899px)').matches) {
    var navListTitle = $('nav .nav__list-title');
    var navListInner = $('nav .nav__list-inner');

    navListTitle.click(function () {
      var currInnerList = $(this).siblings('.nav__list-inner');

      navListInner.not(currInnerList).stop().slideUp(200);
      currInnerList.stop().slideToggle(200);
    });
  }

  // end main-nav

} // end document ready


// ========>> FUNCTIONS CALL <<========

welcomeCarousel();
catalogProductsCarousel();
clientsCarousel();
mySearch();
advantages();
myCounter();
mySelect();
basketPage();

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();