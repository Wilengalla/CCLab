function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");
  background(0);
}

function draw() {
  fill(225)
  rect(windowWidth/2 - 200, windowHeight/2 - 125, 400, 250)
}