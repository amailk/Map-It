//map variable
var map;

var markers = [];

//initialize js function to load the map
function initMap() {

  //new map instance, load the map in the map div in the html
  map = new google.maps.Map(document.getElementById('map'), {

    //what part of the world to show (lat long literal)
    center: {lat: 43.450301, lng: -80.483192},

    //higher the more detail. you can go up to level 21
    zoom:13

  });

  var locations = [
    {title: 'Smile Tiger Coffee Roasters', location: {lat: 43.456015, lng: -80.491675}}
  ]

  var largeInfowindow = new google.maps.InfoWindow();
  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;

    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });

    // keep marker instance in markers array
    markers.push(marker);
    marker.addListener('click', function() {

      //tells infowindow to open at that marker.
      populateInfoWindow(this, largeInfowindow);
    });
  }

  document.getElementById('show-coffee').addEventListener('click', showCoffee);
  document.getElementById('hide-coffee').addEventListener('click', hideCoffee);
}

  function populateInfoWindow(marker, infowindow) {
    if(infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function() {
        infowindow.setMarker(null);
      });
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
