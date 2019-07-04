var geocoder:any;
var geocoderInverse:any;
var map:any;
var service:any;
var infowindow:any;
var marker:any;
let jsonMarkers:any = [];
let addRestoMarker:any = [];

/***************  Cacher le Formulaire d'ajout de Restaurant + au clic Show() ********************/
$("#restoForm").hide();
$("#addResto").click(()=>{
  $("#restoForm").show();
})

/***************************************************************************************/
/********************* initialise la carte ******************/
let mapRun = function(){
  return new Promise(function(resolve:any, reject:any){

  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();

  navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
      };
  map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center: pos});
/*************** ajoute icone position utilisateur  ***************/
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    map: map,
    position: pos,
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
    markerJson(), list(),addResto(),restoPlace();
  }, 1000) )
  .catch((error)=>console.log(error))
/***************************************************************************************/

function restoPlace(){
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    map.setZoom(15);
    var request = {
      location: pos,
      radius: '500',
      type: ['restaurant']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, retour);
    map.setCenter(pos);

  function retour(results:any, status:any) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];

        var request2 = {
          placeId: place.place_id
        };
        service.getDetails(request2, callback) 
        var j=0;
  function callback(review:any, status:any) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

      /************ creer les Listes de restos ************/
      var list = document.createElement('article');
      list.setAttribute("class", "case");
      list.setAttribute("data-js", "hide");
      list.setAttribute("href",`#menuP${j}`)
      var restoName = document.createElement('h5');
      var restoAverage = document.createElement('aside');
      restoAverage.setAttribute("class", "averageBox");
      restoAverage.textContent = review.rating;
      var restoAddress = document.createElement('h6');
      var restoRating = document.createElement('ul');
      restoRating.setAttribute("class", "visible");
      restoRating.setAttribute("id", `menuP${j}`);
      restoName.textContent = review.name;
      restoAddress.textContent = review.vicinity;
      var imgClose = document.createElement('img');
      imgClose.src = "assets/icons/close.jpg";
      imgClose.setAttribute("class", "imgClose");
      imgClose.setAttribute("id", `closeP${j}`);
      restoRating.appendChild(imgClose);

      /************ creer Div affiche PlacePhotos ************/
      var addStreetview = document.createElement('div');
      addStreetview.setAttribute("class", "streetviewDiv");
      addStreetview.appendChild(createPhoto(review, 200, 100))

      function createPhoto(place:any, larg:any, long:any) {
        var photos = place.photos;
        if (!photos) {
          return;
        }
        var img = document.createElement("img");
        for (var i = 0; i < photos.length; i++) {
          img.src = photos[i].getUrl({
            'maxWidth': larg,
            'maxHeight': long
          });
          return img;
        }
      }
    
      /************ creer bouton ajouter Commentaire ************/
      var btnComment = document.createElement('button');
      btnComment.setAttribute("class","addCommentBtn")
      btnComment.setAttribute("href",`#divNoteCommentP${j}`)
      btnComment.textContent = "Ajouter un commentaire";
      restoRating.appendChild(btnComment);

      /************ le Formulaire pour ajouter commentaire ************/
      var divNoteComment =document.createElement('div');
      divNoteComment.setAttribute("class", "divNoteComment");
      divNoteComment.setAttribute("id",`divNoteCommentP${j}`)
      var divAddNote = document.createElement('div');
      divAddNote.setAttribute("class", "btnAddNote");
      divAddNote.setAttribute("id",`divAddNoteP${j}`);
      divAddNote.textContent= "Note :"
      var formNotes = [0,1,2,3,4,5];
      var formAddNote = document.createElement('select');
      formAddNote.setAttribute("id", "addRateP");

      while(formNotes.length){
        var notes:number = formNotes.pop();
        var opt = new Option(`${notes}`);
        formAddNote.options[formAddNote.options.length] = opt;
      }
      divAddNote.appendChild(formAddNote);


      var divAddComment = document.createElement('div');
      divAddComment.setAttribute("class", "btnAddComment");
      divAddComment.setAttribute("id",`divAddCommentP${j}`);
      divAddComment.textContent= "Avis :"
      var formAddComment = document.createElement('textarea');
      formAddComment.setAttribute("id", "addCommentAreaP");
      divAddComment.appendChild(formAddComment);

      var sendComment = document.createElement('button');
      sendComment.setAttribute("class","sendCommentBtnP");
      sendComment.setAttribute("id",`sendCommentBtnP${j}`);
      sendComment.textContent = "Envoyez";
            
      divNoteComment.appendChild(divAddNote);
      divNoteComment.appendChild(divAddComment);
      divNoteComment.appendChild(sendComment);
      restoRating.appendChild(divNoteComment);

      /************ creer elements qui contient les avis ************/
      var rating = review.reviews;
      for (var k = 0; k <rating.length; k++) {
        var addNote = document.createElement('li');
        var addComment = document.createElement('li');
        var addContent = document.createElement('div');
        var addContentClass = addContent.setAttribute("class", "ratings");
        addNote.textContent = rating[k].rating;
        addComment.textContent =  rating[k].text;
        addContent.appendChild(addNote);
        addContent.appendChild(addComment);
        restoRating.appendChild(addContent);
       /* addStreetview.appendChild(addImg);*/
      }

  /************ ajouter le tout dans la liste ************/
      list.appendChild(restoName);
      list.appendChild(restoAverage);
      list.appendChild(restoAddress);
      list.appendChild(addStreetview);
      list.appendChild(restoRating);
            
      var section = document.querySelector(".list");
      section.appendChild(list);

      $(".divNoteComment").hide();
      $("ul").hide();
      createMarker(review);
      j++;
    }
    stars();
    auclic();
    } 
  }
  }
}

  function createMarker(place:any) {
    var iconResto = {
      url : 'assets/img/restomark.png',
      scaledSize: new google.maps.Size(75, 75)
    };
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: iconResto
      });
  
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
  }
  },

  function():void{
  handleLocationError(true, infowindow, map.getCenter());
  });
  } else {
// Browser doesn't support Geolocation
  handleLocationError(false, infowindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation:any, infowindow:any, pos:any) {
    infowindow.setPosition(pos);
    infowindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }
}

/***************************************************************************************/
/************ Ajouter un resto au clic bouton ou map*************************/
function addResto(){
  geocoderInverse = new google.maps.Geocoder();
	map.addListener('rightclick', function (e:any) {
		geocodeLatLng(geocoderInverse, map, e.latLng);

	});


	function geocodeLatLng(geocoderInverse:any, map:any, latLng:any) {
		geocoderInverse.geocode({
			'location': latLng
		}, function (results:any, status:any) {
			if (status === 'OK') {
				if (results[0]) {
					map.setZoom(14);
					map.setCenter(latLng);
          console.log(results[0].formatted_address)
          $("#adresse").val(results[0].formatted_address)
          $("#restoForm").show();
				} else {
					window.alert('aucun resultat trouvé');
				}
			} else {
				window.alert('Le géocodage inversé n\'a pas fonctionné, à cause : ' + status);
			}
		});
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
    /************ creer les Listes de restos ************/
    var list = document.createElement('article');
    list.setAttribute("class", "case");
    list.setAttribute("data-js", "hide");
    list.setAttribute("href",`#menu${i}`);
    var restoName = document.createElement('h5');
    var restoAverage = document.createElement('aside');
    restoAverage.setAttribute("class", "averageBox");
    var restoAddress = document.createElement('h6');
    var restoRating = document.createElement('ul');
    restoRating.setAttribute("class", "visible");
    restoRating.setAttribute("id",`menu${i}`);
    restoName.textContent = restos[i].restaurantName;
    restoAddress.textContent = restos[i].address;
    var imgClose = document.createElement('img');
    imgClose.src = "assets/icons/close.jpg";
    imgClose.setAttribute("class", "imgClose");
    imgClose.setAttribute("id",`close${i}`)
    restoRating.appendChild(imgClose);

    /************ creer Div affiche StreetView ************/
    var addStreetview = document.createElement('div');
    addStreetview.setAttribute("class", "streetviewDiv");
    var addImg = document.createElement('img');
    addImg.src = `https://maps.googleapis.com/maps/api/streetview?size=200x100&location=${restos[i].lat},${restos[i].long}&fov=100&heading=235&pitch=10&key=AIzaSyC6_wqbr58IHAgGs3sBD1C934TSOYKX0lg`;

    /************ creer bouton ajouter Commentaire ************/
    var btnComment = document.createElement('button');
    btnComment.setAttribute("class","addCommentBtn")
    btnComment.setAttribute("href",`#divNoteComment${i}`)
    btnComment.textContent = "Ajouter un commentaire";
    restoRating.appendChild(btnComment);

    /************ le Formulaire pour ajouter commentaire ************/
    var divNoteComment =document.createElement('div');
    divNoteComment.setAttribute("class", "divNoteComment");
    divNoteComment.setAttribute("id",`divNoteComment${i}`)
    var divAddNote = document.createElement('div');
    divAddNote.setAttribute("class", "btnAddNote");
    divAddNote.setAttribute("id",`divAddNote${i}`);
    divAddNote.textContent= "Note :"
    var formNotes = [0,1,2,3,4,5];
    var formAddNote = document.createElement('select');
    formAddNote.setAttribute("id", "addRate");

    while(formNotes.length){
      var notes:number = formNotes.pop();
      var opt = new Option(`${notes}`);
      formAddNote.options[formAddNote.options.length] = opt;
    }
    divAddNote.appendChild(formAddNote);
  

    var divAddComment = document.createElement('div');
    divAddComment.setAttribute("class", "btnAddComment");
    divAddComment.setAttribute("id",`divAddComment${i}`);
    divAddComment.textContent= "Avis :"
    var formAddComment = document.createElement('textarea');
    formAddComment.setAttribute("id", "addCommentArea");
    divAddComment.appendChild(formAddComment);

    var sendComment = document.createElement('button');
    sendComment.setAttribute("class","sendCommentBtn");
    sendComment.setAttribute("id",`sendCommentBtn${i}`);
    sendComment.textContent = "Envoyez";
    
    divNoteComment.appendChild(divAddNote);
    divNoteComment.appendChild(divAddComment);
    divNoteComment.appendChild(sendComment);
    restoRating.appendChild(divNoteComment);


    /************ creer elements qui contient les avis ************/
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
    }

    /************ ajouter le tout dans la liste ************/
    list.appendChild(restoName);
    list.appendChild(restoAverage);
    list.appendChild(restoAddress);
    list.appendChild(addStreetview);
    list.appendChild(restoRating);
    
    var section = document.querySelector(".list");
    section.appendChild(list);

    $(".divNoteComment").hide();
    $("ul").hide();
  }
/***************************************************************************************/
auclic();


/***************************************************************************************/
/***************  Recupère Infos Formulaire d'ajout de restaurants  ********************/
$("#submitBtn").click((event:any)=>{
  addRestoList();
 })
 
 function addRestoList(){
   $("#restoForm").hide();
   var restoFormName:any = $("#nom").val();
   var restoFormAdress:any = $("#adresse").val();
   var restoFormNote:any = $("#rate").val();
   var restoFormAvis:any = $("#avis").val();
 
 /*************** Ajoute le marker sur la map ********************/
     geocoder.geocode( { 'address': restoFormAdress}, function(results:any, status:any) {
       if (status == google.maps.GeocoderStatus.OK) {
         map.setCenter(results[0].geometry.location);
         var marker = new google.maps.Marker({
             map: map,
             position: results[0].geometry.location,
             title: restoFormName
         });
       } else {
         alert('Geocode was not successful for the following reason: ' + status);
       }
     });
   /********* on crée les élements Html de notre nouvel Article list  ***********/
   var list = document.createElement('article');
   list.setAttribute("class", "case");
   list.setAttribute("id", "caseAdd");
   list.setAttribute("data-js", "hide");
   var restoName = document.createElement('h5');
   var restoAverage = document.createElement('aside');
   restoAverage.setAttribute("class", "averageBox");
   var restoAddress = document.createElement('h6');
   var restoRating = document.createElement('ul');
   restoRating.setAttribute("class", "visible");
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
 
   var imgClose = document.createElement('img');
   imgClose.src = "assets/icons/close.jpg";
   imgClose.setAttribute("class", "imgClose");
   restoRating.appendChild(imgClose);
   
 
   /************ creer bouton ajouter Commentaire ************/
   var btnComment = document.createElement('button');
   btnComment.setAttribute("class","addCommentBtn")
   btnComment.setAttribute("id","CommentBtnAdd")
   btnComment.textContent = "Ajouter un commentaire";
   restoRating.appendChild(btnComment);
 
   /************ le Formulaire pour ajouter commentaire ************/
   var divNoteComment =document.createElement('div');
   divNoteComment.setAttribute("class", "divNoteComment");
   var divAddNote = document.createElement('div');
   divAddNote.setAttribute("class", "btnAddNote");
   divAddNote.setAttribute("data-js", "btnAddNote");
   divAddNote.textContent= "Note :"
   var formNotes = [0,1,2,3,4,5];
   var formAddNote = document.createElement('select');
   formAddNote.setAttribute("id", "addRate");
   
     while(formNotes.length){
       var notes:number = formNotes.pop();
       var opt = new Option(`${notes}`);
       formAddNote.options[formAddNote.options.length] = opt;
     }
     divAddNote.appendChild(formAddNote);
     
   
   var divAddComment = document.createElement('div');
   divAddComment.setAttribute("class", "btnAddComment");
   divAddComment.setAttribute("data-js", "btnAddComment");
   divAddComment.textContent= "Avis :"
   var formAddComment = document.createElement('textarea');
   formAddComment.setAttribute("id", "addCommentArea");
   divAddComment.appendChild(formAddComment);
   
   var sendComment = document.createElement('button');
   sendComment.setAttribute("class","sendCommentBtn");
   sendComment.setAttribute("id","CommentBtnSend");
   sendComment.textContent = "Envoyez";
       
   divNoteComment.appendChild(divAddNote);
   divNoteComment.appendChild(divAddComment);
   divNoteComment.appendChild(sendComment);
   restoRating.appendChild(divNoteComment);
   
  /************ ajout dans la liste ************/
   restoName.append(restoFormName);
   restoAddress.append(restoFormAdress);
   addStreetview.append(addImg);
   addNote.append(restoFormNote);
   addComment.append(restoFormAvis)
   addContent.appendChild(addNote);
   addContent.appendChild(addComment);
   restoRating.appendChild(addContent);
   restoAverage.append(restoFormNote);
   
 
   list.appendChild(restoName);
   list.appendChild(restoAverage);
   list.appendChild(restoAddress);
   list.appendChild(addStreetview);
   list.appendChild(restoRating);
   console.log(restoName);
 
   var section = document.querySelector(".list");
   section.appendChild(list);
   $("#ulAdd").hide();
   event.stopPropagation();
 
   $("#caseAdd").click(function (event:any) {
     $("#ulAdd").show();
     event.stopPropagation();
     $('.imgClose').click((event)=>{
       $("#ulAdd").hide();
       event.stopPropagation();
       })
 });
stars();
 }
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


function auclic(){


  let sendCommentIdP = $('.sendCommentBtnP');
  Array.prototype.forEach.call(sendCommentIdP, function (hider:any) {
  let selectBtn = hider.getAttribute('id');
  hider.addEventListener('click', function (event:any) {
    let selectUl= $(`#${selectBtn}`).parents(".visible").attr('id');
    console.log(selectUl)
    let contentRate = $(`#${selectBtn}`).parents("div").attr('id');
    let divRate = $(`#${contentRate}`).children('div').attr('id');
    let divComment = $(`#${contentRate}`).children('div').next().attr('id');
      var restoFormNote:any = $(`div[id=${divRate}] #addRateP`).val();
      var restoFormAvis:any = $(`div[id=${divComment}] #addCommentAreaP`).val();
      console.log(restoFormAvis)
      console.log(restoFormNote)
 
      /********* on crée les élements Html de notre nouvel Avis  ***********/
      var addNote = document.createElement('li');
      addNote.setAttribute("class", "liAdd");
      var addComment = document.createElement('li');
      var addContent = document.createElement('div');
      var addContentClass = addContent.setAttribute("class", "ratings");
      
     /************ ajout dans la liste ************/
      addNote.append(restoFormNote);
      addComment.append(restoFormAvis)
      addContent.appendChild(addNote);
      addContent.appendChild(addComment);
      $(`#${selectUl}`).append(addContent);
      $(`#${contentRate}`).hide();
      stars();
      $("textarea").val("");
    event.stopPropagation();
    });
  });



  let sendCommentId = $('.sendCommentBtn');
  Array.prototype.forEach.call(sendCommentId, function (hider:any) {
  let selectBtn = hider.getAttribute('id');
  hider.addEventListener('click', function (event:any) {
    let selectUl= $(`#${selectBtn}`).parents(".visible").attr('id');
    console.log(selectUl)
    let contentRate = $(`#${selectBtn}`).parents("div").attr('id');
    let divRate = $(`#${contentRate}`).children('div').attr('id');
    let divComment = $(`#${contentRate}`).children('div').next().attr('id');
      var restoFormNote:any = $(`div[id=${divRate}] #addRate`).val();
      var restoFormAvis:any = $(`div[id=${divComment}] #addCommentArea`).val();
      console.log(restoFormAvis)
      console.log(restoFormNote)
 
      /********* on crée les élements Html de notre nouvel Avis  ***********/
      var addNote = document.createElement('li');
      addNote.setAttribute("class", "liAdd");
      var addComment = document.createElement('li');
      var addContent = document.createElement('div');
      var addContentClass = addContent.setAttribute("class", "ratings");
      
     /************ ajout dans la liste ************/
      addNote.append(restoFormNote);
      addComment.append(restoFormAvis)
      addContent.appendChild(addNote);
      addContent.appendChild(addComment);
      $(`#${selectUl}`).append(addContent);
      $(`#${contentRate}`).hide();
      stars();
      $("textarea").val("");
    event.stopPropagation();
    });
  });
  /***************************************************************************************/
  /************ evenements au clic ************/
  let hiders = document.querySelectorAll('[data-js="hide"]');
  Array.prototype.forEach.call(hiders, function (hider:any) {
  let hiderID = hider.getAttribute('href');
  let hiderTarget = $(`${hiderID}`);
  hider.addEventListener('click', function (event:any) {
    $(`${hiderID}`).show();
    event.stopPropagation();
    });
  });
    
  
  let imgSel = document.querySelectorAll('.imgClose');
  
  Array.prototype.forEach.call(imgSel, function (hider:any) {
  let hiderId = hider.getAttribute('id');
  let hiderTarg= $(`${hiderId}`);
  $(`#${hiderId}`).click((e)=>{
    e.preventDefault();
    console.log("clic sur "+ hiderId)
    $("ul").hide();
    event.stopPropagation();
    })
  });
  
  let addCommentId = document.querySelectorAll('.addCommentBtn');
  Array.prototype.forEach.call(addCommentId, function (hider:any) {
  let hiderid = hider.getAttribute('href');
  hider.addEventListener('click', function (event:any) {
    $(`${hiderid}`).show();
    event.stopPropagation();
    });
  });
  
  }