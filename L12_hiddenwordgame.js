let guessButton;
let guessInput;
let wordlist;
let hiddenword
let message = "";
let attempts = 0;
let hints = "S_ _ _ _";

function setup(){
    createCanvas(800, 700);
    wordlist = ["angel", "angry", "acorn", "badge", "baking", "basic", "brave", "bridge", "brief", "broom", "cable", "camel", "candy", "cargo", "chest", "chief", "crown", "cycle", "cream", "daily", "dairy", "delay", "desk", "diary", "doubt", "eagle", "elbow", "extra", "faith", "false", "fancy", "fault", "final", "flute", "funny", "giant", "glove", "grape", "honey", "index", "input", "joint", "judge", "logic", "lucky", "magic", "major", "march", "model", "motor", "mouth", "movie", "naive", "nerve", "noble", "noise", "north", "notch", "novel", "nurse"];
    background("lightblue");

    hiddenword = random(wordlist);
    hiddenword = hiddenword.toUpperCase();
    print("the hidden word is:" + hiddenword);

    hints=generateHint(hiddenword);

    guessButton = createButton("guess!🤷‍♀️");
    guessButton.position(width/2+100, height/2);
    guessButton.mousePressed(guessCheck);
    guessButton.size(150, 30);
    guessButton.style("font-size", "20px");

    guessInput = createInput();
    guessInput.position(width/2-100, height/2);
    guessInput.size(150, 30);
    guessInput.style("font-size", "20px");

    
}

function draw(){
    background("lightblue");
    textAlign(CENTER, CENTER);
    textSize(22);
    fill("black");
    text("GUESS THE WORD!!!", width/2, 200);

    text("attempts:" + attempts, width/2, 250);
    text("hint:"+ hints, width/2, 300);

    textSize(18);
   text(message, width/2, height/2+150) ;
}

function generateHint(aWord) {
    print("word length = " + aWord.length);
    let partial = " _".repeat(aWord.length-1);
    print("the partial is " + partial);
    return aWord[0] + partial;
}
function guessCheck() {
    // print("hello");
    let guess = guessInput.value();
    guess = guess.toUpperCase();
    if (guess === hiddenword){
        message = "you won!!!👍 PLAY AGAIN!";
        attempts++;
    }
    else{
        attempts++;
    }
}
