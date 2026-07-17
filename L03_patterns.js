function setup() {
    createCanvas(600, 400);
    background(220);
    noLoop(); // Stops continuous drawing
  }
  
function draw() {
  // Recap 1: Repeating Circles
  for( let circleX=1; circleX<7; circleX++){
    circle(circleX*50, 50, 50);
  }
  // Task 1: Colour Gradient
  for( let circleX=1; circleX<7; circleX++){
    circle(circleX*50, 50, 50);
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