function setup() {
    createCanvas(900, 400);
    background(220);
    noLoop(); // Stops continuous drawing
  }
  
function draw() {
  // Recap 1: Repeating Circles
  // for( let circleX=1; circleX<7; circleX++){
  //   circle(circleX*50, 50, 50);
  // }
  // Task 1: Colour Gradient
  let count = 1
  for( let red=0; red<256; red+=35){
    fill(80, 80, 80);
    rect(count*100, 50, 50, 50);
    count = count + 1
  }
  // Task 2: Colour Loop

  // Task 3: Row of Circles

  // Task 4: Grid of Circles
  // for( let circleX=1; circleX<7; circleX++){
  //   for( let circleY=1; circleY<7; circleY++){
  //     circle(circleX*50, circleY*50, 50);
  //   }
  // }
}