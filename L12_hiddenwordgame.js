let guessButton;
let guessInput;
let wordlist;
let hiddenword

let attempts = 0
let hints = "S_ _ _ _"

function setup(){
    createCanvas(800, 700)
    wordlist = ["Angel","Angry","Badge","Baking","Basic","Brave","Bridge","Brief","Broom","Cable","Camel","Candy","Cargo","Chest","Chief","Crown","Cycle","Daily","Dairy","Delay","Desk","Diary","Doubt","Eagle","Elbow","Extra","Faith","False","Fancy","Fault","Final","Flute","Funny","Giant","Glove","Grape","Honey","Index","Input","Joint","Judge","Logic","Lucky","Magic","Major","March","Model","Motor","Mouth","Movie",];
    background("lightblue");

    guessButton = createButton("guess!🤷‍♀️");
    guessButton.position(width/2+100, height/2)
    guessButton.mousePressed(guessCheck)

    guessInput = createInput()
    guessInput.position(width/2-100, height/2)

    inputBox.size(150, 30);
    inputBox.st
}

function draw(){
    background("lightblue");
    textAlign(CENTER, CENTER);
    textSize(22);
    fill("black")
    text("GUESS THE WORD!!!", width/2, 200);

    text("attempts:" + attempts, width/2, 250);
    text("hint:"+ hints, width/2, 300);
}

function guessCheck() {
    print(guessInput.value());
    attempts++
}
