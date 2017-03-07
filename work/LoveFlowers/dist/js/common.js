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

// ========>> DOCUMENT READY <<========

$(function () {

	// Preloader

	$('#loader').fadeOut(200);
	setTimeout(function () {
		$('#loader').remove();
	}, 210);

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

	var navLinks = $('.nav__link');
	var navItems = $('.nav__item');
	var sections = $('.sect');

	navLinks.on('click', function (e) {
		e.preventDefault();
		var section = $(this).attr('href');

		if (section !== '#contacts') {
			if (window.matchMedia('(max-width: 767px)').matches) {
				navItems.removeClass('active');
				$(e.target).parent().addClass('active');
				navToggle();
			}

			$('html, body').stop().animate({
				scrollTop: $(section).offset().top
			}, 600);
		} else {
			if (window.matchMedia('(max-width: 767px)').matches) {
				navItems.removeClass('active');
				$(e.target).parent().addClass('active');
				navToggle();
			}

			$('html, body').stop().animate({
				scrollTop: $('.order__frame').offset().top - 25
			}, 600, function () {
				galleryTrigger('show');
			});
		}
	});

	// ========>> ORDER FRAME <<========

	// Slider

	$("#order-slider").ionRangeSlider({
		min: 25,
		max: 101,
		from: 25,
		step: 2
	});

	// ========>> TO TOP <<========

	var toTop = $('.to-top');

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

	// ========>> CALLBACK FORM <<========

	var callback = $('.form-callback');
	var callbackBtn = $('.contacts__callback > button');
	var callbackThank = $('.callback__thank');

	callbackBtn.on('click', function () {
		callback.fadeIn(200);
	});

	callback.submit(function (e) {
		e.preventDefault();
		$.ajax({
			url: 'mail-callback.php',
			type: 'POST',
			data: $(this).serialize()
		}).done(function () {
			callback.fadeOut(200);
			callbackThank.fadeIn(200);
			setTimeout(function () {
				callbackThank.fadeOut(200);
			}, 1500);
			$(".form").trigger("reset");
		}).fail(function () {
			$(".form").trigger("reset");
			alert("Ошибка отправки формы");
		});
	});

	// ========>> ORDER FORM <<========
	var calcForm = $('.order-calculate');
	var order = $('.form-order');
	var orderThank = $('.order__thank');
	var orderBtn = $('.order__get-form');

	orderBtn.on('click', function () {
		order.fadeIn(200);

		$('input[name="count"]', order).val($('#order-slider').val());
		$('input[name="size"]', order).val($('input[name="size"]:checked', calcForm).val());
		$('input[name="color"]', order).val($('input[name="color"]:checked', calcForm).val());
		$('input[name="box"]', order).val($('input[name="box"]:checked', calcForm).val());
		$('input[name="price"]', order).val($('.order__cost-val').text());
	});

	order.on('submit', function (e) {
		e.preventDefault();
		order.fadeOut(200);
		orderThank.fadeIn(200);
	});

	order.submit(function (e) {
		e.preventDefault();
		$.ajax({
			url: 'mail-order.php',
			type: 'POST',
			data: $(this).serialize()
		}).done(function () {
			order.fadeOut(200);
			orderThank.fadeIn(200);
			setTimeout(function () {
				orderThank.fadeOut(200);
			}, 1500);
			$(".form").trigger("reset");
		}).fail(function () {
			$(".form").trigger("reset");
			alert("Ошибка отправки формы");
		});
	});

	// ========>> ASK FORM <<========

	var ask = $('.form-ask');
	var askThank = $('.ask__thank');
	var askBtn = $('.ask__get-form');

	askBtn.on('click', function () {
		ask.fadeIn(200);
	});

	ask.submit(function (e) {
		e.preventDefault();
		$.ajax({
			url: 'mail-ask.php',
			type: 'POST',
			data: $(this).serialize()
		}).done(function () {
			ask.fadeOut(200);
			askThank.fadeIn(200);
			setTimeout(function () {
				askThank.fadeOut(200);
			}, 1500);
			$(".form").trigger("reset");
		}).fail(function () {
			$(".form").trigger("reset");
			alert("Ошибка отправки формы");
		});
	});

	// Hide forms

	$(document.body).on('click', function (e) {
		if ($(e.target).closest('.form').length || $(e.target).hasClass('show-form')) {
			return;
		} else {
			$('.form, .form-thank').fadeOut(200);
		}
	});

	// ========>> CALCULATOR <<========


	var calcResult = $('.order__cost-val');
	var calcFormResult = $('.form-order__summ span');
	var calcFrameImg = $('.order__img-curr');

	// change active labels

	$('.order__size-items label').on('click', function (e) {
		$('.order__size-items .order__size').removeClass('active');
		$(e.target).closest('.order__size').addClass('active');
	});

	$('.order__color-items label').on('click', function (e) {
		$('.order__color-items .order__color').removeClass('active');
		$(e.target).closest('.order__color').addClass('active');
	});

	$('.order__box-items label').on('click', function (e) {
		$('.order__box-items .order__box').removeClass('active');
		$(e.target).closest('.order__box').addClass('active');
	});

	calcForm.on('change', function () {
		var currCount = $('#order-slider').val();
		var currSize = $('input[name="size"]:checked', calcForm).val();
		var currColor = $('input[name="color"]:checked', calcForm).val();
		var currPack = $('input[name="box"]:checked', calcForm).val();

		calcResult.text(calcCountPrice(currCount, currSize, currPack));
		calcFormResult.text(calcCountPrice(currCount, currSize, currPack));

		// Change frame img

		if (currCount < 51) {
			switch (currColor) {

				case 'Красный':
					calcFrameImg.css('backgroundImage', 'url("../img/content/25-red.png")');
					break;

				case 'Желтый':
					calcFrameImg.css('backgroundImage', 'url("../img/content/25-yellow.png")');
					break;

				case 'Белый':
					calcFrameImg.css('backgroundImage', 'url("../img/content/25-white.png")');
					break;

				case 'Розовый':
					calcFrameImg.css('backgroundImage', 'url("../img/content/25-pink.png")');
					break;

			}
		}
		if (currCount >= 51 && currCount < 101) {
			switch (currColor) {

				case 'Красный':
					calcFrameImg.css('backgroundImage', 'url("../img/content/51-red.png")');
					break;

				case 'Желтый':
					calcFrameImg.css('backgroundImage', 'url("../img/content/51-yellow.png")');
					break;

				case 'Белый':
					calcFrameImg.css('backgroundImage', 'url("../img/content/51-white.png")');
					break;

				case 'Розовый':
					calcFrameImg.css('backgroundImage', 'url("../img/content/51-pink.png")');
					break;

			}
		}

		if (currCount == 101) {
			switch (currColor) {

				case 'Красный':
					calcFrameImg.css('backgroundImage', 'url("../img/content/101-red.png")');
					break;

				case 'Желтый':
					calcFrameImg.css('backgroundImage', 'url("../img/content/101-yellow.png")');
					break;

				case 'Белый':
					calcFrameImg.css('backgroundImage', 'url("../img/content/101-white.png")');
					break;

				case 'Розовый':
					calcFrameImg.css('backgroundImage', 'url("../img/content/101-pink.png")');
					break;

			}
		}
	});

	function calcCountPrice(count, size, pack) {
		var rez = void 0;

		switch (size) {
			case '40см':
				rez = 130 * count;
				break;

			case '50см':
				rez = 160 * count;
				break;

			case '60см':
				rez = 170 * count;
				break;

			case '90см':
				rez = 250 * count;
				break;
		}

		if (pack === 'Крафт') {
			rez += 150;
		}

		return rez;
	}

	// Initial value
	calcForm.trigger('change');

	// ========>> GALLERY <<========

	var gallery = $('.gallery'),
	    galleryContentWrap = $('.gallery__content-wrap'),
	    galleryClose = $('.gallery__close'),
	    galleryOpen = $('.gallery__open-btn');

	var galleryTrigger = function galleryTrigger(event) {
		if (event == 'hide') {
			galleryContentWrap.fadeOut(200);
			$(document.documentElement).removeClass('modal-open');
		} else if (event == 'show') {
			galleryContentWrap.fadeIn(250);
			$(document.documentElement).addClass('modal-open');
		}
	};

	galleryOpen.on('click', function () {
		galleryTrigger('show');
	});

	galleryContentWrap.on('click', function (e) {
		if ($(e.target)[0] == galleryContentWrap[0]) {
			galleryTrigger('hide');
		}
	});

	galleryClose.on('click', function (e) {
		galleryTrigger('hide');

		$('html, body').stop().animate({
			scrollTop: $('.order__frame').offset().top - 25
		}, 300);
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