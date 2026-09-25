let guessButton

function setup(){
    createCanvas(800, 700);
    background("lightblue");
}

function draw(){
    background("lightblue");
    toryButton = createButton("guess!🤷‍♀️");
    storyButton.position(width/2, height/2)
    storyButton.mousePressed(updateText)
}