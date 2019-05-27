
var maps:any;
var marker:any;

/************ initialise la carte**********/
let mapRun = function(){
  return new Promise(function(resolve:any, reject:any){
  navigator.geolocation.getCurrentPosition(function(position) {
      var pos:any = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
      };
maps = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: pos});

/* ajoute icone geolocalisation*/
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
marker = new google.maps.Marker({
  position: pos,
  map: maps,
  icon: iconBase + 'man.png'
  });
    });
  if(navigator.geolocation){
    resolve();
  }
  else{
    reject("pas de carte chargée");
  }

  });
};

  mapRun()
  .then(()=> setTimeout(() => {
    markerJson(), list()
  }, 1000) )
  .catch((error)=>console.log(error))


/********************** ************************************/
/************ placer les marker google map JSON *************************/
function markerJson(){
  $.getJSON('restaurants.json',function(data){
    $.each(data,function(index,d){
      var init = d.restos;
      for (var i = 0; i < init.length; i++) {
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(init[i].lat, init[i].long), 
        map: maps,
        title: init[i].restaurantName,
        });

            var infoWindowOptions = {
              content: '<b>'+init[i].restaurantName+'</b>'+'<br>'+ init[i].address
          };
          
          var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            google.maps.event.addListener(marker, 'click', function() {
          infoWindow.open(maps, marker);
          });
        }
    })
  });
}

function list(){
  var request = new XMLHttpRequest();
  request.open('GET', 'restaurants.json');
  request.responseType = 'json';
  request.send();
  
  request.onload = function() {
      var resto = request.response;
      loadResto(resto);
    }
  
  function loadResto(json:any){
      var restos = json[0]['restos'];

      for (let i in restos) {
        $('.list').append('<div class="case">' + restos[i].restaurantName +'<br>'+ restos[i].address +'</p>');
        var j:number;
        var avis:any= restos[i].ratings;
          for (let j in avis) {
            console.log(avis)
            console.log("bonjour")
            $(".case").append("<div class='comment'>" + "<p class='stars'>" + avis[j].stars + "</p>" + "<p class='commentText'>"+ avis[j].comment  + "</p>" + "</div>" );
          }
     }
        
       /* avis.forEach((avis:any)=> {
        $(".case").append("<div class='comment'>" + "<p class='stars'>" + avis[i].stars + "</p>" + "<p class='commentText'>"  + "</p>" + "</div>" ); 
        })
      });*/
      /*for (var i = 0; i <= restos.length;i++) {
        console.log(restos.length)
        $('.list').append('<div class="case">' + restos[i].restaurantName +'<br>'+ restos[i].address +'</p>');

        var avis = restos[i].ratings;
        for (var j = 0; j <= avis.length; j++) {
              $(".case").append("<div class='comment'>" + "<p class='stars'>" + avis[j].stars + "</p>" + "<p class='commentText'>"  + "</p>" + "</div>" );  
              console.log(avis[j].stars)      
        };
      }*/

  }

 
      /*$(".stars").hide();
      $(".commentText").hide();

      $(".case").click(function(){
        $(".stars").show();
        $(".commentText").show();
      });*/  
}



