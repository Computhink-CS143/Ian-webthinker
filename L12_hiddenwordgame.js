let guessButton

function setup(){
    createCanvas(800, 700);
    background("lightblue");
}

function draw(){
    background("lightblue");
    toryButton = createButton("guess!🤷‍♀️");
    storyButton.position(width/2, 220)
    storyButton.mousePressed(updateText)
}