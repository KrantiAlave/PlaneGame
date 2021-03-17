var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,playerImg;
var cloud,cloudImg,cloudG;
var coin,coinImg,coinG;
var ground,groundImg;

var opp1,opp1Img;
var opp2,opp2Img;
var opp3,opp3Img;

var opp,greenG,yellowG,blueG;

var score = 0;
var gameOver,gameOverImg;

function preload(){
playerImg = loadImage("images/plane1.png");
gameOverImg = loadImage("images/gameOver.png");
cloudImg = loadImage("images/cloud.png");
coinImg = loadImage("images/award.png");
groundImg = loadImage("images/sky.png");

opp1Img =loadImage("images/opp1.png");
opp2Img =loadImage("images/opp2.png");
opp3Img =loadImage("images/opp3.png");
}

function setup(){
createCanvas(1300,400);

ground = createSprite(1300,400);
ground.addImage(groundImg);
ground.velocityX = -5;
ground.scale = 10;

player = createSprite(70,200,20,20);
player.addImage(playerImg);
player.scale = 1.1;

gameOver = createSprite(650,200);
gameOver.addImage(gameOverImg);

var rand = Math.round(random(1,100));
console.log (rand);

greenG = new Group();
yellowG = new Group();
blueG = new Group();

coinG = new Group();
cloudG = new Group();
}

function draw(){
background(100,255,255);

if(gameState === PLAY){
edges = createEdgeSprites();
player.collide(edges);

gameOver.visible = false;

player.y = mouseY; 

if(ground.x < 0){
ground.x = width/2;
}

textSize(30);
fill(255);
stroke(0);
strokeWeight(3);
text("SCORE : "+ score,1100,40);
  
  opp = Math.round(random(1,3));
  if(frameCount % 130 === 0){
    if(opp === 1){
          greenP();
        }
        
        else if(opp === 2){
          yellowP();
        }
        else{
          blueP();
        }
  }

  if(coinG.isTouching(player)){
    score+=+1;
  }

  if(greenG.isTouching(player) || yellowG.isTouching(player) || blueG.isTouching(player)){
     gameState = END;
  }


spawnCloud();
spawnCoin();
}

if(gameState === END){
  textSize(20);
  fill(0);
    text("Press Up Arrow to Restart the game!", 500,300);
    
    gameOver.visible = true;

    player.velocityY = 0;
  
    greenG.setVelocityXEach(0);
    greenG.setLifetimeEach(-1);
    
    yellowG.setVelocityXEach(0);
    yellowG.setLifetimeEach(-1);
  
    blueG.setVelocityXEach(0);
    blueG.setLifetimeEach(-1);
    
    coinG.setVelocityXEach(0);
    coinG.setLifetimeEach(-1);

    cloudG.setVelocityXEach(0);
    cloudG.setLifetimeEach(-1);

    if(keyDown(UP_ARROW)){
      restart();
    }
}

drawSprites();
}

function greenP(){
opp1 = createSprite(1200,Math.round(random(20,400)));
opp1.addImage(opp1Img);
opp1.velocityX = -4;
opp1.scale = 1.1;
opp1.lifetime = 280;
greenG.add(opp1);
}

function yellowP(){
opp2 = createSprite(1200,Math.round(random(20,400)));
opp2.addImage(opp2Img);
opp2.velocityX = -4;
opp2.scale = 1.1;
opp2.lifetime = 280;
yellowG.add(opp2);
}

function blueP(){
opp3 = createSprite(1200,Math.round(random(20,400)));
opp3.addImage(opp3Img);
opp3.velocityX = -4;
opp3.scale = 1.1;
opp3.lifetime = 280;
blueG.add(opp3);
}

function spawnCloud(){
if(frameCount % 80 === 0){
cloud = createSprite(1200,Math.round(random(20,500)));
cloud.addImage(cloudImg);
cloud.velocityX = -4;
cloud.scale = 0.5;
cloud.lifetime = 280;
cloudG.add(cloud)
 }
}

function spawnCoin(){
if(frameCount % 100 === 0){
coin = createSprite(1200,Math.round(random(20,500)));
coin.addImage(coinImg);
coin.velocityX = -4;
coin.scale = 0.5;
coin.lifetime = 280;
coinG.add(coin);
}
}

function restart(){
  gameState = PLAY;
  gameOver.visible = false;
  player.addImage(playerImg);
  
  greenG.destroyEach();
  yellowG.destroyEach();
  blueG.destroyEach();

  coinG.destroyEach();

  cloudG.destroyEach();
  
  score = 0;
}