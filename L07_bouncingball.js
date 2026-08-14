// let picoImg;
// let soundSFX;
// let picoWidth

// function preload() {
//     picoImg = loadImage('assets/pico-a.png');
//     soundSFX = loadSound('assets/pop.mp3');
// }

// let xpos;
// let ypos;

// function setup() {
//     createCanvas(400, 400);
//     background("#000000");
//     noStroke()
//     xpos = width/2;
//     ypos = height/2;
//     picoWidth = 110
// }

// function draw() {
//     background("#000000");
//     image(picoImg, xpos, ypos, picoWidth, 133)
//     if(keyIsDown(LEFT_ARROW)){
//             xpos -= 4
//     }
//     if(keyIsDown(RIGHT_ARROW)){
//             xpos += 4
//             picoWidth = 110
//     }
//     if(keyIsDown(DOWN_ARROW)){
//             ypos += 4
//             picoWidth = 110
//     }
//     if(keyIsDown(UP_ARROW)){
//             ypos -= 4
//     }
//     xpos = constrain(xpos, 0, width-90);
//     ypos = constrain(ypos, 67, height-67);
// }

// function keyPressed() {
//     if(keyCode === 32) {
//         soundSFX.play();
//         picoWidth = 55
//     }
// }

let ballX = 300;
let ballY = 200;
let ballSize = 30;
let ballSpeedX = 5;
let ballSpeedY = 5;

function setup() {
    createCanvas(700, 600);
    background("#706464")
    noStroke()
}

function draw() {
    circle(ballX, ballY, ballSize);
    ballX += ballSpeedX
    ballY += ballSpeedY

    if (ballX < (0 + 15)) {
        ballSpeedX = -1 * ballSpeedX;
        fill(random(255), random(255), random(255), random(55, 150))
    }
    if (ballX > (width - 15)) {
        ballSpeedX = -1 * ballSpeedX;
        fill(random(255), random(255), random(255), random(55, 150))
    }
    if (ballY < (0 + 15)) {
        ballSpeedY = -1 * ballSpeedY;
        fill(random(255), random(255), random(255), random(55, 150))
    }
    if (ballY > (height - 15)) {
        ballSpeedY = -1 * ballSpeedY;
        fill(random(255), random(255), random(255), random(55, 150))
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        ballSpeedX *= 1.5
        ballSpeedY *= 1.5
    }
}