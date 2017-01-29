
// Add animate classes

$('.advantages__item').addClass('rotate');

$('.sponsor__logo:first-child, .sponsor__logo:last-child').addClass('transform');
$('.sponsor__logo:nth-child(2)').addClass('opac');

$('.map-wrap').addClass('opac');
$('.map__contact').addClass('scale');

var version = detectIE();


//________ DOCUMENT READY ________


$(document).ready(function() {

	// Loader

	$('.loader').fadeOut(100);
	setTimeout(function() {
		$('.loader').remove();
	}, 210);


	// Scroll
	const toTop = document.getElementById('scroll-top');

	toTop.addEventListener('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 550);
	});

	// Header menu

	var mainNavList = $('#main-nav__list');
	var respButton = $(".responsive-button");
	var closeButton = $('.nav__close');

	respButton.on('click', function () {
		mainNavList.slideToggle('500');
		respButton.hide();
		closeButton.show();
	});

	closeButton.on('click', function () {
		mainNavList.slideToggle('500');
		respButton.show();
		closeButton.hide();
	});


	// Timer

	if (!version) {
		$('.timer__days .timer__value').text('22');

		var deadline = 'December 31 2045 23:59:59 GMT+03:00';

		function getTimeRemaining(endtime){
			var t = Date.parse(endtime) - Date.parse(new Date());
			var seconds = Math.floor( (t/1000) % 60 );
			var minutes = Math.floor( (t/1000/60) % 60 );
			var hours = Math.floor( (t/(1000*60*60)) % 24 );
			var days = Math.floor( t/(1000*60*60*24) );
			return {
				'total': t,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		}

		function updateTimer() {
			var t = getTimeRemaining(deadline);
			let tHours = document.querySelector('.timer__hours .timer__value');
			let tMins = document.querySelector('.timer__minutes .timer__value');
			let tSecs = document.querySelector('.timer__seconds .timer__value');

			tHours.textContent = ('0' + t.hours).slice(-2);
			tMins.textContent = ('0' + t.minutes).slice(-2);
			tSecs.textContent = ('0' + t.seconds).slice(-2);

			if (t.total <= 0) {
				clearInterval(timerInterval);
			}
		}

		updateTimer();
		var timerInterval = setInterval(updateTimer, 1000);
		
	}



	// end Timer

	// Form-event

	$('#form-event').submit(function () {
		$.ajax({
			url: 'mail.php',
			type: 'POST',
			data: $(this).serialize()
		})
		.done(function() {
			$(this).find("input").val("");
			alert("success");
			$("#form").trigger("reset");
		})
		.fail(function() {
			alert("error");
		});
	});

	$('#trigger').on('click', function() {
		$('.welcome__form').append('<div class="shadow"></div>');
		$('.shadow').fadeIn(300);
		$('.welcome__form').slideToggle(300);

		const shadow = document.querySelector('.shadow');
		shadow.addEventListener('click', function(e) {
			if (e.target == this) {
				$('.welcome__form').hide();
				$('.shadow').remove();
			}
		});

	});

	// Margins for speaker item

	function speakerMargin() {
		let padding = (parseInt($('.speakers .col-md-4').css('width'), 10) - parseInt($('.speaker').css('width'), 10));

		$('.speaker').removeClass('no-js');
		$('.speaker').css('marginBottom', padding);
	}

	if(window.matchMedia('(min-width: 576px)').matches){
		speakerMargin();
	}



	// Speaker hover

	function isMouse() {
		if(window.matchMedia('(min-width: 993px)').matches){
			$('.speaker__img').removeClass('no-js');
			document.body.removeEventListener('mousemove', isMouse, false);
		}
	}

	document.body.addEventListener('mousemove', isMouse, false);



	// Waypoints

	const welcome = $('.main-info-wrap').waypoint(function () {
		$('.advantages__item').removeClass('rotate');
	});


	const sponsorLogos = $('.sponsor').waypoint(function () {
		$('.sponsor__logo').removeClass('transform opac');
	},{
		offset: '30%'
	});


	const map = $('.map-wrap').waypoint(function () {
		$('.map__contact').removeClass('scale');
		$('.map-wrap').removeClass('opac');
	}, {
		offset: '50%'
	});

	if (version) {
		var eventImg = $('.events__img');
		var options = {
			width: '50% !important',
			textAlign: 'center',
			maxHeight: '300px',
			overflow: 'hidden',
		};

		eventImg.css(options);

	}


//________ RESIZE ________

$(window).on('resize', function() {

	// Main-nav

	if ($(window).width() > 767) {
		$('.main-nav__list').css('display', '');
	}

	// Header menu

	if ($(window).width() > 767) {
		$(mainNavList).css('display', '');
		$('.welcome__form').css('display', '');
		$('.nav__close').css('display', '');
	}

	// Margins for speaker item

	if(window.matchMedia('(min-width: 576px)').matches){
		speakerMargin();
	}


}).resize();   // end resize

});   // end document ready




// Get IE or Edge browser version

function detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  
  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  
  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

