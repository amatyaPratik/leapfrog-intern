function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getBoundary(dom) {
  return dom.getBoundingClientRect();
}

function checkCollision(obj1, obj2) {
  let box1 = getBoundary(obj1);
  let box2 = getBoundary(obj2);

  // two cars are in close range..
  if (
    box1.height + box2.height >= box1.bottom - box2.top &&
    box1.bottom - box2.top >= 0
  ) {
    // document.getElementsByClassName("scoreboard")[0].innerHTML = "close";
    // &&
    // box1.height + box2.height < box1.bottom - box2.top) {
    if (
      box1.left < box2.right &&
      box1.right > box2.right &&
      box1.right > box2.left &&
      box1.right > box2.right
    ) {
      return true;
    } else if (box1.right > box2.left && box1.left < box2.left) {
      return true;
    }
  } else {
    // document.getElementsByClassName("scoreboard")[0].innerHTML = "far";
    if (
      box1.width + box2.width >= box1.right - box2.left ||
      box1.width + box2.width >= box2.right - box1.left
    ) {
      if (
        box1.top < box2.bottom &&
        box1.top > box2.top &&
        box1.bottom < box2.top &&
        box1.bottom < box2.bottom
      ) {
        return true;
      }
    }
  }
}
//bottom collision never happens - skipping..

function checkOutOfBoundary(childDom, parentDom) {
  let childBox = getBoundary(childDom);
  let parentBox = getBoundary(parentDom);

  if (childBox.left < parentBox.left) return true;
  else if (childBox.right > parentBox.right) return true;
  else if (childBox.top > parentBox.bottom) return true;
  else if (childBox.bottom < parentBox.top) return true;
  else return false;
}

function foeLockedIn(car, oppo) {
  let box1 = getBoundary(car);
  let box2 = getBoundary(oppo);

  if (
    box1.left + box1.width / 2 >= box2.left &&
    box1.left + box1.width / 2 < box2.right &&
    box1.top > box2.bottom
  ) {
    return true;
  } else {
    return false;
  }
}

function clear() {
  document.getElementsByClassName("game")[0].innerHTML = "";
}
