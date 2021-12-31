const boxWidth = 1300;
const boxHeight = 600;
const boxMargin = "10px auto";
let antCount = 50;
let REFRESH_RATE = 20;

/** holds wall boundaries*/
let walls;

let stainPatterns = [
  'url("./res/images/stain1.png")',
  'url("./res/images/stain2.png")',
  'url("./res/images/stain3.png")',
];

/** array to hold all the current ant objects */
const ants = [];

/** the global BOX object */
let box;

/** main function - initializes the game -container box and ants object */
startGame = () => {
  box = new Box(boxWidth, boxHeight, boxMargin);
  walls = getBoundary(box.handle);
  const randInits = []; // array of {rx, ry, rradius} that were initialized with getRandomInt
  const randRadius = 20;

  for (let i = 0; i < antCount; i++) {
    let ranX = getRandomInt(walls.left, walls.right - 2 * randRadius);
    let ranY = getRandomInt(walls.top, walls.bottom - 2 * randRadius);
    if (randInits.length === 0) {
      randInits.push({ rx: ranX, ry: ranY, rradius: randRadius });
      continue;
    }

    for (let j = 0; j < i; j++) {
      if (
        getDistance(
          ranX + randRadius,
          ranY + randRadius,
          randInits[j].rx + randInits[j].rradius,
          randInits[j].ry + randInits[j].rradius
        ) <=
        randRadius + randInits[j].rradius
      ) {
        ranX = getRandomInt(walls.left, walls.right - 2 * randRadius);
        ranY = getRandomInt(walls.top, walls.bottom - 2 * randRadius);
      }
    }
    randInits.push({ rx: ranX, ry: ranY, rradius: randRadius });
  }

  randInits.forEach((antState, index) => {
    ants.push(
      new Ant(antState.rradius, antState.rx, antState.ry, walls, index)
    );
  });

  runSimulation();
};

/**the main loop calling function */
runSimulation = () => {
  simulationInterval = setInterval(updateGameArea, REFRESH_RATE);
};

/**clears the game loop */
stop = (thatInterval) => {
  clearInterval(thatInterval);
};

/**the game updating function */
updateGameArea = () => {
  box.clear("box");

  ants.forEach((ant) => {
    ant.newPos();
    ant.update();
    checkAntCollision();
    checkWallCollision(ant);
  });
};

/** checks collision between all ants ; 2 at a time. */
checkAntCollision = () => {
  for (let i = 0; i < antCount - 1; i++) {
    for (let j = i + 1; j < antCount; j++) {
      let ant1 = ants[i];
      let ant2 = ants[j];

      let distance = getDistance(
        ant2.x + ant2.radius + ant2.dx,
        ant2.y + ant2.radius + ant2.dy,
        ant1.x + ant1.radius + ant1.dx,
        ant1.y + ant1.radius + ant1.dy
      );

      if (ant1.radius + ant2.radius >= distance) {
        let theta1 = ant1.angle();
        let theta2 = ant2.angle();
        let phi = Math.atan2(ant2.y - ant1.y, ant2.x - ant1.x);
        let m1 = ant1.mass;
        let m2 = ant2.mass;
        let v1 = ant1.speed();
        let v2 = ant2.speed();

        let dx1F =
          ((v1 * Math.cos(theta1 - phi) * (m1 - m2) +
            2 * m2 * v2 * Math.cos(theta2 - phi)) /
            (m1 + m2)) *
            Math.cos(phi) +
          v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
        let dy1F =
          ((v1 * Math.cos(theta1 - phi) * (m1 - m2) +
            2 * m2 * v2 * Math.cos(theta2 - phi)) /
            (m1 + m2)) *
            Math.sin(phi) +
          v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
        let dx2F =
          ((v2 * Math.cos(theta2 - phi) * (m2 - m1) +
            2 * m1 * v1 * Math.cos(theta1 - phi)) /
            (m1 + m2)) *
            Math.cos(phi) +
          v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI / 2);
        let dy2F =
          ((v2 * Math.cos(theta2 - phi) * (m2 - m1) +
            2 * m1 * v1 * Math.cos(theta1 - phi)) /
            (m1 + m2)) *
            Math.sin(phi) +
          v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI / 2);

        ant1.dx = dx1F;
        ant1.dy = dy1F;
        ant2.dx = dx2F;
        ant2.dy = dy2F;
      }
    }
  }
};

/** checks wall collision of ant and changes momentum direction accordingly*/
checkWallCollision = (ant) => {
  if (ant.x + 2 * ant.radius + ant.dx >= walls.right) {
    ant.dx = -ant.dx;
  }
  if (ant.y + 2 * ant.radius + ant.dy >= walls.bottom) {
    ant.dy = -ant.dy;
  }
  if (ant.x + ant.radius <= walls.left) {
    ant.dx = -ant.dx;
  }
  if (ant.y + ant.radius <= walls.top) {
    ant.dy = -ant.dy;
  }
};

/** removes / deletes the smashed ant's object from the ants array and also from DOM*/
killAnt = (antPosition) => {
  ants.forEach((ant, index) => {
    if (ant.antIndex == antPosition) {
      ants.splice(index, 1);
      antCount--;
    }
  });
};

/** places an image for stain where user smashes */
addStain = (target) => {
  let antpositionY = getBoundary(target).top;
  let antpositionX = getBoundary(target).left;

  const bloodStain = document.createElement("div");
  bloodStain.style.transform = `rotate(${getRandomInt(0, 360) * 57.2958}deg)`;
  bloodStain.classList.add("stain");
  bloodStain.style.backgroundImage = stainPatterns[getRandomInt(0, 3)];
  bloodStain.style.top = antpositionY + 5 + "px";
  bloodStain.style.left = antpositionX + 5 + "px";

  document.body.appendChild(bloodStain);
};

/** event listener for user's smash */
document.addEventListener("mousedown", (e) => {
  if (e.target.classList[0] === "ant") {
    const antDomIndex = e.target.getAttribute("antIndex"); 

    new Audio("./res/sounds/swat.mp3").play();

    killAnt(+antDomIndex);
    addStain(e.target);
  }
});

/** fires main function */
document.addEventListener("DOMContentLoaded", (e) => {
  startGame();
});
