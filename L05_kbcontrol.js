let size
function setup() {
    createCanvas(800, 800);
    background("#08bbecfe")
    noStroke();
    // noLoop();
}

function draw() {
    
}

function mousePressed() {
    fill(random(1, 256), random(1, 256), random(1, 256));
    size = 5;
}

function mouseDragged() {
    circle(mouseX, mouseY, size);
    size = size + 0.5;
}