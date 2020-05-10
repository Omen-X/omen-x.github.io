const mobileNav = () => {
  const nav = document.querySelector('.m-nav');

  if (!nav) return;

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

/**
 *
 */
const welcomeSectionBg = () => {
  const welcomeSection = document.querySelector('.welcome-section');

  if (welcomeSection) {
    const welcomeForm = welcomeSection.querySelector('.welcome__form');

    const updateBgPosition = () => {
      const welcomeFormHeight = welcomeForm.clientHeight;
      const welcomeFormBottom = welcomeFormHeight + (30 + 50);

      const arcHeight = window.innerWidth * 0.385;
      const arcGapHeight = window.innerWidth * 0.239;

      const roundingFix = 2;
      const wideDevicesFix = 100;
      const formErrorsGap = welcomeForm.querySelectorAll('.form__field-error').length * 25;

      const footerRelatedTop = welcomeSection.clientHeight - arcHeight + roundingFix;
      const formRelatedTop = welcomeFormBottom - arcGapHeight;

      let top = Math.max(footerRelatedTop, formRelatedTop, 0);

      if (formRelatedTop > footerRelatedTop) {
        top += formErrorsGap;
      }

      if (window.innerWidth / window.innerHeight > 1.8) {
        welcomeSection.style.backgroundPosition = `center ${top - wideDevicesFix}px`;
        welcomeSection.style.backgroundSize = '130% auto';
      } else {
        welcomeSection.style.backgroundPosition = `center ${top}px`;
      }

      welcomeSection.style.minHeight = `${arcHeight + top - 5}px`;
    };

    updateBgPosition();

    // const ro = new ResizeObserver(() => updateBgPosition());
    // ro.observe(welcomeForm);
  }
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
          validation.meta.availableLogins = ['Denisov_alex', 'alexey_denisov'];
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
      const suggestedLogins = meta.availableLogins
        .map(login => `<span data-suggested-login=${login} class="form__suggested-login">${login}</span>`);

      errorField.innerHTML = `${errorField.innerHTML} <span class="c-purple">${suggestedLogins.join(', ')}</span>`;
    }

    field.classList.remove('valid');
    field.classList.add('invalid');
  }

  return validation.isValid;
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

      const confirmInput = input.closest('.form__fields').querySelector('input[name=password-confirm]');
      confirmInput.value = input.value;
      validateInput(confirmInput);

      if (inputType === 'password') input.type = 'password';

      input.blur();
    });
  });

  // Suggested logins
  document.querySelectorAll('.form__field-error').forEach((error) => {
    error.addEventListener('click', (event) => {
      if (event.target.classList.contains('form__suggested-login')) {
        const login = event.target.dataset.suggestedLogin;
        const input = error.closest('.form__field').querySelector('.form__input');

        input.value = login;
        validateInput(input);
      }
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

const devicesCarousel = () => {
  const $carousel = $('.devices');

  if (!$carousel.length) return;

  if (window.innerWidth < 576) {
    $carousel.slick({
      slidesToShow: 2.5,
      infinite: false,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 2.3
          }
        },
        {
          breakpoint: 349,
          settings: {
            slidesToShow: 1.5
          }
        }
      ]
    });
  }
};

/**
 * js-based styles for different sections
 */
const dynamicStyles = () => {
  //
};

const epgCarousel = () => {
  const $carousel = $('.epg-carousel');

  if ($carousel.length) {
    $carousel.slick({
      slidesToShow: 1,
      prevArrow: '<span class="slick-arrow slick-arrow_prev"><svg viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n'
        + '<path d="M0.888707 5.99274L6.67387 0.207681C6.80767 0.0737718 6.98629 0 7.17674 0C7.3672 0 7.54581 0.0737718 7.67962 0.207681L8.10565 0.633613C8.38288 0.911155 8.38288 1.36224 8.10565 1.63936L3.24771 6.4973L8.11104 11.3606C8.24485 11.4945 8.31873 11.6731 8.31873 11.8634C8.31873 12.054 8.24485 12.2325 8.11104 12.3665L7.68501 12.7923C7.5511 12.9262 7.37259 13 7.18213 13C6.99168 13 6.81306 12.9262 6.67926 12.7923L0.888707 7.00198C0.754586 6.86764 0.680921 6.68829 0.681343 6.49762C0.680921 6.30622 0.754586 6.12697 0.888707 5.99274Z" fill="white"/>\n'
        + '</svg>\n</span>',
      nextArrow: '<span class="slick-arrow slick-arrow_next"><svg viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n'
        + '<path d="M0.888707 5.99274L6.67387 0.207681C6.80767 0.0737718 6.98629 0 7.17674 0C7.3672 0 7.54581 0.0737718 7.67962 0.207681L8.10565 0.633613C8.38288 0.911155 8.38288 1.36224 8.10565 1.63936L3.24771 6.4973L8.11104 11.3606C8.24485 11.4945 8.31873 11.6731 8.31873 11.8634C8.31873 12.054 8.24485 12.2325 8.11104 12.3665L7.68501 12.7923C7.5511 12.9262 7.37259 13 7.18213 13C6.99168 13 6.81306 12.9262 6.67926 12.7923L0.888707 7.00198C0.754586 6.86764 0.680921 6.68829 0.681343 6.49762C0.680921 6.30622 0.754586 6.12697 0.888707 5.99274Z" fill="white"/>\n'
        + '</svg>\n</span>'
    });
  }
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

  // Custom scrollbars
  document.querySelectorAll('.device__list-content').forEach((el) => {
    new SimpleBar(el, {autoHide: false});
  });

  //
  window.addEventListener('resize', () => {
    welcomeSectionBg();
    dynamicStyles();
  });

  //
  mobileNav();
  customFormLogic();
  formFieldsValidation();
  formsHandler();
  mSelect();
  welcomeSectionBg();
  devicesCarousel();
  dynamicStyles();
  epgCarousel();
}

// ========>> UTILS <<========

!(function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);
  else documentReady();
}());
