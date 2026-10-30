const GAME_WIDTH = 960;
const GAME_HEIGHT = 600;
const PLAYER_RADIUS = 12;
const PLAYER_SPEED = 175;

let playerModel;
let guardModels = [];
let guards = [];
let gameState = 'title';
let keyCollected = false;
let firstDoorOpen = false;
let secondDoorOpen = false;
let puzzleProgress = 0;
let alarm = 0;
let jumpTime = 0;
let jumpCooldown = 0;
let message = '';
let messageTime = 0;
let lastFrameTime = 0;

const walls = [
  { x: 315, y: 82, w: 18, h: 168 },
  { x: 315, y: 350, w: 18, h: 210 },
  { x: 635, y: 82, w: 18, h: 168 },
  { x: 635, y: 350, w: 18, h: 210 }
];

const switches = [
  { x: 390, y: 155, label: 'BLUE', color: '#67c9dc' },
  { x: 475, y: 155, label: 'AMBER', color: '#f0b653' },
  { x: 560, y: 155, label: 'GREEN', color: '#83c77a' }
];

const traps = [
  { x: 435, y: 420, w: 105, h: 34 },
  { x: 710, y: 455, w: 92, h: 32 }
];

const hidingSpots = [
  { x: 355, y: 105, w: 80, h: 66 },
  { x: 555, y: 465, w: 62, h: 62 }
];

function setup() {
  createCanvas(GAME_WIDTH, GAME_HEIGHT);
  textFont('Georgia');
  playerModel = new Sprite(90, 300, 24, 24, 'none');
  playerModel.visible = false;

  const firstGuard = new Sprite(420, 300, 24, 28, 'none');
  const secondGuard = new Sprite(765, 365, 24, 28, 'none');
  firstGuard.visible = false;
  secondGuard.visible = false;
  guardModels = [firstGuard, secondGuard];
  guards = [
    { model: firstGuard, minX: 350, maxX: 600, speed: 82, direction: 1, range: 88 },
    { model: secondGuard, minX: 690, maxX: 865, speed: 68, direction: -1, range: 78 }
  ];
  lastFrameTime = millis();
}

function draw() {
  const now = millis();
  const dt = min((now - lastFrameTime) / 1000, 0.05);
  lastFrameTime = now;

  drawPrison();
  if (gameState === 'title') {
    drawTitle();
    return;
  }
  if (gameState === 'won' || gameState === 'lost') {
    drawEndScreen();
    return;
  }

  updateGame(dt);
  drawGameWorld();
  drawHud();
}

function drawPrison() {
  background('#172326');
  noStroke();
  fill('#29383a');
  rect(0, 0, GAME_WIDTH, 74);
  fill('#6d7770');
  rect(28, 78, 904, 490, 8);

  fill('#85877b');
  rect(40, 90, 272, 466);
  fill('#777e70');
  rect(333, 90, 292, 466);
  fill('#85877b');
  rect(653, 90, 267, 466);

  stroke('#b0aa91');
  strokeWeight(3);
  line(315, 82, 315, 250);
  line(315, 350, 315, 560);
  line(635, 82, 635, 250);
  line(635, 350, 635, 560);
  noStroke();

  drawCell();
  drawHidingSpots();
  drawSwitches();
  drawTraps();
  drawDoors();
  drawExit();
  drawPrisonLabels();
}

function drawCell() {
  noStroke();
  fill('#596764');
  rect(58, 160, 112, 160, 4);
  fill('#263536');
  rect(68, 170, 92, 48, 3);
  rect(68, 228, 92, 78, 3);
  stroke('#a2a698');
  strokeWeight(3);
  for (let barX = 77; barX <= 151; barX += 18) {
    line(barX, 170, barX, 218);
  }
  noStroke();
  fill('#b4b1a1');
  rect(74, 270, 80, 8, 3);
  fill('#e0b65f');
  rect(92, 279, 44, 18, 3);
  if (!keyCollected) {
    drawKey(205, 164);
  }
}

function drawKey(x, y) {
  push();
  translate(x, y);
  noFill();
  stroke('#f0d27e');
  strokeWeight(4);
  circle(-5, 0, 12);
  line(1, 0, 15, 0);
  line(10, 0, 10, 5);
  line(15, 0, 15, 4);
  pop();
}

function drawHidingSpots() {
  for (const spot of hidingSpots) {
    noStroke();
    fill('#354443');
    rect(spot.x, spot.y, spot.w, spot.h, 8);
    fill('#53615a');
    rect(spot.x + 7, spot.y + 8, spot.w - 14, 12, 4);
    fill('#d0c8ac');
    textSize(10);
    textAlign(CENTER, CENTER);
    text('SHADOW', spot.x + spot.w / 2, spot.y + spot.h - 11);
  }
}

function drawSwitches() {
  noStroke();
  fill('#293638');
  rect(365, 111, 218, 90, 6);
  fill('#e1dbc5');
  textAlign(CENTER, CENTER);
  textSize(11);
  text('SECURITY OVERRIDE', 474, 124);
  textSize(10);
  text('BLUE  >  AMBER  >  GREEN', 474, 138);

  for (let index = 0; index < switches.length; index += 1) {
    const item = switches[index];
    fill(item.color);
    circle(item.x, item.y + 32, 24);
    fill('#192426');
    rect(item.x - 26, item.y + 43, 52, 16, 3);
    fill('#f4edda');
    textSize(9);
    text(item.label, item.x, item.y + 51);
    if (index < puzzleProgress) {
      noFill();
      stroke(item.color);
      strokeWeight(3);
      circle(item.x, item.y + 32, 34);
      noStroke();
    }
  }
}

function drawTraps() {
  for (const trap of traps) {
    noStroke();
    fill('#3d3430');
    rect(trap.x, trap.y, trap.w, trap.h, 4);
    for (let markX = trap.x + 8; markX < trap.x + trap.w - 5; markX += 18) {
      fill('#e15c4c');
      triangle(markX, trap.y + 5, markX + 10, trap.y + 5, markX + 5, trap.y + 15);
      fill('#f0b653');
      triangle(markX, trap.y + trap.h - 5, markX + 10, trap.y + trap.h - 5, markX + 5, trap.y + trap.h - 15);
    }
  }
}

function drawDoors() {
  drawDoor(315, 300, firstDoorOpen, 'CELL BLOCK');
  drawDoor(635, 300, secondDoorOpen, 'SECURITY');
}

function drawDoor(x, y, isOpen, label) {
  push();
  rectMode(CENTER);
  noStroke();
  fill(isOpen ? '#557766' : '#3a4848');
  rect(x, y, 22, 68, 4);
  if (!isOpen) {
    stroke('#b9b29a');
    strokeWeight(3);
    for (let barY = y - 25; barY <= y + 25; barY += 16) {
      line(x - 7, barY, x + 7, barY);
    }
    noStroke();
    fill('#e2bd65');
    circle(x + 5, y, 4);
  }
  pop();
  fill('#eee5ce');
  textSize(9);
  textAlign(CENTER, CENTER);
  text(label, x, y - 48);
}

function drawExit() {
  noStroke();
  fill(secondDoorOpen ? '#73bd88' : '#53615a');
  rect(875, 254, 31, 92, 5);
  fill('#172326');
  rect(881, 260, 19, 80, 3);
  fill(secondDoorOpen ? '#f0d47a' : '#9a9b88');
  circle(895, 303, 4);
  fill('#f2ead4');
  textAlign(CENTER, CENTER);
  textSize(10);
  text('EXIT', 890, 240);
}

function drawPrisonLabels() {
  noStroke();
  fill('#3c4a47');
  textAlign(LEFT, CENTER);
  textSize(10);
  text('CELL 09', 60, 110);
  text('GUARD HALL', 350, 225);
  text('NORTH BLOCK', 675, 115);
  text('Movement is quietest inside the shadow patches.', 354, 533);
}

function drawTitle() {
  drawGameWorld();
  fill(12, 22, 24, 205);
  rect(110, 125, 740, 350, 12);
  fill('#f0d27e');
  textAlign(CENTER, CENTER);
  textSize(34);
  text('CAT ESCAPE: LOCKDOWN', 480, 190);
  fill('#f2ead4');
  textSize(17);
  text('One small cat. Three locked gates. A very long night.', 480, 234);
  textSize(14);
  text('Move: WASD or arrows     Jump: Space     Interact: E', 480, 290);
  text('Find the cell key, sneak through the guard hall, then enter', 480, 327);
  text('the security switch sequence to reach the exit.', 480, 350);
  fill('#9dd5b6');
  textSize(18);
  text('Press ENTER to begin', 480, 414);
}

function updateGame(dt) {
  updatePlayer(dt);
  updateGuards(dt);
  updateAlarm(dt);
  checkTraps();

  if (messageTime > 0) {
    messageTime -= dt;
  }
}

function updatePlayer(dt) {
  let moveX = 0;
  let moveY = 0;
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) moveX -= 1;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) moveX += 1;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) moveY -= 1;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) moveY += 1;

  if (moveX !== 0 && moveY !== 0) {
    moveX *= Math.SQRT1_2;
    moveY *= Math.SQRT1_2;
  }

  movePlayerAxis(moveX * PLAYER_SPEED * dt, 0);
  movePlayerAxis(0, moveY * PLAYER_SPEED * dt);
  playerModel.x = constrain(playerModel.x, 42 + PLAYER_RADIUS, 918 - PLAYER_RADIUS);
  playerModel.y = constrain(playerModel.y, 94 + PLAYER_RADIUS, 554 - PLAYER_RADIUS);
  jumpTime = max(0, jumpTime - dt);
  jumpCooldown = max(0, jumpCooldown - dt);

  if (!keyCollected && dist(playerModel.x, playerModel.y, 205, 164) < 27) {
    keyCollected = true;
    showMessage('Cell key collected. Use E beside the first gate.');
  }

  if (secondDoorOpen && dist(playerModel.x, playerModel.y, 890, 302) < 34) {
    gameState = 'won';
  }
}

function movePlayerAxis(dx, dy) {
  const nextX = playerModel.x + dx;
  const nextY = playerModel.y + dy;
  if (!hitsWall(nextX, nextY)) {
    playerModel.x = nextX;
    playerModel.y = nextY;
  }
}

function hitsWall(x, y) {
  for (const wall of walls) {
    if (circleTouchesRect(x, y, PLAYER_RADIUS, wall)) return true;
  }
  if (!firstDoorOpen && circleTouchesRect(x, y, PLAYER_RADIUS, { x: 304, y: 266, w: 22, h: 68 })) return true;
  if (!secondDoorOpen && circleTouchesRect(x, y, PLAYER_RADIUS, { x: 624, y: 266, w: 22, h: 68 })) return true;
  return false;
}

function updateGuards(dt) {
  for (const guard of guards) {
    guard.model.x += guard.speed * guard.direction * dt;
    if (guard.model.x >= guard.maxX || guard.model.x <= guard.minX) {
      guard.direction *= -1;
      guard.model.x = constrain(guard.model.x, guard.minX, guard.maxX);
    }
  }
}

function updateAlarm(dt) {
  const concealed = isPlayerHidden();
  let spotted = false;
  if (!concealed) {
    for (const guard of guards) {
      if (dist(playerModel.x, playerModel.y, guard.model.x, guard.model.y) < guard.range) {
        spotted = true;
        break;
      }
    }
  }

  alarm = spotted ? min(1, alarm + dt * 0.62) : max(0, alarm - dt * 0.38);
  if (alarm >= 1) {
    gameState = 'lost';
    message = 'A guard spotted you in the corridor.';
  }
}

function checkTraps() {
  for (const trap of traps) {
    if (circleTouchesRect(playerModel.x, playerModel.y, PLAYER_RADIUS - 2, trap) && jumpTime <= 0) {
      gameState = 'lost';
      message = 'The floor alarm caught you. Try hopping over the marked strip.';
      return;
    }
  }
}

function drawGameWorld() {
  drawGuards();
  drawPlayer();
  drawInteractionHint();
}

function drawGuards() {
  for (const guard of guards) {
    const facing = guard.direction;
    noStroke();
    fill(235, 87, 67, 24);
    arc(guard.model.x, guard.model.y, guard.range * 2, guard.range * 2, facing > 0 ? -0.8 : PI - 0.8, facing > 0 ? 0.8 : PI + 0.8, PIE);
    fill('#a8493e');
    rectMode(CENTER);
    rect(guard.model.x, guard.model.y + 5, 23, 23, 5);
    fill('#e8c99a');
    circle(guard.model.x, guard.model.y - 8, 17);
    fill('#354143');
    rect(guard.model.x + facing * 3, guard.model.y - 9, 12, 4, 2);
  }
  rectMode(CORNER);
}

function drawPlayer() {
  const hopOffset = jumpTime > 0 ? 14 : 0;
  const px = playerModel.x;
  const py = playerModel.y - hopOffset;
  noStroke();
  fill(0, 0, 0, 40);
  ellipse(px, playerModel.y + 9, 27, 11);
  fill('#e4b46a');
  ellipse(px, py, 26, 22);
  triangle(px - 10, py - 4, px - 8, py - 17, px - 1, py - 8);
  triangle(px + 10, py - 4, px + 8, py - 17, px + 1, py - 8);
  fill('#f5e6ca');
  ellipse(px - 5, py + 1, 5, 7);
  ellipse(px + 5, py + 1, 5, 7);
  fill('#253033');
  circle(px - 5, py, 2);
  circle(px + 5, py, 2);
  fill('#bb695b');
  triangle(px - 2, py + 5, px + 2, py + 5, px, py + 7);
}

function drawInteractionHint() {
  const target = nearestInteraction();
  if (!target || gameState !== 'playing') return;
  fill('#172326');
  noStroke();
  rect(target.x - 65, target.y - 42, 130, 23, 4);
  fill('#f4edda');
  textAlign(CENTER, CENTER);
  textSize(11);
  text('E  ' + target.hint, target.x, target.y - 30);
}

function drawHud() {
  fill('#f0d27e');
  textAlign(LEFT, CENTER);
  textSize(18);
  text('CAT ESCAPE', 28, 27);
  fill('#e9e2d0');
  textSize(11);
  text('KEY ' + (keyCollected ? (firstDoorOpen ? 'USED' : 'FOUND') : 'MISSING'), 180, 27);
  text('OVERRIDE ' + (puzzleProgress === 3 ? 'READY' : puzzleProgress + '/3'), 300, 27);
  text('GATE 1 ' + (firstDoorOpen ? 'OPEN' : 'LOCKED'), 444, 27);
  text('GATE 2 ' + (secondDoorOpen ? 'OPEN' : 'LOCKED'), 566, 27);
  text('R RESTART', 860, 27);

  fill('#263437');
  rect(740, 17, 91, 13, 4);
  fill(alarm > 0.65 ? '#e15c4c' : '#e5bb62');
  rect(742, 19, 87 * alarm, 9, 3);
  fill('#e9e2d0');
  textAlign(RIGHT, CENTER);
  textSize(9);
  text('ALERT', 735, 24);

  if (messageTime > 0) {
    fill('#172326');
    rect(255, 560, 450, 25, 4);
    fill('#f3edda');
    textAlign(CENTER, CENTER);
    textSize(12);
    text(message, 480, 573);
  }

  fill('#243235');
  rect(28, 578, 904, 1);
  fill('#e2ddcb');
  textAlign(CENTER, CENTER);
  textSize(10);
  text('WASD / ARROWS MOVE     SPACE HOP OVER TRAPS     E INTERACT     HIDE IN SHADOWS', 480, 590);
}

function drawEndScreen() {
  drawGameWorld();
  fill(10, 18, 20, 215);
  rect(130, 150, 700, 300, 12);
  textAlign(CENTER, CENTER);
  fill(gameState === 'won' ? '#9dd5b6' : '#f08c76');
  textSize(36);
  text(gameState === 'won' ? 'FREEDOM!' : 'CAUGHT!', 480, 225);
  fill('#f2ead4');
  textSize(16);
  text(gameState === 'won' ? 'The cat slipped through the last gate and vanished into the night.' : message, 480, 285);
  fill('#f0d27e');
  textSize(18);
  text('Press R to try again', 480, 365);
}

function nearestInteraction() {
  const candidates = [];
  if (!firstDoorOpen) candidates.push({ x: 315, y: 300, hint: keyCollected ? 'unlock gate' : 'locked gate' });
  if (!secondDoorOpen) candidates.push({ x: 635, y: 300, hint: puzzleProgress === 3 ? 'unlock gate' : 'locked gate' });
  if (puzzleProgress < switches.length) {
    for (const item of switches) {
      candidates.push({ x: item.x, y: item.y + 32, hint: 'flip ' + item.label });
    }
  }
  let closest = null;
  let closestDistance = 38;
  for (const candidate of candidates) {
    const candidateDistance = dist(playerModel.x, playerModel.y, candidate.x, candidate.y);
    if (candidateDistance < closestDistance) {
      closest = candidate;
      closestDistance = candidateDistance;
    }
  }
  return closest;
}

function interact() {
  const target = nearestInteraction();
  if (!target) {
    showMessage('Nothing close enough to interact with.');
    return;
  }

  if (target.x === 315) {
    if (!keyCollected) {
      showMessage('The first gate needs the cell key.');
    } else {
      firstDoorOpen = true;
      showMessage('Gate 1 unlocked. Keep an eye on the patrol.');
    }
    return;
  }

  if (target.x === 635) {
    if (puzzleProgress < 3) {
      showMessage('The security override is still active.');
    } else {
      secondDoorOpen = true;
      showMessage('Security gate open. The exit is to the east.');
    }
    return;
  }

  const switchIndex = switches.findIndex((item) => item.x === target.x);
  if (switchIndex === puzzleProgress) {
    puzzleProgress += 1;
    showMessage(puzzleProgress === 3 ? 'Override complete. Unlock the security gate.' : switches[switchIndex].label + ' switch set. Follow the clue.');
  } else {
    puzzleProgress = 0;
    showMessage('Wrong switch. The sequence reset to BLUE.');
  }
}

function keyPressed() {
  if (keyCode === ENTER && gameState === 'title') {
    gameState = 'playing';
    showMessage('Find the brass key in Cell 09.');
    return false;
  }
  if ((key === 'e' || key === 'E') && gameState === 'playing') {
    interact();
    return false;
  }
  if (key === ' ' && gameState === 'playing' && jumpCooldown <= 0) {
    jumpTime = 0.9;
    jumpCooldown = 1.1;
    return false;
  }
  if (key === 'r' || key === 'R') {
    restartGame();
    return false;
  }
  return true;
}

function mousePressed() {
  if (gameState === 'title') {
    gameState = 'playing';
    showMessage('Find the brass key in Cell 09.');
  }
}

function restartGame() {
  playerModel.x = 90;
  playerModel.y = 300;
  for (let index = 0; index < guards.length; index += 1) {
    guards[index].model.x = index === 0 ? 420 : 765;
    guards[index].direction = index === 0 ? 1 : -1;
  }
  gameState = 'playing';
  keyCollected = false;
  firstDoorOpen = false;
  secondDoorOpen = false;
  puzzleProgress = 0;
  alarm = 0;
  jumpTime = 0;
  jumpCooldown = 0;
  showMessage('Find the brass key in Cell 09.');
}

function showMessage(nextMessage) {
  message = nextMessage;
  messageTime = 2.8;
}

function isPlayerHidden() {
  return hidingSpots.some((spot) => pointInsideRect(playerModel.x, playerModel.y, spot));
}

function pointInsideRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

function circleTouchesRect(x, y, radius, rect) {
  const closestX = constrain(x, rect.x, rect.x + rect.w);
  const closestY = constrain(y, rect.y, rect.y + rect.h);
  return dist(x, y, closestX, closestY) < radius;
}