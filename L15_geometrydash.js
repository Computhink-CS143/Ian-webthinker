let playerX = 100;
let playerY;
let playersize = 50;
let velocity = 0;
let isgrounded = false;

let spikeX = []
let spikewidth = 20;
let spikeHeight = 30;
let spikespeed = 40;

function setup() {
    createCanvas(800, 600);
    background("black");
    // rectMode(CENTER);
    playerY = height-75;

    for (let count = 0; count <3; count++) {
        spikeX.push(width + count * 300)
    }
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

    fill("red");
    for (let count = 0; count<3; count++){
        spikeX[count] -= spikespeed;
        
        triangle(
            spikeX[count], height,
            spikeX[count] + spikewidth/2, height - spikeHeight,
            spikeX[count] + spikewidth, height
        )
    }
}

function keyPressed() {
    if(keyCode === 32 && isgrounded) {
        velocity = -15
    }
}