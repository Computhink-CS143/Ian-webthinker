let guessButton;
let guessInput;
let wordlist;
let hiddenword
let message = "";
let attempts = 0;
let hints = "S_ _ _ _";
let correctletters = "";

function setup(){
    createCanvas(800, 700);
    wordlist = ["angel", "angry", "acorn", "badge", "baking", "basic", "brave", "bridge", "brief", "broom", "cable", "camel", "candy", "cargo", "chest", "chief", "crown", "cycle", "cream", "daily", "dairy", "delay", "desk", "diary", "doubt", "eagle", "elbow", "extra", "faith", "false", "fancy", "fault", "final", "flute", "funny", "giant", "glove", "grape", "honey", "index", "input", "joint", "judge", "logic", "lucky", "magic", "major", "march", "model", "motor", "mouth", "movie", "naive", "nerve", "noble", "noise", "north", "notch", "novel", "nurse", "ocean", "olive", "onset", "opera", "orbit", "order", "outer", "owner", "paint", "panel", "paper", "peace", "pearl", "phase", "phone", "photo", "piano", "pilot", "pitch", "place", "plane", "plant", "plate", "plaza", "point", "polar", "pound", "power", "pride", "prime", "print", "prism", "prize", "proof", "proud", "pulse", "quake", "queen", "query", "quest", "queue", "quick", "quiet", "quilt", "quirk", "quote", "radar", "radio", "raise", "rally", "range", "rapid", "ratio", "reach", "react", "ready", "realm", "rebel", "refer", "reign", "relax", "reply", "rider", "ridge", "rifle", "right", "rival", "river", "robot", "rocky", "roman", "rough", "round", "royal", "ruler", "rural", "salad", "scale", "scare", "scene", "scent", "scope", "score", "scout", "scrap", "seize", "sense", "serve", "seven", "shade", "shaft", "shake", "shaky", "shall", "shame", "shape", "share", "sharp", "sheep", "sheet", "shelf", "shell", "shift", "shine", "shirt", "shock", "shoot", "shore", "short", "shout", "shove", "shown", "shrub", "shrug", "sight", "sigma", "silky", "silly", "silver", "since", "sixth", "sixty", "skate", "skill", "skirt", "skull", "slate", "sleep", "slice", "slide", "slope", "small", "smart", "smell", "smile", "smoke", "snail", "snake", "sneak", "snowy", "solar", "solid", "solve", "sound", "south", "space", "spare", "spark", "speak", "speed", "spell", "spend", "spent", "spice", "spike", "spill", "spine", "split", "spoke", "spoon", "sport", "spray", "squad", "stack", "stage", "stain", "stair", "stake", "stamp", "stand", "stare", "start", "state", "steam", "steel", "steep", "steer", "stern", "stick", "stiff", "still", "sting", "stock", "stone", "store", "storm", "story", "stove", "strap", "stray", "strip", "stuck", "study", "stuff", "stump", "style", "sugar", "suite", "sunny", "super", "surge", "swamp", "swarm", "swear", "sweat", "sweep", "sweet", "swift", "swing", "sword", "syrup", "table", "taste", "teach", "teeth", "thank", "theme", "thick", "thing", "think", "third", "three", "throw", "tiger", "tight", "tired", "title", "toast", "token", "total", "touch", "tough", "tower", "track", "trade", "train", "treat", "trend", "trial", "trick", "truck", "truly", "trunk", "trust", "truth", "tutor", "twist", "ultra", "uncle", "under", "union", "unite", "units", "unity", "upper", "upset", "urban", "usage", "usual", "utter", "vague", "valid", "value", "valve", "vapor", "vault", "vegan", "venom", "venue", "verge", "verse", "video", "vigor", "vinyl", "viola", "viper", "viral", "virus", "visit", "vital", "vivid", "vocal", "voice", "voter", "vouch", "wages", "wagon", "waist", "wake", "walk", "wall", "waltz", "waste", "watch", "water", "wave", "wear", "weeds", "weeks", "weigh", "weird", "whale", "wheat", "wheel", "where", "while", "white", "whole", "whose", "width", "windy", "witch", "woman", "women", "woods", "words", "world", "worry", "worse", "worst", "worth", "would", "wound", "woven", "wrist", "write", "wrong", "wrote", "yacht", "yearn", "yeast", "yield", "young", "youth", "zebra", "zero", "zesty"];
    background("lightblue");

    hiddenword = random(wordlist);
    hiddenword = hiddenword.toUpperCase();
    print("the hidden word is:" + hiddenword);

    hints=generateHint(hiddenword);

    guessButton = createButton("guess!🤷‍♀️");
    guessButton.position(width/2+100, height/2);
    guessButton.mousePressed(guessCheck);
    guessButton.size(150, 30);
    guessButton.style("font-size", "20px");

    guessInput = createInput();
    guessInput.position(width/2-100, height/2);
    guessInput.size(150, 30);
    guessInput.style("font-size", "20px");

    
}

function draw(){
    background("lightblue");
    textAlign(CENTER, CENTER);
    textSize(22);
    fill("black");
    text("GUESS THE WORD!!!", width/2, 200);

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
    return ""matchedletters
}