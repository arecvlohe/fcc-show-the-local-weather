/** @namespace */
var helpers = {}
/**
* Set the id on an HTML element
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
* Set the text on an HTML element
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
* Set the eventListener on an HTML element
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
* Create a curried function that updates text for the temp element
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
* Create a curried function that updates text for a given element
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
* Create a curried function that updates the class for a given element
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
* Create an element with a type and return it
* @memberof helpers
* @param {string} type - HTML element type (i.e. 'div')
*/
function createElement(type) {
  var element = global.D.createElement(type)
  return element
}
helpers.createElement = createElement


/**
* Create a curried function that appends elements to the DOM based on the parent element
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
