//variable for circle
let x;
let y;

//movement variables
let lerpSpeed = 0.03;

//tears and emotion variable
let dia1 = 30;
let dia = [];
let tearX = [];
let tearY = [];
let randomNo = [];

let creatureColorNum = 0;
let frameCountRecentTearCollected = -500;
let totalNo = 100;

//Anger
let xMain = [];
let yMain = [];
let xSpd = [];
let ySpd = [];
let diaSmall = [];
let numCircles = 1;

//happiness
let happyX;
let happyY;
let mainDiameter = 25;
let mainSpeed = 20;
let circleX = [];
let circleY = [];
let circleColor = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
];
let circleSpeed = [];
let circleDirection = [];
let canCreateCircle = true;
let scrollY = 0;

//sadness
let drops = 500;
let dropX = [];
let dropY = [];
let dropSpeed = [];

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container")
  x = 450;
  y = 300;
  happyX = 400;
  happyY = 300;
  for (let i = 0; i < numCircles; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(10, 40);
    fill(255, 0, 0);
    ellipse(x, y, size);
  }
  // Initialize raindrops
  for (let i = 0; i < drops; i++) {
    dropX[i] = random(width);
    dropY[i] = random(-500, -50);
    dropSpeed[i] = random(5, 15);
  }
}

function mousePressed() {
  dia.push(200);
  tearX.push(mouseX);
  tearY.push(mouseY);
  randomNo.push(int(random(3)));
  for (let i = 0; i < totalNo; i++) {
    xMain[i] = tearX[0];
    yMain[i] = tearY[0];
    xSpd[i] = random(-10, 10);
    ySpd[i] = random(-10, 10);
    diaSmall[i] = random(5, 40);
  }
}

function draw() {
  background(225, 225, 225, 50);
  push();
  fill("#FBF6F5");
  rect(0, 0, 900, 900);
  fill(225);
  rect(10, 10, 120, 150);
  push();
  strokeWeight(8);
  fill(211, 215, 211, 100);
  rect(200, 0, 595, 500);
  pop();
  fill(225);
  rectMode(CORNERS);
  fill("grey");
  rect(10, 200, 100, 475, 200);
  fill("rgb(216,206,206)")
  rect(90, 270, 95, 400, 200)
  fill("red")
  circle(53, 280, 60)
  fill("green")
  circle(53, 380, 60)
  textSize(125)
  text("🧑‍🔬", 5, 143);
  textSize(30)
  text("📞", 35, 290);
   textSize(30)
  text("📞", 35, 390);
  pop();

  //random Idle movement
  // let randomNo1 = int(random(4));
  // if (randomNo1 == 0) {
  //   x++;
  //   y++;
  // } else if (randomNo1 == 1) {
  //   x--;
  //   y--;
  // } else if (randomNo1 == 2) {
  //   x++;
  //   y--;
  // } else if (randomNo1 == 3) {
  //   x--;
  //   y++;
  // }

  // Draw the main circle
  push();
  translate(x, y); // Translate to the center of the main circle
  fill(getColor(creatureColorNum));
  ellipse(0, 0, dia1, dia1);
  strokeWeight(3);
  rotate(frameCount * 0.2);
  line(0, -35, 0, 35);
  ellipse(0, 35, 10);
  ellipse(0, -35, 10);
  line(-35, 0, 35, 0);
  ellipse(35, 0, 10);
  ellipse(-35, 0, 10);
  pop();

  //Initialization for anger
  for (let i = tearX.length; i >= 0; i--) {
    let d = dist(x, y, tearX[i], tearY[i]);
    if (d < 20) {
      for (let i = 0; i < totalNo; i++) {
        xMain[i] = tearX[1];
        yMain[i] = tearY[1];
        xSpd[i] = random(-10, 10);
        ySpd[i] = random(-10, 10);
        diaSmall[i] = random(5, 40);
      }
    }
  }

  // Check for collision with smaller circles
  for (let i = tearX.length - 1; i >= 0; i--) {
    let d = dist(x, y, tearX[i], tearY[i]);
    if (d < 20) {
      dia1 += 1;
      tearX.splice(i, 1);
      tearY.splice(i, 1);
      dia.splice(i, 1);
      randomNo.splice(i, 1);
      frameCountRecentTearCollected = frameCount;
    }
  }

  //Tear effects
  for (let i = tearX.length - 1; i >= 0; i--) {
    push();
    let d = dist(x, y, tearX[i], tearY[i]);
    if (d < 50) creatureColorNum = randomNo[i];
    if (randomNo[i] == 0 && d < 50) {
      translate(200, 0);
      for (let i = 0; i < 60; i++) {
        for (let c = 0; c < 200; c++) {
          let y = scrollY + i * 40;
          let x = 0 + c * 40;
          fill(circleColor[(c + frameCount) % circleColor.length]); // Select color from rainbowColors array
          square(x, y, 40);
        }
      }
      pop();
    } else if (randomNo[i] == 1 && d < 50) {
      push();
      translate(200, 0);
      fill(118, 115, 115, 100);
      for (let i = 0; i < totalNo; i++) {
        rect(0, 0, width, height);
        for (let i = 0; i < drops; i++) {
          dropY[i] += dropSpeed[i];
          if (dropY[i] > height) {
            dropY[i] = random(-500, -50);
          }
          stroke("blue");
          line(dropX[i], dropY[i], dropX[i], dropY[i] + 10);
        }
      }
      pop();
    } else if (randomNo[i] == 2 && d < 50) {
      for (let i = 0; i < totalNo; i++) {
        push();
        fill("rgb(138,1,1)");
        xMain[i] += xSpd[i];
        yMain[i] += ySpd[i];
        circle(xMain[i], yMain[i], diaSmall[i]);
      }
    }
  }

  // Draw smaller circles and tear dropper
  for (let i = 0; i < tearX.length; i++) {
    fill(getColor(randomNo[i]));
    circle(tearX[i], tearY[i], dia[i]);
    dia[i] = dia[i] - 5;
    dia[i] = constrain(dia[i], 30, 220);
  }

  // Move the main circle towards the first tear collected
  if (tearX.length > 0 && frameCount > frameCountRecentTearCollected + 10) {
    x = lerp(x, tearX[0], lerpSpeed);
    y = lerp(y, tearY[0], lerpSpeed);
  }
}

function getColor(i) {
  let colors = ["rgb(248,248,16)", "rgb(4,4,185)", "rgb(130,2,2)", "purple"];
  return colors[i];
}

//need to contain the reactions of the background change into the tray
//Make the reactions last longer
//When the red tear burst then do the splat effect
