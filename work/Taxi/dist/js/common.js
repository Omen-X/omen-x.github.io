'use strict';

// ========>> DEFAULT VARIABLES <<========

// Define touch devices
var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

// ========>> DOCUMENT READY <<========


$(document).ready(function () {

	// Preloader

	if ($('#loader').length) {
		$('#loader').fadeOut(200);
		setTimeout(function () {
			$('#loader').remove();
		}, 1000);
	}

	// Equal height

	$(function () {
		$('.advantages .banner').matchHeight();
	});

	// ========>> TO-TOP BUTTON <<========

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

	// ========>> MAIN-SLIDER <<========

	$('.flexslider').flexslider({
		animation: "slide",
		touch: true,
		easing: 'easeInOutCirc',
		animationSpeed: 1200
	});

	if ($('.flexslider').length) {
		setInterval(function () {
			$('.flexslider').flexslider("next"); //Go to next slide`
		}, 10000);
	}

	// ========>> GALLERY <<========

	if ($('.auto__items').length) {
		$('.auto__items a').touchTouch();
	}

	// ========>> FORMS <<========


	// ========>> ORDER FORM <<========

	var formLayer = $('.forms-layer');
	var orderName = $('.order__name');
	var order = $('.order');
	var orderBtn = $('.services__item-btn');
	var orderNameHidden = $('#order_name');

	orderBtn.on('click', function (e) {
		var currName = $(e.target).siblings('.services__item-title').text();

		order.fadeIn(250);
		orderName.text(currName);
		formLayer.fadeIn(200);

		// set order name in hidden input
		orderNameHidden.val(currName);
	});

	formLayer.on('click', function (e) {
		order.fadeOut(200);
		$('.forms-succes').fadeOut();
		$(this).fadeOut(250);
	});

	// ========>> COLLABORATE FORM <<========

	var collaborateBtn = $('.collaborate__btn');
	var collaborateForm = $('.collaborate__form');
	var collaborateSubmit = $('.collaborate__submit');

	collaborateBtn.on('click', function () {
		collaborateForm.fadeIn(200);
		formLayer.fadeIn(200);
	});

	formLayer.on('click', function (e) {
		collaborateForm.fadeOut(200);
		$(this).fadeOut(250);
	});

	// ========>> MAP FORM <<========

	var mapGetBtn = $('.map__get-btn');
	var mapOrder = $('.map__order');

	mapGetBtn.on('click', function (e) {
		mapOrder.fadeToggle(200);
	});

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

// ========>> FUNCTIONS <<========