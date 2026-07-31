function setup() {
    createCanvas(800, 800);
    background("#8908ec9a")
    noStroke();
    // noLoop();
    let size
    let circle
}

function draw() {
    
}

function mousePressed() {
    circlecolour = random(1, 256)
    fill(circlecolour, circlecolour, circlecolour);
    size = 5;
}

function mouseDragged() {
    circle(mouseX, mouseY,)
}