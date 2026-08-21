let scrollingY

function setup() {
    createCanvas(500, 700)
    background("#000000")
    noStroke()
    textSize(15)
    fill("#faff00")
    // task 2
    // text("my name is Ian", 50, 50);
    // text("I am 11 this year", 50, 100);
    // text("my favourite activity is playing badminton", 50, 150);
    // textAlign(LEFT, TOP)
    // let ypos = 100
    // let yummyFood = ["ice cream", "fried chicken", "burger", "pasta", "pizza"]
    // text("I want:", 50, 50)
    // for(let count = 0; count < yummyFood.length; count++) {
    //     // print(yummyFood[count])
    //     text((count + 1) + ". " +yummyFood[count] + " x" + width, 50, ypos);
    //     ypos += 50
    // }
    scrollingY = height;
    textSize(24);
    textSize(CENTER, CENTER);
}

function draw() {
    background("#000")
    text("MOOOOOving text", width / 2, scrollingY)
    scrollingY -= 0.6;
}