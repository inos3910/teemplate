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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/ts/app.ts":
/*!**************************!*\
  !*** ./assets/ts/app.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar item_1 = __webpack_require__(/*! ./item */ \"./assets/ts/item.ts\");\n\nvar elem = document.getElementById('output');\nvar aBook = new item_1.Item('はじめてのTypeScript', 2900);\naBook.say(elem);\naBook.greeter(elem, {\n  firstName: 'Michael',\n  lastName: 'Jackson'\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvdHMvYXBwLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3RzL2FwcC50cz9mNDAzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SXRlbX0gZnJvbSAnLi9pdGVtJztcbmNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0Jyk7XG5jb25zdCBhQm9vayA9IG5ldyBJdGVtKCfjga/jgZjjgoHjgabjga5UeXBlU2NyaXB0JywgMjkwMCk7XG5hQm9vay5zYXkoZWxlbSk7XG5hQm9vay5ncmVldGVyKGVsZW0sIHtcbiAgZmlyc3ROYW1lOiAnTWljaGFlbCcsXG4gIGxhc3ROYW1lOiAnSmFja3Nvbidcbn0pO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./assets/ts/app.ts\n");

/***/ }),

/***/ "./assets/ts/hello.ts":
/*!****************************!*\
  !*** ./assets/ts/hello.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar message = 'Hello! TypeScript!';\nconsole.log(message);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvdHMvaGVsbG8udHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvdHMvaGVsbG8udHM/YmE1YSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtZXNzYWdlOnN0cmluZyA9ICdIZWxsbyEgVHlwZVNjcmlwdCEnO1xuY29uc29sZS5sb2cobWVzc2FnZSk7Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./assets/ts/hello.ts\n");

/***/ }),

/***/ "./assets/ts/item.ts":
/*!***************************!*\
  !*** ./assets/ts/item.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar Item =\n/** @class */\nfunction () {\n  function Item(name, price) {\n    this.name = name;\n    this.price = price;\n  }\n\n  Item.prototype.say = function (elem) {\n    if (!elem) {\n      return;\n    }\n\n    elem.insertAdjacentHTML('beforeend', '書名：' + this.name + '  価格: ' + this.price + '円');\n  };\n\n  Item.prototype.greeter = function (elem, person) {\n    elem.insertAdjacentHTML('beforeend', \"Hello, \" + person.firstName + \" \" + person.lastName);\n  };\n\n  return Item;\n}();\n\nexports.Item = Item;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvdHMvaXRlbS50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy90cy9pdGVtLnRzP2EzZmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIFBlcnNvbiB7XG4gIGZpcnN0TmFtZTogc3RyaW5nO1xuICBsYXN0TmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgSXRlbSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmFtZTpzdHJpbmcsIHByaXZhdGUgcHJpY2U6bnVtYmVyKXt9XG4gIHB1YmxpYyBzYXkoZWxlbSA6IEhUTUxFbGVtZW50IHwgbnVsbCkgOiB2b2lkIHtcbiAgICBpZighZWxlbSl7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsZW0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCAn5pu45ZCN77yaJyArIHRoaXMubmFtZSArICcgIOS+oeagvDogJyArIHRoaXMucHJpY2UgKyAn5YaGJyk7XG4gIH1cbiAgcHVibGljIGdyZWV0ZXIoZWxlbSA6IEhUTUxFbGVtZW50IHwgbnVsbCwgcGVyc29uIDogUGVyc29uKSB7XG4gICAgZWxlbS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIFwiSGVsbG8sIFwiICsgcGVyc29uLmZpcnN0TmFtZSArIFwiIFwiICsgcGVyc29uLmxhc3ROYW1lKTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBWkEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./assets/ts/item.ts\n");

/***/ }),

/***/ 0:
/*!*************************************************************************!*\
  !*** multi ./assets/ts/app.ts ./assets/ts/hello.ts ./assets/ts/item.ts ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Applications/MAMP/htdocs/template/assets/ts/app.ts */"./assets/ts/app.ts");
__webpack_require__(/*! /Applications/MAMP/htdocs/template/assets/ts/hello.ts */"./assets/ts/hello.ts");
module.exports = __webpack_require__(/*! /Applications/MAMP/htdocs/template/assets/ts/item.ts */"./assets/ts/item.ts");


/***/ })

/******/ });