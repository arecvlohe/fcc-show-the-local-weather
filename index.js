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
  setListenter('click', function() { console.log('click') }),
  setText('F'),
  setId('fahrenheit')
)
var fButton = makeFButton(createElement('div'))

/**
* Create a button that when the user clicks displays the temperature in celsius
*/
var makeCButton = R.compose(
  setListenter('click', function() { console.log('click') }),
  setText('C'),
  setId('celsius')
)
var cButton = makeCButton(createElement('div'))

/**
* Create a function that resets the temp value
*/
var setTemp = setTextContent(temp)

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
      console.log(response)
      var renderUnderApp = appendElements(app)

      setTemp(response.currently.temperature)
      renderUnderApp([temp, fButton, cButton])
    }
  })
}

/**
* Handle geolocation if for some reason it fails
* @param {Object} - The error object passed back from navigator
*/
function onError(error) {
  console.error(error)
}

/**
* Run the program
*/
function main() {
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }
}

main()
