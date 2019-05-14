/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/stylesheets/style.scss":
/*!***************************************!*\
  !*** ./assets/stylesheets/style.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzaGVldHMvc3R5bGUuc2Nzcz9kNWIxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Ii4vYXNzZXRzL3N0eWxlc2hlZXRzL3N0eWxlLnNjc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./assets/stylesheets/style.scss\n");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("jQuery(document).ready(function ($) {\r\n    __webpack_require__(/*! ../assets/stylesheets/style.scss */ \"./assets/stylesheets/style.scss\");\r\n    __webpack_require__(/*! ./map.ts */ \"./src/map.ts\");\r\n    console.log(\"hello ca va ok\");\r\n});\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHM/ZmZiNCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsQ0FBQztJQUNqQyxtQkFBTyxDQUFDLHlFQUFrQyxDQUFDLENBQUM7SUFDNUMsbUJBQU8sQ0FBQyw4QkFBVSxDQUFDLENBQUM7SUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6Ii4vc3JjL2luZGV4LnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XHJcbnJlcXVpcmUoXCIuLi9hc3NldHMvc3R5bGVzaGVldHMvc3R5bGUuc2Nzc1wiKTtcclxucmVxdWlyZShcIi4vbWFwLnRzXCIpO1xyXG5jb25zb2xlLmxvZyhcImhlbGxvIGNhIHZhIG9rXCIpO1xyXG59KTsgICAgICJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ }),

/***/ "./src/map.ts":
/*!********************!*\
  !*** ./src/map.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var map, infoWindow;\r\nfunction initMap() {\r\n    infoWindow = new google.maps.InfoWindow;\r\n    if (navigator.geolocation) {\r\n        navigator.geolocation.getCurrentPosition(function (position) {\r\n            var pos = {\r\n                lat: position.coords.latitude,\r\n                lng: position.coords.longitude\r\n            };\r\n            var map = new google.maps.Map(document.getElementById('map'), { zoom: 12, center: pos });\r\n            /* ajoute icone geolocalisation*/\r\n            var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';\r\n            var marker = new google.maps.Marker({\r\n                position: pos,\r\n                map: map,\r\n                icon: iconBase + 'man.png'\r\n            });\r\n            /* place les différents restaurants*/\r\n            $.getJSON('restaurants.json', function (donnees) {\r\n                $.each(donnees, function (index, data) {\r\n                    var latitude = data.lat;\r\n                    var longitude = data.long;\r\n                    var ville = { lat: latitude, lng: longitude };\r\n                    var marker = new google.maps.Marker({ position: ville, map: map });\r\n                });\r\n            });\r\n            infoWindow.open(map);\r\n            map.setCenter(pos);\r\n        }, function () {\r\n            handleLocationError(true, infoWindow, map.getCenter());\r\n        });\r\n    }\r\n    else {\r\n        // Browser doesn't support Geolocation\r\n        handleLocationError(false, infoWindow, map.getCenter());\r\n    }\r\n}\r\nfunction handleLocationError(browserHasGeolocation, infoWindow, pos) {\r\n    infoWindow.setPosition(pos);\r\n    infoWindow.setContent(browserHasGeolocation ?\r\n        'Error: The Geolocation service failed.' :\r\n        'Error: Your browser doesn\\'t support geolocation.');\r\n    infoWindow.open(map);\r\n}\r\ninitMap();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFwLnRzPzI4YTQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxHQUFPLEVBQUUsVUFBYyxDQUFDO0FBRTVCLFNBQVMsT0FBTztJQUNkLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBRXRDLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRTtRQUN6QixTQUFTLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQVMsUUFBUTtZQUN4RCxJQUFJLEdBQUcsR0FBRztnQkFDUixHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRO2dCQUM3QixHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTO2FBQzdCLENBQUM7WUFDSixJQUFJLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUMzQixRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztZQUVuRSxpQ0FBaUM7WUFDekIsSUFBSSxRQUFRLEdBQUcsOENBQThDLENBQUM7WUFDOUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDbEMsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsSUFBSSxFQUFFLFFBQVEsR0FBRyxTQUFTO2FBQ3pCLENBQUMsQ0FBQztZQUViLHFDQUFxQztZQUM3QixDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLFVBQVMsT0FBTztnQkFDNUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBUyxLQUFLLEVBQUUsSUFBSTtvQkFDbEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDeEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDMUIsSUFBSSxLQUFLLEdBQUcsRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUMsQ0FBQztvQkFDNUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7Z0JBQ25FLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUNEO1lBQ0UsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxzQ0FBc0M7UUFDdEMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztLQUN6RDtBQUNULENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFDLHFCQUF5QixFQUFFLFVBQWMsRUFBRSxHQUFPO0lBQzNFLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsVUFBVSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3pCLHdDQUF3QyxDQUFDLENBQUM7UUFDMUMsbURBQW1ELENBQUMsQ0FBQztJQUN6RSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFDRCxPQUFPLEVBQUUsQ0FBQyIsImZpbGUiOiIuL3NyYy9tYXAudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbWFwOmFueSwgaW5mb1dpbmRvdzphbnk7XHJcblxyXG5mdW5jdGlvbiBpbml0TWFwKCk6dm9pZCB7XHJcbiAgaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93O1xyXG5cclxuICAgIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihwb3NpdGlvbikge1xyXG4gICAgICAgIHZhciBwb3MgPSB7XHJcbiAgICAgICAgICBsYXQ6IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcclxuICAgICAgICAgIGxuZzogcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge3pvb206IDEyLCBjZW50ZXI6IHBvc30pO1xyXG4gICAgICAgICAgXHJcbi8qIGFqb3V0ZSBpY29uZSBnZW9sb2NhbGlzYXRpb24qL1xyXG4gICAgICAgIHZhciBpY29uQmFzZSA9ICdodHRwczovL21hcHMuZ29vZ2xlLmNvbS9tYXBmaWxlcy9rbWwvc2hhcGVzLyc7XHJcbiAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgcG9zaXRpb246IHBvcyxcclxuICAgICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgICAgaWNvbjogaWNvbkJhc2UgKyAnbWFuLnBuZydcclxuICAgICAgICAgIH0pO1xyXG5cclxuLyogcGxhY2UgbGVzIGRpZmbDqXJlbnRzIHJlc3RhdXJhbnRzKi9cclxuICAgICAgICAkLmdldEpTT04oJ3Jlc3RhdXJhbnRzLmpzb24nLCBmdW5jdGlvbihkb25uZWVzKSB7XHJcbiAgICAgICAgICAkLmVhY2goZG9ubmVlcywgZnVuY3Rpb24oaW5kZXgsIGRhdGEpe1xyXG4gICAgICAgICAgICBsZXQgbGF0aXR1ZGUgPSBkYXRhLmxhdDtcclxuICAgICAgICAgICAgbGV0IGxvbmdpdHVkZSA9IGRhdGEubG9uZztcclxuICAgICAgICAgICAgbGV0IHZpbGxlID0ge2xhdDogbGF0aXR1ZGUsIGxuZzogbG9uZ2l0dWRlfTtcclxuICAgICAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe3Bvc2l0aW9uOiB2aWxsZSwgbWFwOiBtYXB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaW5mb1dpbmRvdy5vcGVuKG1hcCk7XHJcbiAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIocG9zKTtcclxuICAgICAgICAgIH0sIFxyXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZUxvY2F0aW9uRXJyb3IodHJ1ZSwgaW5mb1dpbmRvdywgbWFwLmdldENlbnRlcigpKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBCcm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBHZW9sb2NhdGlvblxyXG4gICAgICAgICAgaGFuZGxlTG9jYXRpb25FcnJvcihmYWxzZSwgaW5mb1dpbmRvdywgbWFwLmdldENlbnRlcigpKTtcclxuICAgICAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUxvY2F0aW9uRXJyb3IoYnJvd3Nlckhhc0dlb2xvY2F0aW9uOmFueSwgaW5mb1dpbmRvdzphbnksIHBvczphbnkpIHtcclxuICAgIGluZm9XaW5kb3cuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgIGluZm9XaW5kb3cuc2V0Q29udGVudChicm93c2VySGFzR2VvbG9jYXRpb24gP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnRXJyb3I6IFRoZSBHZW9sb2NhdGlvbiBzZXJ2aWNlIGZhaWxlZC4nIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0Vycm9yOiBZb3VyIGJyb3dzZXIgZG9lc25cXCd0IHN1cHBvcnQgZ2VvbG9jYXRpb24uJyk7XHJcbiAgICBpbmZvV2luZG93Lm9wZW4obWFwKTtcclxufVxyXG5pbml0TWFwKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/map.ts\n");

/***/ })

/******/ });