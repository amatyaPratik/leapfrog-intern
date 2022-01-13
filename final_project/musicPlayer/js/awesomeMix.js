function clickCasetteButton() {
  new Audio("../res/sounds/click6.wav").play();
}

function initAwesomeMixCasettePlayer() {
  imgContainer.style.display = "none";
  musicInfoTop.style.padding = "0";
  document.getElementById("title").style.marginLeft = "0";
  document.getElementById("title").style.padding = "10px 0";
  document.getElementById("title").style.width = "100%";
  document.getElementById("title").style.textAlign = "center";
  musicContainer.style.marginBottom = "0";
  musicContainer.style.zIndex = "0";
  musicContainer.style.height = "23rem";
  musicContainer.style.width = "26rem";
  musicContainer.style.position = "relative";
  musicContainer.style.backgroundImage = "none";
  musicContainer.style.backgroundColor = "#edc787";
  musicContainer.style.backgroundImage =
    "linear-gradient(0deg,rgb(189, 145, 99) 100%,rgb(252, 221, 221) 90%);";
  navigation.style.zIndex = "6";

  const playerContainer = document.createElement("div");
  playerContainer.classList.add("player-container");
  playerContainer.style.position = "absolute";
  playerContainer.style.width = "23rem";
  playerContainer.style.height = "23rem";
  playerContainer.style.left = "0";
  playerContainer.style.right = "0";
  playerContainer.style.top = "0";
  playerContainer.style.bottom = "0";
  playerContainer.style.margin = "0 auto";

  const wheelsContainer = document.createElement("div");
  wheelsContainer.className = `wheels speed-${playBackChosen}`;
  wheelsContainer.style.position = "absolute";
  wheelsContainer.style.width = "47%";
  wheelsContainer.style.height = "14%";
  wheelsContainer.style.marginLeft = "51%";
  wheelsContainer.style.marginTop = "28%";
  wheelsContainer.style.transform = "translateX(-50%)";
  wheelsContainer.style.zIndex = "0";
  wheelsContainer.style.backgroundColor = "#321f1b";

  const shadow = document.createElement("div");
  shadow.classList.add("shadow");
  shadow.style.position = "relative";
  shadow.style.top = "0";
  shadow.style.width = "100%";
  shadow.style.height = "20%";
  shadow.style.zIndex = "2";
  shadow.style.backgroundColor = "rgba(12, 10, 11, 0.4)";
  shadow.style.borderTop = "7px solid black";
  shadow.style.filter = "blur(2px)";
  shadow.style.webkitFilter = "blur(2px)";

  const wheelLeft = document.createElement("img");
  wheelLeft.classList.add("wheel-left");
  wheelLeft.setAttribute("alt", "wheel-left");
  wheelLeft.src = "../res/images/sprites/wheel1.png";
  wheelLeft.style.height = "220%";
  wheelLeft.style.position = "absolute";
  wheelLeft.style.left = "-20%";
  wheelLeft.style.top = "-60%";

  const wheelRight = document.createElement("img");
  wheelRight.classList.add("wheel-right");
  wheelRight.setAttribute("alt", "wheel-right");
  wheelRight.src = "../res/images/sprites/wheel1.png";
  wheelRight.style.height = "220%";
  wheelRight.style.position = "absolute";
  wheelRight.style.right = "-20%";
  wheelRight.style.top = "-60%";

  wheelsContainer.appendChild(shadow);
  wheelsContainer.appendChild(wheelLeft);
  wheelsContainer.appendChild(wheelRight);

  const awesomeMixPlayer = document.createElement("div");
  awesomeMixPlayer.classList.add("awesome-mix-player");
  awesomeMixPlayer.style.height = "100%";
  awesomeMixPlayer.style.boxShadow = "4px 8px 7px rgba(34, 20, 18, 0.6)";
  awesomeMixPlayer.style.position = "relative";
  awesomeMixPlayer.style.backgroundImage =
    "url('../res/images/sprites/awesomeMixBg.png')";
  awesomeMixPlayer.style.backgroundSize = "100%";
  awesomeMixPlayer.style.backgroundPosition = "center";
  awesomeMixPlayer.style.backgroundRepeat = "no-repeat";
  awesomeMixPlayer.style.zIndex = "1";

  progressContainer.style.bottom = ".5rem";
  progressContainer.style.width = "85%";
  progressContainer.style.height = "0.5rem";
  progressContainer.style.zIndex = "3";
  progressContainer.style.boxShadow = "4px 0px 4px rgba(34, 20, 18, 0.6)";

  playBtn.classList.add("casette-mode");
  playBtn.innerHTML = "";
  playBtn.style.backgroundColor = "transparent";
  playBtn.style.borderRadius = "4px";
  playBtn.style.color = "#011";
  playBtn.style.fontSize = "20px";
  playBtn.style.cursor = "pointer";
  playBtn.style.position = "absolute";
  playBtn.style.top = "68%";
  playBtn.style.height = "21.8%";
  playBtn.style.left = "22%";
  playBtn.style.width = "14%";
  playBtn.style.backgroundSize = "50%";
  playBtn.onclick = clickCasetteButton;

  prevBtn.classList.add("casette-mode");
  prevBtn.innerHTML = "";
  prevBtn.style.backgroundColor = "transparent";
  prevBtn.style.borderRadius = "4px";
  prevBtn.style.color = "#011";
  prevBtn.style.fontSize = "20px";
  prevBtn.style.cursor = "pointer";
  prevBtn.style.position = "absolute";
  prevBtn.style.top = "68%";
  prevBtn.style.height = "21.8%";
  prevBtn.style.left = "36.7%";
  prevBtn.style.width = "10.1%";
  prevBtn.style.backgroundSize = "30%";
  prevBtn.onclick = clickCasetteButton;

  nextBtn.classList.add("casette-mode");
  nextBtn.innerHTML = "";
  nextBtn.style.backgroundColor = "transparent";
  nextBtn.style.borderRadius = "4px";
  nextBtn.style.color = "#011";
  nextBtn.style.fontSize = "20px";
  nextBtn.style.cursor = "pointer";
  nextBtn.style.position = "absolute";
  nextBtn.style.top = "68%";
  nextBtn.style.height = "21.8%";
  nextBtn.style.left = "47.7%";
  nextBtn.style.width = "10%";
  nextBtn.style.backgroundSize = "30%";
  nextBtn.onclick = clickCasetteButton;

  playBackBtn.classList.add("casette-mode");
  playBackBtn.style.backgroundColor = "transparent";
  playBackBtn.style.borderRadius = "4px";
  playBackBtn.style.color = "#011";
  playBackBtn.style.fontSize = "20px";
  playBackBtn.style.cursor = "pointer";
  playBackBtn.style.position = "absolute";
  playBackBtn.style.top = "68%";
  playBackBtn.style.height = "21.8%";
  playBackBtn.style.left = "59%";
  playBackBtn.style.width = "14%";
  playBackBtn.style.backgroundSize = "30%";
  playBackBtn.onclick = clickCasetteButton;

  playerContainer.appendChild(wheelsContainer);
  playerContainer.appendChild(awesomeMixPlayer);

  musicContainer.appendChild(playerContainer);

  playBtn.addEventListener("click", () => {
    if (musicContainer.classList.contains("awesome-mix-mode")) {
      if (musicContainer.classList.contains("playing")) {
        musicInfoTop.style.opacity = "1";
        musicInfoTop.style.transform = "translateY(-100%)";
        progressContainer.style.opacity = "1";
      } else {
        musicInfoTop.style.opacity = "0";
        musicInfoTop.style.transform = "translateY(10%)";
        progressContainer.style.opacity = "0";
      }
    }
  });

  navigation.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("casette-mode")) {
      e.target.style.borderTop = "4px dashed rgba(199, 154, 84, 0.6)";
      e.target.style.borderBottom = "6px solid rgba(197, 150, 92, 1)";
      e.target.style.marginTop = "1%";
      e.target.backgroundPosition = "50% auto";
      e.target.style.boxShadow = "0 -2px 2px #edc787";
    }
  });
  navigation.addEventListener("mouseup", (e) => {
    if (e.target.classList.contains("casette-mode")) {
      e.target.style.borderTop = "0";
      e.target.style.borderBottom = "0";
      e.target.style.marginTop = "0%";
      e.target.style.boxShadow = "none";
    }
  });
}

function startAwesomeMixCasettePlayer() {
  initAwesomeMixCasettePlayer();
}

function stopAwesomeMixCasettePlayer() {
  imgContainer.style.display = "initial";
  const musicContainerChildren = musicContainer.childNodes;

  for (let i = 0; i < musicContainerChildren.length; i++) {
    if (musicContainerChildren[i].className === "player-container") {
      musicContainer.removeChild(musicContainer.childNodes[i]);
    }
  }
}
