let x = 200
let y = 200
let circleRadius = 10;

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("p5-canvas-container")
  circleX = width / 2;
  circleY = height / 2;
}

function draw() {
  background(220);

  // Calculate the distance between the circle and the mouse
  let distance = dist(mouseX, mouseY, x, y);

  // Check if the circle touches the mouse (distance is less than the sum of their radii)
  if (distance < circleRadius) {
    // Reset the circle to the center of the screen
    circleX = width / 2;
    circleY = height / 2;
  }

  // Draw the circle
  ellipse(circleX, circleY, circleRadius * 2, circleRadius * 2);
  circleX++
}
