let guessButton

function setup(){
    createCanvas(800, 700);
    background("lightblue");
}

function draw(){
    background("lightblue");
    toryButton = createButton("Generate Story!📖");
    storyButton.position(width/2+45, 220)
    storyButton.mousePressed(updateText)
}