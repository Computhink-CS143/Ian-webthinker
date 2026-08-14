let picoImg;
let soundSFX;
let picoWidth

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
    picoWidth = 110
}

function draw() {
    background("#000000");
    image(picoImg, xpos, ypos, picoWidth, 133)
    if(keyIsDown(LEFT_ARROW)){
            xpos -= 4
            picoWidth = 110
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
}

function keyPressed() {
    if(keyCode === 32) {
        soundSFX.play();
        picoWidth =55
    }
}
