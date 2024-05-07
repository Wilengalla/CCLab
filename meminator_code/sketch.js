let memeBkg = [];
let memeImages = [];
let bkgButtons = [];
let activeBkgImage = false;
let buttonSpacing = 150;
let stickerButtons = [];
let stickers = [];
let freq;
let sinValue;
let sound = [];
let lebronSound = [];
let lebronSoundIndex = 0;
let popSound = [];
let popSoundIndex = 0;
let nyanCat;
let nyanCatImage;
let rainbowImage;
let clearButton;
let captureButton;



function preload() {
  for (let i = 0; i < 6; i++) {
    memeBkg.push(loadImage("MemeBackground_ran/Meme" + i + ".jpeg"));
  }
  for (let i = 0; i < 21; i++) {
    memeImages.push(loadImage("Memes_ran/meme" + i + ".PNG"));
  }
  for (let i = 0; i < 30; i++) {
    lebronSound.push(loadSound("MemeSongs_ran/memeSong0.mp3"));
  }
  for (let i = 0; i < 30; i++) {
    popSound.push(loadSound("MemeSongs_ran/memeSong1.mp3"));
  }

}



function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");


  stickerButtons.push(new Sticker1(200, 500, memeImages[1], lebronSound[lebronSoundIndex]));
  stickerButtons.push(new Popcat(200, 300))
  stickerButtons.push(new ConfusedGuy(25, 300))
  stickerButtons.push(new LookingGuy(25, 500))
  stickerButtons.push(new NyanCat(1050, 300, memeImages[18], memeImages[19]))
  stickerButtons.push(new Trolol(1200, 300, memeImages[0]))
  stickerButtons.push(new Smurf(1200, 500, memeImages[4]))
  stickerButtons.push(new Pepe(1050, 500, memeImages[20]))
  

  let totalWidth = memeBkg.length * (70 + buttonSpacing);
  let startX = (width - totalWidth) / 2;

  for (let i = 0; i < memeBkg.length; i++) {
    let buttonX = startX + i * (70 + buttonSpacing);
    bkgButtons.push(new BkgButton(buttonX, 75, memeBkg[i], 200, 125));
  }

  clearButton = createButton('Clear Stickers');
  clearButton.position(600, 2950);
  clearButton.mousePressed(clearStickers);

  captureButton = createButton('Capture'); // Create a button
  captureButton.position(500, 2950); // Position the button
  captureButton.mousePressed(saveRectangle); // Call saveRectangle() when the button is pressed
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
  constructor(startX, startY, img, s) {
    this.x = startX;
    this.y = startY;
    this.imgY = 500

    this.sound = s;
    lebronSoundIndex++;

    this.sunOffsetY = 0;
    this.width = 75;
    this.height = 75;
    this.isBeingDragged = false;
    this.image = img;
    this.frameCount = 0;
    this.freq = 0.01; 
    this.amplitude = 25; 
    this.dia = 75
  }

  update() {
    if (this.isBeingDragged) {
      this.x = mouseX - this.width / 2;
      this.y = mouseY - this.height / 2;
      console.log(this.sound)
      if(this.sound.isPlaying() == false){
        this.sound.play();
      } 
    }else{
      this.sound.stop();
    }

    // Update the position of the sun
    this.frameCount++;
    let sinValue = sin(this.frameCount * this.freq);
    this.sunOffsetY = map(sinValue, -1, 1, -50, 0);

    // this.y = this.startY + sinValue * this.amplitude; // Use this.startY instead of startY
  }

  display() {
    push();
    translate(this.x, this.y)
    fill("yellow");
    noStroke()
    circle(this.width/2, this.height/2 + this.sunOffsetY, this.dia);
    image(this.image, 0, 0, this.width, this.height);
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
  }increaseSize() {
    // Increase the size of the sticker
    this.width += 10;
    this.height += 10;
    this.dia += 10;
  }

  decreaseSize() {
    // Decrease the size of the sticker
    this.width -= 10;
    this.height -= 10;
    this.dia -= 10;
  }
}

class Popcat {
  constructor(startX, startY, s, img1, img2) {
    this.x = startX;
    this.y = startY;
    this.imgY = 475;
    this.sound = s;
    popSoundIndex++;

    this.width = 75;
    this.height = 75;
    this.isBeingDragged = false;
    this.image1 = memeImages[2];
    this.image2 = memeImages[3];
    this.currentImage = this.image1; // Start with the first image
    this.frameCount = 0;
    this.animationSpeed = 10; // Adjust speed of animation

    // Create an empty div element as a placeholder for the event listener
    this.element = document.createElement('div');

    // Adding event listener to trigger addTextToDescription function
    this.element.addEventListener('click', () => {
      addTextToDescription('whdiawdhidhaidhwaiohdaiwhd');
    });
  }

  update() {
    // For the stickers in use, setting
    // this property to true allows us to drag it
    if (this.isBeingDragged) {
      this.x = mouseX - this.width / 2;
      this.y = mouseY - this.height / 2;
    }
  

    if (this.isPressed()) {
      this.currentImage = this.image2;
      
    } else {
      this.currentImage = this.image1;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
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

  increaseSize() {
    // Increase the size of the sticker
    this.width += 10;
    this.height += 10;
    this.dia += 10;
  }

  decreaseSize() {
    // Decrease the size of the sticker
    this.width -= 10;
    this.height -= 10;
    this.dia -= 10;
  }
}

class ConfusedGuy {
  constructor(startX, startY, img1, img2) {
    this.x = startX;
    this.y = startY;
    this.imgY = 475;
    this.startY = startY;
    this.width = 75;
    this.height = 75;
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
  increaseSize() {
    // Increase the size of the sticker
    this.width += 10;
    this.height += 10;
    this.dia += 10;
  }

  decreaseSize() {
    // Decrease the size of the sticker
    this.width -= 10;
    this.height -= 10;
    this.dia -= 10;
  }
}

class LookingGuy {
  constructor(startX, startY, img1, img2) {
    this.x = startX;
    this.y = startY;
    this.imgY = 475;
    this.startY = startY;
    this.width = 75;
    this.height = 75;
    this.isBeingDragged = false;
    this.image1 = memeImages[12];
    this.image2 = memeImages[13];
    this.image3 = memeImages[14];
    this.image4 = memeImages[15];
    this.image5 = memeImages[16];
    this.image6 = memeImages[17];
    this.currentImageIndex = 0;
    this.imageList = [this.image1, this.image2, this.image3, this.image4, this.image5];
    this.frameCount = 0;
    this.animationSpeed = 24; 
    //this.sound = sound[1];
  }

  update() {
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
    translate(this.x, this.y);
    if (this.isPressed()) {
      image(this.image6, 0, 0, this.width, this.height);
    } else {
      image(this.imageList[this.currentImageIndex], 0, 0, this.width, this.height);
    }
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
  increaseSize() {
    // Increase the size of the sticker
    this.width += 10;
    this.height += 10;
    this.dia += 10;
  }

  decreaseSize() {
    // Decrease the size of the sticker
    this.width -= 10;
    this.height -= 10;
    this.dia -= 10;
  }
}

class NyanCat {
  constructor(startX, startY, img, rainbowImg) {
    this.x = startX;
    this.y = startY;
    this.width = 80; 
    this.height = 80; 
    this.speed = 5;
    this.image = img; 
    this.frameCount = 0; 
    this.rainbowTrail = []; 
    this.rainbowImg = rainbowImg;
    this.isBeingDragged = false; // Initialize isBeingDragged to false
  }

  update() {
    if (this.isBeingDragged) {
      this.x = mouseX - this.width / 2;
      this.y = mouseY - this.height / 2;
    }

    // Check if Nyan Cat is inside the rectangle before updating its position
    if (this.isInsideRectangle()) {
      // Wrap around screen if Nyan Cat goes off the canvas
      if (this.x > width + this.width) {
        // Reset position to the left side of the rectangle
        this.x = 325;
      }

      // Update frame count for animation
      this.frameCount++;

      if (this.frameCount % 10 === 0) {
          this.rainbowTrail.push(new Rainbow(-50, 0 + this.height / 2, this.rainbowImg));
      }

      // Update each rainbow in the trail
      for (let i = this.rainbowTrail.length - 1; i >= 0; i--) {
          this.rainbowTrail[i].update();
          if (this.rainbowTrail[i].x < -this.rainbowTrail[i].width) {
              this.rainbowTrail.splice(i, 1);
          }
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y)
    for (let i = 0; i < this.rainbowTrail.length; i++) {
        this.rainbowTrail[i].display();
    }
    // Draw Nyan Cat image at its position
    image(this.image, 0, 0, this.width, this.height);
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

  increaseSize() {
    // Increase the size of the sticker
    this.width += 10;
    this.height += 10;
  }

  decreaseSize() {
    // Decrease the size of the sticker
    this.width -= 10;
    this.height -= 10;
  }
}

class Rainbow {
  constructor(startX, startY, img) {
      this.x = startX;
      this.y = startY;
      this.width = 125; // Width of the rainbow image
      this.height = 20; // Height of the rainbow image
      this.speed = 2; // Movement speed of the rainbow
      this.image = img; // Rainbow image
  }

  update() {
      // Move rainbow horizontally
      this.x -= this.speed;
  }

  display() {
    push();
    translate(this.x, this.y)
      image(this.image, 0, 0, this.width, this.height);
    pop()
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
  increaseSize() {
    // Increase the size of the sticker
    this.width += 10;
    this.height += 10;
    this.dia += 10;
  }

  decreaseSize() {
    // Decrease the size of the sticker
    this.width -= 10;
    this.height -= 10;
    this.dia -= 10;
  }
}
class Trolol{
  constructor(startX, startY, img1) {
    this.x = startX;
    this.y = startY;
    this.imgY = 475;
    popSoundIndex++;

    this.width = 75;
    this.height = 75;
    this.isBeingDragged = false;
    this.image1 = img1;
    this.currentImage = this.image1; // Start with the first image
    this.frameCount = 0;
    this.animationSpeed = 10; // Adjust speed of animation
  }

  update() {
    // For the stickers in use, setting
    // this property to true allows us to drag it
    if (this.isBeingDragged) {
      this.x = mouseX - this.width / 2;
      this.y = mouseY - this.height / 2;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
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

  increaseSize() {
    // Increase the size of the sticker
    this.width += 10;
    this.height += 10;
    this.dia += 10;
  }

  decreaseSize() {
    // Decrease the size of the sticker
    this.width -= 10;
    this.height -= 10;
    this.dia -= 10;
  }
}

class Smurf{
  constructor(startX, startY, img1) {
    this.x = startX;
    this.y = startY;
    this.imgY = 475;
    popSoundIndex++;

    this.width = 75;
    this.height = 75;
    this.isBeingDragged = false;
    this.currentImage = img1; 
    this.frameCount = 0;
    this.animationSpeed = 10; 
  }

  update() {
    // For the stickers in use, setting
    // this property to true allows us to drag it
    if (this.isBeingDragged) {
      this.x = mouseX - this.width / 2;
      this.y = mouseY - this.height / 2;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
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

  increaseSize() {
    // Increase the size of the sticker
    this.width += 10;
    this.height += 10;
    this.dia += 10;
  }

  decreaseSize() {
    // Decrease the size of the sticker
    this.width -= 10;
    this.height -= 10;
    this.dia -= 10;
  }
}

class Pepe {
  constructor(startX, startY, img) {
    this.x = startX;
    this.y = startY;
    this.width = 75;
    this.height = 75;
    this.isBeingDragged = false;
    this.image = img;
  }

  update() {
    if (this.isBeingDragged) {
      this.x = mouseX - this.width / 2;
      this.y = mouseY - this.height / 2;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    image(this.image, 0, 0, this.width, this.height);
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

  increaseSize() {
    // Increase the size of the sticker
    this.width += 10;
    this.height += 10;
  }

  decreaseSize() {
    // Decrease the size of the sticker
    this.width -= 10;
    this.height -= 10;
  }
}



function mousePressed() {
  let clickedSticker = false;

  // Loop over stickers array and check if any sticker is pressed
  for (let i = stickers.length - 1; i >= 0; i--) {
    if (stickers[i].isPressed()) {
      stickers[i].isBeingDragged = true;
      clickedSticker = true;
    }
  }

  // If no sticker is clicked, check if any sticker button is clicked to add a new sticker
  if (!clickedSticker) {
    for (let i = stickerButtons.length - 1; i >= 0; i--) {
      if (stickerButtons[i] instanceof Popcat && stickerButtons[i].isPressed()) {
        let newPopcat = new Popcat(mouseX, mouseY); 
        addTextToDescription("Pop Cat the meme originated from a simple mobile game called Pop Cat where players tap on colorful cat faces to clear them from the screen. However, the meme version of Pop Cat takes this basic concept and transforms it into a humorous and often absurd internet phenomenon.")
        newPopcat.isBeingDragged = true;
        stickers.push(newPopcat);
      }
    }
  }

  if (!clickedSticker) {
    for (let i = stickerButtons.length - 1; i >= 0; i--) {
      if (stickerButtons[i] instanceof Sticker1 && stickerButtons[i].isPressed()) {
        let newSticker1 = new Sticker1(mouseX, mouseY, memeImages[1], lebronSound[lebronSoundIndex]); 
        addTextToDescription("LeBron James is a legendary basketball player and he became a meme due to his expressive on-court reactions, off-court persona, and involvement in various cultural spheres beyond basketball. His championship wins and losses, social and political commentary, and global influence have all contributed to his status as a widely recognized and meme-worthy figure in popular culture. ")
        newSticker1.isBeingDragged = true;
        stickers.push(newSticker1);
        isFinite();
      }
    }
  }

  if (!clickedSticker) {
    for (let i = stickerButtons.length - 1; i >= 0; i--) {
      if (stickerButtons[i] instanceof ConfusedGuy && stickerButtons[i].isPressed()) {
        let newSticker1 = new ConfusedGuy(mouseX, mouseY); 
        addTextToDescription("The Confused guy Question Mark Meme became popular due to its versatility in expressing confusion or uncertainty in various situations, making it relatable and widely applicable in online conversations and memes.")
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
        addTextToDescription("The Blinking Guy Meme went viral because of its relatable and humorous representation of a reaction to surprising or unexpected situations, making it widely applicable in online discussions and memes.")
        newSticker1.isBeingDragged = true;
        stickers.push(newSticker1);
        break;
      }
    }
  }

  if (!clickedSticker) {
    for (let i = stickerButtons.length - 1; i >= 0; i--) {
      if (stickerButtons[i] instanceof NyanCat && stickerButtons[i].isPressed()) {
        let newNyanCat = new NyanCat(mouseX, mouseY, memeImages[18], memeImages[19]);
        addTextToDescription("Nyan Cat gained popularity due to its catchy tune, vibrant visuals, and whimsical concept of a flying cat leaving a rainbow trail. The meme's combination of internet culture elements like cats, rainbows, and catchy music resonated with online audiences. ")
        newNyanCat.isBeingDragged = true;
        stickers.push(newNyanCat);
        break;
      }
    }
  }
  
  if (!clickedSticker) {
    for (let i = stickerButtons.length - 1; i >= 0; i--) {
      if (stickerButtons[i] instanceof Trolol && stickerButtons[i].isPressed()) {
        let newSticker1 = new Trolol(mouseX, mouseY, memeImages[0]); 
        addTextToDescription("This face gained popularity because it effectively conveyed the playful or trolling nature of online interactions. People often use it to express amusement, mischief, or to tease others in a light-hearted manner.");
        newSticker1.isBeingDragged = true;
        stickers.push(newSticker1);
        break;
      }
    }
  }
  if (!clickedSticker) {
    for (let i = stickerButtons.length - 1; i >= 0; i--) {
      if (stickerButtons[i] instanceof Smurf && stickerButtons[i].isPressed()) {
        let newSticker1 = new Smurf(mouseX, mouseY, memeImages[4]); 
        addTextToDescription("Overall, the realistic Smurf cat meme became popular due to its creativity, nostalgia factor, novelty, shareability, and humor, which contributed to its widespread appeal across the internet.");
        newSticker1.isBeingDragged = true;
        stickers.push(newSticker1);
        break;
      }
    }
  }

  if (!clickedSticker) {
    for (let i = stickerButtons.length - 1; i >= 0; i--) {
      if (stickerButtons[i] instanceof Pepe && stickerButtons[i].isPressed()) {
        let newSticker1 = new Pepe(mouseX, mouseY, memeImages[20]); 
        addTextToDescription("Pepe the Frog became popular due to its versatility, simple design, and association with internet culture. Its ability to convey various emotions and messages made it widely adaptable for different contexts, from humor to social and political commentary. Pepe's popularity also stemmed from its presence in online communities and constant evolution through user remixes and reinterpretations");
        newSticker1.isBeingDragged = true;
        stickers.push(newSticker1);
        break;
      }
    }
  }
}


  // lebronSound[0].play();


function mouseReleased() {
  for (let i = stickers.length - 1; i >= 0; i--) {
    stickers[i].isBeingDragged = false;
    if (!stickers[i].isInsideRectangle()) {
      if(stickers[i].sound != undefined){
        stickers[i].sound.stop()
      }
      stickers.splice(i, 1);
    }
  }
  
  // Stop the sound (assuming sound is an array with one object)
  // if (sound.length > 0) {
  //   sound[0].stop();
  // }
}

function clearStickers() {
  // Clear all stickers from the canvas
  stickers = [];
}


function addTextToDescription(newText){
  let p = document.createElement("p")
  p.innerText = newText;
  document.getElementById("memeDescription").appendChild(p); // Append the p element to the HTML
}

function keyPressed() {
  // This function is called whenever a key is pressed
  if (key === 'A' || key === 'a') {
    // Call the increaseSize function when 'A' or 'a' is pressed
    increaseSize();
  } else if (key === 'D' || key === 'd') {
    // Call the decreaseSize function when 'D' or 'd' is pressed
    decreaseSize();
  }
}

function increaseSize() {
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof Sticker1 && stickers[i].isPressed()) {
      stickers[i].increaseSize();
    }
  }

  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof Popcat && stickers[i].isPressed()) {
      stickers[i].increaseSize();
    }
  }

  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof LookingGuy && stickers[i].isPressed()) {
      stickers[i].increaseSize();
    }
  }

  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof ConfusedGuy && stickers[i].isPressed()) {
      stickers[i].increaseSize();
    }
  }
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof NyanCat && stickers[i].isPressed()) {
      stickers[i].increaseSize();
    }
  }
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof Rainbow && stickers[i].isPressed()) {
      stickers[i].increaseSize();
    }
  }
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof Trolol && stickers[i].isPressed()) {
      stickers[i].increaseSize();
    }
  }
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof Smurf && stickers[i].isPressed()) {
      stickers[i].increaseSize();
    }
  }
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof Pepe && stickers[i].isPressed()) {
      stickers[i].increaseSize();
    }
  }
}


function decreaseSize() {
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof Sticker1 && stickers[i].isPressed()) {
      stickers[i].decreaseSize();
    }
  }
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof Popcat && stickers[i].isPressed()) {
      stickers[i].decreaseSize();
    }
  }
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof LookingGuy && stickers[i].isPressed()) {
      stickers[i].decreaseSize();
    }
  }
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof ConfusedGuy && stickers[i].isPressed()) {
      stickers[i].decreaseSize();
    }
  }
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof NyanCat && stickers[i].isPressed()) {
      stickers[i].decreaseSize();
    }
  }
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof Rainbow && stickers[i].isPressed()) {
      stickers[i].decreaseSize();
    }
  }
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof Trolol && stickers[i].isPressed()) {
      stickers[i].decreaseSize();
    }
  }
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof Smurf && stickers[i].isPressed()) {
      stickers[i].decreaseSize();
    }
  }
  for (let i = 0; i < stickers.length; i++) {
    if (stickers[i] instanceof Pepe && stickers[i].isPressed()) {
      stickers[i].decreaseSize();
    }
  }
  
}

function saveRectangle() {
  let rectX = 325;
  let rectY = 250; 
  let rectWidth = windowWidth / 2;
  let rectHeight = windowHeight / 2;

  
  let img = get(rectX, rectY, rectWidth, rectHeight);

  // Save the image
  img.save("rectangle.png");
}