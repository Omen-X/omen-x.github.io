const Devices = {
  // All devices stored in this field, so devices data can be used later in different components
  items: [],
  /**
   * Initialize device on page loading
   * @param devices
   */
  init: (devices) => {
    devices.forEach(Devices.add)

    // $('[data-devices-list]').trigger('init-devices', devices)
  },
  add: (data) => {
    const { id = String(Date.now()), ottId = `ott_${Date.now()}`, subPeriod = '', subPeriodHint = '' } = data
    const newDevice = { ...data, id, ottId, subPeriod, subPeriodHint }

    // Store device in the local object
    Devices.items.push(newDevice)

    //
    $('[data-devices-list]').trigger('add-device', newDevice)

    //
    // Update the state of "selected" device in the sidebar
    if ($('#config-block-device').attr('data-state') === 'init') {
      $('#config-block-device').attr('data-state', 'not-selected')
    }
  },
  edit: (id, data) => {
    const i = Devices.items.findIndex(d => d.id === id)
    if (i === -1) return console.warn('Device not found')

    Devices.items[i] = {
      ...Devices.items[i],
      ...data
    }

    $('[data-devices-list]').trigger('update-device', { id, data })
  },
  remove: (id) => {
    const i = Devices.items.findIndex(d => d.id === id)
    if (i === -1) return console.warn('Device not found')

    Devices.items.splice(i, 1)

    $('[data-devices-list]').trigger('delete-device', id)
  }
}

// UI updates
$(document).ready(() => {
  // Devices table
  const $devicesTable = $('[data-devices-list=table]')

  $devicesTable.on('add-device', function (event, device) {
    const { id, name, subPeriod, subPeriodHint } = device
    const $table = $(this)

    const $newItem = $(`
        <div class="devices-table__item" data-config-item data-device-id=${id}>
            <input data-config-input type="text" name="device-id-${id}" value="${name}" />
            <div class="devices-table__item-status"></div>
            <div class="devices-table__item-buttons" data-config-buttons>
                <button data-config-save /> 
                <button data-config-edit /> 
                <button data-config-remove data-toggle-block="modal-device-remove" /> 
            </div>
        </div>
    `)

    // Subscription/Status
    const $status = $newItem.find('.devices-table__item-status')

    if (subPeriod) {
      $status.append(`<span class="devices-table__item-date" data-toggle-hint="device-period-${id}">${subPeriod}</span>`)
    } else {
      $status.append('<a href="#" class="devices-table__item-link">купить</a>')
    }

    // Hints
    const $hintsAnchor = $table.closest('[data-hints-anchor]')

    if ($hintsAnchor.length && subPeriodHint) {
      const $hintsContainer = $hintsAnchor.find('.hints-container')

      const $hint = $(`
        <div class="hint" data-hint-id="device-period-${id}">
           <div class="hint__content">
                <p class="hint__text">${subPeriodHint}</p> 
           </div>
        </div>
      `)

      $hintsContainer.append($hint)
    }

    $table.append($newItem)
  })

  $devicesTable.on('update-device', function (event, data) {
    const { id, data: deviceData } = data
    const { subPeriod, subPeriodHint } = deviceData

    const $item = $(this).find(`[data-device-id=${id}]`)

    // Name (updated via "ConfigItems")
    // $item.find('[data-config-input]').val(name)

    // Status
    const $status = $item.find('.devices-table__item-status')

    $status.children().remove()

    if (subPeriod) {
      $status.append(`<span class="devices-table__item-date" data-toggle-hint="device-period-${id}">${subPeriod}</span>`)
    } else {
      $status.append('<a href="#" class="devices-table__item-link">купить</a>')
    }

    // Hints
    const $hintsAnchor = $item.closest('[data-hints-anchor]')

    if ($hintsAnchor.length && subPeriodHint) {
      const $hintsContainer = $hintsAnchor.find('.hints-container')

      $hintsContainer.find(`[data-hint-id=device-period-${id}]`).remove()

      const $hint = $(`
        <div class="hint" data-hint-id="device-period-${id}">
           <div class="hint__content">
                <p class="hint__text">${subPeriodHint}</p> 
           </div>
        </div>
      `)

      $hintsContainer.append($hint)
    }
  })
  // end devices table

  // Select list (dropdown with search)
  const $devicesSelect = $('[data-devices-list=select]')

  $devicesSelect.on('add-device', function (event, device) {
    const { id, name } = device
    const $list = $(this).find('.simplebar-content')

    const $newItem = $(`
        <span class="m-select__list-item" data-device-id=${id}>${name}</span> 
      `)

    if ($list.length) {
      $list.append($newItem)
    }
  })

  $devicesSelect.on('update-device', function (event, data) {
    const { id, data: deviceData } = data
    const { name } = deviceData

    // Update list item
    const $option = $(this).find(`[data-device-id=${id}]`)
    const $selectValue = $(this).closest('.m-select').find('.m-select__value')

    // If it's a selected value
    if ($option.text() === $selectValue.text()) {
      $selectValue.text(name)
    }

    $option.text(name)
  })

  $devicesSelect.on('delete-device', function (event, id) {
    const $option = $(this).find(`[data-device-id=${id}]`)

    $option.remove()
  })
  // end select list
})
