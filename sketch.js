var player, endNPC, obstacleGroup;
var wall, ground, ground2;
var button, buttonIMG;
var gameState = 0;
var score = 0;
var timesWon = 0;

function preload(){
  buttonIMG = loadImage("restart.png");
}

function setup() {
  createCanvas(400,400);
  player = createSprite(200, 200, 30,30);
  player.shapeColor = "RED";

  endNPC = createSprite(1500,200,30,30);
  endNPC.shapeColor = "GREEN";
  
  wall = createSprite(1550,200,30,400);
  wall.visible = false;

  ground = createSprite(750,410,1500,20);
  ground2 = createSprite(750,-10,1500,20);

  //edges = createEdgeSprites();
  

  obstacleGroup = createGroup();
}

function draw() {
  background(128);  
  fill("BLACK");
  

  if(gameState === 0){
    text("Score: " + score, player.x+125, 25);
    text("Times won: " + timesWon, player.x-185, 25);
    //player and camera movements, obstacle generating function, score

    score = player.x - 200;

    if(score < 0){
      score = 0;
    }

    if(keyIsDown(UP_ARROW)){
      player.y = player.y-10;
    }
    if(keyIsDown(DOWN_ARROW)){
      player.y = player.y+10;
    }
    if(keyIsDown(LEFT_ARROW)){
      player.x = player.x-2;
    }
    if(keyIsDown(RIGHT_ARROW)){
      player.x = player.x+2;
    }
    
    camera.position.x = player.x;

    spawnObstacles();

    if(obstacleGroup.isTouching(player)){
      gameState = 1;
    }

    if(endNPC.isTouching(player)){
      gameState = 2;
      
    }
    
    player.collide(wall);
    player.collide(ground);
    player.collide(ground2);
  }
  else if(gameState === 1){
    fill("BLACK");
    text("Game Over", player.x-30, player.y-80);
    text("Press space to restart", player.x-55, player.y-60);
    text("Score: " + score, player.x-30, player.y-40);

    if(keyIsDown(32)){
      restart();
    }

    obstacleGroup.setVelocityXEach(0);
  }
  else if(gameState === 2){
    obstacleGroup.setVelocityXEach(0);
    
    fill("BLACK");
    
    if(timesWon >= 3){
      text("Wow! You are amazing at this!", endNPC.x-80, endNPC.y-80);
      text("It can be quite hard from this point on...", endNPC.x-100, endNPC.y+30);
    } else {
      text("You win!", endNPC.x-25, endNPC.y-80);
      text("The game will get harder each time you restart.", endNPC.x-120, endNPC.y+30);
    }

    text("Restart by going past me.", endNPC.x-65, endNPC.y-60);
    text("Score: " + score, endNPC.x-30, endNPC.y-40);

    if(keyIsDown(UP_ARROW)){
      player.y = player.y-5;
    }
    if(keyIsDown(DOWN_ARROW)){
      player.y = player.y+5;
    }
    if(keyIsDown(LEFT_ARROW)){
      player.x = player.x-2;
    }
    if(keyIsDown(RIGHT_ARROW)){
      player.x = player.x+2;
    }

    if(wall.isTouching(player)){
      restart();
      timesWon = timesWon + 1;
    }
  }

  drawSprites();
}

function spawnObstacles(){
if(frameCount % 30 === 0){
  var obsY = Math.round(random(30,400));
  obstacle = createSprite(player.x+250,obsY,25,25);
  obstacle.shapeColor = "WHITE";
  obstacle.velocityX = -(3 + timesWon + score/200);
  //var rand = Math.round(random(1,2));

  /*if(rand === 1){
    obstacle 
    
  }*/
  obstacleGroup.add(obstacle);
  }
}

function restart(){
  gameState = 0;
  score = 0;

  obstacleGroup.destroyEach();

  player.x = 200;
  player.y = 200;
}