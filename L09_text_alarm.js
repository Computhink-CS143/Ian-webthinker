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
    bgcolour = color(220);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(bgcolour);
    fill("black")
    textSize(60)
    text(countdown, 180, 300);
    let xhour = nf( hour(), 2);
    let xminute = nf( minute(), 2);
    let xseconds = nf( second(), 2);
    let timeString = xhour + ":" + xminute + ":" + xseconds;
    text(timeString, 190, 200)
    textSize(10)
    text("click me to start a timer", 180, 350)
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
        alarmtimer = setInterval(alarm, 500);
    }
}
function alarm() {
    bgcolour = color(random(255),random(255),random(255))
    alarmsound.loop()
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