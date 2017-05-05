'use strict';

/* eslint-disable */
// ========>> DEFAULT VARIABLES <<========

// Define touch devices
var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

// ========>> FUNCTIONS <<========


// ========>> SEARCH <<========

var searchTrigger = $('.search__trigger'),
    searchForm = $('.search form'),
    searchInput = $('#search-input');

searchTrigger.on('click', function () {
	searchForm.toggleClass('hidden');

	if (!searchForm.hasClass('hidden')) {
		searchInput.focus();
	}
});

// ========>> MAIN NAV <<========

function mainNav() {
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
}

// ========>> WELCOME CAROUSEL <<========

function welcomeCarousel() {
	if ($('.welcome-carousel').length) {
		$('.welcome-carousel').slick({
			infiniti: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: false,
			fade: true,
			autoplay: true,
			autoplaySpeed: 4000,
			speed: 1100,
			cssEase: 'cubic-bezier(.38,.2,.25,.97)'
		});
	}
}

// ========>> FIXED HEADER <<========

function fixedHeader() {
	$('.header__nav').stick_in_parent({
		parent: $('body')
	});
}

// ========>> FIXED SIDEBAR <<========

function fixedSidebar() {
	if ($('.sidebar').length) {
		$('.sidebar-content').stick_in_parent({
			offset_top: 70
		});
	}
}

// ========>> CLIENTS CAROUSEL <<========

function clientsCarousel() {
	if ($('.clients-carousel').length) {
		$('.clients-carousel').slick({
			infiniti: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			dots: false,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 1100,
			cssEase: 'cubic-bezier(.38,.2,.25,.97)',
			responsive: [{
				breakpoint: 599,
				settings: {
					slidesToShow: 2
				}
			}]
		});
	}
}

// ========>> LIFE GALLERY <<========

function lifeGallery() {
	if ($('.life__gallery').length) {
		if (window.matchMedia('(max-width: 1199px)').matches) {
			$('.grid').masonry({
				itemSelector: '.life__gallery-item',
				columnWidth: '.life__gallery-item',
				gutter: 20,
				percentPosition: true
			});
		} else {
			$('.grid').masonry({
				itemSelector: '.life__gallery-item',
				columnWidth: '.life__gallery-item',
				gutter: 30,
				percentPosition: true
			});
		}
	}
}

// ========>> SCROLL TO TOP BUTTON <<========

var toTop = $('#to-top');

function scrollToTop() {
	toTop.on('click', function () {
		$('html, body').animate({ scrollTop: 0 }, 550);
	});
}

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

	// ========>> FUNCTIONS CALL <<========

	mainNav();
	welcomeCarousel();
	fixedHeader();
	clientsCarousel();
	fixedSidebar();
	lifeGallery();
	showScroll();
	scrollToTop();

	// ========>> RESIZE <<========

	window.addEventListener('scroll', function (e) {
		showScroll();
	});

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