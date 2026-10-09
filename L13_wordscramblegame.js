let guessButton;
let guessInput;
let scramblebutton;
let wordlist;
let hiddenword
let message = "";
let score = 0;
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

    scramblebutton = createButton("rescramble");
    scramblebutton.position(width/2-280, height/2);
    scramblebutton.mousePressed(guessCheck);
    scramblebutton.size(150, 30);
    scramblebutton.style("font-size", "20px");

}

function draw() {
    background("lightblue");
    textAlign(CENTER, CENTER);
    textSize(22);
    fill("black");
    text("WORD SCRAMBLE GAME!!!", width/2, 200);

    text("score:" + score, width/2, 500);
    text("word:NOTEBOOK", width/2, 300);

    textSize(18);
   text(message,        width/2, height/2+250) ;
   text(correctletters, width/2, height/2+150)

   textSize(22);
    text("streak: 0(max: 0)", width/2, 550)
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
        score++;
    }
    else{
        message
    }
}

