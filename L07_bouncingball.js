let picoImg;
let soundSFX;
let bN;

function preload() {
    picoImg = loadImage('assets/pico-a.png');
    soundSFX = loadSound('assets/pop.mp3');
    bN = loadSound('assets/bossaNova.mp3');
}

function setup() {
    createCanvas(500, 500);
    background("#000000");
    noStroke()
}

function draw() {
    background("#000000")
}