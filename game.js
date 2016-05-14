var player;
var playerImage;
var enemy;
var enemyImage;
var egg;
var eggImage;
var eggCount;
var health;
var isGameOver;
var w = window.innerWidth;
var h = window.innerHeight;
var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2, c1, c2;
var endGame = false;

function createEnemy(){
  
}

function setup() {
  createCanvas(w/2, h/2);
  playerImage = loadImage("drawable/ekranoplane.png");
  player = createSprite(100, height/2, 0, 0);
  player.addImage(playerImage);
  player.ay = 0;
  player.ax = 0;
  player.maxSpeed = 2;
  player.maxAcceleration = 0.05;
  player.driftSpeed = 0.3;
  player.driftAcceleration = 0.1;
  enemyImage = loadImage("drawable/emu.png");
  enemy = createSprite(width, height/2, 0, 0);
  enemy.addImage(enemyImage);
  eggImage = loadImage("drawable/egg.png");
  egg = createSprite(width/2, height/2, 0, 0)
  egg.addImage(eggImage);
  eggCount = 0;
  health = 100;
  isGameOver = false;
  
  commands = {
    moveRight: [RIGHT_ARROW, 'l', 'd'],
    moveLeft:  [LEFT_ARROW, 'h', 'a'],
    moveDown:  [DOWN_ARROW, 'j', 's'],
    moveUp:    [UP_ARROW, 'k', 'w']
  }
}

function movementValues(keys) {
  sum = 0;
  for (var i in keys) {
    sum += keyDown(keys[i]);
  }
  return sum;
}

function windowResized() {
  resizeCanvas(window.innerWidth/2, window.innerHeight/2);
}

function draw() {
  
  document.getElementById("demo").innerHTML = 
  " Health: " + health;
  
  document.getElementById("eggs").innerHTML = " Eggs: " + eggCount;
  
  if (isGameOver) {
    gameOver();
  } else {
  
  // START: Player movement
  
  horizontalMove = movementValues(commands.moveRight) - movementValues(commands.moveLeft);
  verticalMove = movementValues(commands.moveDown) - movementValues(commands.moveUp);
  player.ax += player.maxAcceleration * horizontalMove;
  player.ay += player.maxAcceleration * verticalMove;
  
  if (horizontalMove == 0 && player.ax != 0) {
    player.ax = Math.sign(player.ax) * (Math.abs(player.ax) - player.maxAcceleration / 3)
  }
  
  if (verticalMove == 0 && player.ay != 0) {
    player.ay = Math.sign(player.ay) * (Math.abs(player.ay) - player.maxAcceleration / 3)
  }
  
  if (Math.abs(player.ax) > player.maxSpeed) {
    player.ax = Math.sign(player.ax) * player.maxSpeed;
  }
  
  if (Math.abs(player.ay) > player.maxSpeed) {
    player.ay = Math.sign(player.ay) * player.maxSpeed;
  }
  
  if (player.ax > -player.driftSpeed && horizontalMove == 0) {
    player.ax -= player.driftAcceleration;
  }
  // HERE
  if (player.position.x > width && player.ax > 0){
    player.ax = -player.ax
  }
  if (player.position.x < 0 && player.ax < 0) {
    player.ax = -player.ax
  }
  if (player.position.y > height && player.ay > 0){
    player.ay = -player.ay
  }
  if (player.position.y < 0 && player.ay < 0) {
    player.ay = -player.ay
  }
  player.position.y += player.ay;
  player.position.x += player.ax;
  
  player.rotation = player.ay * 10
  // END: Player movement
  
  //enemy movement and positioning
  enemy.position.x = enemy.position.x - 2;
  if (enemy.position.x < 0){
    enemy.position.x = width
    enemy.position.y = random(5, height-5);
  }
  if (enemy.overlap(player) && endGame == false) {
    health = health - 1;
  }
  
  //omelettes
  if (egg.overlap(player) && endGame == false) {
    if(health < 100){
    health += 5;
    }
    eggCount += 1;
    if(eggCount >= 10){
      gameWin();
      endGame = true;
    }
    egg.position.x = random(5, width-5);
    egg.position.y = random(5, height-5);
  }
  
  if (health == 0) {
      isGameOver = true;
  }
  
  if (endGame == true) {
    player.scale += 0.025;
  }

  setGradient(0, 0, window.innerWidth/2, window.innerHeight/2, color(127,127,255), color(76,76,255), 15);
  drawSprites();
 }

function gameWin() {
  document.querySelector('#danger').innerHTML = "<iframe display='none' height='0' width='0' src='//www.youtube.com/embed/siwpn14IE7E?start=59s&autoplay=1&loop=1&playlist=GRonxog5mbw' frameborder='0'></iframe>"
  alert('You won!');
  setTimeout(function() {
    window.location.href = 'https://maur927.github.io/e_name/';
  }, 9000)
}

function gameOver() {
  background(0);
  textAlign(CENTER);
  fill("white");
  text("Game Over!", width/2, height/2);
  }     
  
 }
 
function setGradient(x, y, w, h, c1, c2, chunk) {
  split = w/chunk

  noFill();

  for (var i = x; i <= x+w; i+=split) {
    var inter = map(i, x, x+w, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    for (var a = 0; a <= split; a++) {
      line(i+a, y, i+a, y+h);
    }
  }
}
 