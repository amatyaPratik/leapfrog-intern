let chosenDuration = 0;
const timers = [null, 0.5, 1, 10, 20, 30, 45, 60, 120];
let confirmed = false;
const duration = document.getElementById("duration-display");
const sleepBtn = document.getElementById("sleep-button");
const btnImage = sleepBtn.getElementsByTagName("img")[0];
const timePast = document.getElementById("time-past");
const timeLeft = document.getElementById("time-left");

let callInterval;
let confirmationTimeout;
let sleepTimer;
function startTimer(time) {
  const totalDuration = time * 60 * 1000;
  let heightLeft = getBoundary(timeLeft).height;
  callInterval = Math.ceil(totalDuration / heightLeft);

  sleepTimer = setInterval(() => {
    heightLeft = heightLeft - 1;
    timeLeft.style.height = heightLeft + "px";
    if (heightLeft < 1) {
      timeLeft.style.height = "0px";
      displayHint("Good Night !");
      shutdownAllFeatures();
      btnImage.src = "../res/images/icons/snoozed-robot.png";
      clearInterval(sleepTimer);
    }
  }, callInterval);
}
function shutdownAllFeatures() {
  pauseSong();
  if (rainMode) {
    rainToggleBtn.click();
  }
  if (bubbleMode) {
    bubblesToggleBtn.click();
  }
  if (carouselMode) {
    carouselToggleBtn.click();
  }
  if (normalVisualizer) {
    visualizerToggleBtn.click();
  }
  if (circularVisualizer) {
    circularVisualizerToggleBtn.click();
  }
  if (awesomeMixMode) {
    awesomeMixToggleBtn.click();
  }
}

function resetTimer() {
  clearTimeout(confirmationTimeout);
  clearInterval(sleepTimer);
  btnImage.src = "../res/images/icons/zzz.png";
  duration.style.right = "1rem";
  timeLeft.style.height = "100%";
}

sleepBtn.addEventListener("click", (sleepInit) => {
  resetTimer();
  chosenDuration = (chosenDuration + 1) % timers.length;
  duration.innerHTML =
    timers[chosenDuration] === null ? "" : timers[chosenDuration] + " min";
  confirmed = false;

  confirmationTimeout = setTimeout(() => {
    confirmed = true;
    if (confirmed && timers[chosenDuration]) {
      btnImage.src = "../res/images/icons/sleeping.png";
      duration.style.right = "-400px";
      startTimer(timers[chosenDuration]);
      displayHint(`sleeping after ${timers[chosenDuration]} minutes`);
    } else {
      timeLeft.style.height = "100%";
      duration.style.bottom =
        getBoundary(sleepInit.target.parentNode).top + "px";
      duration.style.right = "-400px";
      duration.innerHTML = "";
    }
  }, 2900);
});
