let instanceOfTaxi;
let instanceOfTaxi2;

let chip;
function preload(){
  chop = loadSound(sounds/chop.m4a)
}

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvasContainer");



  instanceOfTaxi = new Taxi(50, 200, 1);
  instanceOfTaxi2 = new Taxi(200, 200, 0.5);
}

function draw() {
  background(90, 120, 250);
  
  circle(200, 160, 80);
  circle(180, 150, 10);
  circle(220, 150, 10);
  line(170, 180, 230, 180)

  instanceOfTaxi.display();
  instanceOfTaxi.update();
  
  instanceOfTaxi2.display();
  instanceOfTaxi2.update();
}


class Taxi{
  constructor(startX, startY, s){
    this.x = startX;
    this.y = startY;
    this.s = s;
    this.speedX = random(0, 2);
  }
  
  display(){
    push();
    translate(this.x, this.y)
    scale(this.s);
      // base:
    rect(-50, -50, 100, 30);
    // top"
    rect(-25, -70, 50, 20);
    // wheel 1:
    this.drawWheel(-30, -15);
    // wheel 2:
    this.drawWheel( 30, -15);
      fill("red");
      circle(0, 0, 5)
    pop();
  }
 
  update(){
    this.x += this.speedX

    if(this.x > width + 50){
      this.x = 0;
    }else if(this.x < 0 - 50){
      this.x = width + 50;
    }

  }
  drawWheel(x, y){
    push();
    translate(x, y);
    // rotate( radians(angle) );
    
      noStroke();
      fill(0);
      // circle(0,0,30);
      ellipse(0, 0, 28, 32)
    
    pop();
  }
}