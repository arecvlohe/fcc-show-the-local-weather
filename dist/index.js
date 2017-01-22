// ELEMENTS
/**
* Create the div for where the temp will be displayed
*/
var makeTempDiv = R.compose(
  setId('temp')
)
var temp = makeTempDiv(createElement('div'))

/**
* Create a button that when the user clicks displays the temperature in fahrenheit
*/
var makeFButton = R.compose(
  setListenter('click', function() { setTempText2F(STATE) }),
  setText('F'),
  setClassName('button'),
  setId('fahrenheit')
)
var fButton = makeFButton(createElement('div'))

/**
* Create a button that when the user clicks displays the temperature in celsius
*/
var makeCButton = R.compose(
  setListenter('click', function() { setTempText2C(STATE) }),
  setText('C'),
  setClassName('button'),
  setId('celsius')
)
var cButton = makeCButton(createElement('div'))

var makeButtonBox = R.compose(
  setId('button-box')
)
var buttonBox = makeButtonBox(createElement('div'))

// FUNCTIONS
/**
* Create a function that resets the temp value
*/
var setTempText = setTextContentTemp(temp)
var setTempText2F = setTempText('F')
var setTempText2C = setTempText('C')

var setAppText = setTextContent(app)
var setAppErrorClass = setClassName('error')

// AJAX
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
      var contents = appendElements(app)
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
  setAppErrorClass(app)
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


// PROGRAM
/**
* Run the program
*/
function main() {
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }
}

main()
