const GAME_WIDTH = 960;
const GAME_HEIGHT = 600;
const PLAYER_RADIUS = 12;
const PLAYER_SPEED = 175;

let playerModel;
let guardModels = [];
let guards = [];
let gameState = 'title';
let level = 1;
let keyCollected = false;
let firstDoorOpen = false;
let secondDoorOpen = false;
let cuttersCollected = false;
let yardGateOpen = false;
let roadEscaped = false;
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

const yardTraps = [
  { x: 420, y: 430, w: 105, h: 32 },
  { x: 745, y: 230, w: 90, h: 32 }
];

const yardHidingSpots = [
  { x: 325, y: 335, w: 82, h: 55 },
  { x: 685, y: 465, w: 102, h: 54 }
];

const yardObstacles = [
  { x: 120, y: 130, w: 145, h: 98 },
  { x: 450, y: 125, w: 78, h: 68 }
];

const roadTraffic = [
  { x: 345, y: 150, w: 48, h: 78, speed: 126, direction: 1, color: '#bd604c' },
  { x: 405, y: 430, w: 44, h: 72, speed: 112, direction: -1, color: '#d3b655' },
  { x: 555, y: 245, w: 48, h: 78, speed: 138, direction: -1, color: '#668cb0' },
  { x: 615, y: 500, w: 44, h: 72, speed: 118, direction: 1, color: '#879b70' }
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

  if (level === 1) {
    drawPrison();
  } else if (level === 2) {
    drawYard();
  } else {
    drawRoad();
  }
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

function drawYard() {
  background('#142326');
  noStroke();
  fill('#29383a');
  rect(0, 0, GAME_WIDTH, 74);
  fill('#59695b');
  rect(28, 78, 904, 490, 8);
  fill('#718064');
  rect(40, 90, 880, 466, 4);
  fill('#65745f');
  rect(40, 252, 880, 98);
  fill('#73816a');
  rect(276, 90, 174, 466);
  fill('#64735f');
  rect(528, 90, 165, 466);

  drawYardShed();
  drawYardFence();
  drawYardHidingSpots();
  drawTraps(yardTraps);
  drawYardCrate();
  drawYardExit();
  drawYardLabels();
}

function drawYardShed() {
  noStroke();
  fill('#3d4940');
  rect(112, 121, 160, 112, 5);
  fill('#263638');
  triangle(102, 128, 192, 91, 282, 128);
  fill('#78816c');
  rect(171, 166, 42, 67, 3);
  fill('#d0b76e');
  circle(204, 200, 4);
  fill('#e0d9c2');
  textAlign(CENTER, CENTER);
  textSize(10);
  text('SUPPLY SHED', 192, 146);
  fill('#46524b');
  rect(445, 120, 88, 78, 5);
  fill('#283638');
  rect(455, 131, 68, 55, 3);
  fill('#d0b76e');
  textSize(9);
  text('GENERATOR', 489, 158);
}

function drawYardFence() {
  stroke('#c1c4a4');
  strokeWeight(3);
  for (let fenceY = 88; fenceY <= 244; fenceY += 18) {
    line(602, fenceY, 618, fenceY);
  }
  for (let fenceY = 356; fenceY <= 560; fenceY += 18) {
    line(602, fenceY, 618, fenceY);
  }
  line(602, 88, 602, 244);
  line(618, 88, 618, 244);
  line(602, 88 + 268, 602, 560);
  line(618, 88 + 268, 618, 560);
  noStroke();
  drawDoor(610, 300, yardGateOpen, 'FENCE GATE');
}

function drawYardHidingSpots() {
  for (const spot of yardHidingSpots) {
    noStroke();
    fill('#344a3c');
    ellipse(spot.x + spot.w / 2, spot.y + spot.h / 2, spot.w, spot.h);
    fill('#71815d');
    ellipse(spot.x + spot.w / 2 - 12, spot.y + spot.h / 2 - 5, spot.w * 0.55, spot.h * 0.48);
    fill('#e0dec4');
    textAlign(CENTER, CENTER);
    textSize(9);
    text('BUSHES', spot.x + spot.w / 2, spot.y + spot.h - 8);
  }
}

function drawYardCrate() {
  noStroke();
  fill(cuttersCollected ? '#485249' : '#896b42');
  rect(242, 478, 58, 42, 4);
  stroke('#c4a36a');
  strokeWeight(3);
  line(247, 484, 295, 514);
  line(295, 484, 247, 514);
  noStroke();
  if (!cuttersCollected) {
    stroke('#e8cf81');
    strokeWeight(3);
    line(261, 495, 281, 495);
    circle(260, 495, 8);
    line(278, 495, 278, 502);
    noStroke();
  }
  fill('#f1ead4');
  textAlign(CENTER, CENTER);
  textSize(9);
  text(cuttersCollected ? 'EMPTY' : 'CUTTERS', 271, 532);
}

function drawYardExit() {
  noStroke();
  fill(yardGateOpen ? '#73bd88' : '#53615a');
  rect(875, 254, 31, 92, 5);
  fill('#172326');
  rect(881, 260, 19, 80, 3);
  fill(yardGateOpen ? '#f0d47a' : '#9a9b88');
  circle(895, 303, 4);
  fill('#f2ead4');
  textAlign(CENTER, CENTER);
  textSize(10);
  text('ROAD', 890, 240);
}

function drawYardLabels() {
  noStroke();
  fill('#34453b');
  textAlign(LEFT, CENTER);
  textSize(10);
  text('PRISON YARD', 54, 111);
  text('Keep to the bushes. The floodlights sweep the open ground.', 330, 545);
  fill('#c4c6a9');
  textAlign(CENTER, CENTER);
  textSize(9);
  text('FENCE', 610, 229);
}

function drawRoad() {
  background('#142326');
  noStroke();
  fill('#29383a');
  rect(0, 0, GAME_WIDTH, 74);
  fill('#52694d');
  rect(28, 78, 904, 490, 8);
  fill('#718163');
  rect(40, 90, 225, 466, 4);
  rect(685, 90, 235, 466, 4);

  fill('#363d40');
  rect(265, 90, 420, 466);
  fill('#b4b49a');
  rect(265, 90, 8, 466);
  rect(677, 90, 8, 466);

  stroke('#8d9280');
  strokeWeight(3);
  for (let laneY = 108; laneY < 550; laneY += 48) {
    line(365, laneY, 365, laneY + 24);
    line(585, laneY, 585, laneY + 24);
  }
  noStroke();

  fill('#62785a');
  rect(455, 90, 50, 466);
  fill('#87906c');
  rect(463, 100, 34, 446, 5);
  fill('#e0c970');
  circle(480, 300, 10);

  fill('#eee9d6');
  for (let stripeY = 278; stripeY <= 318; stripeY += 10) {
    rect(280, stripeY, 166, 4, 1);
    rect(514, stripeY, 148, 4, 1);
  }

  drawRoadsideDetails();
}

function drawRoadsideDetails() {
  noStroke();
  fill('#34453b');
  ellipse(115, 145, 94, 50);
  ellipse(202, 488, 112, 58);
  fill('#405e43');
  ellipse(137, 140, 62, 36);
  ellipse(225, 482, 74, 40);

  fill('#3c4941');
  rect(760, 150, 88, 52, 4);
  fill('#d2c49c');
  rect(769, 159, 70, 5, 2);
  fill('#35473b');
  rect(748, 429, 122, 18, 5);
  rect(758, 447, 7, 26, 3);
  rect(853, 447, 7, 26, 3);

  fill('#a9c77b');
  textAlign(CENTER, CENTER);
  textSize(10);
  text('PARK', 880, 270);
  fill('#d8d1b8');
  textSize(9);
  text('WAIT FOR A GAP', 155, 340);
  text('SAFE MEDIAN', 480, 530);
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

function drawTraps(trapList = traps) {
  for (const trap of trapList) {
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
  if (level === 1) {
    updatePlayer(dt);
  } else if (level === 2) {
    updateYardPlayer(dt);
  } else {
    updateRoadPlayer(dt);
  }
  if (level < 3) {
    updateGuards(dt);
    updateAlarm(dt);
  } else {
    updateRoadTraffic(dt);
    checkRoadTraffic();
  }
  checkTraps();

  if (messageTime > 0) {
    messageTime -= dt;
  }
}

function updatePlayer(dt) {
  movePlayer(dt);

  if (!keyCollected && dist(playerModel.x, playerModel.y, 205, 164) < 27) {
    keyCollected = true;
    showMessage('Cell key collected. Use E beside the first gate.');
  }

  if (secondDoorOpen && dist(playerModel.x, playerModel.y, 890, 302) < 34) {
    beginYardLevel();
  }
}

function updateYardPlayer(dt) {
  movePlayer(dt);
  if (yardGateOpen && dist(playerModel.x, playerModel.y, 890, 302) < 34) {
    beginRoadLevel();
  }
}

function updateRoadPlayer(dt) {
  movePlayer(dt);
  if (dist(playerModel.x, playerModel.y, 890, 300) < 38) {
    gameState = 'won';
    roadEscaped = true;
  }
}

function updateRoadTraffic(dt) {
  for (const car of roadTraffic) {
    car.y += car.speed * car.direction * dt;
    if (car.direction > 0 && car.y - car.h / 2 > 570) {
      car.y = 78 - car.h / 2;
    } else if (car.direction < 0 && car.y + car.h / 2 < 78) {
      car.y = 570 + car.h / 2;
    }
  }
}

function checkRoadTraffic() {
  if (playerModel.x < 265 || playerModel.x > 685) return;
  for (const car of roadTraffic) {
    const vehicle = { x: car.x - car.w / 2, y: car.y - car.h / 2, w: car.w, h: car.h };
    if (circleTouchesRect(playerModel.x, playerModel.y, PLAYER_RADIUS, vehicle)) {
      gameState = 'lost';
      message = 'A car swept through the crossing. Wait for a gap or use the median.';
      return;
    }
  }
}

function movePlayer(dt) {
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
  if (level === 3) return false;
  if (level === 2) {
    for (const obstacle of yardObstacles) {
      if (circleTouchesRect(x, y, PLAYER_RADIUS, obstacle)) return true;
    }
    if (circleTouchesRect(x, y, PLAYER_RADIUS, { x: 602, y: 82, w: 16, h: 166 })) return true;
    if (circleTouchesRect(x, y, PLAYER_RADIUS, { x: 602, y: 352, w: 16, h: 212 })) return true;
    if (!yardGateOpen && circleTouchesRect(x, y, PLAYER_RADIUS, { x: 598, y: 266, w: 24, h: 68 })) return true;
    return false;
  }

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
  const activeTraps = level === 1 ? traps : level === 2 ? yardTraps : [];
  for (const trap of activeTraps) {
    if (circleTouchesRect(playerModel.x, playerModel.y, PLAYER_RADIUS - 2, trap) && jumpTime <= 0) {
      gameState = 'lost';
      message = 'The floor alarm caught you. Try hopping over the marked strip.';
      return;
    }
  }
}

function drawGameWorld() {
  if (level === 3) {
    drawRoadTraffic();
  } else {
    drawGuards();
  }
  drawPlayer();
  drawInteractionHint();
}

function drawRoadTraffic() {
  push();
  rectMode(CENTER);
  for (const car of roadTraffic) {
    noStroke();
    fill(car.color);
    rect(car.x, car.y, car.w, car.h, 9);
    fill('#b8c2bd');
    rect(car.x, car.y - car.direction * 12, car.w - 10, 22, 5);
    fill('#e9d8a1');
    rect(car.x - 13, car.y - car.direction * 30, 7, 5, 2);
    rect(car.x + 13, car.y - car.direction * 30, 7, 5, 2);
    fill('#e67a59');
    rect(car.x - 13, car.y + car.direction * 31, 7, 5, 2);
    rect(car.x + 13, car.y + car.direction * 31, 7, 5, 2);
  }
  pop();
  rectMode(CORNER);
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
  textSize(16);
  text('CAT ESCAPE  /  LEVEL ' + level, 28, 27);
  fill('#e9e2d0');
  textSize(11);
  if (level === 1) {
    text('KEY ' + (keyCollected ? (firstDoorOpen ? 'USED' : 'FOUND') : 'MISSING'), 235, 27);
    text('OVERRIDE ' + (puzzleProgress === 3 ? 'READY' : puzzleProgress + '/3'), 360, 27);
    text('GATE 1 ' + (firstDoorOpen ? 'OPEN' : 'LOCKED'), 510, 27);
    text('GATE 2 ' + (secondDoorOpen ? 'OPEN' : 'LOCKED'), 640, 27);
  } else {
    text('CUTTERS ' + (cuttersCollected ? 'FOUND' : 'MISSING'), 270, 27);
    text('FENCE ' + (yardGateOpen ? 'OPEN' : 'LOCKED'), 420, 27);
  }
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
  text(gameState === 'won' ? 'The cat slipped beyond the outer fence and into the night.' : message, 480, 285);
  fill('#f0d27e');
  textSize(18);
  text('Press R to try again', 480, 365);
}

function nearestInteraction() {
  const candidates = [];
  if (level === 1) {
    if (!firstDoorOpen) candidates.push({ x: 315, y: 300, hint: keyCollected ? 'unlock gate' : 'locked gate' });
    if (!secondDoorOpen) candidates.push({ x: 635, y: 300, hint: puzzleProgress === 3 ? 'unlock gate' : 'locked gate' });
    if (puzzleProgress < switches.length) {
      for (const item of switches) {
        candidates.push({ x: item.x, y: item.y + 32, hint: 'flip ' + item.label });
      }
    }
  } else if (level === 2) {
    if (!cuttersCollected) candidates.push({ id: 'cutters', x: 271, y: 500, hint: 'take cutters' });
    if (!yardGateOpen) candidates.push({ id: 'yardGate', x: 610, y: 300, hint: cuttersCollected ? 'cut fence lock' : 'locked fence' });
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

  if (level === 2) {
    if (target.id === 'cutters') {
      cuttersCollected = true;
      showMessage('Bolt cutters found. Get to the fence gate.');
    } else if (target.id === 'yardGate') {
      if (cuttersCollected) {
        yardGateOpen = true;
        showMessage('Fence cut. Make a run for the road!');
      } else {
        showMessage('The fence lock needs bolt cutters.');
      }
    }
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
  level = 1;
  playerModel.x = 90;
  playerModel.y = 300;
  guards[0].model.x = 420;
  guards[0].model.y = 300;
  Object.assign(guards[0], { minX: 350, maxX: 600, speed: 82, direction: 1, range: 88 });
  guards[1].model.x = 765;
  guards[1].model.y = 365;
  Object.assign(guards[1], { minX: 690, maxX: 865, speed: 68, direction: -1, range: 78 });
  gameState = 'playing';
  keyCollected = false;
  firstDoorOpen = false;
  secondDoorOpen = false;
  cuttersCollected = false;
  yardGateOpen = false;
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
  const activeHidingSpots = level === 1 ? hidingSpots : yardHidingSpots;
  return activeHidingSpots.some((spot) => pointInsideRect(playerModel.x, playerModel.y, spot));
}

function beginYardLevel() {
  level = 2;
  playerModel.x = 72;
  playerModel.y = 300;
  guards[0].model.x = 370;
  guards[0].model.y = 285;
  Object.assign(guards[0], { minX: 340, maxX: 540, speed: 76, direction: 1, range: 86 });
  guards[1].model.x = 760;
  guards[1].model.y = 390;
  Object.assign(guards[1], { minX: 680, maxX: 840, speed: 70, direction: -1, range: 80 });
  cuttersCollected = false;
  yardGateOpen = false;
  alarm = 0;
  jumpTime = 0;
  jumpCooldown = 0;
  showMessage('Level 2: Find bolt cutters, then open the yard gate.');
}

function pointInsideRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

function circleTouchesRect(x, y, radius, rect) {
  const closestX = constrain(x, rect.x, rect.x + rect.w);
  const closestY = constrain(y, rect.y, rect.y + rect.h);
  return dist(x, y, closestX, closestY) < radius;
}