
// let userText = "ENTER YOUR TEXT HERE";
// let input;
// let ageText = "ENTER YOUR AGE";
// let ageInput;
// function setup() {
//     createCanvas(800, 800);
//     background("skyblue");

//     input = createInput("");
//     input.position(160, 520);
//     input.input(updateText);
//     ageInput= createInput("");
//     ageInput.position(160, 550);
//     ageInput.input(updateText);
// }

// function draw() {
//     background("skyblue")
//     fill(0);
//     textSize(24);
//     textAlign(CENTER, CENTER);
//     text(userText, width/2, height/2 - 50);

//     textSize(24);
//     textAlign(CENTER, CENTER);
//     text(ageText, width/2, height/2);

//     textSize(14);
//     textAlign(LEFT);
//     text("Enter name here:", 50, 530)
//     text("Enter age here:", 50, 560)

// }
// function updateText() {
//     userText = this.value();
// }
// function updateageText() {
//     ageText = this.value();
// }

let colourPicker;
function setup() {
    createCanvas(600, 600)
    colourPicker = createColorPicker("#222")
    colourPicker.position(250, 500)
}
function draw() {
    background(colourPicker.value())
    rect(100, 100, 400, 200)
    textSize(14);
    textAlign(LEFT);
    text("change :", 50, 530)

}
