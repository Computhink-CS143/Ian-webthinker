let picoImg;
let soundSFX;

function preload() {
    picoImg = loadImage('assets/pico-a.png');
    soundSFX = loadSound('assets/pop.mp3');
}

let xpos;
let ypos;

function setup() {
    createCanvas(500, 500);
    background("#000000");
    noStroke()
    xpos = width/2;
    ypos = height/2;
}

function draw() {
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
    }
    xpos = constrain(xpos, 0, width, 300);
    ypos = constrain(ypos, 67, height-67);
}

function keyPressed() {
    if(keyCode === 32) {
        soundSFX.play();
        
    }
}
