/** @namespace */
var app = {}
/**
* A function that takes an element and creates the temp div
* @memberof app
*/
var makeTempDiv = R.compose(
  helpers.setId('temp')
)
app.makeTempDiv = makeTempDiv
var temp = app.makeTempDiv(createElement('div'))

/**
* A function that takes an element and creates a F button
* @memberof app
*/
var makeFButton = R.compose(
  helpers.setListenter('click', function() { app.setTempText2F(STATE) }),
  helpers.setText('F'),
  helpers.setClassName('button'),
  helpers.setId('fahrenheit')
)
app.makeFButton = makeFButton
var fButton = app.makeFButton(createElement('div'))

/**
* A function that takes an elements and creates a C button
* @memberof app
*/
var makeCButton = R.compose(
  helpers.setListenter('click', function() { app.setTempText2C(STATE) }),
  helpers.setText('C'),
  helpers.setClassName('button'),
  helpers.setId('celsius')
)
app.makeCButton = makeCButton
var cButton = makeCButton(createElement('div'))

/**
* A function that takes an element and will box the F and C buttons
* @memberof app
*/
var makeButtonBox = R.compose(
  setId('button-box')
)
app.makeButtonBox = makeButtonBox
var buttonBox = app.makeButtonBox(createElement('div'))

/**
* A function that resets the temp value
* @memberof app
*/
var setTempText = helpers.setTextContentTemp(temp)
app.setTempText = setTempText

/**
* A function that takes state and renders the temp text as degrees F
* @memberof app
*/
var setTempText2F = app.setTempText('F')
app.setTempText2F = setTempText2F
/**
* A function that takes state and renders the temp text as degrees C
* @memberof app
*/
var setTempText2C = app.setTempText('C')
app.setTempText2C = setTempText2C

/**
* A function that takes text and sets it on the app element
* @memberof app
*/
var setAppText = helpers.setTextContent(global.app)
app.setAppText = setAppText
var setAppErrorClass = helpers.setClassName('error')

/**
* A function that handles geolocation success
* @memberof app
* @param {Object} position - The coordinates of the user passed back from navigator
*/
function onSuccess(position) {
  var lat = position.coords.latitude
  var lon = position.coords.longitude
  var url = API + lat + ',' + lon + '?exclude=minutely,hourly,daily,alerts,flags&lang=' + LANGUAGE + '&units=auto'

  $.ajax({
    url: url,
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function(response) {
      var temperature = response.currently.temperature
      var contents = appendElements(global.app)
      var buttons = appendElements(buttonBox)
      setGlobalState(STATE, { fahrenheit: temperature, celsius: (temperature - 32) * (5/9) }, app.setTempText2F)
      buttons([fButton, cButton])
      contents([temp, buttonBox])

    }
  })
}
app.onSuccess = onSuccess

/**
* A function that handles geolocation errors
* @memberof app
* @param {Object} - The error object passed back from navigator
*/
function onError(error) {
  setAppErrorClass(global.app)
  switch(error.code) {
    case error.PERMISSION_DENIED:
      app.setAppText('User denied the request for Geolocation.')
      break;
    case error.POSITION_UNAVAILABLE:
      app.setAppText('Location information is unavailable.')
      break;
    case error.TIMEOUT:
      app.setAppText('The request to get user location timed out.')
      break;
    case error.UNKNOWN_ERROR:
      app.setAppText('An unknown error occurred.')
      break;
   }
}
app.onError = onError

/**
* A function that runs the program
* @memberof app
*/
function main() {
  if (global.NAV.geolocation) {
    global.NAV.geolocation.getCurrentPosition(app.onSuccess, app.onError)
  }
}
app.main = main

app.main()
