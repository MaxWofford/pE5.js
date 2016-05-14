var player

function setup() {
  createCanvas(250, 250);
  player = createSprite(width/2, height-25, 50, 50);
}

function draw() {
  if (keyDown(RIGHT_ARROW) && player.position.x < (width-25)) {
    player.position.x = player.position.x + 1;
  }

  if (keyDown(LEFT_ARROW) && player.position.x > 25) {
    player.position.x = player.position.x - 1;
  }
  
  if (keyDown(UP_ARROW) && player.position.y > 25) {
    player.position.y = player.position.y - 1
  }
  
  if (keyDown(DOWN_ARROW) && player.position.y < (height-25)) {
    player.position.y = player.position.y + 1
  }

  background(0, 0, 100);
  drawSprites();
}