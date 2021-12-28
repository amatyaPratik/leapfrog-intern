let car;
let foeList = [];
const totalFoes = 3; // let foe;

const localStorageKey = "highscore";

let scoreinprogress = 0;
let score = 0;
let previousrendertime;
let timesincelastrender = 0;
let ammoInterval;
let hasAmmo = false;
let lockedOn = -1; // which lane's opponent is vulnerable to fire; -1 if on none

let gamestop = false; //if game is stopped
let gamepause = true; //if game is paused
let gameover = false; //if user loses

const gamestate = {
  tops: [0, 0, 0],
  carLeft: 0,
  score: 0,
  hasAmmo: false,
};

document.addEventListener("DOMContentLoaded", startGame);

function startGame() {
  car = new Car();
  for (let i = 0; i < totalFoes; i++) {
    foeList.push(
      new Obstacle(i, Math.random() > 0.5 ? 50 : -getRandomInt(1, 100))
    );
  }

  ammoInterval = setInterval(() => {
    document.getElementsByClassName("ammo")[0].style.display = "block";
    hasAmmo = true;
    car.hasAmmo = hasAmmo;
  }, 5000);
}

function updateScore() {
  foeList.forEach((foe) => {
    if (
      getBoundary(car.handle).top <= getBoundary(foe.handle).top &&
      getBoundary(car.handle).bottom > getBoundary(foe.handle).top
    ) {
      scoreinprogress++;
      if (scoreinprogress % 65 == 0) {
        score++;
        raiseLevel();
        document.getElementsByClassName("score")[0].innerHTML = score;
        document.getElementById("finalscore").innerHTML = score;
      }
    }
  });
}

function raiseLevel() {
  if (scoreinprogress > 50) {
    score = score + 2;
    foeList.forEach((foe) => {
      foe.dy = foe.dy + 0.1;
    });
  }
  if (scoreinprogress === 120) {
    score = score + 5;
    foeList.forEach((foe) => {
      foe.dy = foe.dy + 0.1;
      scoreinprogress = scoreinprogress + 4;
    });
  }
  if (scoreinprogress === 250) {
    score = score + 20;
    foeList.forEach((foe) => {
      foe.dy = foe.dy + 0.1;
      scoreinprogress = scoreinprogress + 8;
    });
  }
  if (scoreinprogress === 550) {
    score = score + 30;
    foeList.forEach((foe) => {
      foe.dy = foe.dy + 0.1;
      scoreinprogress = scoreinprogress + 9;
    });
  }
}

function game(timestamp) {
  if (previousrendertime === undefined) {
    previousrendertime = timestamp;
  }
  timesincelastrender = (timestamp - previousrendertime) / 1000;

  gamestate.tops = [foeList[0].y, foeList[1].y, foeList[2].y];
  gamestate.carLeft = car.x;
  gamestate.score = score;
  gamestate.hasAmmo = hasAmmo;

  foeList.forEach((foe) => {
    foe.moveDown();
  });
  updateScore();
  let reqframe = window.requestAnimationFrame(game);
  if (gameover) {
    stopgame();
    updateHighScore();
    document.getElementById("gameoverscreen").style.visibility = "revert";
    window.cancelAnimationFrame(reqframe);
    return;
  } else if (gamestop) {
    stopgame();
    document.getElementById("pauseplay").style.visibility = "revert";
    window.cancelAnimationFrame(reqframe);
  } else if (gamepause) {
    document.getElementById("pauseplay").style.visibility = "revert";
    stopgame();
  }

  if (
    checkOutOfBoundary(
      document.getElementsByClassName("car")[0],
      document.getElementsByClassName("game")[0]
    )
  ) {
    gameover = true;
    stopgame();
  }
  foeList.forEach((foe) => {
    if (checkCollision(car.handle, foe.handle)) {
      document.getElementsByClassName("scoreboard")[0].innerHTML = "game over";
      gameover = true;
      // window.cancelAnimationFrame(reqframe);
      // return;
    }
  });
}

window.requestAnimationFrame(game);

function stopgame() {
  gamestop = true;
}

function updateHighScore() {
  // Check browser support
  if (typeof Storage !== "undefined") {
    let first = localStorage.getItem(`${localStorageKey}.first`);
    let second = localStorage.getItem(`${localStorageKey}.second`);
    let third = localStorage.getItem(`${localStorageKey}.third`);
    // Store
    if (score > third && score < second) {
      localStorage.setItem(`${localStorageKey}.third`, score);
    } else if (score > second && score < first) {
      localStorage.setItem(
        `${localStorageKey}.third`,
        localStorage.getItem(`${localStorageKey}.second`)
      );
      localStorage.setItem(`${localStorageKey}.second`, score);
    } else if (score > first) {
      localStorage.setItem(
        `${localStorageKey}.second`,
        localStorage.getItem(`${localStorageKey}.first`)
      );
      localStorage.setItem(`${localStorageKey}.first`, score);
    }

    // Retrieve
    let scorelist = document.querySelectorAll(".highscorediv ol li");
    scorelist[0].innerHTML = localStorage.getItem(`${localStorageKey}.first`);
    scorelist[1].innerHTML = localStorage.getItem(`${localStorageKey}.second`);
    scorelist[2].innerHTML = localStorage.getItem(`${localStorageKey}.third`);
  } else {
    // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
}

function pauseplay() {
  gamepause = gamepause ? false : true;
  if (gamepause) {
    gamestop = true;
    console.log("pausing game");
  } else {
    console.log("resuming game");
    document.getElementById("pauseplay").style.visibility = "hidden";

    score = gamestate.score;
    car.x = gamestate.carLeft;
    hasAmmo = gamestate.hasAmmo;
    foeList[0].y = gamestate.tops[0];
    foeList[1].y = gamestate.tops[1];
    foeList[2].y = gamestate.tops[2];
    previousrendertime = undefined;
    gamestop = false;

    setTimeout(window.requestAnimationFrame(game), 2000);
  }
  console.log("game paused:" + gamepause);
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      car.move("left");
      break;
    case "ArrowRight":
      car.move("right");
      break;
    case "ArrowRight":
      car.move("right");
      break;
    case "f":
      foeList.forEach((foe, index) => {
        if (foeLockedIn(car.handle, foe.handle) && hasAmmo) {
          blastingOffFoe = setTimeout(() => {
            lockedOn = index;
            foeList[lockedOn].handle.style.display = "none";
            repositioning = setTimeout(() => {
              foeList[lockedOn].y = -100;
              foeList[lockedOn].handle.style.display = "block";
            }, 2000);
            hasAmmo = false;
          }, 300);
        }
      });

      car.fire();

      clearInterval(ammoInterval);
      ammoInterval = setInterval(() => {
        document.getElementsByClassName("ammo")[0].style.display = "block";
        hasAmmo = true;
        car.hasAmmo = hasAmmo;
      }, 5000);

      break;
    default:
  }
  if (e.keyCode == 32) {
    pauseplay();
  }
});
