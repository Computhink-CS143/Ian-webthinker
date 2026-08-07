function preload() {

}

let xpos;
let ypos;
function setup() {
    createCanvas(400, 400);
    background("#eb08e7");
    rectMode(CENTER);

    xpos = width/2
    ypos = height/2
}

function draw() {
    background("#eb08e7");
    rect(xpos, ypos, 50, 50);
    if(keyIsDown(RIGHT_ARROW)) {
        xpos += 3;
    }
    else if(keyIsDown(LEFT_ARROW)) {
        xpos -= 3;
    }
    else if(keyIsDown(UP_ARROW)) {
        ypos -= 3;
    }
    else if(keyIsDown(DOWN_ARROW)) {
        ypos += 3;
    }

    xpos = constrain(xpos, 0, 400);
    ypos = constrain(ypos, 0, 400);
}