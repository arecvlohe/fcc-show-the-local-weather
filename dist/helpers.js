/**
* Set the id on an HTML element
* @param {string} id
*/
function setId(id) {
  return function(element) {
    element.id = id
    return element
  }
}

/**
* Set the text on an HTML element
* @param {string} text
*/
function setText(text) {
  return function(element) {
    element.textContent = text
    return element
  }
}

/**
* Set the eventListener on an HTML element
* @param {string} type
* @param {function} func
*/
function setListenter(type, func) {
  return function(element) {
    element.addEventListener(type, func)
    return element
  }
}

/**
* Create a curried function that updates text for a given element
* @param {text} - The element whose text you want to change
*/
function setTextContent(element) {
  return function(text) {
    element.textContent = text
  }
}

/**
* Create an element with a type and return it
* @param {string} type - HTML element type (i.e. 'div')
*/
function createElement(type) {
  var element = D.createElement(type)
  return element
}


/**
* Create a curried function that appends elements to the DOM based on the parent element
* @param {parent} - The parent HTML element to append children to
*/
function appendElements(parent) {
  return function(elements) {
    elements.forEach(function(element) {
      parent.appendChild(element)
    })
  }
}
