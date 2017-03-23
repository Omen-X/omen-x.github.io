'use strict';

// ========>> DEFAULT VARIABLES <<========

// Define touch devices
var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

// Preload images

var imgSrc = [];

var imgItems = [];

imgSrc.forEach(function (val, i) {
	var img = new Image();
	img.src = val;
	imgItems.push(img);
});

// +++++++++++++++ FUNCTIONS +++++++++++++++


// ========>> WELCOME SLIDER <<========


function welcomeSlider() {
	if ($('.welcome-slider').length) {
		$('.welcome-slider').slick({
			infiniti: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: false,
			customPaging: function customPaging(slider, i) {
				var thumb = $(slider.$slides[i]).data('thumb');
				return '<a>0' + (i + 1) + '</a>';
			},
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 1100,
			cssEase: 'cubic-bezier(.38,.2,.25,.97)'
		});
	}
}

// ========>> GALLERY <<========


function mainGallery() {
	if ($('.gallery__items').length) {
		$('.gallery__items').slick({
			infiniti: true,
			slidesToShow: 6,
			slidesToScroll: 2,
			dots: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 4000,
			responsive: [{
				breakpoint: 899,
				settings: {
					slidesToShow: 3
				}
			}]
		});

		lightbox.option({
			'resizeDuration': 400,
			'fadeDuration': 400,
			'showImageNumberLabel': false
		});
	}
}

// ========>> SCROLL TO TOP <<========

function scrollToTop() {
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
}

// ========>> MAIN NAV <<========

var navList = $('nav .nav__list-wrap');
var navButton = $('nav .nav__mob-button, .nav-mob-button');
var navShade = $('nav .nav__shade');

function mainNavMenu() {

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
}

// ========>> DOCUMENT READY <<========

$(function () {

	// Preloader

	setTimeout(function () {
		$('#loader').fadeOut(250);
	}, 250);

	setTimeout(function () {
		$('#loader_home').fadeOut(500);
	}, 1800);

	setTimeout(function () {
		$('html, body').removeClass('loading');
	}, 250);

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

	// Hide widgets when click outside elements

	document.body.addEventListener('click', function (e) {});

	// ========>> FUNCTION'S CALL <<========

	welcomeSlider();
	mainGallery();
	scrollToTop();
	mainNavMenu();

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

// Prevent dragging img, links

$("img, a").on("dragstart", function (event) {
	event.preventDefault();
});