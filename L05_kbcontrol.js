let size = 50;
function setup() {
    createCanvas(800, 800);
    background("#08bbecfe")
    // noStroke();
    // noLoop();
}

function draw() {
    background("#08bbecfe")
    rect(width/2, height/2, size, size);
}

function keyPressed() {
    size = 200;
}

function keyReleased() {
    size = 50;
}
// function mousePressed() {
//     fill(random(1, 256), random(1, 256), random(1, 256));
//     size = 5;
// }

// function mouseDragged() {
//     circle(mouseX, mouseY, size);
//     size = size + 0.5;
// }