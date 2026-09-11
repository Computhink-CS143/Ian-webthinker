
let userText = "ENTER YOUR NAME";
let input;
let ageText = "ENTER YOUR AGE";
let ageInput;
let colourPicker;
let rectColourPicker;

function setup() {
    createCanvas(800, 800);
    background("skyblue");

    input = createInput("");
    input.position(270, 520);
    input.input(updateText);
    ageInput= createInput("");
    ageInput.position(270, 550);
    ageInput.input(updateageText);

    colourPicker = createColorPicker("rgb(118, 115, 115)")
    colourPicker.position(270, 590)

    rectColourPicker = createColorPicker("rgb(255, 255, 255)")
    rectColourPicker.position(270, 620)
}

function draw() {
     background(colourPicker.value())
     fill(rectColourPicker.value());
    rect(130, 100, 400, 200)
    textSize(14);
    textAlign(LEFT);
    fill(0)
    text("change background colour here:", 50, 610)

    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(userText, 330, 150);

    textSize(24);
    textAlign(CENTER, CENTER);
    text(ageText, 330, 220);

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


