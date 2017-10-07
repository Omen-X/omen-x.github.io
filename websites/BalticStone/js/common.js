'use strict';

$(document).ready(function () {
  $('._product__gallery .owl-carousel').owlCarousel({
    items: 4,
    margin: 15,
    nav: true,
    navText: '',
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      600: {
        items: 3
      },
      900: {
        items: 4
      }
    }
  });

  lightbox.option({
    resizeDuration: 200,
    fadeDuration: 250,
    wrapAround: true,
    showImageNumberLabel: false
  });
});