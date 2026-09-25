let guessButton;
let guessInput;
let wordlist;

let attempts = 0
let hints

function setup(){
    wordlist["Angel","Angry","Badge","Baking","Basic","Brave","Bridge","Brief","Broom","Cable","Camel","Candy","Cargo","Chest","Chief","Crown","Cycle","Daily","Dairy","Delay","Desk","Diary","Doubt","Eagle","Elbow","Extra","Faith","False","Fancy","Fault","Final","Flute","Funny","Giant","Glove","Grape","Honey","Index","Input","Joint","Judge","Logic","Lucky","Magic","Major","March","Model","Motor","Mouth","Movie"]
    background("lightblue");

    guessButton = createButton("guess!🤷‍♀️");
    guessButton.position(width/2+100, height/2)
    guessButton.mousePressed(guessCheck)

    guessInput = createInput()
    guessInput.position(width/2-100, height/2)
}

function draw(){
    background("lightblue");
    textAlign(CENTER, CENTER);
    textSize(22);
    fill("black")
    text("GUESS THE WORD!!!", width/2, 200);

    text("attempts:" + attempts, width/2, 300);
    text("hint:"+ hints, width/2, 400);
}

function guessCheck() {
    print(guessInput.value());
    attempt++
}
