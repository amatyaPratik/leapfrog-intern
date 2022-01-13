const rainAudio = document.createElement("audio");
rainAudio.setAttribute("id", "rain-audio");
rainAudio.src = "../res/sounds/rain.mp3";
let splashInterval;

function initRain() {
  document.body.appendChild(rainAudio);
  rainAudio.play();
  const rainContainer = document.createElement("div");
  rainContainer.classList.add("rain");
  rainContainer.style.position = "absolute";
  rainContainer.style.height = "100vh";
  rainContainer.style.width = "100vw";
  rainContainer.style.backgroundImage = "url('../res/images/sprites/rain.png')";

  for (let i = 0; i < 5; i++) {
    let splashImg = document.createElement("img");
    splashImg.src = "../res/images/gif/pop.gif";
    splashImg.style.width = `${getRandomInt(30, 45)}px`;
    splashImg.style.height = `${getRandomInt(30, 45)}px`;
    splashImg.style.left = `${getRandomInt(1, 100)}%`;
    splashImg.style.transform = `rotate(${getRandomInt(0, 360)}deg)`;
    splashImg.style.position = "absolute";
    splashImg.style.bottom = "-25px";
    rainContainer.appendChild(splashImg);
  }

  for (let i = 0; i < 2; i++) {
    let splashImg = document.createElement("img");
    splashImg.src = "../res/images/gif/water-drop2.gif";
    splashImg.style.width = `${getRandomInt(50, 70)}px`;
    splashImg.style.height = `${getRandomInt(50, 70)}px`;
    splashImg.style.left = `${getRandomInt(1, 100)}%`;
    splashImg.style.position = "absolute";
    splashImg.style.bottom = "-10px";
    rainContainer.appendChild(splashImg);
  }
  for (let i = 0; i < 2; i++) {
    let splashImg = document.createElement("img");
    splashImg.src = "../res/images/gif/water-drop3.gif";
    splashImg.style.width = `${getRandomInt(50, 70)}px`;
    splashImg.style.height = `${getRandomInt(50, 70)}px`;
    splashImg.style.left = `${getRandomInt(1, 100)}%`;
    splashImg.style.position = "absolute";
    splashImg.style.bottom = "-30px";
    rainContainer.appendChild(splashImg);
  }

  for (let i = 0; i < 2; i++) {
    let splashImg = document.createElement("img");
    splashImg.src = "../res/images/gif/water-drop.gif";
    splashImg.style.width = `${getRandomInt(80, 100)}px`;
    splashImg.style.height = `${getRandomInt(70, 80)}px`;
    splashImg.style.left = `${getRandomInt(1, 100)}%`;
    splashImg.style.position = "absolute";
    splashImg.style.bottom = "-20px";
    rainContainer.appendChild(splashImg);
  }

  document.body.appendChild(rainContainer);
  splashInterval = setInterval(splash, 3000);
}

function endRain() {
  rainAudio.pause();
  clearInterval(splashInterval);
  const bodyChildren = document.body.children;
  for (let i = 0; i < bodyChildren.length; i++) {
    if (bodyChildren[i].classList.contains("rain")) {
      document.body.removeChild(bodyChildren[i]);
    }
  }
}

function splash() {
  let raindom = document.getElementsByClassName("rain")[0];
  raindom.style.backgroundImage =
    Math.random() > 0.5
      ? "url('../res/images/sprites/rain.png')"
      : "url('./res/images/sprites/rain4.png')";
}

rainAudio.addEventListener("ended", () => {
  rainAudio.currentTime = 0;
  rainAudio.play();
});
