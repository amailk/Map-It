var map; //map variable
function initMap() { //initialize js function to load the map
  map = new google.maps.Map(document.getElementById('map'), { //new map instance, load the map in the map div in the html
    center: {lat: 43.450301, lng: -80.483192}, //what part of the world to show (lat long literal)
    zoom:13 //higher the more detail. you can go up to level 21
  });
}
