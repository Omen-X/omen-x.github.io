// Editable name-inputs in different components
const ConfigItems = {
  init: () => {
    $(document.body).on('click', '[data-config-edit]', function () {
      const $editBtn = $(this)

      const $anchor = $editBtn.closest('[data-config-item]')
      const $input = $('[data-config-input]', $anchor)
      const $saveBtn = $('[data-config-save]', $anchor)

      $input.attr('disabled', false)
      $input.attr('placeholder', $input.val())
      $input.val('')
      $input.focus()

      $saveBtn.show()
      $editBtn.hide()
    })

    $(document.body).on('click', '[data-config-save]', function () {
      const $saveBtn = $(this)

      const $anchor = $saveBtn.closest('[data-config-item]')
      const $input = $('[data-config-input]', $anchor)
      const $editBtn = $('[data-config-edit]', $anchor)

      if ($input.val() === '') $input.val($input.attr('placeholder'))

      $input.attr('placeholder', '')
      $input.attr('disabled', true)

      $editBtn.show()
      $saveBtn.hide()

      // If it's a device-item, call devices "edit" method
      if ($(this).closest('[data-devices-list]').length) {
        const id = $(this).closest('[data-device-id]').attr('data-device-id')
        Devices.edit(id, { name: $input.val() })
      }
    })

    $(document.body).on('click', '[data-config-remove]', function () {
      const $removeBtn = $(this)

      const $anchor = $removeBtn.closest('[data-config-item]')
      const $input = $('[data-config-input]', $anchor)
      const itemId = $input.attr('name')

      if ($input.val() === '') $input.val($input.attr('placeholder'))

      const blockId = $removeBtn.attr('data-toggle-block')

      $(`[data-block-id=${blockId}] form input[name=id]`).val(itemId)

      // If it's a device-item, call devices "remove" method
      if ($(this).closest('[data-devices-list]').length) {
        const id = $(this).closest('[data-device-id]').attr('data-device-id')
        Devices.remove(id)
      }
    })

    $(document.body).on('keypress', '[data-config-input]', function (event) {
      const $input = $(this)
      const $saveBtn = $input.closest('[data-config-item]').find('[data-config-save]')

      if (event.keyCode === 13 && $saveBtn.length) {
        $saveBtn.click()
      }
    })
  }
}

$(document).ready(function () {
  // Replace with actual initial data
  // Devices.init(mockData.initDevices)

  ConfigItems.init()
})
