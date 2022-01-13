function initNormalPlayer() {
  imgContainer.className = `img-container speed-${playBackChosen}`;
  playBtn.classList.remove("casette-mode");
  prevBtn.classList.remove("casette-mode");
  nextBtn.classList.remove("casette-mode");
  playBackBtn.classList.remove("casette-mode");
  eqToggleBtn.classList.remove("casette-mode");
  const oldMusicContainerChildNodes = musicContainer.children;

  for (let i = 0; i < oldMusicContainerChildNodes.length; i++) {
    if (oldMusicContainerChildNodes[i].classList.contains("navigation")) {
      musicContainer.style = "";
      musicContainer.children[i].style = "";
      prevBtn.style = "";
      playBtn.style = "";
      nextBtn.style = "";
      playBackBtn.style = "";
    }
  }

  musicContainer.style.backgroundColor = "burlywood";
  musicContainer.style.backgroundImage =
    "linear-gradient(10deg,rgb(247, 247, 247) 23%,rgb(252, 221, 221) 90%);";
  musicContainer.style.padding = "20px 30px";
  musicContainer.style.zIndex = "10";

  const actionBtn = document.getElementsByClassName("action-btn");
  for (let i = 0; i < actionBtn.length; i++) {
    actionBtn[i].style.backgroundColor = "transparent";
    actionBtn[i].style.border = "none";
    actionBtn[i].style.color = "teal";
    actionBtn[i].style.fontSize = "20px";
    actionBtn[i].style.padding = "1.2rem 1rem";
    actionBtn[i].style.margin = "0 1rem";
    actionBtn[i].style.position = "relative";
  }

  const actionBtnBig = document.getElementsByClassName("action-btn-big")[0];
  actionBtnBig.style.fontSize = "30px";

  playBackBtn.style.backgroundColor = "transparent";
  playBackBtn.style.backgroundImage = `url(${playbackIcons[playBackChosen]})`;

  musicInfoTop.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  musicInfoTop.style.border.borderRadius = "15px 15px 0 0";
  musicInfoTop.style.position = "absolute";
  musicInfoTop.style.top = "0";
  musicInfoTop.style.left = "20px";
  musicInfoTop.style.width = "calc(100%-40px)";
  musicInfoTop.style.padding = "10px 10px 10px 150px";
  musicInfoTop.style.opacity = "0";
  musicInfoTop.style.transform = "translateY(0)";
  musicInfoTop.style.transition =
    "transform 0.3s ease-in, opacity 0.3s ease-in";
  musicInfoTop.style.zIndex = "0";

  musicInfoTop.getElementsByTagName("h4")[0].style.margin = "0";

  progressContainer.style.height = "0.5rem";
  progressContainer.style.position = "absolute";
  progressContainer.style.backgroundColor = "white";
  progressContainer.style.borderRadius = "5px";
  progressContainer.style.cursor = "pointer";
  progressContainer.style.opacity = "0";
  progressContainer.style.width = "90%";
  progressContainer.style.left = "0";
  progressContainer.style.bottom = "0";
  progressContainer.style.marginLeft = "50%";
  progressContainer.style.transform = "translateX(-50%)";
  progressContainer.style.transition = "all 0.3s ease-in";

  progress.style.backgroundColor = "#fe8daa";
  progress.style.borderRadius = "5px";
  progress.style.height = "100%";
  progress.style.width = "0";
  progress.transition = "width 0.1s linear";

  playBtn.addEventListener("click", () => {
    if (musicContainer.classList.contains("normal-mode")) {
      if (musicContainer.classList.contains("playing")) {
        musicInfoTop.style.opacity = "1";
        musicInfoTop.style.transform = "translateY(-100%)";
        progressContainer.style.bottom = "-19px";
        progressContainer.style.opacity = "1";
      } else {
        musicInfoTop.style.opacity = "0";
        musicInfoTop.style.transform = "translateY(10%)";
        progressContainer.style.bottom = "29px";
        progressContainer.style.opacity = "0";
      }
    }
  });
}
