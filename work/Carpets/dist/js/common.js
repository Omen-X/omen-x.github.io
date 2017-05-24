'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable */

// ========>> ARRAY.FROM POLYFILL <<========

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

// ========>> PARALLAX-1 <<========

// Polyfill for requestAnimationFrame
// via: https://gist.github.com/paulirish/1579671

(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = window.setTimeout(function () {
			callback(currTime + timeToCall);
		}, timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	};

	if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
		clearTimeout(id);
	};
})();

// Parallax 1

function parallax1() {
	if ($('.parallax-1').length) {
		var scrollTop = $(window).scrollTop();
		var bubbles = document.querySelectorAll('.parallax-1 .bubble');

		[].concat(_toConsumableArray(bubbles)).map(function (e, i) {
			e.style.top = -scrollTop * ((i + 1) * 0.05) + 'px';
		});
	}
}

// Parallax 2

// initial bubbles placing
function parallax2Config() {
	if ($('.parallax-2').length) {

		var bubbles = document.querySelectorAll('.parallax-2 .bubble');

		var config = [{ width: 110, left: 40, top: 820 }, { width: 180, left: 150, top: 620 }, { width: 30, left: 280, top: 860 }, { width: 100, left: 540, top: 910 }, { width: 60, left: 770, top: 880 }, { width: 35, left: 860, top: 900 }, { width: 60, left: 1270, top: 880 }, { width: 120, left: 1500, top: 780 }, { width: 70, left: 1600, top: 610 }, { width: 110, left: 1550, top: 445 }, { width: 35, left: 1690, top: 560 }, { width: 96, left: 1750, top: 720 }, { width: 200, left: 1760, top: 830 }, { width: 120, left: 190, top: 1010 }, { width: 70, left: 30, top: 1200 }, { width: 60, left: 270, top: 1160 }, { width: 70, left: 1700, top: 1080 }, { width: 50, left: 1800, top: 1180 }, { width: 100, left: 1870, top: 1150 }, { width: 120, left: 30, top: 1500 }, { width: 220, left: 200, top: 1400 }, { width: 70, left: 600, top: 1570 }, { width: 170, left: 900, top: 1400 }, { width: 100, left: 1400, top: 1500 }, { width: 150, left: 1650, top: 1320 }, { width: 80, left: 1800, top: 1500 }];

		// mobile config
		if (window.matchMedia('(max-width: 1199px)').matches) {
			config = [{ width: 25, left: 40, top: 820 }, { width: 60, left: 150, top: 620 }, { width: 30, left: 280, top: 860 }, { width: 30, left: 540, top: 910 }, { width: 60, left: 770, top: 880 }, { width: 35, left: 860, top: 900 }, { width: 60, left: 1270, top: 880 }, { width: 40, left: 1500, top: 780 }, { width: 70, left: 1600, top: 610 }, { width: 50, left: 1550, top: 445 }, { width: 35, left: 1690, top: 560 }, { width: 96, left: 1750, top: 720 }, { width: 25, left: 1760, top: 830 }, { width: 66, left: 190, top: 1010 }, { width: 70, left: 30, top: 1200 }, { width: 60, left: 270, top: 1160 }, { width: 70, left: 1700, top: 1080 }, { width: 50, left: 1800, top: 1180 }, { width: 30, left: 1870, top: 1150 }, { width: 40, left: 30, top: 1500 }, { width: 50, left: 200, top: 1400 }, { width: 70, left: 600, top: 1570 }, { width: 15, left: 900, top: 1400 }, { width: 20, left: 1400, top: 1500 }, { width: 30, left: 1650, top: 1320 }, { width: 80, left: 1800, top: 1500 }];
		}

		[].concat(_toConsumableArray(bubbles)).map(function (e, i) {
			if ($(e).css('display') !== 'none') {
				$(e).css({
					'background-size': config[i].width + 'px  auto',
					'background-position': config[i].left / 1920 * 100 + '% ' + config[i].top + 'px'
				});
			}
		});
	}
}

function parallax2() {
	if ($('.parallax-2').length) {
		var scrollTop = $(window).scrollTop();
		var offsetTop = $('.parallax-2').offset().top + 200;
		var bubbles = document.querySelectorAll('.parallax-2 .bubble');

		// parallax on curr section
		if (scrollTop >= offsetTop) {
			[].concat(_toConsumableArray(bubbles)).map(function (e, i) {
				if ($(e).css('display') !== 'none') {
					e.style.top = -(scrollTop - offsetTop) * (i * 3 * 0.01) + 'px';
				}
			});
		}
	}
}

// Parallax 3

// initial bubbles placing
function parallax3Config() {
	if ($('.parallax-3').length) {

		var bubbles = document.querySelectorAll('.parallax-3 .bubble');

		var config = [{ width: 35, left: 100, bottom: 580 }, { width: 25, left: 190, bottom: 450 }, { width: 65, left: 200, bottom: 390 }, { width: 100, left: 1000, bottom: 50 }, { width: 120, left: 35, bottom: 200 }, { width: 75, left: 700, bottom: 360 }, { width: 70, left: 80, bottom: 30 }, { width: 70, left: 600, bottom: 190 }, { width: 20, left: 800, bottom: 80 }, { width: 190, left: 1600, bottom: 50 }, { width: 90, left: 1650, bottom: 400 }, { width: 40, left: 1400, bottom: 300 }, { width: 230, left: 200, bottom: 150 }, { width: 70, left: 530, bottom: 20 }, { width: 180, left: 955, bottom: 250 }, { width: 100, left: 1300, bottom: 240 }, { width: 30, left: 1700, bottom: 300 }, { width: 70, left: 1400, bottom: 130 }, { width: 30, left: 1500, bottom: 70 }];

		// mobile config
		if (window.matchMedia('(max-width: 1199px)').matches) {
			config = [{ width: 35, left: 100, bottom: 580 }, { width: 25, left: 190, bottom: 450 }, { width: 65, left: 200, bottom: 390 }, { width: 70, left: 1000, bottom: 50 }, { width: 30, left: 35, bottom: 200 }, { width: 75, left: 700, bottom: 360 }, { width: 70, left: 80, bottom: 30 }, { width: 70, left: 600, bottom: 190 }, { width: 20, left: 800, bottom: 80 }, { width: 25, left: 1600, bottom: 50 }, { width: 90, left: 1650, bottom: 400 }, { width: 40, left: 1400, bottom: 300 }, { width: 50, left: 200, bottom: 150 }, { width: 70, left: 530, bottom: 20 }, { width: 30, left: 955, bottom: 250 }, { width: 45, left: 1300, bottom: 240 }, { width: 30, left: 1700, bottom: 300 }, { width: 70, left: 1400, bottom: 130 }, { width: 30, left: 1500, bottom: 70 }];
		}

		[].concat(_toConsumableArray(bubbles)).map(function (e, i) {
			if ($(e).css('display') !== 'none') {
				$(e).css({
					'background-size': config[i].width + 'px  auto',
					'background-position': 'left ' + config[i].left / 1920 * 100 + '% bottom ' + config[i].bottom + 'px'
				});
			}
		});
	}
}

function parallax3() {
	if ($('.parallax-3').length) {
		var scrollTop = $(window).scrollTop();
		var offsetTop = $('.parallax-3').offset().top + $('.parallax-3').height() * 0.5;
		var bubbles = document.querySelectorAll('.parallax-3 .bubble');

		// parallax on curr section
		if (scrollTop >= offsetTop) {
			[].concat(_toConsumableArray(bubbles)).map(function (e, i) {
				if ($(e).css('display') !== 'none') {
					e.style.top = -(scrollTop - offsetTop) * (i * 3 * 0.01) + 'px';
				}
			});
		}
	}
}

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
		e.preventDefault();
		$.ajax({
			url: 'mail.php',
			type: 'POST',
			data: $(this).serialize()
		}).done(function () {
			// callback.fadeOut(200);
			// callbackThank.fadeIn(200);
			// setTimeout(function() {
			//    callbackThank.fadeOut(200);
			// }, 1500);
			$(".form").trigger("reset");
		}).fail(function () {
			$(".form").trigger("reset");
			alert("Ошибка отправки формы");
		});
	});

	// ========>> FUNCTIONS CALL <<========

	parallax2Config();
	parallax3Config();
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
	requestAnimationFrame(parallax1); // call parallax() on next available screen paint
	requestAnimationFrame(parallax2);
	requestAnimationFrame(parallax3);
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