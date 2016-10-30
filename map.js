var map; //map variable
function initMap() { //initialize js function to load the map
  map = new google.maps.Map(document.getElementById('map'), { //new map instance, load the map in the map div in the html
    center: {lat: 43.450301, lng: -80.483192}, //what part of the world to show (lat long literal)
    zoom:13 //higher the more detail. you can go up to level 21
  });

  var smiletiger = {lat:43.456015, lng:-80.491675};

  var marker = new google.maps.Marker({
    position: smiletiger,
    map: map, //map where it should appear on
    draggable: true,
    animation: google.maps.Animation.DROP,
    title: 'Smile Tiger Coffee Roasters' //appears when you hover over the Marker
  });

  var contentString = '<div id="content">' +
    '<div id="title">' +
      '<h1 id="firstheading"><b>Smile Tiger</b></h1>'+
    '</div>'+
    '<div id="body-content">'+
      '<p>'+
        'Smile Tiger Coffee is a small but fierce shop that roasts' +
        'seasonal coffee people love.<br>' +
        'All of our coffees are Direct Trade, transparently sourced,'+
        'and roasted in small batches. <br>' +
        'We also offer tiger training to cafes and cubs alike at'+ 'our workshop in Kitchener-Waterloo or at your cafe.'+
        '</p>'+
        '</div>'+
        '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

function drop() {
  for (var i = 0; i < markerArray.length; i++) {
    setTimeout(function() {
      addMarkermethod();
    }, i * 200);
  }
}
