
let userText = "ENTER YOUR TEXT HERE";
let input;
function setup() {
    createCanvas(600, 600);
    background("skyblue");

    input = createInput("");
    input.position(160, 520);
    input.input(updateText);
}

function draw() {
    background
    fill(0);
    textSize();
    textAlign(CENTER, CENTER);
    text(userText, width/2, height/2);
}
function updateText() {
    userText = this.value();
}