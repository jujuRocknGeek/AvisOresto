import { notDeepStrictEqual } from "assert";

require("./rating.ts");
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
      stars();
      average(resto);
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
    var restoAverage = document.createElement('aside');
    restoAverage.setAttribute("class", "averageBox");
    var restoAddress = document.createElement('h6');
    var restoRating = document.createElement('ul');
    restoRating.setAttribute("class", "hidden");

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
    }
    

    list.appendChild(restoName);
    list.appendChild(restoAverage);
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

/************************************************************/
/********************** Objets Etoiles **********************/
let etoiles= {
  one: "<img src='assets/img/1stars.png' id='stars'/>",
  two: "<img src='assets/img/2stars.png' id='stars'/>",
  three:"<img src='assets/img/3stars.png' id='stars'/>",
  four:"<img src='assets/img/4stars.png' id='stars'/>",
  five:"<img src='assets/img/5stars.png' id='stars'/>"
};

/************************************************************/
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

/************************************************************/
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

$(".selectAll").click(function(){
  console.log("clic sur resto tous les restos");
});

$(".selectOne").click(selectOne);
function selectOne(){
  console.log("clic sur resto 0 1 etoile");
  let starAverage = $("aside");
  for(let i in starAverage){
    let noteStars = $(`aside:eq(${i})`).html();
  }
}

$(".selectTwoThree").click(selectTwoThree);
function selectTwoThree(){
  console.log("clic sur resto 2 3 etoile");
  let starAverage = $("aside");
  for(let i in starAverage){
    let noteStars = $(`aside:eq(${i})`).html();
  }
}

$(".selectFourFive").click(selectFourFive);
function selectFourFive(){
  console.log("clic sur resto 4 5 etoile");
  let starAverage = $("aside");
  for(let i in starAverage){
    let noteStars = $(`aside:eq(${i})`).html();
  }
}
/*Object.keys().length   console.log(Object.keys(json[0]['restos']).length) */

