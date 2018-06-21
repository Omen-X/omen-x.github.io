"use strict";

function initMap() {
  var opts = {
    center: {
      lat: 56.844533,
      lng: 60.601287
    },
    zoom: 12,
    styles: [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }]
    }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#000000" }, { "lightness": 20 }]
    }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{ "color": "#000000" }, { "lightness": 20 }]
    }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }] }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#000000" }, { "lightness": 17 }]
    }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }] }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{ "color": "#000000" }, { "lightness": 18 }]
    }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{ "color": "#000000" }, { "lightness": 19 }]
    }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }],
    maxZoom: 20,
    minZoom: 0,
    mapTypeId: "roadmap"
  };
  opts.clickableIcons = true;
  opts.disableDoubleClickZoom = false;
  opts.draggable = true;
  opts.keyboardShortcuts = false;
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

  var map = new google.maps.Map(document.getElementById("map"), opts);

  (function () {
    var markerOptions = {
      map: map,
      position: {
        lat: 56.839067,
        lng: 60.572305
      },
      icon: './img/decor/marker.png'
    };
    var marker = new google.maps.Marker(markerOptions);
  })();
}