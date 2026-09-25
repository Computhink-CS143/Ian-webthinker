let guessButton;
let guessInput;

function setup(){
    createCanvas(800, 700);
    background("lightblue");
}

function draw(){
    background("lightblue");
    guessButton = createButton("guess!🤷‍♀️");
    guessButton.position(width/2 + 200, height/2)
    guessButton.mousePressed(updateText)

    guessInput = createInput()
    nounInput.position(width/2+20, 30)
}