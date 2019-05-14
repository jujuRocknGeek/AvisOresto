var infoWindow:any;
var map:any = new google.maps.Map(
  document.getElementById('map'), {zoom: 13, center: initMap().pos});

function initMap() {
  infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
          
/* ajoute icone geolocalisation*/
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var marker = new google.maps.Marker({
  position: pos,
  map: map,
  icon: iconBase + 'man.png'
});

/*$.getJSON('restaurants.json',function(data:any){
  $.each(data,function(index,d){
    $('.list').append('<p>' + d.restaurantName +'<br>'+ d.address +'</p>');
    $('p').attr('class', 'case'); 
  var marker = new google.maps.Marker({
  position: new google.maps.LatLng(d.lat, d.long), 
  map: map,
  title: d.restaurantName
      });
  })
});*/


  infoWindow.open(map);
  map.setCenter(pos);
  }, 
  function() {
  handleLocationError(true, infoWindow, map.getCenter());
  });
  } 
  else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
  }
  return this.map;
}

function handleLocationError(browserHasGeolocation:any, infoWindow:any, pos:any) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
initMap();