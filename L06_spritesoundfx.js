function preload() {

}

let xpos = 300;
let ypos = 300;
function setup() {
    createCanvas(400, 400);
    background("#eb08e7");
    rectMode(CENTER);
}

function draw() {
    background("#eb08e7");
    rect(width/2, height/2, 50, 50);
    if(keyIsDown(RIGHT_ARROW)) {
        xpos += 3;
    }
    if(keyIsDown(LEFT_ARROW)) {
        xpos -= 3;
    }
    if(keyIsDown(UP_ARROW)) {
        ypos -= 3;
    }
    if(keyIsDown(DOWN_ARROW)) {
        ypos += 3;
    }

    xpos = constrain(xpos, 100, 300);
    ypos = constrain(ypos, 100, 300);
}