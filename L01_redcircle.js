function setup(){
    createCanvas(500, 900);
    background("black");
}

function draw(){
    fill(255, 0, 0);
    noStroke();
    ellipse(100,200,200,200);
    fill("yellow");
    noStroke();
    ellipse(100,400,200,200);
    fill("green");
    noStroke();
    ellipse(100,600,200,200);
}