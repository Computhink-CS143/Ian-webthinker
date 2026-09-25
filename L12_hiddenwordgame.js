let guessButton;
let guessInput;

function setup(){
    createCanvas(800, 700);
    background("lightblue");

    guessButton = createButton("guess!🤷‍♀️");
    guessButton.position(width/2+100, height/2)
    guessButton.mousePressed(updateText)

    guessInput = createInput()
    guessInput.position(width/2-100, height/2)
}

function draw(){
    background("lightblue");
    textAlign(CENTER, CENTER);
    textSize(22);
    fill("black")
    text("GUESS THE WORD!!!", width/2, 200);
}

function updateText() {
    print(guessInput.value());
}
