let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new WilDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class WilDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    //record original X value
    this.origX = startX 
    // add properties for your dancer here:
    this.armX = 0;
    this.armY = 0;
    this.amp = 5;
    //..
    this.scaleX = 0.5
    this.direction = 1
  }
  update() {
    this.xPosition = this.y + sin(frameCount * 0.05) * 100;
    this.fixedX = this.xPosition / this.scaleX;
    this.fixedY = 200+50 / this.scaleX;
    this.scaleX += 0.01 * this.direction;
    if (this.scaleX <= 0.5 || this.scaleX >= 2) {
      this.direction *= -1;
    }
  }
  display() {
    push();
    translate(this.fixedX, this.fixedY);
    this.drawReferenceShapes()
    scale(this.scaleX)
    //arms
    push();
   
    strokeWeight(5);
    stroke("yellow")
    for (let i = 0; i < 2; i++) {
      rotate(i * PI);
      for (let x = 10; x < 75; x += 0.1) {
        this.armY = sin(x * 0.1 + frameCount * 0.1) * this.amp;
        point(x, this.armY);
      }
    }
    pop();


    //body
    fill("yellow")
    rect(-35,  - 50, 70, 90)
  

    //eyebrow left
    fill("black")
    rect(-18.5,  - 35, 2, 5)

    //eyebrow right
    fill("black")
    rect(16.5,  - 35, 2, 5)
    
    //eyes
    fill("white")
    ellipse(-17,  - 20, 20, 20);
    ellipse(17,  - 20, 20, 20);
    fill("black");
    circle(17,  - 20, 5);
    circle(-18,  - 20, 5);

    //mouth
    circle(0,   + 5, 10)

    //shirt
    fill("white")
    rect(-35,  + 20 , 70, 10)
    fill("brown")
    rect(-35,  + 30, 70, 10)

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}