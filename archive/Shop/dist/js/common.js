
//________ DOCUMENT READY ________

$(document).ready(function() {

	// Loader

	$(".loader").delay(100).fadeOut("slow");


	// Scrolls

	$('a[href*="#"]').mPageScroll2id({
		scrollSpeed: 700,
		scrollEasing: 'linear'
	});

	$('a[href="#header"]').mPageScroll2id({
		scrollSpeed: 250,
		scrollEasing: 'swing'
	});


	// Waypoints

	var toTop = $('.header').waypoint(function () {
		$('.to-top__link').toggleClass('invisible');

	}, {
		offset: function() {
			return -this.element.clientHeight
		}
	});


	var timerId = setTimeout(function() {

		var brandsWp = $('.brands__row').waypoint(function () {
			$('.brands__item_main').animate({opacity: 1}, 1000);

			if(window.matchMedia('(min-width: 768px)').matches){
				$('.brands__item_2, .brands__item_3').animate({
					marginLeft: 0
				}, {
					duration: 1200,
					easing: 'easeOutExpo'
				});
			}

			}, {
				offset: '60%'
			});


	}, 0);

	if(window.matchMedia('(min-width: 768px)').matches){
		var brandsPseudo = $('<div class="brands__pseudo"></div>');

		$('.brands__item_4, .brands__item_5, .brands__item_6').prepend(brandsPseudo);
		var brandsWp2 = $('.brands__item_4').waypoint(function (){
			$('.brands__pseudo').animate({
				height: 0,
			}, {
				duration: 1100,
				easing: 'easeOutExpo'
			});
		},{
			offset: '60%'
		});

	}

	var instaWp = $('.insta').waypoint(function () {
		$('.insta__shade').animate({opacity: 0.7}, 650);
		$('.insta__title').addClass('insta__title_anim');
	}, {
		offset: '45%'
	});





	// Header menu

	var mainNavList = $('#main-nav__list');
	var respButton = $(".responsive-button");

	respButton.on( 'click' ,function () {
		mainNavList.slideToggle('500');
	});

	$(document).on('mouseup' ,function (e) {
		if (!$(e.target).closest(mainNavList).length && 
			!isHidden(mainNavList) &&
			!$(e.target).closest(respButton).length &&
			respButton.is(':visible')){
			mainNavList.slideToggle('500');
	}
});


	// Footer

	swapBlocks();


//________ RESIZE ________

$(window).on('resize', function() {

	// Header height

	var headHeight = document.documentElement.clientHeight;
	var header = document.getElementById('header');
	header.style.height = headHeight + 'px';


	// Header menu

	if ($(window).width() > 768) {
		$(mainNavList).css('display', '');
	}

	// Footer

	swapBlocks();

	//
	if(window.matchMedia('(max-width: 480px)').matches){
		$('.brands__item_2, .brands__item_3').css('marginLeft', '16%');
	}


}).resize();	// end resize

}); 	// end document ready

function isHidden(elem) {
	return elem.css('display') == 'none';
}

function swapBlocks() {
	if (window.matchMedia('(max-width: 992px)').matches) {
		$('#footer-col__first').insertAfter('#footer-col__second');
	}
	else {
		$('#footer-col__first').insertBefore('#footer-col__second');
	}
}
