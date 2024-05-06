let horseIMG;
let horseFrames = []; // array that will hold 9 images
let frameIndex = 0;

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
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);
}
function draw() {
  //
  push();
  translate(mouseX, mouseY);
  scale(0.5)
  // pull one frame out of array each time:
  // the frameIndex variable defines which frame to pull
  let currentFrame = horseFrames[frameIndex];
  // display the frame: 
  image(currentFrame, -currentFrame.width/2, -currentFrame.height/2);
  pop();

  // increase frameindex to show the next image in the next 
  frameIndex++;
  if(frameIndex > 8){
    // loop. after having shown all 9 images, start again with the first one
    frameIndex = 0;
  }
}