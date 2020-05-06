"use strict";

var mobileNav = function mobileNav() {
  var nav = document.querySelector('.m-nav');
  var navTrigger = document.querySelector('.m-nav__trigger');

  function navToggle() {
    if (nav.classList.contains('active')) {
      document.documentElement.classList.remove('modal-open');
    } else {
      document.documentElement.classList.add('modal-open');
    }

    nav.classList.toggle('active');
  }

  navTrigger.addEventListener('click', navToggle);
}; // Custom logic for forms


var customFormLogic = function customFormLogic() {
  // Toggle hidden button
  document.querySelectorAll('.form__toggle-hidden').forEach(function (toggler) {
    toggler.addEventListener('click', function () {
      toggler.classList.toggle('active');
      var input = toggler.parentElement.parentElement.querySelector('.form__input');
      if (toggler.classList.contains('active')) input.setAttribute('type', 'text');else input.setAttribute('type', 'password');
    });
  }); // Copy button

  document.querySelectorAll('.form__copy').forEach(function (copy) {
    copy.addEventListener('click', function () {
      var input = copy.parentElement.parentElement.querySelector('.form__input');
      var inputType = input.type;
      if (inputType === 'password') input.type = 'text';
      input.select();
      input.setSelectionRange(0, 99999);
      document.execCommand('copy');
      if (inputType === 'password') input.type = 'password';
      input.blur();
    });
  });
};

var mSelect = function mSelect() {
  document.querySelectorAll('.m-select').forEach(function (select) {
    select.addEventListener('click', function (event) {
      event.stopPropagation();
    }); // Custom scrollbar

    var list = select.querySelector('.m-select__list');
    new SimpleBar(list, {
      autoHide: false
    }); // Trigger handler

    select.querySelector('.m-select__trigger').addEventListener('click', function () {
      select.classList.toggle('active');
    }); // Option selection

    var input = select.querySelector('.m-select__input');
    var value = select.querySelector('.m-select__value');
    var search = select.querySelector('.m-select__search-input');
    list.addEventListener('click', function (event) {
      if (event.target.classList.contains('m-select__list-item')) {
        input.value = event.target.innerHTML;
        value.innerHTML = event.target.innerHTML;
        select.classList.remove('active');
        search.value = '';
        select.querySelectorAll('.m-select__list-item').forEach(function (option) {
          return option.classList.remove('hidden');
        });
      }
    }); // Search

    search.addEventListener('keyup', function () {
      var searchValue = search.value.toLowerCase();
      select.querySelectorAll('.m-select__list-item').forEach(function (option) {
        var optionValue = option.innerHTML.toLowerCase();
        if (optionValue.startsWith(searchValue)) option.classList.remove('hidden');else option.classList.add('hidden');
      });
    });
  });
};

var validateInput = function validateInput(input) {
  var value = input.value;
  var validation = {
    isValid: true,
    error: '',
    meta: {}
  }; // Common validation

  if (input.required) {
    switch (input.type) {
      case 'text':
      default:
        if (value === '') {
          validation.isValid = false;
          validation.error = 'Обязательное поле';
        }

    }
  } // Custom validation


  if (validation.isValid) {
    switch (input.name) {
      case 'login':
        // Incorrect characters
        if (!RegExp(/^[A-Za-zА-Яа-я0-9_]*$/).test(value)) {
          validation.isValid = false;
          validation.error = 'Недопустимые символы. Введите буквы, цифры или “_”';
        } // Existing login


        if (value === 'existing_user') {
          validation.isValid = false;
          validation.error = 'Этот логин уже занят. Попробуйте';
          validation.meta.availableLogins = ['Denisov_alex', 'alexey.denisov'];
        }

        break;

      case 'password':
        // Password too short
        if (value.length < 6) {
          validation.isValid = false;
          validation.error = 'Введите не менее 6 символов.';
        }

        break;

      case 'password-confirm':
        {
          // Password mismatch
          var password = input.closest('.form').querySelector('input[name=password]').value;

          if (value !== password) {
            validation.isValid = false;
            validation.error = 'Введенные пароли не совпадают';
          }

          break;
        }

      case 'email':
        if (!RegExp(/\S+@\S+\.\S+/).test(value)) {
          validation.isValid = false;
          validation.error = 'Некорректный e-mail';
        }

        break;

      default:
    }
  } // Show validation result for user


  var field = input.closest('.form__field');
  var errorField = field.querySelector('.form__field-error');
  var isValid = validation.isValid,
      meta = validation.meta,
      error = validation.error;

  if (isValid) {
    field.classList.remove('invalid');
    field.classList.add('valid');
    errorField.innerHTML = '';
  } else {
    errorField.innerHTML = error;

    if (meta.availableLogins) {
      errorField.innerHTML = "".concat(errorField.innerHTML, " <span class=\"c-purple\">").concat(meta.availableLogins.join(', '), "</span>");
    }

    field.classList.remove('valid');
    field.classList.add('invalid');
  }

  return validation.isValid;
};
/**
 * Instant validation for inputs
 */


var formFieldsValidation = function formFieldsValidation() {
  document.querySelectorAll('.form__input').forEach(function (input) {
    var field = input.closest('.form__field');
    var error = field.querySelector('.form__field-error');
    input.addEventListener('blur', function () {
      return validateInput(input);
    });
    input.addEventListener('keydown', function () {
      field.classList.remove('invalid');
      error.innerHTML = '';
    });
  });
};
/**
 * Form submit handler
 */


var formsHandler = function formsHandler() {
  document.querySelectorAll('.form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Validate inputs

      var validationResult = Array.from(form.querySelectorAll('.form__input')).map(function (input) {
        return validateInput(input);
      });

      if (validationResult.some(function (v) {
        return !v;
      })) {
        // Invalid form
        console.log('invalid form');
      } else {
        // Valid form
        console.log('valid form');
      }
    });
  });
}; // ========>> DOCUMENT READY <<========


function documentReady() {
  // Hide pop-up windows
  document.body.addEventListener('click', function () {
    document.querySelectorAll('.m-select').forEach(function (select) {
      return select.classList.remove('active');
    });
    document.querySelectorAll('.m-select__search-input').forEach(function (s) {
      s.value = '';
    });
    document.querySelectorAll('.m-select__list-item').forEach(function (option) {
      return option.classList.remove('hidden');
    });
  }); //

  mobileNav();
  customFormLogic();
  formFieldsValidation();
  formsHandler();
  mSelect();
} // ========>> UTILS <<========
//eslint-disable-next-line


!function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);else documentReady();
}();