let guessButton;
let guessInput;
let wordlist;
let hiddenword
let message = "";
let attempts = 0;
let hints ;
let correctletters = "";

function setup() {
    createCanvas(800, 700);
    wordlist = [ "Absolute", "Building", "Calendar", "Database", "Elephant", "Flexible", "Grateful", "Horizon", "Identity", "Journalist", "Kingdom", "Language", "Mountain", "Navigator", "Obstacle", "Paragraph", "Qualified", "Radiation", "Signature", "Triangle", "Universal", "Vacation", "Wonderful", "Yesterday", "Zodiac", "Adventure", "Beautiful", "Celebration", "Discovery", "Education", "Furniture", "Geography", "Happiness", "Important", "Knowledge", "Landscape", "Magnitude", "Neighborhood", "Operation", "Passenger", "Questions", "Rectangle", "Satellite", "Telephone", "Universe", "Vegetable", "Yesterday", "Zookeeper", "Atmosphere", "Background", "Collection", "Department", "Experience", "Government", "Historical", "Investment", "Leadership", "Management", "Philosophy", "Psychology", "Revolution", "Technology", "University", "Vocabulary", "Achievement", "Environment", "Information", "Measurement", "Nationality", "Observation", "Personality", "Significant"]
    background("gray")

    hiddenword = random(wordlist);
    hiddenword = hiddenword.toUpperCase();
    print("the hidden word is:" + hiddenword);

    hints=generateHint(hiddenword);

    guessButton = createButton("sumbit");
    guessButton.position(width/2+100, height/2);
    guessButton.mousePressed(guessCheck);
    guessButton.size(150, 30);
    guessButton.style("font-size", "20px");

    guessInput = createInput();
    guessInput.position(width/2-100, height/2);
    guessInput.size(150, 30);
    guessInput.style("font-size", "20px");

}

function draw() {
    background("lightblue");
    textAlign(CENTER, CENTER);
    textSize(22);
    fill("black");
    text("WORD SCRAMBLE GAME!!!", width/2, 200);

    text("attempts:" + attempts, width/2, 250);
    text("hint:"+ hints, width/2, 300);

    textSize(18);
   text(message,        width/2, height/2+150) ;
   text(correctletters, width/2, height/2+150)
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
        correctletters = "";
        message = "you won!!!👍 PLAY AGAIN!";
        attempts++;
    }
    else{
        attempts++;
        correctletters = getCorrectLetters(guess, hiddenword);
    }
}

function getCorrectLetters(inputvalue, randomword) {
    let matchedletters = "";
    for (let aletter of inputvalue) {
        if (hiddenword.includes(aletter)) {
            if(!matchedletters.includes(aletter)) {
                matchedletters = matchedletters + "  " + aletter;
            }
        }
    }
    return "WRONG!❌ these are the letters you got correct...     " + matchedletters
}