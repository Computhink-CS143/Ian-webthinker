
let userText = "ENTER YOUR NAME";
let input;
let ageText = "ENTER YOUR AGE";
let ageInput;
let colourPicker;

function setup() {
    createCanvas(800, 800);
    background("skyblue");

    input = createInput("");
    input.position(270, 520);
    input.input(updateText);
    ageInput= createInput("");
    ageInput.position(270, 550);
    ageInput.input(updateText);

    colourPicker = createColorPicker("rgb(118, 115, 115)")
    colourPicker.position(270, 590)
}

function draw() {
     background(colourPicker.value())
     fill(255);
    rect(100, 100, 400, 200)
    textSize(14);
    textAlign(LEFT);
    text("change background colour here:", 50, 610)

    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(userText, width/2, height/2 - 50);

    textSize(24);
    textAlign(CENTER, CENTER);
    text(ageText, width/2, height/2);

    textSize(14);
    textAlign(LEFT);
    text("Enter name here:", 50, 530)
    text("Enter age here:", 50, 560)

}
function updateText() {
    userText = this.value();
}
function updateageText() {
    ageText = this.value();
}


