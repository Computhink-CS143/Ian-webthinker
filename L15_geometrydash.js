let playerX = 100;
let playerY;
let playersize = 50;
let velocity = 0;
let isgrounded = false;

function setup() {
    createCanvas(800, 600);
    background("black");
    // rectMode(CENTER);
    playerY = height-75;
}

function draw() {
    background("black");
    fill("green");
    rect(100, playerY, 50, 50);

    velocity+=0.8;
    playerY+=velocity;

    if(playerY >= height - playersize) {
        playerY = height - playersize;
        isgrounded = true;
        velocity = 0;
    } else {
        isgrounded = false
    }
    fill("white");
    textSize(20)
    textAlign(CENTER, CENTER);
    text("Press 'SPACE' to jump!", width/2, 50)
}

function keyPressed() {
    if(keycode === 32 && isgrounded) {
        velocity = -12
    }
}