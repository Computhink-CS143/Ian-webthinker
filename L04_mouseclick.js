// write your codes here
function setup() {
    createCanvas(600, 600);
    background("#D462FF");
    noLoop();
}

function draw() {
    print(width);
    print(height);
    let xpos = 50;
    let ypos = 50;
    let ggcolour = 0;
    for(let i = 0; i < 10; i++) {
        fill(0, ggcolour, 0)
        circle(xpos, ypos, 50)
        xpos +=50;
        ypos +=50;
        ggcolour +=100;
    }
}