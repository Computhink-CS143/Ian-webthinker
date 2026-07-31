let size = 50;
let showCircle = false;
let shows = false;
function setup() {
    createCanvas(600, 600);
    background("#08bbecfe")
    // noStroke();
    // noLoop();
}

function draw() {
    background("#08bbecfe")
    if (showCircle){
        circle(width/2, height/2, size);
    }
}

function keyPressed() {
    if (key === 'c') {
        showCircle = !showCircle;
    }
    if (key === 's') {
        showCircle = !showCircle;
    }
}

// function keyReleased() {
//     size = 50;
// }
// function mousePressed() {
//     fill(random(1, 256), random(1, 256), random(1, 256));
//     size = 5;
// }

// function mouseDragged() {
//     circle(mouseX, mouseY, size);
//     size = size + 0.5;
// }