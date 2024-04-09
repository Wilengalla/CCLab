let confettis = [];
let numConfetti = 100;

let backgroundHue;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvasContainer");

  colorMode(HSB);
  backgroundHue = random(225);
}

function draw() {
  background(backgroundHue, 10, 190);
  confettis.push(new Confetti(width/2, height/2))
  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].display();
  }
  if(confettis.length > 300){
    confettis.splice(0,1)
  }
}

class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(8, 10);
    
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3); 
    
    this.c = color(random(225), 225, 225)
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;

    //gravity effect
    this.speedY += 0.1
    this.speedX *= 0.99
  }
  display(){    
    push();
    translate(this.x, this.y);

      fill(this.c);
      noStroke();
      circle(0, 0, this.size);
   
    pop();
  }

}


// console.log(confettis.length)



function mousePressed(){
  for(let i = 0; i < numConfetti; i++){
    // confettis.push(new Confetti(mouseX, mouseY))
  }
 
}
