let nyanCat;


function preload() {
    // Load Nyan Cat and rainbow images
    nyanCatImage = loadImage('nyan_cat.png');
    rainbowImage = loadImage('rainbow.png');
}

function setup() {
    createCanvas(800, 400);
    // Create Nyan Cat object
    nyanCat = new NyanCat(0, height / 2, nyanCatImage, rainbowImage);
}

function draw() {
    background(255);
    // Update and display Nyan Cat
    nyanCat.update();
    nyanCat.display();
}

class NyanCat {
    constructor(startX, startY, img, rainbowImg) {
        this.x = startX;
        this.y = startY;
        this.width = 100; 
        this.height = 60; 
        this.speed = 5;
        this.image = img; 
        this.frameCount = 0; 
        this.rainbowTrail = []; 
        this.rainbowImg = rainbowImg;
    }

    update() {
        // Move Nyan Cat horizontally
        this.x += this.speed;

        // Wrap around screen if Nyan Cat goes off the canvas
        if (this.x > width + this.width) {
            this.x = -this.width;
        }

        // Update frame count for animation
        this.frameCount++;

        if (this.frameCount % 10 === 0) {
            // Add a new rainbow to the trail with reduced spacing
            this.rainbowTrail.push(new Rainbow(this.x + this.width / 200, this.y + this.height / 2, this.rainbowImg));
        }

        // Update each rainbow in the trail
        for (let i = this.rainbowTrail.length - 1; i >= 0; i--) {
            this.rainbowTrail[i].update();
            // Remove rainbows when they go off the screen
            if (this.rainbowTrail[i].x < -this.rainbowTrail[i].width) {
                this.rainbowTrail.splice(i, 1);
            }
        }
    }

    display() {
        // Draw rainbow trail
        for (let i = 0; i < this.rainbowTrail.length; i++) {
            this.rainbowTrail[i].display();
        }

        // Draw Nyan Cat image at its position
        image(this.image, this.x, this.y, this.width, this.height);
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
        // Draw rainbow image at its position
        image(this.image, this.x, this.y, this.width, this.height);
    }
}
