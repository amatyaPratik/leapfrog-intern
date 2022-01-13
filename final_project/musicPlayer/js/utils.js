/** returns boundingClientRect for a dom element */
const getBoundary = (elementDOM) => {
  return elementDOM.getBoundingClientRect();
};

/**The maximum is exclusive and the minimum is inclusive */
const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

/** utility to display hint text to user */
const displayHint = (hintText) => {
  document.getElementById("hint").textContent = hintText;
  const clearHint = setTimeout(() => {
    document.getElementById("hint").textContent = "";
  }, 3000);
};
