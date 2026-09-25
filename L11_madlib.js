let storyButton;
let nounInput
let verbInput;
let adjectiveInput;
let adverbInput;
let placeInput;
let someText;
let storyTemplates;
let storyText= "";
let myStory

function setup() {
    createCanvas(600, 700);
    background("skyblue");
    storyButton = createButton("Generate Story!📖");
    storyButton.position(width/2+45, 220)
    storyButton.mousePressed(updateText)

    nounInput = createInput()
    nounInput.position(width/2+20, 30)
    verbInput = createInput()
    verbInput.position(width/2+20, 70)
    adjectiveInput = createInput()
    adjectiveInput.position(width/2+20, 110)
    adverbInput = createInput()
    adverbInput.position(width/2+20, 150)
    placeInput = createInput()
    placeInput.position(width/2+20, 190)

    storyTemplates = [
        "The {adj} {noun} decided to {verb} {adv} on the {place}.", 
        "One day, a {adj} {noun} wanted to {verb} {adv} in {place}.", 
        "Did you hear about the {adj} {noun} that tried to {verb} {adv} near {place}?",
        "The {adj} {noun} decided to {verb} {adv} on the {place}.",
        "One day, a {adj} {noun} wanted to {verb} {adv} in {place}.",
        "Did you hear about the {adj} {noun} that tried to {verb} {adv} near {place}?"
    ];
}

function draw() {
    textAlign(RIGHT, CENTER);
    textSize(18)
    text("Enter a noun (e.g. dog):", width/2, 40)
    text("Enter a verb (e.g. runs):", width/2, 80)
    text("Enter a adjective (e.g. happy):", width/2, 120)
    text("Enter a adverb (e.g. angrily):", width/2, 160)
    text("Enter a place (e.g. Sentosa):", width/2, 200)
}

function updateText() {
    template = random(storyTemplates);
    template = template.replace("{noun}", nounInput.value())
    template = template.replace("{verb}", verbInput.value())
    template = template.replace("{adj}", adjectiveInput.value())
    template = template.replace("{adv}", adverbInput.value())
    template = template.replace("{place}", placeInput.value())

    myStory = template
    //someText = nounInput.value()
    print(nounInput.value());
    print(verbInput.value());
    print(adjectiveInput.value());
    print(adverbInput.value());
    print(placeInput.value());

    print("story is generated!😁")
    print(myStory)
}








































































































// let userText = "ENTER YOUR NAME";
// let input;
// let colourPicker;

// function setup() {
//     createCanvas(800, 800);
//     background("skyblue");

//     input = createInput("");
//     input.position(270, 520);
//     input.input(updateText);

//     colourPicker = createColorPicker("rgb(0, 0, 0)")
//     colourPicker.position(270, 590)
// }

// function draw() {
//     background("skyblue")
//     textSize(14);
//     textAlign(LEFT);
//     fill(0)
//     text("change text colour here:", 50, 610)

//     fill(0);
//      fill(colourPicker.value());
//     textSize(24);
//     textAlign(CENTER, CENTER);
//     text(userText, 330, 150);

//     textSize(14);
//     fill("black")
//     textAlign(LEFT);
//     text("Enter text here:", 50, 530)

// }
// function updateText() {
//     userText = this.value();
// }

