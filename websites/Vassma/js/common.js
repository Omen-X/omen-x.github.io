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

	// Mobile catalog

	var mobCatButton = $('.header .nav__list > li:nth-child(3) > a');
	var mobCatList = $('.header .nav__list > li:nth-child(3) ul');

	mobCatButton.on('click', function (e) {
		e.preventDefault();
		mobCatButton.toggleClass('active');
		mobCatList.slideToggle(250);
	});
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

// ========>> SIDEBAR <<========

function sidebar() {
	if ($('.sidebar').length) {
		var sidebarCatItems = $('.sidebar-block__list > li');
		var sidebarCatSubLists = $('.sidebar-block__list .sidebar-block__sublist');
		var sidebarCatLink = $('.sidebar-block__list > li > a');

		sidebarCatLink.on('click', function (e) {
			e.preventDefault();
			var currSidebarListItem = $(e.target).closest('li');
			var currSidebarSubList = $(e.target).siblings('.sidebar-block__sublist');

			sidebarCatSubLists.stop().slideUp(250);

			if (currSidebarListItem.hasClass('active')) {
				currSidebarListItem.removeClass('active');
			} else {
				sidebarCatItems.removeClass('active');
				currSidebarListItem.addClass('active');
			}

			currSidebarSubList.stop().slideToggle(250);
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

// ========>> ANIMATION <<========

function mainAnimation() {
	if (window.matchMedia('(min-width: 993px)').matches) {

		// Initialization
		var animItems = ['.choice', '.principles', '.result', '.feck'];

		animItems.map(function (item) {
			$(item).addClass('animate');
		});

		setTimeout(function () {
			animItems.map(function (item) {
				$(item).addClass('transition');
			});
		}, 0);

		// Choice section

		if ($('.choice').length) {
			var choiceSect = $('.choice');
			var choicePaper = $('.choice__paper');
			var choiceListItem = $('.choice__list li');

			var choiceWaypoint = $('.choice').waypoint({
				handler: function handler() {
					// paper
					TweenMax.to(choicePaper, 1, {
						transform: 'translateY(0)',
						opacity: 1,
						onComplete: function onComplete() {
							choiceSect.removeClass('animate');
						},
						ease: Power2.easeOut
					});

					this.destroy();
				},
				offset: '20%'
			});
		} // end choice

		// Principles section

		if ($('.principles').length) {
			var principles = $('.principles');
			var principlesItems = [$('.principles__item:nth-child(1)', principles), $('.principles__item:nth-child(2)', principles), $('.principles__item:nth-child(3)', principles)];

			var principlesWaypoint = principles.waypoint({
				handler: function handler() {
					TweenMax.staggerTo(principlesItems, .8, {
						transform: 'translateY(0)',
						opacity: 1
					}, .2);

					this.destroy();
				},
				offset: '50%'
			});
		} // end principles section


		// Result seciton

		if ($('.result').length) {
			var resultSect = $('.result');
			var resultTitle = $('.result__title');
			var resultListItems = $('.result__list li');
			var resultImg = $('.result__img');

			var resultWaypoint = resultSect.waypoint({
				handler: function handler() {
					TweenMax.to(resultImg, .9, {
						transform: 'translateX(0)',
						opacity: 1
					});

					TweenMax.to(resultTitle, .9, {
						transform: 'translateX(0)',
						opacity: 1,
						onComplete: function onComplete() {
							TweenMax.staggerTo(resultListItems, .7, {
								opacity: 1,
								transform: 'transformY(0)'
							}, .2);
						}
					});

					this.destroy();
				},
				offset: '60%'
			});
		} // end result section

		// Feck section

		if ($('.feck')) {
			var feckSect = $('.feck');
			var feckItems = $('.feck__item');

			var feckWaypoint = feckSect.waypoint({
				handler: function handler() {
					TweenMax.staggerTo(feckItems, .5, {
						opacity: 1,
						transform: 'translateX(0) scale(1)'
					}, .10);

					this.destroy();
				},
				offset: '50%'
			});
		} // end feck section
	} // end media query
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
	sidebar();
	mainAnimation();

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

$("img").on("dragstart", function (event) {
	event.preventDefault();
});