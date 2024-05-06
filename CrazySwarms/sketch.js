let swarm1;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");


  swarm1 = new Swarm(width/2, height/2);
}

function draw() {
  background("red");
  swarm1.update();
  swarm1.display();

  noFill();
  stroke(225);
  circle(width/2, height/2, width)
  
}


class Swarm{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.dia = 100
    this.speedX = 0;
    this.speedY = 0;

    this.noiseXoffset = random(1000)
    this.noiseYoffset = random(1000)

    this.birds = []
    for(let i = 0; i < 5; i++){
      let ranAngle = random(2*PI);
      let birdX = cos(ranAngle)* random(0, this.dia/2)//random(this.dia);
      let birdY = sin(ranAngle)* random(0, this.dia/2)//random(this.dia);
    }
  }
  update(){
    let noiseValX = noise((frameCount +  this.noiseXoffset)* 0.001);
    this.speedX = map(noiseValX, 0, 1, -20, 20);
    
    text(noiseValX, 100, 100)

    let noiseValY = noise((frameCount + this.noiseYoffset ) * 0.01);
    this.speedY = map(noiseValY, 0, 1, -20, 20);

      let wouldBeX = this.x + this.speedX;
      let wouldBeY = this.y + this.speedY;

    let distanceFromCenter = dist(width/2, height/2, wouldBeX, wouldBeY);

    if(distanceFromCenter < width/2){
      this.x += this.speedX;
      this.y += this.speedY;
    }

  }
  display(){
    push();
    translate(this.x, this.y);

    noFill();
    stroke(0);
    circle(0, 0, this.dia)

    for(let i = 0; i < this.birds.length; i++){
      this.birds[i].update()
      this.birds[i].display()
    }





    pop();
  }
  
}

class Bird{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY; 
    
  }
  update(){

  }
  display(){
    push();
    translate(this.x, this.y);

    noStroke();
    fill(0);
    circle(0, 0, 10);

    pop();
  }
}









