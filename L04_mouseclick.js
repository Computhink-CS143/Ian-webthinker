// write your codes here
function setup() {
    createCanvas(600, 600);
    background("#17cede");
    noLoop();
}

function draw() {
    print(width);
    print(height);
    let xpos = 10;
    let ypos = 10;
    let ggcolour = 30
    for(let i = 0; i < 5; i++) {
        fill(0, ggcolour, 0)
        circle(xpos, ypos, 5)
    }
}