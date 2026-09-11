
let userText = "ENTER YOUR TEXT HERE";
let input;
let ageText = "ENTER YOUR AGE";
let ageInput;
function setup() {
    createCanvas(800, 800);
    background("skyblue");

    input = createInput("");
    input.position(160, 520);
    input.input(updateText);
    input = createInput("");
    input.position(160, 550);
    input.input(updateText);
}

function draw() {
    background("skyblue")
    fill(0);
    textSize();
    textAlign(CENTER, CENTER);
    text(userText, width/2, height/2);

    textSize(14);
    textAlign(LEFT);
    text("Enter name here:", 50, 530)

}
function updateText() {
    userText = this.value();
}