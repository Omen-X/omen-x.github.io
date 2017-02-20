// JavaScript Document
$(document).ready(function(){

// ========>> SCROLL TO TOP BTN <<========

var toTop = $('#to-top');

toTop.on('click', function () {
  $('html, body').animate({scrollTop: 0}, 550);
});

window.addEventListener('scroll', function(e) {
  showScroll();
});

function showScroll() {
  if (window.pageYOffset > document.documentElement.clientHeight) {
    toTop.addClass('to-top_visible');
  } else {
    toTop.removeClass('to-top_visible');
  }
}

showScroll();



/* end scroll to top btn */

	
$('.pull').click(function(){
		 $(this).parents('.top').find('ul').slideToggle(400);  
		 $(this).parents('.top').find('.pull').toggleClass('is_open');
});




$(".top, .footer_txt").on("click","a:not(.but)", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;

		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1200);
});
 
	$('.center').slick({
  centerMode: true,
  centerPadding: '344px',
  slidesToShow: 1,
  responsive: [
	  {
      breakpoint: 1679,
      settings: {
       
        centerMode: true,
        centerPadding: '280px',
        slidesToShow: 1
      }
    },
	    {
      breakpoint: 1534,
      settings: {
       
        centerMode: true,
        centerPadding: '200px',
        slidesToShow: 1
      }
    },
	     {
      breakpoint: 1349,
      settings: {
       
        centerMode: true,
        centerPadding: '160px',
        slidesToShow: 1
      }
    },
	  {
      breakpoint: 1199,
      settings: {
       
        centerMode: true,
        centerPadding: '0px',
        slidesToShow:1
      }
    }
    
  ]
}); 
	 $(".inp_phone").mask("+7(999) 999 9999");

  });
