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
    createCanvas(500, 500);
    background("#000000");
    noStroke()
    xpos = width/2;
    ypos = height/2;

    image(picoImg, 0, 0, 110, 133);
    imageMode(CENTER);
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
            bN.stop();
    }
    if(keyIsDown(UP_ARROW)){
            ypos -= 4
            bN.loop();
    }
    xpos = constrain(xpos, 55, width-55);
    ypos = constrain(ypos, 67, height-67);
}

function keyPressed() {
    if(keyCode === 32) {
        soundSFX.play();
    }
}
