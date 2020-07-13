/* eslint-disable no-new */
const mobileNav = () => {
  const nav = document.querySelector('.m-nav')

  if (!nav) return

  const navTrigger = document.querySelector('.m-nav__trigger')

  function navToggle () {
    if (nav.classList.contains('active')) {
      document.documentElement.classList.remove('modal-open')
    } else {
      document.documentElement.classList.add('modal-open')
    }

    nav.classList.toggle('active')
  }

  navTrigger.addEventListener('click', navToggle)

  const $headerAccent = window.$('.header_blue, .header_inner')

  if (window.innerWidth < 992 && $headerAccent.length) {
    if (window.scrollY > 0) $headerAccent.addClass('fixed-hidden')

    // Optimized window scroll handler
    const raf = window.requestAnimationFrame
    let lastScrollTop = window.pageYOffset

    const handleWindowScroll = () => {
      const currentScrollTop = window.pageYOffset

      if (lastScrollTop === currentScrollTop) {
        raf(handleWindowScroll)
        return false
      }

      if (currentScrollTop === 0) {
        $headerAccent.removeClass('fixed fixed-hidden')
        // scroll up
      } else if (lastScrollTop > currentScrollTop) {
        $headerAccent.removeClass('fixed-hidden')
        $headerAccent.addClass('fixed')
        // scroll down
      } else if (lastScrollTop < currentScrollTop) {
        $headerAccent.removeClass('fixed')
        $headerAccent.addClass('fixed-hidden')
      }

      lastScrollTop = currentScrollTop
      return raf(handleWindowScroll)
    }

    handleWindowScroll()
  }
}

/**
 *
 */
const welcomeSectionBg = () => {
  const welcomeSection = document.querySelector('.welcome-section')

  if (welcomeSection) {
    const welcomeForm = welcomeSection.querySelector('.welcome__form')

    const updateBgPosition = () => {
      const welcomeFormHeight = welcomeForm.clientHeight
      const welcomeFormBottom = welcomeFormHeight + (30 + 50)

      const arcHeight = window.innerWidth * 0.385
      const arcGapHeight = window.innerWidth * 0.239

      const roundingFix = 2
      const wideDevicesFix = 100
      const formErrorsGap = welcomeForm.querySelectorAll('.form__field-error').length * 25

      const footerRelatedTop = welcomeSection.clientHeight - arcHeight + roundingFix
      const formRelatedTop = welcomeFormBottom - arcGapHeight

      let top = Math.max(footerRelatedTop, formRelatedTop, 0)

      if (formRelatedTop > footerRelatedTop) {
        top += formErrorsGap
      }

      if (window.innerWidth / window.innerHeight > 1.8) {
        welcomeSection.style.backgroundPosition = `center ${top - wideDevicesFix}px`
        welcomeSection.style.backgroundSize = '130% auto'
      } else {
        welcomeSection.style.backgroundPosition = `center ${top}px`
      }

      welcomeSection.style.minHeight = `${arcHeight + top - 5}px`
    }

    updateBgPosition()

    // const ro = new ResizeObserver(() => updateBgPosition());
    // ro.observe(welcomeForm);
  }
}

const validateInput = (input) => {
  const { value } = input
  const validation = { isValid: true, error: '', meta: {} }

  // Common validation
  if (input.required) {
    switch (input.type) {
      case 'text':
      default:
        if (value === '') {
          validation.isValid = false
          validation.error = 'Обязательное поле'
        }
    }
  }

  // Custom validation
  if (validation.isValid) {
    switch (input.name) {
      case 'login':
        // Incorrect characters
        if (!RegExp(/^[A-Za-zА-Яа-я0-9_]*$/).test(value)) {
          validation.isValid = false
          validation.error = 'Недопустимые символы. Введите буквы, цифры или “_”'
        }

        // Existing login
        if (value === 'existing_user') {
          validation.isValid = false
          validation.error = 'Этот логин уже занят. Попробуйте'
          validation.meta.availableLogins = ['Denisov_alex', 'alexey_denisov']
        }

        break
      case 'password':
        // Password too short
        if (value.length < 6) {
          validation.isValid = false
          validation.error = 'Введите не менее 6 символов.'
        }

        break
      case 'password-confirm': {
        // Password mismatch
        const password = input.closest('.form').querySelector('input[name=password]').value

        if (value !== password) {
          validation.isValid = false
          validation.error = 'Введенные пароли не совпадают'
        }

        break
      }
      case 'email':
        if (!RegExp(/\S+@\S+\.\S+/).test(value)) {
          validation.isValid = false
          validation.error = 'Некорректный e-mail'
        }

        break
      default:
    }
  }

  // Show validation result for user
  const field = input.closest('.form__field')
  const errorField = field.querySelector('.form__field-error')
  const { isValid, meta, error } = validation

  if (isValid) {
    field.classList.remove('invalid')
    field.classList.add('valid')

    errorField.innerHTML = ''
  } else {
    errorField.innerHTML = error

    if (meta.availableLogins) {
      const suggestedLogins = meta.availableLogins
        .map(login => `<span data-suggested-login=${login} class="form__suggested-login">${login}</span>`)

      errorField.innerHTML = `${errorField.innerHTML} <span class="c-purple">${suggestedLogins.join(', ')}</span>`
    }

    field.classList.remove('valid')
    field.classList.add('invalid')
  }

  return validation.isValid
}

// Custom logic for forms
const customFormLogic = () => {
  // Toggle hidden button
  document.querySelectorAll('.form__toggle-hidden').forEach((toggler) => {
    toggler.addEventListener('click', () => {
      toggler.classList.toggle('active')

      const input = toggler.parentElement.parentElement.querySelector('.form__input')

      if (toggler.classList.contains('active')) input.setAttribute('type', 'text')
      else input.setAttribute('type', 'password')
    })
  })

  // Copy button
  document.querySelectorAll('.form__copy').forEach((copy) => {
    copy.addEventListener('click', () => {
      const input = copy.parentElement.parentElement.querySelector('.form__input')
      const inputType = input.type

      if (inputType === 'password') input.type = 'text'

      input.select()
      input.setSelectionRange(0, 99999)
      document.execCommand('copy')

      const confirmInput = input.closest('.form__fields').querySelector('input[name=password-confirm]')
      confirmInput.value = input.value
      validateInput(confirmInput)

      if (inputType === 'password') input.type = 'password'

      input.blur()
    })
  })

  // Suggested logins
  document.querySelectorAll('.form__field-error').forEach((error) => {
    error.addEventListener('click', (event) => {
      if (event.target.classList.contains('form__suggested-login')) {
        const login = event.target.dataset.suggestedLogin
        const input = error.closest('.form__field').querySelector('.form__input')

        input.value = login
        validateInput(input)
      }
    })
  })
}

const mSelect = () => {
  document.querySelectorAll('.m-select').forEach((select) => {
    select.addEventListener('click', (event) => {
      event.stopPropagation()
    })

    // Custom scrollbar
    const list = select.querySelector('.m-select__list')
    new window.SimpleBar(list, { autoHide: false })

    // Trigger handler
    select.querySelector('.m-select__trigger').addEventListener('click', () => {
      select.classList.toggle('active')
    })

    // Option selection
    const input = select.querySelector('.m-select__input')
    const value = select.querySelector('.m-select__value')
    const search = select.querySelector('.m-select__search-input')

    list.addEventListener('click', (event) => {
      if (event.target.classList.contains('m-select__list-item')) {
        input.value = event.target.innerHTML
        value.innerHTML = event.target.innerHTML

        select.classList.remove('active')
        search.value = ''
        select.querySelectorAll('.m-select__list-item').forEach(option => option.classList.remove('hidden'))
      }
    })

    // Search

    search.addEventListener('keyup', () => {
      const searchValue = search.value.toLowerCase()

      select.querySelectorAll('.m-select__list-item')
        .forEach((option) => {
          const optionValue = option.innerHTML.toLowerCase()

          if (optionValue.startsWith(searchValue)) option.classList.remove('hidden')
          else option.classList.add('hidden')
        })
    })
  })

  document.body.addEventListener('click', () => {
    document.querySelectorAll('.m-select__search-input').forEach((s) => {
      s.value = ''
    })
  })
}

const searchDropdown = () => {
  document.querySelectorAll('.search-dropdown').forEach((search) => {
    search.addEventListener('click', event => event.stopPropagation())

    const input = search.querySelector('.search-dropdown__input')
    const options = search.querySelectorAll('.search-dropdown__item')
    const list = search.querySelector('.search-dropdown__list-wrap')

    input.addEventListener('focus', () => {
      list.classList.add('active')
    })

    input.addEventListener('keyup', () => {
      const searchValue = input.value.toLowerCase()

      options.forEach((option) => {
        const optionValue = option.querySelector('.search-dropdown__item-title').innerHTML.toLowerCase()

        if (optionValue.startsWith(searchValue)) option.classList.remove('hidden')
        else option.classList.add('hidden')
      })
    })

    options.forEach((option) => {
      option.addEventListener('click', () => {
        list.classList.remove('active')

        const popup = list.closest('.search-popup')
        if (popup) popup.classList.remove('active')
      })
    })
  })

  document.body.addEventListener('click', () => {
    document.querySelectorAll('.search-dropdown__input').forEach((s) => {
      s.value = ''
    })
  })

  // Search popup

  document.querySelectorAll('.search-popup').forEach((search) => {
    search.addEventListener('click', (event) => {
      event.stopPropagation()
    })

    search.querySelector('.search-popup__trigger').addEventListener('click', () => {
      search.classList.toggle('active')
    })
  })
}

/**
 * Instant validation for inputs
 */
const formFieldsValidation = () => {
  document.querySelectorAll('.form__input').forEach((input) => {
    const field = input.closest('.form__field')
    const error = field.querySelector('.form__field-error')

    input.addEventListener('blur', () => validateInput(input))

    input.addEventListener('keydown', () => {
      field.classList.remove('invalid')
      error.innerHTML = ''
    })
  })
}

/**
 * Form submit handler
 */
const formsHandler = () => {
  document.querySelectorAll('.form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault()

      // Validate inputs
      const validationResult = Array.from(form.querySelectorAll('.form__input'))
        .map(input => validateInput(input))

      if (validationResult.some(v => !v)) {
        // Invalid form
        console.log('invalid form')
      } else {
        // Valid form
        console.log('valid form')
      }
    })
  })
}

/**
 * js-based styles for different sections
 */
const dynamicStyles = () => {
  // Devices section
  const deviceContent = document.querySelectorAll('.touch .device__content')
  deviceContent.forEach((content) => {
    content.addEventListener('click', (event) => {
      event.stopPropagation()

      deviceContent.forEach(el => el.classList.remove('active'))
      content.classList.add('active')
    })
  })
}

const mainSelect = () => {
  document.querySelectorAll('.select-main').forEach((select) => {
    select.addEventListener('click', event => event.stopPropagation())

    select.querySelector('.select-main__trigger').addEventListener('click', () => {
      select.classList.toggle('active')
    })

    const selectValue = select.querySelector('.select-main__value')

    select.querySelectorAll('.select-main__item').forEach((option) => {
      option.addEventListener('click', () => {
        const { value } = option.dataset
        selectValue.innerHTML = value

        select.classList.remove('active')
      })
    })

    //
    const selectItems = select.querySelector('.select-main__items')
    new window.SimpleBar(selectItems, { autoHide: false })
  })
}

const modals = () => {
  $('[data-target-modal-id]').click(function () {
    const id = this.dataset.targetModalId
    $(`#${id}`).addClass('active')
  })

  $('.modal').click(function () {
    $(this).removeClass('active')
  })

  $('.modal__content').click(function (event) {
    event.stopPropagation()
  })

  $('.modal__close').click(function () {
    $(this).closest('.modal').removeClass('active')
  })

  $('.modal-card__form').submit(function (event) {
    event.preventDefault()
    $(this).closest('.modal').removeClass('active')
  })
}

const hints = () => {
  $(document.body).on('mouseenter', '[data-toggle-hint]', function () {
    const id = $(this).attr('data-toggle-hint')
    const $hint = $(`[data-hint-id=${id}]`)
    const $hintsAnchor = $(this).closest('[data-hints-anchor]')

    const contentWidth = $('.hint__content', $hint).innerWidth()
    $hint.width(contentWidth)

    // Detect page overflow
    const isOverflow = (window.innerWidth - $(this).offset().left - contentWidth - 15) < 0

    if (isOverflow) {
      const right = $hintsAnchor.innerWidth() -
          ($(this).offset().left - $hintsAnchor.offset().left) - $(this).innerWidth()

      $hint.css({
        left: 'auto',
        right
      })
    } else {
      const left = $(this).offset().left - $hintsAnchor.offset().left

      $hint.css({
        right: 'auto',
        left
      })
    }

    const bottom = $hintsAnchor.innerHeight() - ($(this).offset().top - $hintsAnchor.offset().top) + 5
    $hint.css('bottom', bottom)

    $hint.addClass('active')
  })

  $(document.body).on('mouseleave', '[data-toggle-hint]', function () {
    const id = $(this).attr('data-toggle-hint')
    const $hint = $(`[data-hint-id=${id}]`)

    $hint.removeClass('active')
  })
}

const closeButton = () => {
  $('.close-button').click(function () {
    const speed = $(this).attr('data-close-speed') || 300

    const $anchor = $(this).closest('.close-anchor')

    $anchor.addClass('closed')
    $anchor.slideUp(speed)
  })
}

const copyButton = () => {
  $('[data-copy-button]').click(function () {
    const value = $(this).closest('[data-copy-anchor]').find('[data-copy-value]').text()

    const input = document.createElement('input')
    input.style.position = 'absolute'
    input.style.zIndex = '-1'
    input.type = 'text'

    document.body.appendChild(input)

    input.value = value
    input.select()
    input.setSelectionRange(0, 99999)
    document.execCommand('copy')

    document.body.removeChild(input)
  })
}

//

/**
 * Toggle 'active' state for blocks
 */
const toggleBlock = () => {
  $(document.body).on('click', '[data-toggle-block]', function () {
    const id = $(this).attr('data-toggle-block')
    const $target = $(`[data-block-id=${id}]`)

    if ($target.length) {
      $target.toggleClass('active')
    }
  })

  $(document.body).on('click', '[data-show-block]', function () {
    const id = $(this).attr('data-show-block')
    const $target = $(`[data-block-id=${id}]`)

    if ($target.length) {
      $target.addClass('active')
    }
  })

  $(document.body).on('click', '[data-hide-block]', function () {
    const id = $(this).attr('data-hide-block')
    const $target = $(`[data-block-id=${id}]`)

    if ($target.length) {
      $target.removeClass('active')
    }
  })
}

// ========>> DOCUMENT READY <<========

function documentReady () {
  // Hide pop-up windows
  document.body.addEventListener('click', () => {
    document.querySelectorAll('.m-select, .search-dropdown__list-wrap, .popup-block, .device__content, .search-popup')
      .forEach(select => select.classList.remove('active'))

    document.querySelectorAll('.m-select__list-item, .search-dropdown__item')
      .forEach(option => option.classList.remove('hidden'))
  })

  // Custom scrollbars
  document.querySelectorAll('.device__list-content, .custom-scroll').forEach((el) => {
    new window.SimpleBar(el, { autoHide: false })
  })
  //
  window.addEventListener('resize', () => {
    welcomeSectionBg()
    dynamicStyles()
  })

  //
  mobileNav()
  customFormLogic()
  formFieldsValidation()
  formsHandler()
  mSelect()
  welcomeSectionBg()
  dynamicStyles()
  searchDropdown()
  mainSelect()
  modals()
  hints()
  closeButton()
  copyButton()
  toggleBlock()
}

// ========>> UTILS <<========

!(function checkLoad () {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10)
  else documentReady()
}())
