let guessButton;
let nounInput;

function setup(){
    createCanvas(800, 700);
    background("lightblue");
}

function draw(){
    background("lightblue");
    guessButton = createButton("guess!🤷‍♀️");
    guessButton.position(width/2 + 200, height/2)
    guessButton.mousePressed(updateText)

    nounInput = createInput()
    nounInput.position(width/2+20, 30)
}