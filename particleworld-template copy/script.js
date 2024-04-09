let particles = [];
let NUM_OF_STARS = 200; // Adjust the number of stars as needed
let starPositions = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");
  generateStars();
}

function draw() {
  background(0, 0, 0, 50);
  
  
  circle(width/2, height/2, 50)
  noStroke(); 
  for (let i = 0; i < starPositions.length; i++) {
    let pos = starPositions[i];
    ellipse(pos.x, pos.y, 2, 2); // Draw small circles as stars
  }
  
 
 
  particles.push( new Particle(random(width+250), height) );
  
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = random(0, 20);

    this.vel = random(-5, -10);
    this.acc = random(0, -5); 
  }
  update() {
   this.x += this.vel;
    this.y += this.vel;
  }
  display() {
    push()
    translate(this.x, this.y)
    ellipse(this.x, this.y, this.dia, this.dia);
    pop()
  }
}

function generateStars() {
  for (let i = 0; i < NUM_OF_STARS; i++) {
    let x = random(width); // Random x-coordinate
    let y = random(height); // Random y-coordinate
    starPositions.push(createVector(x, y));
  }
}

