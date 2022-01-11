var context = new AudioContext();
var src = context.createMediaElementSource(audio);
var analyser = context.createAnalyser();

var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

// src.connect(analyser);
// analyser.connect(context.destination);

analyser.fftSize = 256;

var bufferLength = analyser.frequencyBinCount;
// console.log(bufferLength);

var dataArray = new Uint8Array(bufferLength);

var WIDTH = canvas.width;
var HEIGHT = canvas.height;

var barWidth = (WIDTH / bufferLength) * 2.5;
var barHeight;
var x = 0;
let visualizeFrame;

function renderFrame() {
  x = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "#000";
  // ctx.fillRect(0, 0, WIDTH, HEIGHT);
  analyser.getByteFrequencyData(dataArray);
  visualizeFrame = requestAnimationFrame(renderFrame);

  if (normalVisualizer) {
    drawNormalVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
  } else if (circularVisualizer) {
    // console.log("cicular");
    drawCircularVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
  }
}
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cancelAnimationFrame(visualizeFrame);
}

function drawNormalVisualizer(bufferLength, x, barWidth, barHeight, dataArray) {
  dataArray.forEach((data, index) => {
    barHeight = data * 1.2;

    var r = barHeight + 25 * (index / bufferLength);
    var g = 250 * (index / bufferLength);
    var b = 50;

    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    x += barWidth;
  });
}

function drawCircularVisualizer(
  bufferLength,
  x,
  barWidth,
  barHeight,
  dataArray
) {
  dataArray.forEach((data, index) => {
    barHeight = data;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((index * (Math.PI * 18)) / bufferLength);
    const hue = index + 80;

    ctx.fillStyle = `hsl(${hue},50%,50%)`;
    ctx.fillRect(0, -barWidth / 2, barWidth / 2, barHeight);

    x += barWidth / 2;
    ctx.restore();
  });
}

if (visualizerMode) {
  renderFrame();
}
