/**
* Create the div for where the temp will be displayed
*/
var makeTempDiv = R.compose(
  helpers.setId('temp')
)
var temp = makeTempDiv(createElement('div'))

/**
* Create a button that when the user clicks displays the temperature in fahrenheit
*/
var makeFButton = R.compose(
  helpers.setListenter('click', function() { setTempText2F(STATE) }),
  helpers.setText('F'),
  helpers.setClassName('button'),
  helpers.setId('fahrenheit')
)
var fButton = makeFButton(createElement('div'))

/**
* Create a button that when the user clicks displays the temperature in celsius
*/
var makeCButton = R.compose(
  helpers.setListenter('click', function() { setTempText2C(STATE) }),
  helpers.setText('C'),
  helpers.setClassName('button'),
  helpers.setId('celsius')
)
var cButton = makeCButton(createElement('div'))

var makeButtonBox = R.compose(
  setId('button-box')
)
var buttonBox = makeButtonBox(createElement('div'))

/**
* Create a function that resets the temp value
*/
var setTempText = helpers.setTextContentTemp(temp)
var setTempText2F = setTempText('F')
var setTempText2C = setTempText('C')

var setAppText = helpers.setTextContent(global.app)
var setAppErrorClass = helpers.setClassName('error')

/**
* Handle the geolocation if it returns the users position
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
      setGlobalState(STATE, { fahrenheit: temperature, celsius: (temperature - 32) * (5/9) }, setTempText2F)
      buttons([fButton, cButton])
      contents([temp, buttonBox])

    }
  })
}

/**
* Handle geolocation if for some reason it fails
* @param {Object} - The error object passed back from navigator
*/
function onError(error) {
  setAppErrorClass(global.app)
  switch(error.code) {
    case error.PERMISSION_DENIED:
      setAppText('User denied the request for Geolocation.')
      break;
    case error.POSITION_UNAVAILABLE:
      setAppText('Location information is unavailable.')
      break;
    case error.TIMEOUT:
      setAppText('The request to get user location timed out.')
      break;
    case error.UNKNOWN_ERROR:
      setAppText('An unknown error occurred.')
      break;
   }
}

/**
* Run the program
*/
function main() {
  if (global.NAV.geolocation) {
    global.NAV.geolocation.getCurrentPosition(onSuccess, onError)
  }
}

main()
