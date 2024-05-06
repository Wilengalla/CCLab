let stickerButtons = [];
let stickers = [];

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");

  // We create a single sticker that serves as the initial button 
  // and put it into the button array:
  stickerButtons.push(new Sticker1(100, 100));
}

function draw() {
  background(220);
  
  // Display all the buttons
  for(let i = 0; i < stickerButtons.length; i++){
    stickerButtons[i].update();
    stickerButtons[i].display();
  }

  // Display all the stickers in use
  for(let i = 0; i < stickers.length; i++){
    stickers[i].update();
    stickers[i].display();
  }
}

class Sticker1{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.dia = 50;
    this.isBeingDragged = false;
  }

  update(){
    // For the stickers in use, setting
    // this property to true allows us to drag it
    if(this.isBeingDragged){
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  display(){
    push();
    translate(this.x, this.y);
    circle(0, 0, this.dia);
    pop();
  }

  isPressed(){
    // Calculate distance between mouse and sticker center
    let d = dist(mouseX, mouseY, this.x, this.y);
    // If the distance is less than or equal to half the diameter
    // of the sticker, it means the mouse is inside the sticker
    // and the sticker is pressed
    return d <= this.dia / 2;
  }
}

// We have a function to handle mouse presses
// All buttons and stickers should check if they are clicked
function mousePressed(){
  // Loop over stickers and check if clicked
  for(let i = stickers.length-1; i >= 0; i--){
    // If clicked, set isBeingDragged to true
    if(stickers[i].isPressed()){
      stickers[i].isBeingDragged = true;
      break; // Break the loop after one sticker is clicked
    }
  }

  // Loop over sticker buttons and check if clicked
  for(let i = stickerButtons.length-1; i >= 0; i--){
    // If clicked, create a new sticker, set its isBeingDragged to true,
    // and add it to the stickers array
    if(stickerButtons[i].isPressed()){
      let newSticker = new Sticker1(mouseX, mouseY);
      newSticker.isBeingDragged = true;
      stickers.push(newSticker);
      break; // Break the loop after one button is clicked
    }
  }
}

// Mouse release function!
function mouseReleased(){
  // Set all stickers' isBeingDragged to false
  for(let i = 0; i < stickers.length; i++){
    stickers[i].isBeingDragged = false;
  }
}