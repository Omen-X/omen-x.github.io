'use strict';

// ========>> DEFAULT VARIABLES <<========

// Define touch devices
var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

// Preload images

var imgSrc = [];

// Iterate over all
// $('.main-slider__item img').each(function(i, e){
// 	imgSrc.push('../' + $(e).attr('src'));
// });

// let imgItems = [];

// imgSrc.forEach(function(val, i) {
// 	let img = new Image();
// 	img.src = val;
// 	imgItems.push(img);
// });

// ========>> DOCUMENT READY <<========


$(document).ready(function () {

	// Preloader

	$('#loader').fadeOut(220);
	setTimeout(function () {
		$('#loader').remove();
	}, 1200);

	// ========>> MAIN NAV  <<========

	var navLinks = $('.nav__link');
	var navItems = $('.nav__item');
	var sections = $('.sect');

	navLinks.on('click', function (e) {
		e.preventDefault();
		var section = $(this).attr('href');

		if (window.matchMedia('(max-width: 767px)').matches) {
			navItems.removeClass('active');
			$(e.target).parent().addClass('active');
			navToggle();
		}

		$('html, body').stop().animate({
			scrollTop: $(section).offset().top
		}, 600);
	});

	// ========>> MAIN SLIDER <<========

	$('.main-slider .owl-carousel').owlCarousel({
		items: 1,
		loop: true,
		dots: false,
		autoplay: true,
		autoplaySpeed: 1350,
		autoplayTimeout: 4800
	});

	// ========>> ADVANTAGES SLIDER <<========

	$('.advantages__slider .owl-carousel').owlCarousel({
		items: window.matchMedia('(min-width: 768px)').matches ? 3 : window.matchMedia('(min-width: 360px)').matches ? 2 : 1,
		loop: true,
		margin: 10,
		nav: true,
		lazyLoad: true,
		navText: ''
	});

	// ========>> CLIENTS SLIDER <<========

	$('.clients__slider .owl-carousel').owlCarousel({
		items: window.matchMedia('(min-width: 767px)').matches ? 6 : window.matchMedia('(min-width: 480px)').matches ? 3 : 2,
		loop: true,
		autoplay: true,
		lazyLoad: true,
		autoplaySpeed: 600,
		autoplayTimeout: 4000
	});

	// ========>> QUESTIONS SLIDER <<========


	if (window.matchMedia('(min-width: 768px)').matches) {

		$('.questions__slider .owl-carousel').owlCarousel({
			items: 1,
			loop: true,
			autoplay: false,
			nav: true,
			navText: ''
		});
	} else {}
	// $('.questions__slider > .owl-carousel').removeClass('owl-carousel');


	// ========>> CERTIFICATES POP-UP <<========

	var certArr = $('.certificate__item');

	certArr.magnificPopup({
		type: 'image',
		mainClass: 'mfp-fade',
		zoom: {
			enabled: true,
			duration: 300
		}
	});

	// ========>> MOBILE NAV <<========

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

	// ========>> MAIN-FORM <<========

	var feedbackMobBtn = $('.feedback__mob-button');
	var ctaBtn = $('.cta__btn');
	var feedback = $('.feedback');
	var feedbackPopUp = $('.feedback-popup');
	var feedbackLayer = $('.feedback__layer');
	var feedbackPopUpLayer = $('.feedback-popup__layer');

	feedbackMobBtn.on('click', function (e) {
		feedback.fadeIn(300);
		feedbackLayer.fadeIn(220);
	});

	feedbackLayer.on('click', function (e) {
		feedback.fadeOut(200);
		$(this).fadeOut(200);
	});

	ctaBtn.on('click', function (e) {
		feedbackPopUp.fadeIn(300);
		feedbackPopUpLayer.fadeIn(220);
	});

	feedbackPopUpLayer.on('click', function (e) {
		feedbackPopUp.fadeOut(200);
		$(this).fadeOut(200);
	});

	$('.form-feedback').submit(function (e) {
		e.preventDefault();
		$.ajax({
			url: '/wp-content/themes/main-theme/mail.php',
			type: 'POST',
			data: $(this).serialize()
		}).done(function () {
			alert("success");
			$(".form-feedback").trigger("reset");
		}).fail(function () {
			$(".form-feedback").trigger("reset");
			alert("Ошибка отправки формы");
		});
	});

	// ========>> CONTACT FORM <<========

	$('.form-contact .form-contact__placeholder').click(function () {
		$(this).siblings('input, textarea').focus().addClass('active');
	});

	$('.form-contact input, .form-contact textarea').keyup(function () {
		var e = $(this).val();

		if (e.length > 0) {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	}).focusout(function () {
		$(this).trigger('keyup');
	});

	// ========>> SCROLL TO TOP <<========

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

	// ========>> RESIZE <<========


	$(window).on('resize', function () {

		if ($(window).width() >= 768) {

			$(navList).addClass('animate');
			$(navShade).css('display', '');
		} else {
			$('.questions__slider > .owl-carousel').removeClass('owl-carousel');
		}
	}).resize(); // end resize
}); // end document ready


// ========>> MODERNIZR <<========

if (Modernizr.svg) {} else {}

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