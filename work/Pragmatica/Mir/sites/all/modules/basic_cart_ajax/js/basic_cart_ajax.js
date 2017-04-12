//

(function ($) {

	$.fn.numberMask = function(options) {
		var settings = {type:'int',beforePoint:10,afterPoint:2,defaultValueInput:0,decimalMark:'.',pattern:''},
			onKeyPress = function(e){
				var k = e.which;

				if (e.ctrlKey || e.altKey || e.metaKey || k<32) {//Ignore
					return true;
				} else if (k) {
						var c = String.fromCharCode(k);
						var value = e.target.value;
						var selectionParam = getSelection(e.target);
					    if(selectionParam.statusSelection) {
							value = value.substring(0,selectionParam.start) + c + value.substring(selectionParam.end);
						} else {
							value += c;
						}

						if((typeof settings.pattern == "object") && (settings.pattern instanceof RegExp)) {
							var re = settings.pattern;
						} else {
							if(settings.type == 'int') {
								var re = new RegExp("^\\d{1,"+settings.beforePoint+"}$", "ig");
							} else if(settings.type == 'float') {
								var re = new RegExp("^\\d{1,"+settings.beforePoint+"}$|^\\d{1,"+settings.beforePoint+"}\\"+settings.decimalMark+"\\d{0,"+settings.afterPoint+"}$", "ig");
							} else if(settings.type == 'pos-int'){
								var re = new RegExp("^\[123456789]+[0-9]*$", "ig");
							}
						}
						return	re.test(value);
				}
			},
			onKeyUp = function(e) {
				var input = $(e.target);
				if(e.which == 13 ||e.which == 86) {
					 input.val(formattedNumber(input));
				}
			},
			getSelection = function(el) {
				 var start = 0, end = 0, normalizedValue, range,
					textInputRange, len, endRange,statusSelection = false;

				if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
					start = el.selectionStart;
					end = el.selectionEnd;
				} else {
					range = document.selection.createRange();

					if (range && range.parentElement() == el) {
						len = el.value.length;
						normalizedValue = el.value.replace(/\r\n/g, "\n");

						// Create a working TextRange that lives only in the input
						textInputRange = el.createTextRange();
						textInputRange.moveToBookmark(range.getBookmark());

						// Check if the start and end of the selection are at the very end
						// of the input, since moveStart/moveEnd doesn't return what we want
						// in those cases
						endRange = el.createTextRange();
						endRange.collapse(false);

						if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
							start = end = len;
						} else {
							start = -textInputRange.moveStart("character", -len);
							start += normalizedValue.slice(0, start).split("\n").length - 1;

							if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
								end = len;
							} else {
								end = -textInputRange.moveEnd("character", -len);
								end += normalizedValue.slice(0, end).split("\n").length - 1;
							}
						}
					}
				}
				if((start-end)!=0) {
					statusSelection = true;
				}
				return {
					start: start,
					end: end,
					statusSelection :statusSelection
				};
			},
			onBlur = function(e) {
				var input = $(e.target);
				if(input.val() != '') {
					input.val(formattedNumber(input));
				}
			},
			formattedNumber = function($input) {
				var val = $input.val();
				if((typeof settings.pattern == "object") && (settings.pattern instanceof RegExp)) {
							var re = settings.pattern;
							if(re.test(val)) {
								return val;
							} else {
								return settings.defaultValueInput;
							}
				} else {
					if(settings.type == 'int') {
						var re = new RegExp("^\\d{1,"+settings.beforePoint+"}$", "ig");
						if(re.test(val)) {
								return val;
							} else {
								return settings.defaultValueInput;
						}
					} else {
						var re = new RegExp("^\\d{1,"+settings.beforePoint+"}$|^\\d{1,"+settings.beforePoint+"}\\"+settings.decimalMark+"\\d{1,"+settings.afterPoint+"}$", "ig");
						if(re.test(val)) {
								return val;
							} else {
								return settings.defaultValueInput;
						}
					}
				}
			}
		this.bind('keypress',onKeyPress).bind('keyup',onKeyUp).bind('blur',onBlur);
		if (options) {
			$.extend(settings, options);
		}
		return this;
	};
	
	Drupal.basic_cart_ajax = {};
	
	Drupal.basic_cart_ajax.hide_on_cart_add_splash = function(){
		$('.basic-cart-on-cart-add-splash').hide();
	}
	
	Drupal.basic_cart_ajax.show_on_cart_add_splash = function(ajax, response, status) {
	    $('.basic-cart-on-cart-add-splash').show();
	    
	    setTimeout(Drupal.basic_cart_ajax.hide_on_cart_add_splash, 3000);

	};
	
	Drupal.ajax.prototype.commands.show_added_to_cart_splash = Drupal.basic_cart_ajax.show_on_cart_add_splash;
	
	//basic-cart-on-cart-add-splash
	
	Drupal.behaviors.basic_cart_ajax = {
		attach: function (context) {
			
			$('.basic-cart-on-cart-add-splash').once('basic-cart-on-cart-add-splash-processed', function(){
				
				var $splash_container = $(this);
				
				var $splash_close_button = $('.splash-close-button', $splash_container);
				
				$splash_close_button.click(function(){
					$splash_container.hide();
				});
			});
			
			$('.basic-cart-item-count-edit').numberMask({type:'pos-int'});
			$('.basic-cart-item-count-edit').change(function(){
				if(this.value == ''){
					this.value = 1;
				}
			});
			
		}
	};
	
})(jQuery);