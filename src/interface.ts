/************ initialise la carte**********/
var maps:any;
let mapRun = function():any{
  return new Promise(function(resolve:any, reject:any){
  navigator.geolocation.getCurrentPosition(function(position) {
      var pos:any = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
      };
  maps = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: pos});

/* ajoute icone geolocalisation*/
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var marker = new google.maps.Marker({
  position: pos,
  map: maps,
  icon: iconBase + 'man.png'
  });
    });

  if(navigator.geolocation){
    resolve(maps);
  }
  else{
    reject("pas de carte chargée");
  }

  });
};

mapRun().then(function(map:any){
  markerJson();
},
function(error: any){
  console.log(error);
});
/********************** ************************************/
/************ placer les marker google map JSON *************************/
function markerJson(){
  $.getJSON('restaurants.json',function(data){
    $.each(data,function(index,d){

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(d.lat, d.long), 
        map: maps,
        title: d.restaurantName,
        });

            var infoWindowOptions = {
              content: '<b>'+d.restaurantName+'</b>'+'<br>'+ d.address
          };
          
          var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            google.maps.event.addListener(marker, 'click', function() {
          infoWindow.open(maps, marker);
          });

      $('.list').append('<p>' + d.restaurantName +'<br>'+ d.address +'</p>');
      $('p').attr('class', 'case');
    })
  });
}

function open_infos()
{
        const width:number = 300;
        const height:number = 200;
        if(window.innerWidth)
        {
                var left = (window.innerWidth-width)/2;
                var top = (window.innerHeight-height)/2;
        }
        else
        {
                var left = (document.body.clientWidth-width)/2;
                var top = (document.body.clientHeight-height)/2;
        }
        window.open('inforesto.html','nom_de_ma_popup','menubar=no, scrollbars=no, top='+top+', left='+left+', width='+width+', height='+height+'');
}

