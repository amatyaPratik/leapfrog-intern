const modesContainer = document.getElementById("modes-container");

const modes = document.getElementById("modes");

modesContainer.addEventListener("click", toggleModes);

function toggleModes() {
  if (modes.style.bottom !== "0vh") {
    modes.style.bottom = "0vh";
  } else {
    modes.style.bottom = "-20vh";
  }
}
