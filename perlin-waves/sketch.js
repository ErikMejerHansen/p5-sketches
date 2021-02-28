// Color scheme from "The Great Wave off Kanagawa"
const darkBlue = "#011640";
const lightBlue = "#2D5873";
const green = "#7BA96";
const sand = "#BFBA9F";
const wood = "#BF9663";
const black = "#000000";
const white = "#FFFFFF";

const waveHeight = 80;
const smoothness = 0.004;

function setup() {
  createCanvas(600, 400);
  background(255);
  drawSun();
}

function drawSun() {
  strokeWeight(3);
  stroke(black);
  fill("#FF0000");
  ellipse(450, 200, 150, 150);
  noStroke();
  ellipse(451, 201, 150, 150);
}

let lastY = 0;
let lastDirections = [0, 0, 0, 0, 0];
let yTranslate = 200;

function draw() {
  translate(0, yTranslate);

  let y = map(noise(frameCount * smoothness), 0, 1, -waveHeight, waveHeight);
  lastDirections.push(lastY - y);
  lastDirections.shift();

  // The more lateral movement, the "stronger" the stroke
  let pressure = lastDirections.reduce((acc, curr) => acc + curr);
  lastY = y;

  // Draw wave
  stroke(darkBlue);
  ellipse(frameCount % width, y, 1, pressure);
  stroke(white);
  ellipse(frameCount % width, y + 8, 1, pressure + 10);
  stroke(lightBlue);
  ellipse(frameCount % width, y + 15, 1, pressure + 10);
  stroke(darkBlue);
  ellipse(frameCount % width, y + 50, 1, pressure + 65);

  // Check if we have reached right side of canvas
  // If we have draw background to fade distant waves
  // and move translation down for next wave
  if (frameCount % width === width - 1) {
    lastDirections = [0, 0, 0, 0, 0];
    background(lightBlue + "0E");
    yTranslate += 20;
  }

  if (yTranslate > 400) {
    noLoop(); // Done drawing. Stop looping
  }
}
