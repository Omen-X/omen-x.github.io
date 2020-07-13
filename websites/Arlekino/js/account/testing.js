const mockData = {
  initDevices: [
    {
      id: '1',
      name: 'Телевизор на кухне',
      ottId: 'ddDrXrhcqaPRy2'
    },
    {
      id: '2',
      name: 'Детская',
      ottId: 'UdDrXrhcqaPRy2',
      subPeriod: 'до 05.05.21',
      subPeriodHint: 'с 23.03.20  08:32 по 05.05.21  08:32'
    },
    {
      id: '3',
      name: 'Спальня',
      ottId: 'fdD2XrhcqaPRy2',
      subPeriod: 'до 05.06.20',
      subPeriodHint: 'с 23.03.20  08:32'
    }
  ]
}

$(document).ready(() => {
  $('#test-init-devices').click(() => {
    const devices = [...mockData.initDevices].map((d) => ({ ...d, id: String((Math.random() * 10e16).toFixed(0)) }))

    Devices.init(devices)
  })
})
