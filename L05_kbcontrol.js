function setup() {
    createCanvas(800, 800);
    background("#08bbecfe")
    noStroke();
    // noLoop();
}

function draw() {
    
}

function mousePressed() {
    circlecolour = random(1, 256)
    fill(circlecolour, circlecolour, circlecolour);
    size = 5;
}

function mouseDragged() {
    circle(mouseX, mouseY, size);
    size = size + 0.5;
}