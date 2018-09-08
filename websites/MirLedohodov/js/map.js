"use strict";

var defaultMarkerUri = "./img/decor/marker.png";
var currentMarkerUri = "./img/decor/marker-current.png";

var markers = {
  moscow: {},
  smolensk: {},
  bryansk: {},
  penza: {},
  kazan: {}
};

var initMarkers = function initMarkers() {
  var defaultActiveCity = $('.maps__item.active .maps__item-card.default').attr('data-map-city');

  // Устанавливает дефолтный город после загрузки,
  // добавить класс 'default' для 'maps__item-card'
  google.maps.event.trigger(markers[defaultActiveCity], 'click');
};

var markerClickHandler = function markerClickHandler() {
  var city = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var event = arguments[1];

  var currentCity = $('.maps__item.active .maps__item-card.active').attr('data-map-city');
  if (currentCity === city) return;

  var $cards = $('.maps__item.active .maps__item-cards > *');
  $cards.hide();
  Object.keys(markers).forEach(function (m) {
    return markers[m].setIcon(defaultMarkerUri);
  });

  markers[city].setIcon(currentMarkerUri);

  $cards.each(function (i, e) {
    if ($(e).attr("data-map-city") === city) {
      $(e).show();
      return false;
    }
  });
};

function initMap() {
  var zoom = $(window).width() < 992 ? 5 : 6;

  var opts = {
    center: {
      lat: 55.849992,
      lng: 43.97626
    },
    zoom: zoom,
    styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{ "color": "#f2f2f2" }]
    }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
    }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#ffffff" }]
    }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{ "visibility": "off" }]
    }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#dde6e8" }, { "visibility": "on" }] }],
    maxZoom: 20,
    minZoom: 0,
    mapTypeId: "roadmap"
  };

  opts.clickableIcons = true;
  opts.disableDoubleClickZoom = false;
  opts.draggable = true;
  opts.keyboardShortcuts = true;
  opts.scrollwheel = false;

  var setControlOptions = function setControlOptions(key, enabled, position, style, mapTypeIds) {
    opts[key + "Control"] = enabled;
    opts[key + "ControlOptions"] = {
      position: google.maps.ControlPosition[position],
      style: google.maps.MapTypeControlStyle[style],
      mapTypeIds: mapTypeIds
    };
  };

  setControlOptions("fullscreen", false, "DEFAULT", "", null);

  setControlOptions("mapType", false, "DEFAULT", "DEFAULT", ["roadmap", "satellite", "terrain"]);

  setControlOptions("rotate", false, "DEFAULT", "", null);

  setControlOptions("scale", false, "", "", null);

  setControlOptions("streetView", false, "DEFAULT", "", null);

  setControlOptions("zoom", true, "DEFAULT", "", null);

  var map = new google.maps.Map(document.getElementById("map-retail"), opts);

  // Moscow
  (function () {
    var markerOptions = {
      map: map,
      position: {
        lat: 55.991583,
        lng: 37.633778
      }
    };

    markerOptions.icon = {
      url: defaultMarkerUri,
      scaledSize: new google.maps.Size(30, 41),
      size: new google.maps.Size(30, 41),
      anchor: new google.maps.Point(15, 41)
    };
    markerOptions.options = {
      optimized: true
    };

    var marker = new google.maps.Marker(markerOptions);
    marker.addListener("click", markerClickHandler.bind(null, "moscow"));

    markers.moscow = marker;
  })();

  (function () {
    var markerOptions = {
      map: map,
      position: {
        lat: 55.03365,
        lng: 32.052724
      }
    };

    markerOptions.icon = {
      url: defaultMarkerUri,
      scaledSize: new google.maps.Size(30, 41),
      size: new google.maps.Size(30, 41),
      anchor: new google.maps.Point(15, 41)
    };
    markerOptions.options = {
      optimized: true
    };

    var marker = new google.maps.Marker(markerOptions);
    marker.addListener("click", markerClickHandler.bind(null, "smolensk"));

    markers.smolensk = marker;
  })();

  (function () {
    var markerOptions = {
      map: map,
      position: {
        lat: 53.533084,
        lng: 34.403799
      }
    };

    markerOptions.icon = {
      url: defaultMarkerUri,
      scaledSize: new google.maps.Size(30, 41),
      size: new google.maps.Size(30, 41),
      anchor: new google.maps.Point(15, 41)
    };
    markerOptions.options = {
      optimized: true
    };

    var marker = new google.maps.Marker(markerOptions);
    marker.addListener("click", markerClickHandler.bind(null, "bryansk"));

    markers.bryansk = marker;
  })();

  (function () {
    var markerOptions = {
      map: map,
      position: {
        lat: 53.506957,
        lng: 45.016592
      }
    };

    markerOptions.icon = {
      url: defaultMarkerUri,
      scaledSize: new google.maps.Size(30, 41),
      size: new google.maps.Size(30, 41),
      anchor: new google.maps.Point(15, 41)
    };
    markerOptions.options = {
      optimized: true
    };

    var marker = new google.maps.Marker(markerOptions);
    marker.addListener("click", markerClickHandler.bind(null, "penza"));

    markers.penza = marker;
  })();

  (function () {
    var markerOptions = {
      map: map,
      position: {
        lat: 56.077516,
        lng: 49.081533
      }
    };

    markerOptions.icon = {
      url: defaultMarkerUri,
      scaledSize: new google.maps.Size(30, 41),
      size: new google.maps.Size(30, 41),
      anchor: new google.maps.Point(15, 41)
    };
    markerOptions.options = {
      optimized: true
    };

    var marker = new google.maps.Marker(markerOptions);
    marker.addListener("click", markerClickHandler.bind(null, "kazan"));

    markers.kazan = marker;
  })();

  initMarkers();
}