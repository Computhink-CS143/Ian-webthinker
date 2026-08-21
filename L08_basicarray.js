function setup() {
    createCanvas(400, 700)
    background("#000000")
    noStroke()
    textSize(15)
    fill("#faff00")
    // text("my name is Ian", 50, 50);
    // text("I am 11 this year", 50, 100);
    // text("my favourite activity is playing badminton", 50, 150);
    let ypos = 50
    let yummyFood = ["ice cream", "fried chicken", "burger", "pasta", "pizza"]
    text("my favourite foods are:", 50, )
    for(let count = 0; count < yummyFood.length; count++) {
        // print(yummyFood[count])
        text((count + 1) + ". " +yummyFood[count] + width, 50, ypos);
        ypos += 50
    }
}

function draw() {

}