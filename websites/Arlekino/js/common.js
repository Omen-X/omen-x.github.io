const mobileNav = () => {
  const nav = document.querySelector('.m-nav');
  const navTrigger = document.querySelector('.m-nav__trigger');

  function navToggle() {
    if (nav.classList.contains('active')) {
      document.documentElement.classList.remove('modal-open');
    } else {
      document.documentElement.classList.add('modal-open');
    }

    nav.classList.toggle('active');
  }

  navTrigger.addEventListener('click', navToggle);
};

// Custom logic for forms
const customFormLogic = () => {
  // Toggle hidden button
  document.querySelectorAll('.form__toggle-hidden').forEach((toggler) => {
    toggler.addEventListener('click', () => {
      toggler.classList.toggle('active');

      const input = toggler.parentElement.parentElement.querySelector('.form__input');

      if (toggler.classList.contains('active')) input.setAttribute('type', 'text');
      else input.setAttribute('type', 'password');
    });
  });

  // Copy button
  document.querySelectorAll('.form__copy').forEach((copy) => {
    copy.addEventListener('click', () => {
      const input = copy.parentElement.parentElement.querySelector('.form__input');
      const inputType = input.type;

      if (inputType === 'password') input.type = 'text';

      input.select();
      input.setSelectionRange(0, 99999);
      document.execCommand('copy');

      if (inputType === 'password') input.type = 'password';

      input.blur();
    });
  });
};

const mSelect = () => {
  document.querySelectorAll('.m-select').forEach((select) => {
    select.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    // Custom scrollbar
    const list = select.querySelector('.m-select__list');
    new SimpleBar(list, {autoHide: false});

    // Trigger handler
    select.querySelector('.m-select__trigger').addEventListener('click', () => {
      select.classList.toggle('active');
    });

    // Option selection
    const input = select.querySelector('.m-select__input');
    const value = select.querySelector('.m-select__value');
    const search = select.querySelector('.m-select__search-input');

    list.addEventListener('click', (event) => {
      if (event.target.classList.contains('m-select__list-item')) {
        input.value = event.target.innerHTML;
        value.innerHTML = event.target.innerHTML;

        select.classList.remove('active');
        search.value = '';
        select.querySelectorAll('.m-select__list-item').forEach(option => option.classList.remove('hidden'));
      }
    });

    // Search

    search.addEventListener('keyup', () => {
      const searchValue = search.value.toLowerCase();

      select.querySelectorAll('.m-select__list-item')
        .forEach((option) => {
          const optionValue = option.innerHTML.toLowerCase();

          if (optionValue.startsWith(searchValue)) option.classList.remove('hidden');
          else option.classList.add('hidden');
        });
    });
  });
};

const validateInput = (input) => {
  const {value} = input;
  const validation = {isValid: true, error: '', meta: {}};

  // Common validation
  if (input.required) {
    switch (input.type) {
      case 'text':
      default:
        if (value === '') {
          validation.isValid = false;
          validation.error = 'Обязательное поле';
        }
    }
  }

  // Custom validation
  if (validation.isValid) {
    switch (input.name) {
      case 'login':
        // Incorrect characters
        if (!RegExp(/^[A-Za-zА-Яа-я0-9_]*$/).test(value)) {
          validation.isValid = false;
          validation.error = 'Недопустимые символы. Введите буквы, цифры или “_”';
        }

        // Existing login
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
      case 'password-confirm': {
        // Password mismatch
        const password = input.closest('.form').querySelector('input[name=password]').value;

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
  }

  // Show validation result for user
  const field = input.closest('.form__field');
  const errorField = field.querySelector('.form__field-error');
  const {isValid, meta, error} = validation;

  if (isValid) {
    field.classList.remove('invalid');
    field.classList.add('valid');

    errorField.innerHTML = '';
  } else {
    errorField.innerHTML = error;

    if (meta.availableLogins) {
      errorField.innerHTML = `${errorField.innerHTML} <span class="c-purple">${meta.availableLogins.join(', ')}</span>`;
    }

    field.classList.remove('valid');
    field.classList.add('invalid');
  }

  return validation.isValid;
};

/**
 * Instant validation for inputs
 */
const formFieldsValidation = () => {
  document.querySelectorAll('.form__input').forEach((input) => {
    const field = input.closest('.form__field');
    const error = field.querySelector('.form__field-error');

    input.addEventListener('blur', () => validateInput(input));

    input.addEventListener('keydown', () => {
      field.classList.remove('invalid');
      error.innerHTML = '';
    });
  });
};

/**
 * Form submit handler
 */
const formsHandler = () => {
  document.querySelectorAll('.form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Validate inputs
      const validationResult = Array.from(form.querySelectorAll('.form__input'))
        .map(input => validateInput(input));

      if (validationResult.some(v => !v)) {
        // Invalid form
        console.log('invalid form');
      } else {
        // Valid form
        console.log('valid form');
      }
    });
  });
};

// ========>> DOCUMENT READY <<========

function documentReady() {
  // Hide pop-up windows
  document.body.addEventListener('click', () => {
     document.querySelectorAll('.m-select').forEach(select => select.classList.remove('active'));
     document.querySelectorAll('.m-select__search-input').forEach((s) => {
       s.value = '';
     });
     document.querySelectorAll('.m-select__list-item').forEach(option => option.classList.remove('hidden'));
  });
  //
  mobileNav();
  customFormLogic();
  formFieldsValidation();
  formsHandler();
  mSelect();
}

// ========>> UTILS <<========

!(function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);
  else documentReady();
}());
