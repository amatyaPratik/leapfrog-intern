/* <div id="sleep-timer">
<div id="countdown">00:00</div>
<button id="sleep-button"></button>*/

// let chosenDuration = -1;
let chosenDuration = 0;
const timers = [null, 0.5, 1, 10, 20, 30, 45, 60, 120];
let confirmed = false;
// const timerContainer = document.getElementById("sleep-timer-container");
// const countdown = document.getElementById("countdown");
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
  // console.log("total duration: ", totalDuration);
  const heightLeft = getBoundary(timeLeft).height;
  callInterval = Math.ceil(totalDuration / heightLeft);

  sleepTimer = setInterval(() => {
    // timePast.style.height = getBoundary(timePast).height + 1 + "px";
    // console.log("decreasing");
    timeLeft.style.height = getBoundary(timeLeft).height - 1 + "px";
    if (getBoundary(timeLeft).height < 1) {
      // console.log("time up");
      timeLeft.style.height = "0px";

      shutdownAllFeatures();
      // rainMode = false;
      // endRain();
      // rainToggleBtn.classList.remove("active");
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
  btnImage.src = "../res/images/icons/snooze-blank.png";
  duration.style.right = "1rem";
  timeLeft.style.height = "100%";
}

sleepBtn.addEventListener("click", () => {
  resetTimer();
  chosenDuration = (chosenDuration + 1) % timers.length;
  duration.innerHTML =
    timers[chosenDuration] === null ? "" : timers[chosenDuration] + " min";
  confirmed = false;

  // if (!confirmed && confirmationTimeout && sleepTimer) {
  //   resetTimer();
  // }
  confirmationTimeout = setTimeout(() => {
    confirmed = true;
    if (confirmed && timers[chosenDuration]) {
      btnImage.src = "../res/images/icons/sleeping.png";
      duration.style.right = "-400px";
      startTimer(timers[chosenDuration]);
      console.log("sleeping for ", timers[chosenDuration], "min");
    } else {
      // btnImage.src = "../res/images/icons/sleeping.png";
      console.log("sleeping for ", timers[chosenDuration], "min");
      // resetTimer();
      timeLeft.style.height = "100%";
      duration.style.right = "-400px";
      duration.innerHTML = "";
      // startTimer(timers[chosenDuration]);
    }
  }, 2900);
});
