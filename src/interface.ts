import { notDeepStrictEqual } from "assert";

require("./rating.ts");
var map:any;
var marker:any;
let jsonMarkers:any = [];
let addRestoMarker:any = [];

/***************************************************************************************/
/********************* initialise la carte ******************/
let mapRun = function(){
  return new Promise(function(resolve:any, reject:any){
  navigator.geolocation.getCurrentPosition(function(position) {
      var pos:any = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
      };
map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: pos});

/*************** ajoute icone geolocalisation ***************/
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
marker = new google.maps.Marker({
  position: pos,
  map: map,
  icon: iconBase + 'man.png'
  });
  return map;
});

  if(navigator.geolocation){
    resolve();
  }
  else{
    reject("pas de carte chargée");
  }
  });
};
/***************************************************************************************/
  mapRun()
  .then(()=> setTimeout(() => {
    markerJson(), list(),addResto()
  }, 1000) )
  .catch((error)=>console.log(error))
/***************************************************************************************/



/***************************************************************************************/
/************ Ajouter un resto au clic bouton ou map*************************/
function addResto(){
          // This event listener will call addMarker() when the map is clicked.
          map.addListener('click', function(event:any) {
            addMarker(event.latLng);
          });
  
        // Adds a marker to the map and push to the array.
        function addMarker(location:any) {
          var marker = new google.maps.Marker({
            position: location,
            map: map
          });
          addRestoMarker.push(marker);
        }
}

/***************************************************************************************/
/************ placer les marker google map JSON *************************/
function markerJson(){
  $.getJSON('restaurants.json',function(data){
    $.each(data,function(index,d){
      var init = d.restos;
      for (var i = 0; i < init.length; i++) {
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(init[i].lat, init[i].long), 
        map: map,
        title: init[i].restaurantName,
        });

            var infoWindowOptions = {
              content: '<b>'+init[i].restaurantName+'</b>'+'<br>'+ init[i].address
          };
          
          var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            google.maps.event.addListener(marker, 'click', function() {
          infoWindow.open(map, marker);
          });

          jsonMarkers.push(marker);
        }
    })
  });

}
/***************************************************************************************/



/***************************************************************************************/
/************ Filtre les restos par moyenne ******************/
$(".selectAll").click(function(){
  let starAverage = $("aside");
  for(let i in starAverage){
      let noteStars:string = $(`aside:eq(${i})`).html();
      let noteNumber:number = parseInt(noteStars);
        $(`article:eq(${i})`).show();
        /*let titrerestoh5 = $(h5).html()
        let titremarker = marker.gettitle();
        if(titrerestoh5  === titremarker){ marker.setvisible(false)}*/

  }  
});

$(".selectOne").click(selectOne);
function selectOne(){
  let starAverage = $("aside");
  for(let i in starAverage){
      let noteStars:string = $(`aside:eq(${i})`).html();
      let noteNumber:number = parseInt(noteStars);
      if(noteNumber > 1){
        $(`article:eq(${i})`).hide();
        console.log("dans la fonction")
      }
      else{
          $(`article:eq(${i})`).show();
          marker.setVisible(true);
      }
  }
}

$(".selectTwoThree").click(selectTwoThree);
function selectTwoThree(){
  let starAverage = $("aside");
  for(let i in starAverage){
      let noteStars:string = $(`aside:eq(${i})`).html();
      let noteNumber:number = parseInt(noteStars);
      if(noteNumber<2 || noteNumber>3){
        $(`article:eq(${i})`).hide();
      }
      else{
          $(`article:eq(${i})`).show();
      }
  }
}

$(".selectFourFive").click(selectFourFive);
function selectFourFive(){
  let starAverage = $("aside");
  for(let i in starAverage){
      let noteStars:string = $(`aside:eq(${i})`).html();
      let noteNumber:number = parseInt(noteStars);
      if(noteNumber < 4){
        $(`article:eq(${i})`).hide();
      }
      else{
          $(`article:eq(${i})`).show();
      }
  }
}

$("#select").change(function (){
  $("#select option:selected").click();
});
/***************************************************************************************/




/***************************************************************************************/
/************ charge la requete AJAX *************************/
function list(){
  var request = new XMLHttpRequest();
  request.open('GET', 'restaurants.json');
  request.responseType = 'json';
  request.send();
  
  request.onload = function() {
      var resto = request.response;
      loadResto(resto);
      stars();
      average(resto);
    }
/***************************************************************************************/



/***************************************************************************************/
/************ Fonction affiche liste des restos ************/
  function loadResto(json:any){

    var restos = json[0]['restos'];
      
  for (var i = 0; i < restos.length; i++) {
    var list = document.createElement('article');
    list.setAttribute("class", "case");
    list.setAttribute("data-js", "hide");
    var restoName = document.createElement('h5');
    var restoAverage = document.createElement('aside');
    restoAverage.setAttribute("class", "averageBox");
    var restoAddress = document.createElement('h6');
    var restoRating = document.createElement('ul');
    restoRating.setAttribute("class", "hidden");
    var addStreetview = document.createElement('div');
    addStreetview.setAttribute("class", "streetviewDiv");
    var addImg = document.createElement('img');
    addImg.src = `https://maps.googleapis.com/maps/api/streetview?size=200x100&location=${restos[i].lat},${restos[i].long}&fov=100&heading=235&pitch=10&key=AIzaSyC6_wqbr58IHAgGs3sBD1C934TSOYKX0lg`;

    restoName.textContent = restos[i].restaurantName;
    restoAddress.textContent = restos[i].address;
    
    var rating = restos[i].ratings;
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
      addStreetview.appendChild(addImg);
      console.log(restos[j].lat+","+restos[j].long);
    }
    

    list.appendChild(restoName);
    list.appendChild(restoAverage);
    list.appendChild(restoAddress);
    list.appendChild(addStreetview);
    list.appendChild(restoRating);
    
    var section = document.querySelector(".list");
    section.appendChild(list);

  }
/***************************************************************************************/




/***************************************************************************************/
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
/***************************************************************************************/




/***************************************************************************************/
/********************** Objets Etoiles **********************/
let etoiles= {
  one: "<img src='assets/img/1stars.png' id='stars'/>",
  two: "<img src='assets/img/2stars.png' id='stars'/>",
  three:"<img src='assets/img/3stars.png' id='stars'/>",
  four:"<img src='assets/img/4stars.png' id='stars'/>",
  five:"<img src='assets/img/5stars.png' id='stars'/>"
};
/***************************************************************************************/




/***************************************************************************************/
/******* Fonction affiche images "etoiles" des notes *******/
function stars(){
  let i;
  let li = $('li');
  for(i=0; i<=li.length; i++){
    let note = $(`li:eq(${i})`).html();
    switch(note){
      case "0": 
      $(`li:eq(${i})`).html(etoiles.one);
      break;
      case "1": 
      $(`li:eq(${i})`).html(etoiles.one);
      break;
      case "2": 
      $(`li:eq(${i})`).html(etoiles.two);
      break;
      case "3": 
      $(`li:eq(${i})`).html(etoiles.three);
      break;
      case "4": 
      $(`li:eq(${i})`).html(etoiles.four);
      break;
      case "5": 
      $(`li:eq(${i})`).html(etoiles.five);
      break;
    }
  }

}
/***************************************************************************************/




/***************************************************************************************/
/******* Fonction affiche la moyenne des restaurants *******/
function average(json:any){
  let nbRestos = json[0]['restos'];
  for(let i in nbRestos){
    let nbRating = nbRestos[i]['ratings'];
    let arrayNote:any = new Array();

    for(let j in nbRating){
      let nbStars = nbRating[j]['stars'];
      arrayNote.push(nbStars);
    }
    let total = arrayNote.reduce((partial_sum:any, a:any) => partial_sum + a,0); 
    let moyenne:any = total/arrayNote.length;

    $(`aside:eq(${i})`).append(moyenne)
  }
}
/***************************************************************************************/


/***************************************************************************************/
/***************  Recupère Infos Formulaire d'ajout de restaurants  ********************/
$("#submitBtn").click(()=>{
  console.log("coucou");
  var restoFormName:any = $("#nom").val();
  var restoFormAdress:any = $("#adresse").val();
  var restoFormNote:any = $("#rate").val();
  var restoFormAvis:any = $("#avis").val();


  var list = document.createElement('article');
  list.setAttribute("class", "case");
  list.setAttribute("id", "caseAdd");
  list.setAttribute("data-js", "hide");
  var restoName = document.createElement('h5');
  var restoAverage = document.createElement('aside');
  restoAverage.setAttribute("class", "averageBox");
  var restoAddress = document.createElement('h6');
  var restoRating = document.createElement('ul');
  restoRating.setAttribute("class", "hidden");
  restoRating.setAttribute("id", "ulAdd");
  var addStreetview = document.createElement('div');
  addStreetview.setAttribute("class", "streetviewDiv");
  var addImg = document.createElement('img');
  addImg.src = `https://maps.googleapis.com/maps/api/streetview?size=200x100&location=${restoFormAdress}&fov=100&heading=235&pitch=10&key=AIzaSyC6_wqbr58IHAgGs3sBD1C934TSOYKX0lg`;
  var addNote = document.createElement('li');
  addNote.setAttribute("class", "liAdd");
  var addComment = document.createElement('li');
  var addContent = document.createElement('div');
  var addContentClass = addContent.setAttribute("class", "ratings");

  restoName.append(restoFormName);
  restoAddress.append(restoFormAdress);
  addStreetview.append(addImg);
  addNote.append(restoFormNote);
  addComment.append(restoFormAvis)
  addContent.appendChild(addNote);
  addContent.appendChild(addComment);
  restoRating.appendChild(addContent);

  list.appendChild(restoName);
  list.appendChild(restoAverage);
  list.appendChild(restoAddress);
  list.appendChild(addStreetview);
  list.appendChild(restoRating);
  console.log(restoName);

  var section = document.querySelector(".list");
  section.appendChild(list);

  $("#caseAdd").click(function (event:any) {
    var hiderTarget = document.querySelector('ul[id="ulAdd"]')
    hiderTarget.classList.toggle('-visible');
    console.log("coucou ul")
    });

    let note = $('li[class="liAdd"]').html();
    console.log(note)
    switch(note){
      case "0": 
      $('li[class="liAdd"]').html(etoiles.one);
      break;
      case "1": 
      $('li[class="liAdd"]').html(etoiles.one);
      break;
      case "2": 
      $('li[class="liAdd"]').html(etoiles.two);
      break;
      case "3": 
      $('li[class="liAdd"]').html(etoiles.three);
      break;
      case "4": 
      $('li[class="liAdd"]').html(etoiles.four);
      break;
      case "5": 
      $('li[class="liAdd"]').html(etoiles.five);
      break;
    }
  

  /*var addNote = document.createElement('li');
  var addComment = document.createElement('li');
  var addContent = document.createElement('div');
  var addContentClass = addContent.setAttribute("class", "ratings");
  addNote.textContent = rating[j].stars;
  addComment.textContent =  rating[j].comment;
  addContent.appendChild(addNote);
  addContent.appendChild(addComment);
  restoRating.appendChild(addContent);
  addStreetview.appendChild(addImg);
  console.log(restos[j].lat+","+restos[j].long);

  list.appendChild(restoName);
  list.appendChild(restoAverage);
  list.appendChild(restoAddress);
  list.appendChild(addStreetview);
  list.appendChild(restoRating);
  
  var section = document.querySelector(".list");
  section.appendChild(list);*/

})


/***************************************************************************************/
/*Object.keys().length   console.log(Object.keys(json[0]['restos']).length) */

