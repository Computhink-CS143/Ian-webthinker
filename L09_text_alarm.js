let scrollingY = 0;
let lineGap = 100

function setup() {
    createCanvas(600, 400);
    background("#ffffff");
}

function draw() {
    background("#ffffff")
    fill("#faff00")
    textSize(24);
    textAlign(CENTER, CENTER);
    let storytext = ["I am Ian", "I like pizza", "pizza...", "PIZZA...", "PIZZA = CHEESE", "I NEED CHEESE", "I want some pizza", "I will go get pizza now", "I also want some fries", "IAN ALSO WANT ICE CREAM", "THE END"]
    for (let count = 0; count < storytext.length; count++) {
        let sentence = storytext[count]
        text(sentence, width/2, scrollingY+ count * lineGap);
    }
    scrollingY -= 1;
    console.log(scrollingY);
    if(scrollingY < -storytext.length * (lineGap/5)) {
        scrollingY = height
    }
}