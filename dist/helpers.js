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
* Create a curried function that updates text for the temp element
* @param {element} - The temp element
*/
function setTextContentTemp(element) {
  return function(type) {
    return function(state) {
      if (type === 'F' ) {
        element.textContent = state.fahrenheit.toFixed(1)
      } else {
        element.textContent = state.celsius.toFixed(1)
      }
    }
  }
}

/**
* Create a curried function that updates text for a given element
* @param {element} - The element whose text you want to change
*/
function setTextContent(element) {
  return function(text) {
    element.textContent = text
  }
}

/**
* Create a curried function that updates the class for a given element
* @param {element} - The element whose class you want to change
*/
function setClassName(element) {
  return function(classname) {
    element.className = classname
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

/**
* Create a function that updates the global state object
* @param {Object} oldState
* @param {newState} newState
* @param {function} callback
*/
function setGlobalState(oldState, newState, callback) {
  STATE = Object.assign({}, oldState, newState)
  callback(STATE)
}
