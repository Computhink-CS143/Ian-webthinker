 shapeColour = "white"

// write your codes here
function setup() {
    createCanvas(600, 600);
    background("#D462FF");
    noStroke()
    fill()
    //noLoop();
}

// function draw() {
    // print(width);
    // print(height);
    // noStroke()
    // let xpos = 25;
    // let ypos = 25;
    // let ggcolour = 0;
    // for(let i = 0; i < 20; i++) {
    //     fill(0, ggcolour, 0)
    //     circle(xpos, ypos, 25)
    //     xpos +=25;
    //     ypos +=25;
    //     ggcolour +=15;
    // }
   
//     fill(shapeColour);
//     circle (300, 300, 250);
// }
// function mousePressed() {
//     shapeColour = color(random(255), random(255), random(255));
// }
// function mouseReleased() {
//     shapeColour = color(random(255), random(255), random(255));
// }
function mouseMoved() {
    ellipse(mouseX, mouseY, 10, 10);
}