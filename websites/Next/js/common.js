'use strict';

// ========>> FUNCTIONS <<========

// ========>> MAIN GALLERY <<========

function mainGallery() {
  if ($('.gallery').length) {
    $('.gallery').lightGallery({
      loop: false,
      getCaptionFromTitleOrAlt: false
    });
  }
}

// ========>> DOCUMENT READY <<========

function documentReady() {

  // ========>> FORMS <<========

  var $form = $('.form');
  var $formMain = $('.form-main');
  var $formWrap = $('.form-wrap');
  var $formFields = $('.form-main__fields > *', $formMain);
  var $formTrigger = $('.form-trigger');
  var $formMainTitle = $('.form-main__title');
  var $formMainBtn = $('.btn-main', $formMain);
  // title for email
  var title = '';

  function hideFields() {
    $formFields.each(function (i, field) {
      field.setAttribute('disabled', '');
      field.classList.add('hidden');
    });
  }
  hideFields();

  $formWrap.on('click', function (event) {
    if ($(event.target).hasClass('form-wrap') || $(event.target).hasClass('form-main__close')) {
      $(this).fadeOut(200);
      $(document.documentElement).removeClass('modal-open');
    }
  });

  $formTrigger.on('click', function (event) {
    hideFields();
    title = '';
    $formMain.trigger('reset');

    var target = event.target;
    var currFieldsName = target.getAttribute('data-fields').split(',');
    var currTitle = target.getAttribute('data-title');
    var currBtnText = target.getAttribute('data-btn-text');
    var currEmailTitle = target.getAttribute('data-email-title');

    // Set current titles
    if (currTitle) $formMainTitle.html(currTitle);
    if (currBtnText) $formMainBtn.text(currBtnText);
    if (currEmailTitle) title = currEmailTitle;

    // Enable current fields
    $formFields.each(function (i, field) {
      if (currFieldsName.indexOf(field.getAttribute('name')) !== -1) {
        field.removeAttribute('disabled');
        field.classList.remove('hidden');
      }
    });

    $formWrap.fadeIn(200);
    $(document.documentElement).addClass('modal-open');
  });

  $form.submit(function (event) {
    var $target = $(event.target);
    event.preventDefault();

    if ($target.hasClass('feedback-form')) title = 'Вопрос';

    $.ajax({
      url: './mail.php',
      type: 'POST',
      data: $target.serialize() + '&title=' + encodeURIComponent(title)
    }).done(function () {
      $form.trigger("reset");

      var loc = window.location;
      window.location.href = loc.origin + '/thank-you.html';
    }).fail(function () {
      $formMain.trigger("reset");
      alert("Ошибка отправки формы");
    });
  });

  // end forms

  // ========>> FUNCTIONS CALL <<========

  mainGallery();
} // end document ready

// ========>> UTILS <<========

!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady(); // eslint-disable-line
}();