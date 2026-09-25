let guessButton

function setup(){
    createCanvas(800, 700);
    background("lightblue");
}

function draw(){
    background("lightblue");
    guessButton = createButton("guess!🤷‍♀️");
    guessButton.position(width/2 + 200, height/2)
    storyButton.mousePressed(updateText)
}