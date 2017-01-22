/** @namespace */
var global = {}

/**
* The global api url
* @memberof global
* @type {string}
*/
var API = 'https://api.darksky.net/forecast/464271a84e193070f9a5d159c9574296/'
global.API = API
/**
* The global document object
* @memberof global
* @type {Object}
*/
var D = window.document
global.D = D

/**
* The global navigator object
* @memberof global
* @type {Object}
*/
var NAV = window.navigator
global.NAV = NAV
/**
* The global language taken from the browser
* @memberof global
* @type {Object}
*/
var LANGUAGE = NAV.userLanguage || NAV.language;
global.LANGUAGE = LANGUAGE
/**
* The global app div
* @memberof global
* @type {Object}
*/
var app = D.querySelector('#app')
global.app = app

/**
* A function that updates the global state object
* @memberof global
* @param {Object} oldState
* @param {newState} newState
* @param {function} callback
*/
function setGlobalState(oldState, newState, callback) {
  STATE = Object.assign({}, oldState, newState)
  callback(STATE)
}
global.setGlobalState = setGlobalState

/**
* The global state object
* @namespace
*/
var STATE = {}