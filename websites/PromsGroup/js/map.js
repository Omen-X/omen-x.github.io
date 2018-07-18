"use strict";

function initMap() {
  var defaults = {
    zoom: 16,
    styles: [{ "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.business", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.government", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "on" }, { "lightness": "8" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "lightness": "0" }, { "gamma": "1.30" }, { "saturation": "-51" }] }, { "featureType": "road", "elementType": "labels.text", "stylers": [{ "lightness": "-24" }, { "weight": "2.17" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }],
    maxZoom: 20,
    minZoom: 0,
    mapTypeId: 'roadmap'
  };

  defaults.clickableIcons = true;
  defaults.disableDoubleClickZoom = false;
  defaults.draggable = true;
  defaults.keyboardShortcuts = true;
  defaults.scrollwheel = false;

  var setControlOptions = function setControlOptions(key, enabled, position, style, mapTypeIds) {
    defaults[key + "Control"] = enabled;
    defaults[key + "ControlOptions"] = {
      position: google.maps.ControlPosition[position],
      style: google.maps.MapTypeControlStyle[style],
      mapTypeIds: mapTypeIds
    };
  };

  setControlOptions('fullscreen', false, 'DEFAULT', '', null);
  setControlOptions('mapType', false, 'DEFAULT', 'DEFAULT', ['roadmap', 'satellite', 'terrain']);
  setControlOptions('rotate', false, 'DEFAULT', '', null);
  setControlOptions('scale', false, '', '', null);
  setControlOptions('streetView', false, 'DEFAULT', '', null);
  setControlOptions('zoom', true, 'DEFAULT', '', null);

  var markerDefaults = {
    icon: {
      url: './img/decor/map-marker.png',
      scaledSize: new google.maps.Size(35, 45),
      size: new google.maps.Size(35, 45),
      anchor: new google.maps.Point(18, 45)
    },
    options: {
      optimized: true
    }
  };

  // MAP1
  var coordinates1 = {
    lat: 56.822903,
    lng: 60.651956
  };

  var options1 = $.extend(defaults, {
    center: {
      lat: coordinates1.lat,
      lng: coordinates1.lng
    }
  });
  var map1 = new google.maps.Map(document.getElementById('map1'), options1);

  (function () {
    var markerOptions = $.extend(markerDefaults, {
      map: map1,
      position: {
        lat: coordinates1.lat,
        lng: coordinates1.lng
      }
    });

    var marker = new google.maps.Marker(markerOptions);
  })();

  // MAP2
  var coordinates2 = {
    lat: 44.588095,
    lng: 132.820964
  };

  var options2 = $.extend(defaults, {
    center: {
      lat: coordinates2.lat,
      lng: coordinates2.lng
    }
  });
  var map2 = new google.maps.Map(document.getElementById('map2'), options1);

  (function () {
    var markerOptions = $.extend(markerDefaults, {
      map: map2,
      position: {
        lat: coordinates2.lat,
        lng: coordinates2.lng
      }
    });

    var marker = new google.maps.Marker(markerOptions);
  })();

  // MAP3
  var coordinates3 = {
    lat: 56.846445,
    lng: 60.588984
  };

  var options3 = $.extend(defaults, {
    center: {
      lat: coordinates3.lat,
      lng: coordinates3.lng
    }
  });
  var map3 = new google.maps.Map(document.getElementById('map3'), options1);

  (function () {
    var markerOptions = $.extend(markerDefaults, {
      map: map3,
      position: {
        lat: coordinates3.lat,
        lng: coordinates3.lng
      }
    });

    var marker = new google.maps.Marker(markerOptions);
  })();

  // MAP4
  var coordinates4 = {
    lat: 56.889474,
    lng: 60.641361
  };

  var options4 = $.extend(defaults, {
    center: {
      lat: coordinates4.lat,
      lng: coordinates4.lng
    }
  });
  var map4 = new google.maps.Map(document.getElementById('map4'), options1);

  (function () {
    var markerOptions = $.extend(markerDefaults, {
      map: map4,
      position: {
        lat: coordinates4.lat,
        lng: coordinates4.lng
      }
    });

    var marker = new google.maps.Marker(markerOptions);
  })();
}