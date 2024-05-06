let memeBkg = [];
let memeImages = [];
let bkgButtons = [];
let activeBkgImage = false;
let buttonSpacing = 125;
let stickerButtons = [];
let stickers = [];
let freq;
let sinValue;
let sound = []
let clearButton;

function preload() {
  for (let i = 0; i < 6; i++) {
    memeBkg.push(loadImage("MemeBackground/Meme" + i + ".jpeg"));
  }
  for (let i = 0; i < 18; i++) {
    memeImages.push(loadImage("Memes/meme" + i + ".png"));
  }
  for (let i = 0; i < 2; i++) {
    sound.push(loadSound("MemeSongs/memeSong" + i + ".mp3"));
  }

}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");


  stickerButtons.push(new Sticker1(205, 500));
  stickerButtons.push(new Popcat(200, 300))
  stickerButtons.push(new ConfusedGuy(75, 300))
  stickerButtons.push(new LookingGuy(75, 500))

  let totalWidth = memeBkg.length * (70 + buttonSpacing);
  let startX = (width - totalWidth) / 2;

  for (let i = 0; i < memeBkg.length; i++) {
    let buttonX = startX + i * (70 + buttonSpacing);
    bkgButtons.push(new BkgButton(buttonX, 110, memeBkg[i], 175, 125));
  }

  clearButton = createButton('Clear Stickers');
  clearButton.position(20, 20);
  clearButton.mousePressed(clearStickers);
}

function draw() {
  background("black");
  rect(325, 250, windowWidth / 2, windowHeight / 2);
  for (let i = 0; i < bkgButtons.length; i++) {
    bkgButtons[i].update();
    bkgButtons[i].display();
  }

  if (activeBkgImage !== false) {
    image(activeBkgImage, 325, 250, windowWidth / 2, windowHeight / 2);
    push();
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(325, 250, windowWidth / 2, windowHeight / 2);
    pop();
  }

  for (let i = 0; i < stickerButtons.length; i++) {
    stickerButtons[i].update();
    stickerButtons[i].display();
  }

  // Display all the stickers in use
  for (let i = 0; i < stickers.length; i++) {
    stickers[i].update();
    stickers[i].display();
  }
}

function mouseClicked() {
  for (let i = 0; i < bkgButtons.length; i++) {
    if (bkgButtons[i].checkIfClicked()) {
      activeBkgImage = bkgButtons[i].image;
    }
  }
}

class BkgButton {
  constructor(startX, startY, memeBkg, width, height) {
    this.x = startX;
    this.y = startY;
    this.image = memeBkg;
    this.width = width
    this.height = height;
    this.isSelected == false;
  }
  update() {

  }
  display() {
    push();
    translate(this.x, this.y);
    if (this.isSelected == true) {
      stroke("white");
      strokeWeight(5);
      noFill();
      rect(0, 0, this.width, this.height);
    }
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
  checkIfClicked() {
    if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) {
      this.isSelected = true; // Corrected from this.isSelected == true
      return true;
    } else {
      this.isSelected = false; // Corrected from this.isSelected == false
      return false;
    }
  }
}

class Sticker1 {
  constructor(startX, startY, img) {
    this.x = startX;
    this.y = startY;
    this.imgY = 500
    this.startY = startY;
    this.width = 120;
    this.height = 120;
    this.isBeingDragged = false;
    this.image = memeImages[1];
    this.frameCount = 0;
    this.freq = 0.01; // Adjust frequency to control speed of the oscillation
    this.amplitude = 25; // Adjust amplitude to control height of the oscillation
    this.sound = sound[0];
  }

  update() {
    // For the stickers in use, setting
    // this property to true allows us to drag it
    if (this.isBeingDragged) {
      this.x = mouseX - this.width / 2;
      this.imgY = mouseY - this.height / 2;
      this.sound.play();
    }

    // Update the position of the sun
    this.frameCount++;
    let sinValue = sin(this.frameCount * this.freq);
    this.y = this.startY + sinValue * this.amplitude; // Use this.startY instead of startY
  }

  display() {
    push();
    translate(this.x, this.imgY)
    fill("yellow");
    circle(60, this.y - 480, 100);
    image(this.image, 0, 0, this.width, this.height);
    pop();

  }

  isPressed() {
    // Check if the mouse is over the draggable area of the sticker
    return (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.imgY &&
      mouseY < this.imgY + this.height
    );
  }
  isInsideRectangle() {
    let rectX = 325;
    let rectY = 250;
    let rectWidth = windowWidth / 2;
    let rectHeight = windowHeight / 2;

    return (
      this.x > rectX &&
      this.x + this.width < rectX + rectWidth &&
      this.imgY > rectY &&
      this.imgY + this.height < rectY + rectHeight
    );
  }
}

class Popcat {
  constructor(startX, startY, img1, img2) {
    this.x = startX;
    this.y = startY;
    this.imgY = 475;
    this.startY = startY;
    this.width = 125;
    this.height = 125;
    this.isBeingDragged = false;
    this.image1 = memeImages[2];
    this.image2 = memeImages[3];
    this.currentImage = this.image1; // Start with the first image
    this.frameCount = 0;
    this.animationSpeed = 10; // Adjust speed of animation
    this.sound = sound[1];
  }

  update() {
    // For the stickers in use, setting
    // this property to true allows us to drag it
    if (this.isBeingDragged) {
      this.x = mouseX - this.width / 2;
      this.y = mouseY - this.height / 2;
      this.sound.play();
    }
    
    this.frameCount++;
    if (this.frameCount % this.animationSpeed === 0) {
      if (this.currentImage === this.image1) {
        this.currentImage = this.image2;
      } else {
        this.currentImage = this.image1;
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y)
    image(this.currentImage, 0, 0, this.width, this.height);
    pop();

  }

  isPressed() {
    // Check if the mouse is over the draggable area of the sticker
    return (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    );
  }
  isInsideRectangle() {
    let rectX = 325;
    let rectY = 250;
    let rectWidth = windowWidth / 2;
    let rectHeight = windowHeight / 2;

    return (
      this.x > rectX &&
      this.x + this.width < rectX + rectWidth &&
      this.y > rectY &&
      this.y + this.height < rectY + rectHeight
    );
  }

}

class ConfusedGuy {
  constructor(startX, startY, img1, img2) {
    this.x = startX;
    this.y = startY;
    this.imgY = 475;
    this.startY = startY;
    this.width = 125;
    this.height = 125;
    this.isBeingDragged = false;
    this.image1 = memeImages[6];
    this.image2 = memeImages[7];
    this.image3 = memeImages[8];
    this.image4 = memeImages[9];
    this.image5 = memeImages[10];
    this.image6 = memeImages[11];
    this.currentImageIndex = 0;
    this.imageList = [this.image1, this.image2, this.image3, this.image4, this.image5, this.image6];
    this.frameCount = 0;
    this.animationSpeed = 24; 
    //this.sound = sound[1];
  }

  update() {
    // For the stickers in use, setting
    // this property to true allows us to drag it
    if (this.isBeingDragged) {
      this.x = mouseX - this.width / 2;
      this.y = mouseY - this.height / 2;
      //this.sound.play();
    }
    
    this.frameCount++;
    if (this.frameCount % this.animationSpeed === 0) {
      // Cycle through the images
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imageList.length;
    }
  }

  display() {
    push();
    translate(this.x, this.y)
    image(this.imageList[this.currentImageIndex], 0, 0, this.width, this.height);
    pop();

  }

  isPressed() {
    // Check if the mouse is over the draggable area of the sticker
    return (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    );
  }

  isInsideRectangle() {
    let rectX = 325;
    let rectY = 250;
    let rectWidth = windowWidth / 2;
    let rectHeight = windowHeight / 2;

    return (
      this.x > rectX &&
      this.x + this.width < rectX + rectWidth &&
      this.y > rectY &&
      this.y + this.height < rectY + rectHeight
    );
  }
}

class LookingGuy {
  constructor(startX, startY, img1, img2) {
    this.x = startX;
    this.y = startY;
    this.imgY = 475;
    this.startY = startY;
    this.width = 125;
    this.height = 125;
    this.isBeingDragged = false;
    this.image1 = memeImages[12];
    this.image2 = memeImages[13];
    this.image3 = memeImages[14];
    this.image4 = memeImages[15];
    this.image5 = memeImages[16];
    this.image6 = memeImages[17];
    this.currentImageIndex = 0;
    this.imageList = [this.image1, this.image2, this.image3, this.image4, this.image5, this.image6];
    this.frameCount = 0;
    this.animationSpeed = 24; 
    //this.sound = sound[1];
  }

  update() {
    // For the stickers in use, setting
    // this property to true allows us to drag it
    if (this.isBeingDragged) {
      this.x = mouseX - this.width / 2;
      this.y = mouseY - this.height / 2;
      //this.sound.play();
    }
    
    this.frameCount++;
    if (this.frameCount % this.animationSpeed === 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imageList.length;
    }
  }

  display() {
    push();
    translate(this.x, this.y)
    image(this.imageList[this.currentImageIndex], 0, 0, this.width, this.height);
    pop();

  }

  isPressed() {
    return (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    );
  }

  isInsideRectangle() {
    let rectX = 325;
    let rectY = 250;
    let rectWidth = windowWidth / 2;
    let rectHeight = windowHeight / 2;

    return (
      this.x > rectX &&
      this.x + this.width < rectX + rectWidth &&
      this.y > rectY &&
      this.y + this.height < rectY + rectHeight
    );
  }
}
function mousePressed() {
  let clickedSticker = false; 

  // Loop over stickers array and check if any sticker is pressed
  for (let i = stickers.length - 1; i >= 0; i--) {
    if (stickers[i].isPressed()) {
      stickers[i].isBeingDragged = true;
      clickedSticker = true;
      break; // Break the loop after one sticker is clicked
    }
  }

  if (!clickedSticker) {
    for (let i = stickerButtons.length - 1; i >= 0; i--) {
      if (stickerButtons[i] instanceof Popcat && stickerButtons[i].isPressed()) {
        let newPopcat = new Popcat(mouseX, mouseY); 
        newPopcat.isBeingDragged = true;
        stickers.push(newPopcat);
        break; 
      }
    }
  }

  
  if (!clickedSticker) {
    for (let i = stickerButtons.length - 1; i >= 0; i--) {
      if (stickerButtons[i] instanceof Sticker1 && stickerButtons[i].isPressed()) {
        let newSticker1 = new Sticker1(mouseX, mouseY); 
        newSticker1.isBeingDragged = true;
        stickers.push(newSticker1);
        break;
      }
    }
  }
  
  if (!clickedSticker) {
    for (let i = stickerButtons.length - 1; i >= 0; i--) {
      if (stickerButtons[i] instanceof ConfusedGuy && stickerButtons[i].isPressed()) {
        let newSticker1 = new ConfusedGuy(mouseX, mouseY); 
        newSticker1.isBeingDragged = true;
        stickers.push(newSticker1);
        break;
      }
    }
  }

  if (!clickedSticker) {
    for (let i = stickerButtons.length - 1; i >= 0; i--) {
      if (stickerButtons[i] instanceof LookingGuy && stickerButtons[i].isPressed()) {
        let newSticker1 = new LookingGuy(mouseX, mouseY); 
        newSticker1.isBeingDragged = true;
        stickers.push(newSticker1);
        break;
      }
    }
  }
}

function mouseReleased() {
  for (let i = stickers.length - 1; i >= 0; i--) {
    stickers[i].isBeingDragged = false;
    if (!stickers[i].isInsideRectangle()) {
      stickers.splice(i, 1);
    }
  }
  
  // Stop the sound (assuming sound is an array with one object)
  if (sound.length > 0) {
    sound[0].stop();
  }
}

function clearStickers() {
  // Clear all stickers from the canvas
  stickers = [];
}
