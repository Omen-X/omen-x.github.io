'use strict';

/* eslint-disable */

// ========>> Array.from POLYFILL <<========

if (!Array.from) {
	Array.from = function () {
		var toStr = Object.prototype.toString;
		var isCallable = function isCallable(fn) {
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
		};
		var toInteger = function toInteger(value) {
			var number = Number(value);
			if (isNaN(number)) {
				return 0;
			}
			if (number === 0 || !isFinite(number)) {
				return number;
			}
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function toLength(value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};

		// Свойство length метода from равно 1.
		return function from(arrayLike /*, mapFn, thisArg */) {
			// 1. Положим C равным значению this.
			var C = this;

			// 2. Положим items равным ToObject(arrayLike).
			var items = Object(arrayLike);

			// 3. ReturnIfAbrupt(items).
			if (arrayLike == null) {
				throw new TypeError('Array.from requires an array-like object - not null or undefined');
			}

			// 4. Если mapfn равен undefined, положим mapping равным false.
			var mapFn = arguments[1];
			if (typeof mapFn !== 'undefined') {
				mapFn = arguments.length > 1 ? arguments[1] : void undefined;
				// 5. иначе
				// 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
				if (!isCallable(mapFn)) {
					throw new TypeError('Array.from: when provided, the second argument must be a function');
				}

				// 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
				if (arguments.length > 2) {
					T = arguments[2];
				}
			}

			// 10. Положим lenValue равным Get(items, "length").
			// 11. Положим len равным ToLength(lenValue).
			var len = toLength(items.length);

			// 13. Если IsConstructor(C) равен true, то
			// 13. a. Положим A равным результату вызова внутреннего метода [[Construct]]
			//     объекта C со списком аргументов, содержащим единственный элемент len.
			// 14. a. Иначе, положим A равным ArrayCreate(len).
			var A = isCallable(C) ? Object(new C(len)) : new Array(len);

			// 16. Положим k равным 0.
			var k = 0;
			// 17. Пока k < len, будем повторять... (шаги с a по h)
			var kValue;
			while (k < len) {
				kValue = items[k];
				if (mapFn) {
					A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				} else {
					A[k] = kValue;
				}
				k += 1;
			}
			// 18. Положим putStatus равным Put(A, "length", len, true).
			A.length = len;
			// 20. Вернём A.
			return A;
		};
	}();
}

// ========>> DEFAULT VARIABLES <<========

// Define touch devices
var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

// ========>> FIXED HEADER <<========

function fixedHeader() {
	var scrollTop = $(window).scrollTop();
	var header = $('.header');

	scrollTop > 0 ? header.addClass('fixed') : header.removeClass('fixed');
}

// ========>> SCROLL TO TOP <<========

var toTop = $('#to-top');

toTop.on('click', function () {
	$('html, body').animate({ scrollTop: 0 }, 550);
});

window.addEventListener('scroll', function (e) {});

function showScroll() {
	if (window.pageYOffset > document.documentElement.clientHeight) {
		toTop.addClass('to-top_visible');
	} else {
		toTop.removeClass('to-top_visible');
	}
}

// ========>> DOCUMENT READY <<========

$(function () {

	// Preloader

	$('#loader').fadeOut(200);
	setTimeout(function () {
		$('#loader').remove();
	}, 210);

	// ========>> MAIN NAV <<========

	var navList = $('nav .nav__list'),
	    navButton = $('nav .nav__mob-button'),
	    navShade = $('nav .nav__overlay');

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

	// Anchors

	var navLinks = $('.header .nav__list a');

	navLinks.on('click', function (e) {
		e.preventDefault();
		var section = $(this).attr('href');

		if (window.matchMedia('(max-width: 767px)').matches) {
			navToggle();
		}

		// advantages have negative margin
		if (section === '#advantages') {
			$('html, body').stop().animate({
				scrollTop: $(section).offset().top + $('.main').width() * 0.26 - 100
			}, 600);
		} else {
			$('html, body').stop().animate({
				scrollTop: $(section).offset().top - 70
			}, 600);
		}
	});

	// ========>> FORM <<========

	var feedback = $('.form');

	feedback.submit(function (e) {
		var formThank = $('.form__thank', e.target);
		e.preventDefault();

		$.ajax({
			url: 'mail.php',
			type: 'POST',
			data: $(this).serialize()
		}).done(function () {
			formThank.addClass('active');
			setTimeout(function () {
				formThank.removeClass('active');
			}, 1500);
			$(".form").trigger("reset");
		}).fail(function () {
			$(".form").trigger("reset");
			alert("Ошибка отправки формы");
		});
	});

	// ========>> BUBBLES <<========

	if (window.matchMedia('(min-width: 899px)').matches) {
		var SoapBubbleSource1 = $().BubbleEngine({
			particleSizeMin: 0,
			particleSizeMax: 160,
			particleSourceX: $('.main').width() * 0.5,
			particleSourceY: 700,
			particleAnimationDuration: 8000,
			particleAnimationVariance: 4000,
			particleScatteringX: 1500,
			particleScatteringY: 1200,
			particleDirection: 'center' /* 'right', 'left', 'center'*/
			, gravity: -100,
			imgSource: 'img/decor/bubbles/bubble.png',
			RenewBubbles: 'on' });

		var SoapBubbleSource2 = $().BubbleEngine({
			particleSizeMin: 0,
			particleSizeMax: 160,
			particleSourceX: $('.main').width() * 0.5,
			particleSourceY: $('.advantages__quote').offset().top,
			particleAnimationDuration: 8000,
			particleAnimationVariance: 4000,
			particleScatteringX: 1500,
			particleScatteringY: 1200,
			particleDirection: 'center' /* 'right', 'left', 'center'*/
			, gravity: -100,
			imgSource: 'img/decor/bubbles/bubble.png',
			RenewBubbles: 'on'
		});

		var SoapBubbleSource3 = $().BubbleEngine({
			particleSizeMin: 0,
			particleSizeMax: 160,
			particleSourceX: $('.main').width() * 0.5,
			particleSourceY: $('.tech__quote').offset().top,
			particleAnimationDuration: 8000,
			particleAnimationVariance: 4000,
			particleScatteringX: 1500,
			particleScatteringY: 1200,
			particleDirection: 'center' /* 'right', 'left', 'center'*/
			, gravity: -100,
			imgSource: 'img/decor/bubbles/bubble.png',
			RenewBubbles: 'on'
		});
		//Add Bubbles to Source ---------------------------------------------
		SoapBubbleSource1.addBubbles(35);
		SoapBubbleSource2.addBubbles(35);
		SoapBubbleSource3.addBubbles(35);
	}

	// ========>> FUNCTIONS CALL <<========

	showScroll();
	fixedHeader();

	// ========>> RESIZE <<========


	$(window).on('resize', function () {

		// main nav
		if ($(window).width() >= 768) {
			$(navList).addClass('animate');
			$(navShade).css('display', '');
		}
	}).resize(); // end resize
}); // end document ready


// ========>> SCROLL <<========

$(window).on('scroll', function () {
	showScroll();
	fixedHeader();
});

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