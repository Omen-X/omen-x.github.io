// TODO: validation

$(document).ready(() => {
  const mockApi = (payload) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload)
    }, 500)
  })

  /**
   * UTILS
   */

  // Extracts payload from a form
  const getPayload = ($form) => {
    const arr = $form.serializeArray()
    const payload = {}

    arr.forEach((e) => {
      payload[e.name] = e.value
    })

    return payload
  }

  // Reset form values
  const resetForm = ($form) => {
    $('input, textarea', $form).val('')
  }

  /**
   * FORM HANDLERS
   */

  //
  $('#form-device-add').submit(function () {
    const payload = getPayload($(this))

    mockApi(payload).then((data) => {
      Devices.add(data)

      resetForm($(this))
    })
  })

  //
  $('#form-device-remove, #form-playlist-remove').submit(function (event) {
    event.preventDefault()

    const id = $(this).find('[name=id]').val()

    // Detach element
    $(`[name=${id}]`).closest('[data-config-item]').remove()
  })

  //
  $('#form-playlists-remove').submit(function (event) {
    event.preventDefault()

    const idArr = $(this).find('[name=id]').val()

    JSON.parse(idArr).map((id) => {
      $(`[name=${id}]`).closest('[data-config-item]').remove()
    })
  })
})
