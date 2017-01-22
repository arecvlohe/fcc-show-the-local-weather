/** @type {string} */
var API = 'https://api.darksky.net/forecast/464271a84e193070f9a5d159c9574296/'

/** @type {Object} */
var D = window.document

/** @type {Object} */
var NAV = window.navigator

/** @type {string} */
var LANGUAGE = NAV.userLanguage || NAV.language;

/** @type {Object} */
var app = D.querySelector('#app')

/**
* The global state
* @namespace
*/
var STATE = {}
