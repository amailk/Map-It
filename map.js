//map variable
var map;

var markers = [];

//initialize js function to load the map
function initMap() {
  var styles = [
    {
      featureType: 'water',
      stylers: [
        {color: '#6b9ba3'}
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.stroke',
      stylers: [
        {color: '#ffffff'},
        {weight: 6}
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        {color: '#38353d'}
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {color: '#beb8c4'},
        {lightness: -40}
      ]
    },{
      featureType: 'transit.station',
      stylers: [
        {weight: 9 },
        {hue: '#6a726e'}
      ]
    },{
      featureType: 'road.highway',
      elementType: 'labels.icon',
      stylers: [
        { visibility: 'off' }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {lightness: 100}
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {lightness: -100}
      ]
    },{
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {visibility: 'on'},
        {color: '#c6ceb9'}
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        { color: '#cebc9a' },
        { lightness: -30 }
      ]
    }
  ];

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.450301, lng: -80.483192},
    zoom:13,
    styles: styles,
    mapTypeControl: false
  });

  var locations = [
    {title: "Smile Tiger Coffee Roasters", location: {lat: 43.456015, lng: -80.491675}},
    {title: "Berlin Bicycle Cafe", location: {lat: 43.453610, lng:-80.518524}},
    {title: "Balzac's Kitchener", location: {lat: 43.450938, lng: -80.498264}},
    {title: "Mercury Coffee", location: {lat: 43.451595, lng: -80.489149}},
    {title: "Cafe Pyrus", location: {lat: 43.449760, lng: -80.491712}}
  ];

  var largeInfowindow = new google.maps.InfoWindow();

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYGON
      ]
    }
  });


  var defaultIcon = makeMarkerIcon('45968e');

  var highlightedIcon = makeMarkerIcon('754596');
  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      icon: defaultIcon,
      animation: google.maps.Animation.DROP,
      id: i
    });

    markers.push(marker);

    marker.addListener('click', function() {
      console.log("marker listener, calling populateInfoWindow");
      populateInfoWindow(this, largeInfowindow);
    });

    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });

    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
  }

  document.getElementById('show-coffee').addEventListener('click', showCoffee);
  document.getElementById('hide-coffee').addEventListener('click', hideCoffee);

  document.getElementById('toggle-drawing').addEventListener('click', function() {
    toggleDrawing(drawingManager);
  });
}

  function populateInfoWindow(marker, infowindow) {
    if(infowindow.marker != marker) {
      infowindow.setContent('');
      infowindow.marker = marker;
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });

      var streetViewService = new google.maps.StreetViewService();
      var radius = 50;

      function getStreetView(data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(
            nearStreetViewLocation, marker.position);

          infowindow.setContent('<div>' + marker.title + '</div><div id="pano">xxxx</div>');

          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 30
            }
          };

          var panorama = new google.maps.StreetViewPanorama(
              document.getElementById('pano'), panoramaOptions);
        } else {
          infowindow.setContent('<div>' + marker.title + '</div>' + '<div>No Street View Found</div>');
        }
      }
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
      infowindow.open(map, marker);
    }
  }

function showCoffee() {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

function hideCoffee() {
  for (var i = 0; i < markers.length; i ++) {
    markers[i].setMap(null);
  }
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21, 34));
  return markerImage;
}

function toggleDrawing(drawingManager) {
  if(drawingManager.map) {
    drawingManager.setMap(null);
  } else {
    drawingManager.setMap(map);
  }
}
