/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game1-script.ts":
/*!*****************************!*\
  !*** ./src/game1-script.ts ***!
  \*****************************/
/***/ (() => {

eval("function remToPixels(rem) {\n    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);\n}\n// get css root variables \nvar rootStyle = window.getComputedStyle(document.body);\nvar red = null;\nif (rootStyle) {\n    red = rootStyle.getPropertyValue('--red');\n}\n// create canvas\nvar canvas = document.createElement('canvas');\ncanvas.id = 'game-canvas';\ncanvas.width = remToPixels(58);\ncanvas.height = remToPixels(13);\nvar gameContainer = document.getElementById('game-inner');\nif (gameContainer) {\n    gameContainer.appendChild(canvas);\n}\n// draw on canvas \nif (canvas.getContext) {\n    var ctx = canvas.getContext('2d');\n    if (red) {\n        ctx.strokeStyle = red;\n    }\n    else {\n        ctx.strokeStyle = 'red';\n    }\n    ctx.lineWidth = remToPixels(0.5);\n    ctx.beginPath();\n    ctx.arc(remToPixels(6.5), canvas.height / 2, remToPixels(0.5), 0, 2 * Math.PI);\n    ctx.stroke();\n    ctx.beginPath();\n    ctx.arc(remToPixels(10), canvas.height / 2, remToPixels(0.5), 0, 2 * Math.PI);\n    ctx.stroke();\n}\nelse {\n    // make this output something to the user later e.g. unsupported browser\n    console.log('canvas not supported on this browser');\n}\n\n\n//# sourceURL=webpack://progii/./src/game1-script.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/game1-script.ts"]();
/******/ 	
/******/ })()
;