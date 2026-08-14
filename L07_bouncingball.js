// let picoImg;
// let soundSFX;
// let picoWidth

// function preload() {
//     picoImg = loadImage('assets/pico-a.png');
//     soundSFX = loadSound('assets/pop.mp3');
// }

// let xpos;
// let ypos;

let ball

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
