/* eslint-disable no-new */

$(document).ready(() => {
  const configList = () => {
    // Select handler
    $('.config-list__item-select:not(.disabled)').click(function () {
      const $list = $(this).closest('.config-list')
      const $anchor = $(this).closest('.config-list-anchor')

      if ($list.hasClass('config-list_select_single')) {
        $(this).closest('.config-list__item').siblings().removeClass('selected')
        $(this).closest('.config-list__item').toggleClass('selected')
      } else {
        $(this).closest('.config-list__item').toggleClass('selected')
      }

      const $selected = $anchor.find('.config-list__item.selected')
      const isDefaultSelected = !!$selected.find('[name*=-default]').length

      if ($selected.length && !isDefaultSelected) {
        $anchor.find('.config-list-buttons').slideDown(150)
      } else {
        $anchor.find('.config-list-buttons').slideUp(150)
      }
    })

    // Delete items
    $('.config-list-remove').click(function () {
      const $selected = $(this).closest('.config-list-anchor').find('.config-list__item.selected')
      const $inputs = $selected.find('[data-config-input]').not('[name=playlist-default]')

      let id = []
      $inputs.each((i, e) => id.push(e.name))
      id = JSON.stringify(id)

      const modalId = $(this).attr('data-toggle-block')
      $(`[data-block-id=${modalId}] form input[name=id]`).val(id)
    })

    $('.config-list__item').on('remove', function () {
      const $anchor = $(this).closest('.config-list-anchor')
      const $items = $anchor.find('.config-list__item.selected')

      if ($items.length === 1) {
        $anchor.find('.config-list-buttons').slideUp(150)
      }
    })
  }

  // Logic for devices-components
  const devices = () => {
    // Devices links
    $('.device-links__list-toggler').click(function () {
      const $parent = $(this).closest('.device-links__block')

      $parent.toggleClass('opened')
      $parent.find('.device-links__list').slideToggle(200)
    })

    // Devices select in the sidebar
    // TODO: probably extract logic in to 'Device' object
    $('#config-block-device .m-select').on('click', '.m-select__list-item', function () {
      $('#config-block-device').attr('data-state', 'selected')
      $('#config-block-device .copy-anchor').removeClass('copy-anchor_disabled')

      const id = $(this).attr('data-device-id')
      const selectedDevice = Devices.items.find(device => device.id === id)

      // Update ott-id
      $('[data-device-ott-id]').text(selectedDevice.ottId)
    })
  }

  // Account notifications
  const notifications = () => {
    $('.notifications-carousel').each(function () {
      $(this).slick({
        slidesToShow: 1,
        infinite: false,
        prevArrow: '<span class="slick-prev"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.540355 0.159839L0.210514 0.487403C0.107506 0.590493 0.0507571 0.727648 0.0507571 0.874234C0.0507571 1.02074 0.107506 1.15806 0.210514 1.26115L3.94729 4.99776L0.206368 8.73869C0.103359 8.84162 0.0466919 8.97893 0.0466919 9.12544C0.0466919 9.27195 0.103359 9.40934 0.206368 9.51235L0.534176 9.84C0.747348 10.0533 1.09459 10.0533 1.30776 9.84L5.7778 5.38598C5.88072 5.28305 5.95324 5.1459 5.95324 4.99809V4.99638C5.95324 4.8498 5.88064 4.71264 5.7778 4.60971L1.31987 0.159839C1.21695 0.0567484 1.07564 0.000163078 0.929138 0C0.782552 0 0.643201 0.0567484 0.540355 0.159839Z" fill="#FF9800"/></svg></span>',
        nextArrow: '<span class="slick-next"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.540355 0.159839L0.210514 0.487403C0.107506 0.590493 0.0507571 0.727648 0.0507571 0.874234C0.0507571 1.02074 0.107506 1.15806 0.210514 1.26115L3.94729 4.99776L0.206368 8.73869C0.103359 8.84162 0.0466919 8.97893 0.0466919 9.12544C0.0466919 9.27195 0.103359 9.40934 0.206368 9.51235L0.534176 9.84C0.747348 10.0533 1.09459 10.0533 1.30776 9.84L5.7778 5.38598C5.88072 5.28305 5.95324 5.1459 5.95324 4.99809V4.99638C5.95324 4.8498 5.88064 4.71264 5.7778 4.60971L1.31987 0.159839C1.21695 0.0567484 1.07564 0.000163078 0.929138 0C0.782552 0 0.643201 0.0567484 0.540355 0.159839Z" fill="#FF9800"/></svg></span>'
      })
    })
  }

  // Account configuration steps
  let isStepperInit = false

  const accStepper = () => {
    if (window.innerWidth < 576 && !isStepperInit) {
      $('.acc-stepper').slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: false,
        prevArrow: '<span class="slick-prev"><svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.958661 0.28771L0.364949 0.877325C0.179533 1.06289 0.0773857 1.30977 0.0773857 1.57362C0.0773857 1.83733 0.179533 2.08451 0.364949 2.27007L7.09115 8.99598L0.357485 15.7296C0.172069 15.9149 0.0700684 16.1621 0.0700684 16.4258C0.0700684 16.6895 0.172069 16.9368 0.357485 17.1222L0.947539 17.712C1.33125 18.096 1.95628 18.096 2.33999 17.712L10.3861 9.69476C10.5713 9.50949 10.7019 9.26261 10.7019 8.99656V8.99349C10.7019 8.72963 10.5712 8.48275 10.3861 8.29748L2.36179 0.28771C2.17652 0.102148 1.92218 0.000293732 1.65847 0C1.39462 0 1.14378 0.102148 0.958661 0.28771Z" fill="#FF9800"/></svg></span>',
        nextArrow: '<span class="slick-next"><svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.958661 0.28771L0.364949 0.877325C0.179533 1.06289 0.0773857 1.30977 0.0773857 1.57362C0.0773857 1.83733 0.179533 2.08451 0.364949 2.27007L7.09115 8.99598L0.357485 15.7296C0.172069 15.9149 0.0700684 16.1621 0.0700684 16.4258C0.0700684 16.6895 0.172069 16.9368 0.357485 17.1222L0.947539 17.712C1.33125 18.096 1.95628 18.096 2.33999 17.712L10.3861 9.69476C10.5713 9.50949 10.7019 9.26261 10.7019 8.99656V8.99349C10.7019 8.72963 10.5712 8.48275 10.3861 8.29748L2.36179 0.28771C2.17652 0.102148 1.92218 0.000293732 1.65847 0C1.39462 0 1.14378 0.102148 0.958661 0.28771Z" fill="#FF9800"/></svg></span>',
        responsive: [
          {
            breakpoint: 410,
            settings: {
              slidesToShow: 3
            }
          }
        ]
      })

      isStepperInit = true
    } else if (window.innerWidth > 575 && isStepperInit) {
      $('.acc-stepper').slick('unslick')

      isStepperInit = false
    }
  }
  //

  // Account custom scrollbars
  $('.acc-custom-scroll').each(function () {
    new window.SimpleBar(this, { autoHide: false })
  })

  window.addEventListener('resize', () => {
    accStepper()
  })

  devices()
  notifications()
  accStepper()
  configList()
})
