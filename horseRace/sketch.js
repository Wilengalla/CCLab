let horseFrames = []; // array that will hold 9 images
let microphone; 
let micMAX = 0;

let horses = [];

let raceFinished = false;
function preload(){
  for(let i = 0; i < 9; i++){
    let imgPath = "muybridge/muybridge_" + i + ".jpg";
    console.log(imgPath);
    let currentIMG = loadImage(imgPath);
    horseFrames.push(currentIMG)
  }
  console.log(horseFrames)
}

function setup() {
  let canvas = createCanvas(windowWidth, 400);
  canvas.parent("canvasContainer");
  

  
  microphone = new p5.AudioIn();  
  microphone.start(); 


  for(let i = 0; i < 5; i++){
    horses.push(new Horse(0, 40 + 80*i, 0.2, horseFrames))
  }

}
function draw() {
  background(220);
  for(let i = 0; i < horses.length; i++){
    horses[i].update();
    horses[i].display();
  }
  

  let micLevel = microphone.getLevel();  
  text(micLevel, 30, 80) 
  // if(micLevel > micMAX){
  //   micMAX = micLevel;
  // }
  // text(micMAX, 30, 100) 
  // my clapping reaches roughly 0.2 level

  if(micLevel > 0.2 && horses[0].running == false){
    for(let i = 0; i < horses.length; i++){
      horses[i].start();
    }
  }

}

class Horse{
  constructor(startX, startY, s, frames){
    this.x = startX;
    this.y = startY;
    this.scaleFactor = s;
    this.speed = random(1, 5);
    this.frames = frames; // [img1, img2, img3, img4, ....]
    this.currentFrame = 0;
    this.running = false;

  }
  update(){
    // if we haven't rached the finish line
    if(this.x < width && this.running == true && raceFinished == false){
      this.x+=this.speed;

      // makes the frames move
      this.currentFrame++;
      if(this.currentFrame > 8){
        this.currentFrame = 0;
      }
    }

    if(this.x >= width){
      raceFinished = true;
    }
  }
  display(){
    push();
    translate(this.x, this.y);
    scale(this.scaleFactor);

    
    let currentIMG = this.frames[this.currentFrame]
    image(currentIMG, -currentIMG.width/2, -currentIMG.height/2)
    // rect(-20, -10, 40, 20);
    pop();
  }
  start(){
    this.running = true;
  }

}



function mousePressed(){
  // horse1.start();
}