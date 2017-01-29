'use strict';

// ========>> DEFAULT VARIABLES <<========

// Define touch devices
var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

// Load img for slidebar

var imgSrc = ['img/decor/sect-ico-1_dark.png', 'img/decor/sect-ico-2.png', 'img/decor/sect-ico-3.png', 'img/decor/sect-ico-4.png'];

var imgItems = [];

imgSrc.forEach(function (val, i) {
	var img = new Image();
	img.src = val;
	imgItems.push(img);
});

// ========>> DOCUMENT READY <<========


$(document).ready(function () {

	// Loader

	$('#loader').fadeOut(200);
	setTimeout(function () {
		$('#loader').remove();
	}, 210);

	// ========>> ANIMATION <<========

	var removeClasses = ['.sidebar__link', '.sidebar__item-title'];

	removeClasses.forEach(function (select) {
		$(select).removeClass('animate');
	});

	// ========>> FIXED HEADER <<========

	var headerTop = $('.header__top');
	var sidebar = $('.sidebar');

	function fixHeader() {
		if ($(window).scrollTop() > 1) {
			headerTop.addClass('fix');
			sidebar.addClass('fix');
		} else {
			headerTop.removeClass('fix');
			sidebar.removeClass('fix');
		}
	}
	fixHeader();

	// ========>> SIDEBAR LINKS <<========

	var sideLinks = $('.sidebar__link', '.sidebar');
	var headerHeight = $('.header__top').height();
	var sections = $('.sect');

	sideLinks.on('click', function (e) {
		e.preventDefault();
		var section = $(this).attr('href');

		if (window.matchMedia('(max-width: 993px)').matches) {
			headerHeight = $('.sidebar').height() + 15;
		}

		$('.sidebar__item').removeClass('active');
		$(this).closest('.sidebar__item').addClass('active');

		$('html, body').stop().animate({
			scrollTop: $(section).offset().top - headerHeight - 24
		}, 300);
	});

	// change active item on sidebar when scrolling
	function currSect(scrollTop) {
		sections.each(function (i, e) {

			if (scrollTop >= $(this).offset().top - headerHeight - 25 && scrollTop <= $(this).offset().top - headerHeight - 25 + $(this).height()) {

				$('.sidebar__item').removeClass('active');
				$(sideLinks[i]).closest('.sidebar__item').addClass('active');
			}
		});
	}

	// ========>> PRODUCTS COUNTERS <<========

	$('.product__count-btn:first-child').on('click', function (e) {
		var counter = $(this).siblings('.product__count-value');
		var currVal = counter.text();

		if (currVal < 10) {
			counter.text(++currVal);
		}
	});

	$('.product__count-btn:last-child').on('click', function (e) {
		var counter = $(this).siblings('.product__count-value');
		var currVal = counter.text();

		if (currVal > 1) {
			counter.text(--currVal);
		}
	});

	// ========>> SCROLL BUTTON <<========

	var toTop = $('#to-top');

	toTop.on('click', function () {
		$('html, body').stop().animate({ scrollTop: 0 }, 550);
	});

	function showScroll() {
		if (window.pageYOffset > document.documentElement.clientHeight) {
			toTop.addClass('to-top_visible');
		} else {
			toTop.removeClass('to-top_visible');
		}
	}

	showScroll();

	// ========>> SCROLL <<========

	var didScroll = false;
	window.onscroll = windowScroll;

	function windowScroll() {
		var scrollTop = $(window).scrollTop();
		didScroll = true;

		fixHeader();
		showScroll();
		currSect(scrollTop);
	}

	setInterval(function () {
		if (didScroll) {
			didScroll = false;
		}
	}, 200);

	// ========>> RESIZE <<========


	$(window).on('resize', function () {}).resize(); // end resize
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