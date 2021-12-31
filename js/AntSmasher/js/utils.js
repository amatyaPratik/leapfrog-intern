//returns random int between min and max : maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

/** clears an element's contents */
function clear(className) {
  document.getElementsByClassName("className")[0].innerHTML = "";
}

/** Euclidean distance between 2 ponts*/
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

/** returns BoundingRectangle for a DOM element*/
function getBoundary(dom) {
  return dom.getBoundingClientRect();
}

/** returns computed style values for an element for a given style prop*/
function computedStyle(element, style) {
  return parseFloat(window.getComputedStyle(element).getPropertyValue(style));
}

/** converts Radian angle to Degrees - 1Radian = 57.2958 Degree */
function radianToDegree(radian) {
  return radian * 57.2958;
}
