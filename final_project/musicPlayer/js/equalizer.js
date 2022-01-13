const volume = document.getElementById("volume");
const bass = document.getElementById("bass");
const mid = document.getElementById("mid");
const treble = document.getElementById("treble");

const gainNode = new GainNode(context, { gain: volume.value });
const bassEQ = new BiquadFilterNode(context, {
  type: "lowshelf",
  frequency: 500,
  gain: bass.value,
});
const midEQ = new BiquadFilterNode(context, {
  type: "peaking",
  Q: Math.SQRT1_2,
  frequency: 1500,
  gain: mid.value,
});
const trebleEQ = new BiquadFilterNode(context, {
  type: "highshelf",
  frequency: 3000,
  gain: treble.value,
});

setupEventListeners();

resize();

function setupEventListeners() {
  window.addEventListener("resize", resize);

  volume.addEventListener("input", (e) => {
    const value = parseFloat(e.target.value);
    gainNode.gain.setTargetAtTime(value, context.currentTime, 0.01);
  });

  bass.addEventListener("input", (e) => {
    const value = parseInt(e.target.value);
    bassEQ.gain.setTargetAtTime(value, context.currentTime, 0.01);
  });

  mid.addEventListener("input", (e) => {
    const value = parseInt(e.target.value);
    midEQ.gain.setTargetAtTime(value, context.currentTime, 0.01);
  });

  treble.addEventListener("input", (e) => {
    const value = parseInt(e.target.value);
    trebleEQ.gain.setTargetAtTime(value, context.currentTime, 0.01);
  });
}

function setupContext() {
  if (context.state === "suspended") {
    context.resume();
  }
  src
    .connect(bassEQ)
    .connect(midEQ)
    .connect(trebleEQ)
    .connect(gainNode)
    .connect(analyser)
    .connect(context.destination);
}

function resize() {
  canvas.width = canvas.clientWidth * window.devicePixelRatio;
  canvas.height = canvas.clientHeight * window.devicePixelRatio;
}
