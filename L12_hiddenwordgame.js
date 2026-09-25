let guessButton;
let guessInput;

function setup(){
    wordlist[Abyss,Ample,Baker,Binge,Blimp,Blunt,Braid,Brine,Buxom,Caper,Chasm,Chide,Clerk,Clomp,Covey,Crank,Cynic,Delta,DelveDingoDitchDrollDuvetEjectEludeEpoxyEquipExileFableFetchFjordFlailFlukeFrockFudgeGavelGazerGirthGlyphGnashGourdGraphGrimeHaremHavelHoardHoundHydroImbueIonicIvoryJauntJellyJumboJurorKhakiKioskKnackKnollLapseLatchLeeryLemurLitheLlamaLurchLyricMacroMirthMucusMurkyNadirNylonNymphOmegaOpiumOxidePhialPiquePlazaPluckProwlQuailQuirkQuotaRadarRajahRhinoRulerRustyScubaShackSonicSpeltSquibSwillTackyThiefThumpToxic]

    createCanvas(800, 700);
    background("lightblue");

    guessButton = createButton("guess!🤷‍♀️");
    guessButton.position(width/2+100, height/2)
    guessButton.mousePressed(guessCheck)

    guessInput = createInput()
    guessInput.position(width/2-100, height/2)
}

function draw(){
    background("lightblue");
    textAlign(CENTER, CENTER);
    textSize(22);
    fill("black")
    text("GUESS THE WORD!!!", width/2, 200);
}

function updateText() {
    print(guessInput.value());
}
