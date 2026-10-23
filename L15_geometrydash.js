let playerX;
let player

function setup() {
    createCanvas(800, 600);
    background("black");
    rectMode(CENTER);
}

function draw() {
    background("black");
    fill("green");
    rect(100, height-50, 50, 50);

    fill("white");
    textSize(20)
    textAlign(CENTER, CENTER);
    text("Press 'SPACE' to jump!", width/2, 50)
}