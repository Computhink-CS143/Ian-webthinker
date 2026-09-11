let countdown = 5;
let timer;
let alarmsound;
let alarmtimer;
let bgcolour;

function preload() {
    alarmsound = loadSound("assets/bossaNova.mp3");
}
function setup(){
    createCanvas(400, 600);
    textAlign(200, 200);
}

function draw() {
    background("#222");
    fill("white")
    textSize(60)
    text(countdown, 180, 200);
    // let xhour = nf( hour(), 2);
    // let xminute = nf( minute(), 2);
    // let xseconds = nf( second(), 2);
    // let timeString = xhour + ":" + xminute + ":" + xseconds;
    textSize(10)
    text("click me to start a timer", 100, 300)
    // text(timeString, width/2, height/2)
}

function mousePressed() {
    countdown = 5;
    clearInterval(timer);
    timer = setInterval(countDown, 1000);
}

function countDown() {
    if(countdown >0){
        countdown--;
    }else{
        clearInterval(timer)
        alarmtimer = setInterval(alarmsound, 500);
    }
}
function alarm() {
    bgcolour = color(random(255),)
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