"use strict";

/*eslint-disable*/
// google.maps.event.addDomListener(window, 'load', init);

!function init() {
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  var mapOptions = {
    // How zoomed in you want the map to start at (always required)
    zoom: 13,
    // disable controls
    disableDefaultUI: true,
    scrollwheel: false,
    // The latitude and longitude to center the map (always required)
    center: new google.maps.LatLng(44.9611138, 34.1168439), // New York

    // How you would like to style the map.
    // This is where you would paste any style found on Snazzy Maps.
    styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }] }]
  };

  // Get the HTML DOM element that will contain your map
  // We are using a div with id="map" seen below in the <body>
  var mapElement = document.getElementById('map');

  // Create the Google Map using our element and options defined above
  var map = new google.maps.Map(mapElement, mapOptions);
  var iconBase = '/img/decor/';
  var icons = {
    mark: {
      icon: iconBase + 'mark.png'
    },
    drome: {
      icon: iconBase + 'drome.png'
    }
  };
  // Let's also add a marker while we're at it
  var marker1 = new google.maps.Marker({
    position: new google.maps.LatLng(44.9611138, 34.1168439),
    map: map,
    icon: icons['mark'].icon,
    title: 'Автошкола в Симферополе'
  });
  var infowindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker1, 'mouseover', function () {
    infowindow.setContent("<p>Автошкола в Симферополе<br/>пр. Победы-39</p>");
    infowindow.open(map, marker1);
  });
  //            var marker2 = new google.maps.Marker({
  //                position: new google.maps.LatLng(44.9329843, 34.1340823),
  //                map: map,
  //                icon: icons['mark'].icon,
  //                title: 'Новый учебный класс'
  //            });
  //            google.maps.event.addListener(marker2, 'mouseover', function () {
  //                infowindow.setContent("<p>Новый учебный класс<br/>ул. Беспалова, 110-Д</p>");
  //                infowindow.open(map, marker2);
  //            });
  var marker3 = new google.maps.Marker({
    position: new google.maps.LatLng(44.939621, 34.073126),
    map: map,
    icon: icons['drome'].icon,
    title: 'Автодром'
  });
  google.maps.event.addListener(marker3, 'mouseover', function () {
    infowindow.setContent("<p>Автодром Рейн-Авто<br/>ул. Генерала Васильева/пер. Элеваторный</p>");
    infowindow.open(map, marker3);
  });
}();