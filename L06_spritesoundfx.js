let picoImg;
let soundSFX;
let bN;

function preload() {
    picoImg = loadImage('assets/pico-a.png');
    soundSFX = loadSound('assets/pop.mp3');
    bN = loadSound('assets/bossaNova.mp3');
}

let xpos;
let ypos;
function setup() {
    createCanvas(400, 400);
    background("#eb08e7");
    // rectMode(CENTER);
    // noStroke();

    xpos = width/2;
    ypos = height/2;

    image(picoImg, 0, 0, 110, 133);
    imageMode(CENTER);
}

function draw() {
    background("#eb08e7")
    image(picoImg, xpos, ypos, 110, 133)
    if(keyIsDown(LEFT_ARROW)){
            xpos -= 4
    }
    if(keyIsDown(RIGHT_ARROW)){
            xpos += 4
    }
    if(keyIsDown(DOWN_ARROW)){
            ypos += 4
            
    }
    if(keyIsDown(UP_ARROW)){
            ypos -= 4
            bN.loop
    }
    xpos = constrain(xpos, 55, width-55);
    ypos = constrain(ypos, 67, height-67);
}

function keyPressed() {
    if(keyCode === 32) {
        soundSFX.play();
    }
}
// function draw() {
//     background("#eb08e7");
    // fill("white");
    // rect(width/2, height/2, 300, 300);
    // fill("black")
    // rect(xpos, ypos, 50, 50);
    // if(keyIsDown(RIGHT_ARROW)) {
    //     xpos += 7;
    // }
    // else if(keyIsDown(LEFT_ARROW)) {
    //     xpos -= 7;
    // }
    // else if(keyIsDown(UP_ARROW)) {
    //     ypos -= 7;
    // }
    // else if(keyIsDown(DOWN_ARROW)) {
    //     ypos += 7;
    // }

    // xpos = constrain(xpos, 75, 325);
    // ypos = constrain(ypos, 75, 325);
// }