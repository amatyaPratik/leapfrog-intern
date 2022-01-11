const volume = document.getElementById("volume");
const bass = document.getElementById("bass");
const mid = document.getElementById("mid");
const treble = document.getElementById("treble");
// const canvas = document.getElementById("canvas");

// const context = new AudioContext()
// const analyserNode = new AnalyserNode(context, { fftSize: 256 })
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
// drawcanvas();

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

// async
function setupContext() {
  //   const guitar = await getGuitar()
  //   if (context.state === 'suspended') {
  //     await context.resume()
  //   }
  //   const source = context.createMediaStreamSource(src);
  if (context.state === "suspended") {
    // await
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

// function getGuitar() {
//   return navigator.mediaDevices.getUserMedia({
//     audio: {
//       echoCancellation: false,
//       autoGainControl: false,
//       noiseSuppression: false,
//       latency: 0
//     }
//   })
// }

// function drawcanvas() {
//   requestAnimationFrame(drawcanvas)

//   const bufferLength = analyserNode.frequencyBinCount
//   const dataArray = new Uint8Array(bufferLength)
//   analyserNode.getByteFrequencyData(dataArray)
//   const width = canvas.width
//   const height = canvas.height
//   const barWidth = width / bufferLength

//   const canvasContext = canvas.getContext('2d')
//   canvasContext.clearRect(0, 0, width, height)

//   dataArray.forEach((item, index) => {
//     const y = item / 255 * height / 2
//     const x = barWidth * index

//     canvasContext.fillStyle = `hsl(${y / height * 400}, 100%, 50%)`
//     canvasContext.fillRect(x, height - y, barWidth, y)
//   })
// }

function resize() {
  canvas.width = canvas.clientWidth * window.devicePixelRatio;
  canvas.height = canvas.clientHeight * window.devicePixelRatio;
}
