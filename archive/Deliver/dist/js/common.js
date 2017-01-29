'use strict';

// Default template vars

// Define touch devices
var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

// Define disabled JS
var noJs = false;

// Fix border bug in ie
var version = detectIE();
if (version) {
	document.body.classList.add('ie');
}

// ========>> DOCUMENT READY <<========

$(document).ready(function () {

	// Loader

	$('#loader').fadeOut(200);
	setTimeout(function () {
		$('#loader').remove();
	}, 210);

	// Adding animation classes

	$('.team__item, .work .monitor, .services__items, .pricing__items, .benefits__items').addClass('transform');

	$('.pricing__desc-item').addClass('animate');

	// fix transition effect after reload page,
	// transition added after animation class

	setTimeout(function () {
		$('.team__item, .work .monitor, .services__items, .pricing__items, .benefits__items, .pricing__desc').addClass('transition');
	}, 0);

	// Equal height

	$(function () {
		$('.advantages__img-wrap').matchHeight();
		$('.team__img-wrap').matchHeight();
	});

	// Scroll to-top

	var toTop = $('#to-top');

	toTop.on('click', function () {
		$('html, body').animate({ scrollTop: 0 }, 550);
	});

	window.addEventListener('scroll', function (e) {
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

	// end scroll to-top

	// Main-Slider

	var slideNum = 1;
	var slideCount = 3;
	var slideImages = [];

	for (var i = 0; i < slideCount; i++) {
		slideImages[i] = new Image();
		slideImages[i].src = './img/home/slide-' + (i + 1) + '.jpg';
	}

	function changeSlide(dir) {
		// current active dot
		var slideActive;

		// Animation
		var styles = {
			opacity: '.2'
		};

		$('.main-slider-wrap').css(styles);

		// get current slide
		if (typeof dir == 'string') {
			if (slideNum == 1 && dir == 'prev') {
				slideNum = slideCount;
			} else if (slideNum == slideCount && dir == 'next') {
				slideNum = 1;
			} else {
				slideNum = dir == 'next' ? ++slideNum : --slideNum;
			}
			slideActive = slideNum - 1;
		}
		if (typeof dir == 'number') {
			slideNum = dir;
			slideActive = dir - 1;
		}

		// change bg-image

		$('.main-slider-wrap').stop().animate({ opacity: 1 }, 800);
		$('.main-slider-wrap').css('backgroundImage', 'url(\'./img/home/slide-' + slideNum + '.jpg\')');

		// change active dot

		$('.main-slider__dot').removeClass('active');
		$('.main-slider__dot:eq(' + slideActive + ')').addClass('active');
	}

	$('.main-slider__prev').on('click', function () {
		changeSlide('prev');
	});

	$('.main-slider__next').on('click', function () {
		changeSlide('next');
	});

	$('.main-slider__dot').on('click', function (e) {
		var currSlide = $(e.target).attr('id');
		if (slideCount < 10) {
			currSlide = currSlide.slice(-1);
		} else if (slideCount < 100) {
			currSlide = currSlide.slice(-2);
		}
		currSlide = parseInt(currSlide, 10);
		changeSlide(currSlide);
	});

	// end Main-Slider


	// Responsive main-nav

	var navList = document.querySelector('nav .nav__list'),
	    navResp = document.querySelector('nav .nav__responsive i'),
	    navLayer = document.querySelector('nav .nav__layer');

	function navToggle() {

		if (navList.classList.contains('transform')) {
			$(navLayer).on('click', navToggle);
			$(navList).toggleClass('transform');

			$(navLayer).css('display', 'block');
			$(navLayer).stop().animate({ opacity: '.7' }, 300);
		} else {
			$(navList).toggleClass('transform');
			$(navLayer).stop().animate({ opacity: '0' }, 300);

			$(navLayer).off('click', navToggle); // fix fast double-click

			setTimeout(function () {
				$(navLayer).css('display', 'none');
			}, 300);
		}
	}

	$(navResp).on('click', navToggle);

	// end responsive main-nav


	// Footer__about

	function replaceFooter() {
		var footerAbout;

		if (window.matchMedia('(max-width: 993px)').matches) {
			footerAbout = $('.footer__about').detach().insertAfter('.newsletter');
		} else {
			footerAbout = $('.footer__about').detach().insertBefore('.info');
		}
	}

	replaceFooter();

	// and footer__about


	// Waypoints

	var advantagesWaypont = $('.advantages').waypoint(function () {
		$('.advantages__item').animate({ opacity: 1 }, 550);
	}, {
		offset: '50%'
	});

	var workWaypoint = $('.work').waypoint(function () {
		$('.work .monitor').removeClass('transform');
	}, {
		offset: '50%'
	});

	var portfolioWaypoint = $('.portfolio').waypoint(function () {
		var secondLink = $('.portfolio__nav-link')[1];
		var firstMonitor = $('.monitor')[0];

		$(secondLink).tooltip('show');
		$(firstMonitor).tooltip('show');

		setTimeout(function () {
			$(secondLink).tooltip('hide');
			$(firstMonitor).tooltip('hide');
			$('.portfolio__nav-link').tooltip('dispose');
			$('.monitor').tooltip('dispose');
			$('.monitor').attr('data-toggle', '');
		}, 3000);

		this.destroy();
	}, {
		offset: '30%'
	});

	var teamWaypoint = $('.team').waypoint(function () {
		$('.team__item').removeClass('transform');
	}, {
		offset: '50%'
	});

	var servicesWaypoint = $('.services').waypoint(function () {
		setTimeout(function () {
			$('.services__items').removeClass('transform');
		}, 0);
	}, {
		offset: '60%'
	});

	var pricingWaypoint = $('.pricing').waypoint(function () {
		var delayT = 170;
		var delay = 500;

		var _loop = function _loop(_i) {
			delay += delayT;
			setTimeout(function () {
				$('.pricing__desc-item:nth-child(' + _i + ')').removeClass('animate');
			}, delay);
		};

		for (var _i = 1; _i <= 5; _i++) {
			_loop(_i);
		}

		$('.pricing__items').removeClass('transform');
		setTimeout(function () {
			$('.pricing__items').removeClass('transition');
		}, 0);
	}, {
		offset: '55%'
	});

	var benefitsWaypoint = $('.benefits').waypoint(function () {
		$('.benefits__items').removeClass('transform');
	}, {
		offset: '75%'
	});
	// 
	// end waypoints


	// Portfoilo items mix

	if (document.querySelector('.portfolio__container')) {
		console.log('asdf');
		var mixer = mixitup('.portfolio__container');

		$('.portfolio__nav-link').on('click', function (e) {

			$('.portfolio__nav-link').removeClass('active');
			e.target.classList.add('active');
		});
	}

	// PopUp

	lightbox.option({
		alwaysShowNavOnTouchDevices: true,
		fadeDuration: 350,
		imageFadeDuration: 200,
		resizeDuration: 400,
		positionFromTop: 100
	});

	// Opacity for team__items

	if (!isTouch) {
		$('.team__item').hover(function () {
			$('.team__item').not(this).stop().animate({ opacity: .3 }, 300);
		}, function () {
			$('.team__item').not(this).stop().animate({ opacity: 1 }, 300);
		});
	}

	// Side-bar

	var sideBar = $('#side-bar');
	var sideBarFix = $('#side-bar.fixed');

	if (sideBar.outerHeight() + 8 < document.documentElement.clientHeight) {
		sideBarFix.stick_in_parent({
			parent: '.side-bar-sticky',
			offset_top: 15
		});
	}

	// ========>> SCROLLING <<========

	window.addEventListener('scroll', function (e) {

		// Scroll to top button
		showScroll();
	});

	// ========>> RESIZE <<========

	$(window).on('resize', function () {

		if ($(window).width() >= 768) {
			$(navList).addClass('transform');
			$(navLayer).css('display', '');
		}

		replaceFooter();

		if (window.matchMedia('(max-width: 767px)').matches) {
			$('#form .field textarea').attr('rows', '5');
		} else {
			$('#form .field textarea').attr('rows', '12');
		}

		// Side-bar

		if (sideBar.outerHeight() + 8 < document.documentElement.clientHeight) {
			sideBarFix.stick_in_parent({
				parent: '.side-bar-sticky',
				offset_top: 15
			});
		} else {
			sideBarFix.trigger('sticky_kit:detach');
		}
	}).resize(); // end resize
}); // end document ready


// ========>> DETECT CLIENT CONFIG <<========

// Detect touch devices

if (isTouch) {
	$(document.body).addClass('touch');
} else {
	$(document.body).addClass('no-touch');
}

// Detect disabled JS

$(document.body).removeClass('no-js');

// ========>> DETECT IE <<========

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