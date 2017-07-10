'use strict';

// ========>> DEFAULT VARIABLES <<========

// Define touch devices
var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
/*eslint-disable*/

// ========>> DOCUMENT READY <<========
$(document).ready(function () {

  var $sitehead = $('.header');
  var headerHeight = 88;
  var owl = $('.owlnabor');
  var owl2 = $('.owlslider');
  var manufboxSlider = $('.manufbox__owl');

  var owl1 = $('.owlinner');
  var owlproduct = $('.owlproduct');

  init();

  function init() {
    $('.ib_one').css({
      'overflow': 'visible'
    });

    $('#t1').show();
    $('#tp1').show();
    $('#t11').show();
    var body = document.getElementById('body').offsetWidth;

    // owl nabor
    owl.owlCarousel({
      margin: 0,
      loop: false,
      items: 1,
      nav: true,
      dots: false,
      responsive: {
        0: {
          nav: false,
          dots: true
        },
        1160: {
          nav: true
        }
      }
    });

    owlproduct.owlCarousel({
      margin: 0,
      loop: false,
      items: 5,
      nav: true,
      dots: false,
      smartSpeed: 400,
      responsive: {
        0: {
          items: 1,
          nav: false,
          dots: true
        },
        600: {
          items: 2,
          nav: false,
          dots: true
        },
        1000: {
          items: 3,
          nav: false,
          dots: true
        },
        1330: {
          items: 4,
          nav: true,
          dots: false
        },
        1530: {
          items: 5,
          dots: false
        }
      }
    });

    $('.owlsert').owlCarousel({
      margin: 0,
      loop: false,
      items: 4,
      nav: true,
      dots: false,
      responsive: {
        0: {
          items: 2,
          nav: false,
          dots: true
        },
        740: {
          items: 3,
          dots: true,
          nav: false
        },
        1170: {
          nav: true
        },
        1400: {
          items: 4
        } }
    });

    $('.resumebox .owl-carousel').owlCarousel({
      responsive: {
        0: {
          items: 1
        },
        1170: {
          items: 2,
          mouseDrag: false
        }
      }
    });

    manufboxSlider.owlCarousel({
      margin: 0,
      loop: false,
      items: 1,
      nav: true,
      dots: false,
      responsive: {
        0: {
          dots: true
        },
        1170: {
          dots: false
        }
      }
    });

    // banner
    owl1.owlCarousel({
      margin: 0,
      loop: false,
      items: 1,
      nav: false,
      dots: true,
      responsive: {}
    });
    owl2.owlCarousel({
      margin: 0,
      loop: false,
      items: 1,
      nav: true,
      dots: false
    });

    $('.slidebox-mob-slider').owlCarousel({
      margin: 0,
      loop: false,
      items: 1,
      nav: false,
      dots: true
    });
  }

  if ($(window).scrollTop() > headerHeight) {
    $('.header').addClass('fixedSiteHeader');
  }

  var $windScrl = $(window);
  $windScrl.scroll(function () {
    checkInView();
    checkInFade();
    if ($windScrl.scrollTop() > headerHeight) {
      if (!$sitehead.hasClass('fixedSiteHeader')) {
        $sitehead.addClass('fixedSiteHeader');
      }
      $('.scrlTopPg').addClass('shw-scrlTopPg');
    } else if ($windScrl.scrollTop() < headerHeight) {
      if ($sitehead.hasClass('fixedSiteHeader')) {
        $sitehead.removeClass('fixedSiteHeader');
      }
      $('.scrlTopPg').removeClass('shw-scrlTopPg');
    };
  });

  /** checks if an area is visible on the screen or not or not **/
  function checkInView() {
    var elems = [];
    $.each($.cache, function () {
      if (this.events && this.events.inport) {
        elems.push(this.handle.elem);
      }
    });
    if (elems.length) {
      $(elems).each(function () {
        var $el = $(this);
        if ($el.offset().top < $(window).scrollTop() + $(window).height()) {
          if ($el.offset().top + $el.outerHeight() > $(window).scrollTop()) {
            $el.data('inport', true);
            $el.trigger('inport', [true]);
          } else {
            $el.data('inport', false);
            $el.trigger('inport', [false]);
          }
        } else {
          $el.data('inport', false);
          $el.trigger('inport', [false]);
        }
      });
    }
  }

  function checkInFade() {
    var elems = [];
    $.each($.cache, function () {
      if (this.events && this.events.isFadein) {
        elems.push(this.handle.elem);
      }
    });
    if (elems.length) {
      $(elems).each(function () {
        var $el = $(this);
        if ($el.offset().top < $(window).scrollTop() + $(window).height()) {
          $el.data('isFadein', true);
          $el.trigger('isFadein', [true]);
        } else {
          $el.data('isFadein', false);
          $el.trigger('isFadein', [false]);
        }
      });
    }
  }

  owl.on('initialized.owl.carousel', function (event) {});

  // TABS

  $('.tab_header').on('click', function (event) {
    // tablet
    if (window.matchMedia('(max-width: 1209px)').matches) {
      $(this).toggleClass('opened');
    }
  });

  $(".tab_header .tab_item").click(function (a) {
    a.preventDefault();

    // tablet and mobile
    if (window.matchMedia('(max-width: 1209px)').matches) {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      var tab = $(this).attr('data-tab');
      $('.' + tab).hide();
      var iid = $(this).attr('id').substr(1, $(this).attr('id').length);
      // console.log(iid);
      $("#t" + iid).show();
    } else {

      // old
      // $(".tab_header .tab_item").removeClass('active');
      // $(this).addClass('active');
      // var tab = $(this).attr('data-tab');
      // $('.' + tab).hide();
      // var iid = $(this).attr('id').substr(1, $(this).attr('id').length);
      // $("#t" + iid).show();

      // new
      var tab = $(this).attr('data-tab');
      var iid = $(this).attr('id').substr(1, $(this).attr('id').length);

      $(this).siblings('.tab_item').removeClass('active');
      $(this).addClass('active');

      $("#t" + iid).addClass('transition');

      $('.' + tab).stop().fadeOut(200, function () {

        setTimeout(function () {
          $("#t" + iid).removeClass('transition').stop().fadeIn(350);
        }, 300);
      });
    }
  });

  $(".menuswicher").click(function (a) {
    a.preventDefault();
    $(this).toggleClass('opn');
  });

  $(".scrlTopPg").click(function (a) {
    a.preventDefault();
    $("html,body").animate({
      scrollTop: 0
    }, 1000);
  });

  // ========>> NEW JS (6.08.2017) <<========


  // Sidebar categories

  // level1
  $('.subcat-trigger').click(function () {
    $(this).toggleClass('open');
    $('.sibebar .subcat.b').stop().slideToggle(250);
  });

  //level2

  var level2Cat = $('.level2');

  $('.subcat a').click(function (event) {
    event.preventDefault();

    $(this).toggleClass('open');
    level2Cat.stop().slideUp(200);

    $(this).siblings('.level2').stop().slideToggle(220);
  });

  // Expanded product blocks

  // $('.owlproduct .item').hover(
  //   function(){
  //     // hide not active items (opacity, visibility)
  //     $('.owlproduct .owl-item').addClass('hide');
  //     $('.owlproduct .owl-item.active').removeClass('hide');

  //     // visibility for expanded block
  //     $(this).closest(".owl-stage-outer").addClass("overflow-visible");
  //     $(this).closest(".owl-carousel").css("z-index", "3");
  //   },
  //   function(){
  //     $('.owlproduct .owl-item').removeClass('hide');

  //     $(this).closest(".owl-stage-outer").removeClass("overflow-visible");
  //     $(this).closest(".owl-carousel").css("z-index", "2");
  //   });

}); // end document ready


window.mobilecheck = function () {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|ipad|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

var doctop;
var docleft;

function addpopActs() {
  if (!mobilecheck()) {
    $('body').addClass('stopScroll');
  };
  $(document).on("keyup", function (e) {
    if (e.keyCode === 27) {
      $('.clsOvr').each(function (index) {
        if ($(this).is(":visible")) {
          $(this).click();
        }
      });
    }
  });

  doctop = document.documentElement.scrollTop || document.body.scrollTop;
  docleft = document.documentElement.scrollLeft || document.body.scrollLeft;
  if (!mobilecheck()) {
    $(window).on("scroll", freezeScroll);
  }
}

function removepopActs() {
  if (!mobilecheck()) {
    $('body').removeClass('stopScroll');
  };
  $(document).off("keyup");
  $(window).off("scroll", freezeScroll);
}

var freezeScroll = function freezeScroll() {
  if (!mobilecheck()) {
    window.scrollTo(docleft, doctop);
  };
};

$(window).resize(function () {
  //    console.log('sss ');
  //   init();
});

// header nav

$(".menuswicher1").click(function (a) {
  a.preventDefault();
  $(this).toggleClass('opn');

  $('.nav .main_menu-wrap').stop().slideToggle(300);
});

$('.main_menu__close').on('click', function () {
  $('.nav .main_menu-wrap').stop().slideUp(300);
  $('.menuswicher1').removeClass('opn');
});

// ========>> DETECTING CLIENT CONFIG <<========

// Detect touch devices

if (isTouch) $(document.body).addClass('touch');else $(document.body).addClass('no-touch');

// Detect disabled JS

$(document.body).removeClass('no-js');

// ========>> UTILS <<========