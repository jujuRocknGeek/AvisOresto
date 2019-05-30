
var maps:any;
var marker:any;
/*************************************************************/
/********************* initialise la carte ******************/
let mapRun = function(){
  return new Promise(function(resolve:any, reject:any){
  navigator.geolocation.getCurrentPosition(function(position) {
      var pos:any = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
      };
maps = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: pos});


/*************************************************************/
/*************** ajoute icone geolocalisation ***************/
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


/************************************************************************/
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


/*************************************************************/
/************ charge la requete AJAX *************************/
function list(){
  var request = new XMLHttpRequest();
  request.open('GET', 'restaurants.json');
  request.responseType = 'json';
  request.send();
  
  request.onload = function() {
      var resto = request.response;
      loadResto(resto);
    }


/************************************************************/
/************ Fonction affiche liste des restos ************/
  function loadResto(json:any){

    var restos = json[0]['restos'];
      
  for (var i = 0; i < restos.length; i++) {
    var list = document.createElement('article');
    list.setAttribute("class", "case");
    list.setAttribute("data-js", "hide");
    var restoName = document.createElement('h5');
    var restoAddress = document.createElement('h6');
    var restoRating = document.createElement('ul');
    restoRating.setAttribute("class", "hidden");

    restoName.textContent = restos[i].restaurantName;
    restoAddress.textContent = restos[i].address;
    
    var rating = restos[i].ratings;
    console.log(rating.length);
    for (var j = 0; j <rating.length; j++) {
      var addNote = document.createElement('li');
      var addComment = document.createElement('li');
      var addContent = document.createElement('div');
      var addContentClass = addContent.setAttribute("class", "ratings");
      addNote.textContent = rating[j].stars;
      addComment.textContent =  rating[j].comment;
      addContent.appendChild(addNote);
      addContent.appendChild(addComment);
      restoRating.appendChild(addContent);
    }
    

    list.appendChild(restoName);
    list.appendChild(restoAddress);
    list.appendChild(restoRating);
    
    var section = document.querySelector(".list");
    section.appendChild(list);

  }

/*************************************************************************/
/************ Défini un lien et un Id a chaque Article et UL afin de pouvoir
                afficher le détail des avis pour chaque resto ************/
  var refI=0;
  $('.case').each(function(){
  refI++;
  var newID='#menu'+refI;
  $(this).attr('href',newID);
  $(this).val(refI);
  });

  var idI=0;
  $('.hidden').each(function(){
    idI++;
    var newID='menu'+idI;
    $(this).attr('id',newID);
    $(this).val(idI);
    });


  let hiders = document.querySelectorAll('[data-js="hide"]');

  Array.prototype.forEach.call(hiders, function (hider:any) {
  let hiderID = hider.getAttribute('href');
  let hiderTarget = document.querySelector(hiderID);
  
  hider.addEventListener('click', function (event:any) {
  	event.preventDefault();
    hiderTarget.classList.toggle('-visible');
    });

  });


  }

}



