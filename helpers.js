/** @namespace */
var helpers = {}
/**
* A function that takes an element and sets the id on an HTML element
* @memberof helpers
* @param {string} id
*/
function setId(id) {
  return function(element) {
    element.id = id
    return element
  }
}
helpers.setId = setId

/**
* A function that takes an element and sets the text on an HTML element
* @memberof helpers
* @param {string} text
*/
function setText(text) {
  return function(element) {
    element.textContent = text
    return element
  }
}
helpers.setText = setText

/**
* A function that takes an element and sets the eventListener on that element
* @memberof helpers
* @param {string} type
* @param {function} func
*/
function setListenter(type, func) {
  return function(element) {
    element.addEventListener(type, func)
    return element
  }
}
helpers.setListenter = setListenter

/**
* A function that takes the temp element and updates its text
* @memberof helpers
* @param {element} - The temp element
*/
function setTextContentTemp(element) {
  return function(type) {
    return function(state) {
      if (type === 'F' ) {
        element.textContent = state.fahrenheit.toFixed(1) + '°F'
      } else {
        element.textContent = state.celsius.toFixed(1) + '°C'
      }
    }
  }
}
helpers.setTextContentTemp = setTextContentTemp

/**
* A function that takes an element and updates its text
* @memberof helpers
* @param {element} - The element whose text you want to change
*/
function setTextContent(element) {
  return function(text) {
    element.textContent = text
  }
}
helpers.setTextContent = setTextContent

/**
* A curried function that takes an element updates its class
* @memberof helpers
* @param {element} - The element whose class you want to change
*/
function setClassName(classname) {
  return function(element) {
    element.className = classname
    return element
  }
}
helpers.setClassName = setClassName

/**
* A function that takes an html type and returns that element
* @memberof helpers
* @param {string} type - HTML element type (i.e. 'div')
*/
function createElement(type) {
  var element = global.D.createElement(type)
  return element
}
helpers.createElement = createElement


/**
* A function that takes a parent and appends child elements to it
* @memberof helpers
* @param {parent} - The parent HTML element to append children to
*/
function appendElements(parent) {
  return function(elements) {
    elements.forEach(function(element) {
      parent.appendChild(element)
    })
  }
}
helpers.appendElements = appendElements
