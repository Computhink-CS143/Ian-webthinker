function preload() {

}

let xpos;
let ypos;
function setup() {
    createCanvas(400, 400);
    background("#eb08e7");
    rectMode(CENTER);
}

function draw() {
    background("#eb08e7");
    rect(width/2, height/2, 50, 50);
    if(keyIsDown(RIGHT_ARROW)) {
        xpos += 3
    }
    if(keyIsDown(RIGHT_ARROW)) {
        xpos += 3
    }
    if(keyIsDown(RIGHT_ARROW)) {
        xpos += 3
    }
    if(keyIsDown(RIGHT_ARROW)) {
        xpos += 3
    }
}