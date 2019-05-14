/*place les markers et la liste des resto*/

$.getJSON('restaurants.json',function(data:any){
    $.each(data,function(index,d){
      $('.list').append('<p>' + d.restaurantName +'<br>'+ d.address+'</p>');
      $('p').attr('class', 'case'); 
      
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(d.lat, d.long), 
    map: map,
    title: d.restaurantName
        });
    })
});

 /* var infoWindowOptions = {
    content: '<h3>Locronan</h3>'
        + '<a href="http://www.locronan-tourisme.com/" target="_blank">Site de l office de tourisme de la ville</a>'
        + '<br/><img src="maps/google-marker/image.jpg" width="200px" />'
};

var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map, marker);
});*/




