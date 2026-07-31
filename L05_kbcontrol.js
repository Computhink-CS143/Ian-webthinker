let size
function setup() {
    createCanvas(800, 800);
    background("#08bbecfe")
    noStroke();
    // noLoop();
}

function draw() {
    React(width/2, height)
}

function mousePressed() {
    fill(random(1, 256), random(1, 256), random(1, 256));
    size = 5;
}

function mouseDragged() {
    circle(mouseX, mouseY, size);
    size = size + 0.5;
}