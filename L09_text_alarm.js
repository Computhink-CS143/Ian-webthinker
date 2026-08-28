function setup(){
    createCanvas(400, 400);
    background("#222");
    textSize(25)
    textAlign(CENTER, CENTER);
}

function draw() {
    background("#222");
    fill("white")
    let xhour = nf( hour(), 6);
    let xminute = nf( minute(), 4);
    let xseconds = nf( second(), 4);
    let timeString = xhour + ":" + xminute + ":" + xseconds;

    text(timeString, width/2, height/2)
}




























































































































































// recap
// let xpos;
// let speed;

// function setup() {
//     createCanvas(600, 400);
//     background("#5d5757");
//     textSize(24);
//     textAlign(CENTER, CENTER);
//     xpos = width/2
//     speed = 2
// }

// function draw() {
//     background("#5d5757")
//     text("BOUNCE!", xpos, height/2);
//     xpos = xpos + speed;

//     if (xpos > width) {
//         speed = speed * -1
//     }
//     if (xpos < 0){
//         speed = speed * -1
//     }
// }