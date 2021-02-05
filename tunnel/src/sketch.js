let circles = [];
let path = [];
const d = 400;
function setup() {
  createCanvas(400, 400);
  path.push(createVector(random(-1000, 1000), random(-1000, 1000), 2500));
  path.push(createVector(random(-300, 300), random(-300, 300), 1000));
  path.push(createVector(0, 50, d));

  for (let i = 0; i < 40; i++) {
    circles.push(new TunnelElement(150, i / 20, d, path));
  }
  circles.push(new TunnelElement(150, 0, d, path));
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  for (let circle of circles) {
    circle.show();
    circle.move(0.001);
  }
}
