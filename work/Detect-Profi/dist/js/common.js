'use strict';

// ========>> DEFAULT VARIABLES <<========

// Define touch devices
var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

// Define FF
var firefox = navigator.userAgent.indexOf('Firefox') > -1;

if (firefox) {
	$(document.body).addClass('ff');
}

// ========>> DOCUMENT READY <<========


$(document).ready(function () {

	// Loader

	$('#loader').fadeOut(200);
	setTimeout(function () {
		$('#loader').remove();
	}, 210);

	// Load image

	var imgMan = new Image();

	imgMan.src = 'img/man.png';

	// ========>> ANIMATION <<========

	// Adding animation classes

	var animClasses = ['.select'];

	animClasses.forEach(function (select) {
		$(select).addClass('animate');
	});

	// fix transition effect after reload page,
	// transition added after animation class,
	// all transitions must be placed in this selector

	setTimeout(function () {
		$('selector').addClass('trs');
	}, 0);

	// Equal height

	$(function () {
		$('.advantages__title').matchHeight();
	});

	function servicesItemHeight() {
		$(function () {
			if (window.matchMedia('(min-width: 768px)').matches) {
				$('.services__item').matchHeight({ byRow: false });
			} else {
				$('.services__item').css('height', '');
			}
		});
	}
	servicesItemHeight();

	// ========>> MAIN-NAV <<========

	var navList = $('nav .nav__list'),
	    navButton = $('nav .nav__mob-button'),
	    navShade = $('nav .nav__shade');

	navList.addClass('animate');
	setTimeout(function () {
		navList.addClass('trs');
	}, 0);

	function navToggle() {

		if (navList.hasClass('animate')) {
			$(navShade).on('click', navToggle);
			$(navList).toggleClass('animate');

			$(navShade).css('display', 'block');
			$(navShade).stop().animate({ opacity: '.7' }, 300);
		} else {
			$(navList).toggleClass('animate');
			$(navShade).stop().animate({ opacity: '0' }, 300);

			$(navShade).off('click', navToggle); // fix fast double-click

			setTimeout(function () {
				$(navShade).css('display', 'none');
			}, 300);
		}
	}

	$(navButton).on('click', navToggle);

	// ========>> WELCOME - MAN <<========

	var man = $('.welcome__man img');
	var manSrc1 = 'img/man.png';
	var manSrc2 = 'img/man_mask.png';

	man.on('click', function () {
		if ($(this).attr('src') == manSrc1) {
			$(this).attr('src', manSrc2);
		} else {
			$(this).attr('src', manSrc1);
		}
	});

	// ========>> WELCOME MOBILE FORM <<========

	var welcomeForm = $('.welcome__form');
	var welcomeShade = $('.welcome__shade');
	var welcomeBtn = $('.welcome__mob-btn');

	function welcomeFormToggle() {

		if (welcomeForm.css('display') == 'none') {
			$(welcomeShade).on('click', welcomeFormToggle);
			welcomeForm.fadeIn(200);

			$(welcomeShade).css('display', 'block');
			$(welcomeShade).stop().animate({ opacity: '.85' }, 300);
		} else {
			welcomeForm.fadeOut(200);
			$(welcomeShade).stop().animate({ opacity: '0' }, 300);

			$(welcomeShade).off('click', welcomeFormToggle); // fix fast double-click

			setTimeout(function () {
				$(welcomeShade).css('display', 'none');
			}, 300);
		}
	}

	welcomeBtn.on('click', welcomeFormToggle);

	// ========>> POPUP LIGHTBOX <<========

	lightbox.option({
		alwaysShowNavOnTouchDevices: true,
		fadeDuration: 350,
		imageFadeDuration: 200,
		resizeDuration: 400,
		positionFromTop: 100
	});

	// ========>> SCROLL TOP BUTTON <<========


	var toTop = $('#to-home');

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

	// ========>> RESIZE <<========


	$(window).on('resize', function () {

		if ($(window).width() >= 768) {
			$(navList).addClass('animate');
			$(navShade).css('display', '');
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

// ========>> FUNCTIONS <<========