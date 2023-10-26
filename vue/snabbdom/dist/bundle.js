/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/mysnabbdom/h.js":
/*!*****************************!*\
  !*** ./src/mysnabbdom/h.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ "./src/mysnabbdom/vnode.js");


// h('div')
// h('div', '文字')
// h('div', {}, [])
// h('div', {}, [
  // h('li', '苹果'),
  // h('li', '榴莲'),
  // h('li', '西瓜'),
  // h('li', '香蕉'),
// ])
// h('div', [])
// 函数重载
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(sel, data, c) {
  console.log(c)
   if(typeof c === 'string' || typeof c === 'number') {
     return (0,_vnode__WEBPACK_IMPORTED_MODULE_0__["default"])(sel, data, undefined, c, undefined)
   } else if(Array.isArray(c)) {
    for(let i = 0; i < c.length; c++) {
      let children = []
      if(typeof c[i] === 'object' && c[i].hasOwnProperty('sel')) {
        throw new Error('传入的数组参数中有一项不是h函数')
      } 
      children.push(c[i])
    }
    return (0,_vnode__WEBPACK_IMPORTED_MODULE_0__["default"])(sel, data, children, undefined, undefined)
   } else if(typeof c === 'object' && c.hasOwnProperty('sel')) {
    
   } else {
     throw new Error('传入的第三个参数类型不对')
   }
}

/***/ }),

/***/ "./src/mysnabbdom/vnode.js":
/*!*********************************!*\
  !*** ./src/mysnabbdom/vnode.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(sel, data, children, text, elm) {
  return { sel, data, children, text, elm}
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mysnabbdom_h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mysnabbdom/h */ "./src/mysnabbdom/h.js");


const myVnode = (0,_mysnabbdom_h__WEBPACK_IMPORTED_MODULE_0__["default"])('ul', {}, [
  (0,_mysnabbdom_h__WEBPACK_IMPORTED_MODULE_0__["default"])('li', {}, '苹果'),
  (0,_mysnabbdom_h__WEBPACK_IMPORTED_MODULE_0__["default"])('li', {}, (0,_mysnabbdom_h__WEBPACK_IMPORTED_MODULE_0__["default"])('div', {}, '我是香蕉')),
])
console.log('----', myVnode)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQWUsb0NBQVU7QUFDekI7QUFDQTtBQUNBLFlBQVksa0RBQUs7QUFDakIsS0FBSztBQUNMLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsa0RBQUs7QUFDaEIsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMvQkEsNkJBQWUsb0NBQVM7QUFDeEIsV0FBVztBQUNYOzs7Ozs7VUNGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjhCO0FBQzlCO0FBQ0EsZ0JBQWdCLHlEQUFDLFNBQVM7QUFDMUIsRUFBRSx5REFBQyxTQUFTO0FBQ1osRUFBRSx5REFBQyxTQUFTLEVBQUUseURBQUMsVUFBVTtBQUN6QjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc25hYmJkb20vLi9zcmMvbXlzbmFiYmRvbS9oLmpzIiwid2VicGFjazovL3NuYWJiZG9tLy4vc3JjL215c25hYmJkb20vdm5vZGUuanMiLCJ3ZWJwYWNrOi8vc25hYmJkb20vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc25hYmJkb20vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NuYWJiZG9tL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc25hYmJkb20vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zbmFiYmRvbS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdm5vZGUgZnJvbSAnLi92bm9kZSdcclxuXHJcbi8vIGgoJ2RpdicpXHJcbi8vIGgoJ2RpdicsICfmloflrZcnKVxyXG4vLyBoKCdkaXYnLCB7fSwgW10pXHJcbi8vIGgoJ2RpdicsIHt9LCBbXHJcbiAgLy8gaCgnbGknLCAn6Iu55p6cJyksXHJcbiAgLy8gaCgnbGknLCAn5qa06I6yJyksXHJcbiAgLy8gaCgnbGknLCAn6KW/55OcJyksXHJcbiAgLy8gaCgnbGknLCAn6aaZ6JWJJyksXHJcbi8vIF0pXHJcbi8vIGgoJ2RpdicsIFtdKVxyXG4vLyDlh73mlbDph43ovb1cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNlbCwgZGF0YSwgYykge1xyXG4gIGNvbnNvbGUubG9nKGMpXHJcbiAgIGlmKHR5cGVvZiBjID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgYyA9PT0gJ251bWJlcicpIHtcclxuICAgICByZXR1cm4gdm5vZGUoc2VsLCBkYXRhLCB1bmRlZmluZWQsIGMsIHVuZGVmaW5lZClcclxuICAgfSBlbHNlIGlmKEFycmF5LmlzQXJyYXkoYykpIHtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjLmxlbmd0aDsgYysrKSB7XHJcbiAgICAgIGxldCBjaGlsZHJlbiA9IFtdXHJcbiAgICAgIGlmKHR5cGVvZiBjW2ldID09PSAnb2JqZWN0JyAmJiBjW2ldLmhhc093blByb3BlcnR5KCdzZWwnKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcign5Lyg5YWl55qE5pWw57uE5Y+C5pWw5Lit5pyJ5LiA6aG55LiN5pivaOWHveaVsCcpXHJcbiAgICAgIH0gXHJcbiAgICAgIGNoaWxkcmVuLnB1c2goY1tpXSlcclxuICAgIH1cclxuICAgIHJldHVybiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcclxuICAgfSBlbHNlIGlmKHR5cGVvZiBjID09PSAnb2JqZWN0JyAmJiBjLmhhc093blByb3BlcnR5KCdzZWwnKSkge1xyXG4gICAgXHJcbiAgIH0gZWxzZSB7XHJcbiAgICAgdGhyb3cgbmV3IEVycm9yKCfkvKDlhaXnmoTnrKzkuInkuKrlj4LmlbDnsbvlnovkuI3lr7knKVxyXG4gICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCBlbG0pIHtcclxuICByZXR1cm4geyBzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCBlbG19XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBoIGZyb20gJy4vbXlzbmFiYmRvbS9oJ1xyXG5cclxuY29uc3QgbXlWbm9kZSA9IGgoJ3VsJywge30sIFtcclxuICBoKCdsaScsIHt9LCAn6Iu55p6cJyksXHJcbiAgaCgnbGknLCB7fSwgaCgnZGl2Jywge30sICfmiJHmmK/pppnolYknKSksXHJcbl0pXHJcbmNvbnNvbGUubG9nKCctLS0tJywgbXlWbm9kZSlcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9