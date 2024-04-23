// let Egg1;
// let Egg2;

let basket = []
let numEggs = 2;


function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);
  // Egg1 = new Egg(random(width), random(height))
  // Egg2 = new Egg(random(width), random(height))

  // basket[0] = new Egg(random(width), random(height))
  // basket[1] = new Egg(random(width), random(height))
  // let newEgg = new Egg(random(width), random(height))
  // basket.push(newEgg);
  // basket.push(new Egg(random(width), random(height)));

  for (let i = 0; i < numEggs; i++) {
    basket.push(new Egg(random(width), random(height)));
  }
  //console.log(basket)
}

function draw() {
  background(120, 90, 230);

  for (let i = 0; i < basket.length; i++) {
    basket[i].display();
    basket[i].update();
    // basket[30].display();

  }
  // Egg1.display();
  // Egg2.display();
}

class Egg {
  constructor(startX, startY) {
    this.x = startX
    this.y = startY
    this.s = random(0.3, 1)
    this.speedX = random( - 1, 1);

    this.showYolk = true;
  }
  display() {
    push();
    translate(this.x, this.y);
    scale(this.s)
    noStroke();
    fill(255, 200);
    arc(0, 0, 80, 80, 0, PI);
    arc(0, 0, 80, 130, PI, 2 * PI);
    
    //yolk
    if(this.showYolk == true){
      fill(255, 164, 0);
      circle(0, 0, 40);
      pop();
    }
  }
  update(){
    this.x += this.speedX
    if(this.x > width || this.x < 0 ){
      this.speedX =- this.speedX
      this.showYolk = !this.showYolk;
    }
    }
}
function mousePressed(){
  basket.push(new Egg(mouseX, mouseY))
}