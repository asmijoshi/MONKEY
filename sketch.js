var PLAY = 1;
var END = 0;
var monkey, monkey_running;
var foodSound, hitSound;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var invisibleGround, ground, bgroundImage;
var score = 0;
var survivalTime = 0;
var hits = 0;
var gameState = PLAY;

function preload() {

  foodSound = loadSound("zapsplat_cartoon_bubble_pop_007_40279.mp3")

  hitSound = loadSound("zapsplat_cartoon_pop_medium_48207.mp3")

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  bgroundImage = loadImage("jungle.1.jpg");


}

function setup() {

  createCanvas(400, 400);
  //background;

  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  ground = createSprite(200, 200, 400, 400);
  ground.scale = 2.5;
  ground.velocityX = 5;
  ground.x = ground.width / 2;
  ground.addImage(bgroundImage)

  invisibleGround = createSprite(0, 380, 400, 50);
  invisibleGround.visible = false;

  monkey = createSprite(50, 360, 20, 20)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.11;

  ground.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
}

function draw() {

  //background("");



  if (ground.x > 200) {
    ground.x = 0;
  }

  monkey.collide(invisibleGround);

  if (keyDown("space") && monkey.y >= 200) {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.8

  if (gameState === PLAY) {
    stroke("white");
    textSize = (20);
    fill("white");
    //  survialTime = Math.ceil(frameCount / frameRate())
    // text("Survival Time: " + survivalTime, 300, 25);



    Banana();
    Obstacles();


    if (FoodGroup.collide(monkey)) {
      FoodGroup.destroyEach();
      score = score + 2;
      monkey.scale = monkey.scale + 0.0005;
      foodSound.play();
    }

    if (obstacleGroup.collide(monkey)) {
      obstacleGroup.destroyEach();
      monkey.scale = 0.11;
      //monkey.scale=monkey.scale-0.5;
      score = score - 2;
      hits = hits + 1;
      hitSound.play();
    }



    var rand = Math.round(random(10, 20, 30, 40));
    switch (score) {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14;
        break;
      case 30:
        monkey.scale = 0.16;
        break;
      case 40:
        monkey.scale = 0.18;
        break;
      default:
        break;
    }

    if (hits === 3) {
      gameState = END;
    }
  }

  drawSprites();

  stroke("white");
  textSize = (20);
  fill("white");
  text("Score: " + score, 15, 25);

  stroke("white");
  fill("white");
  text("H I T S : " + hits, 165, 100)

  if (gameState === END) {

    monkey.scale = 0;

    ground.velocityX = 0;

    FoodGroup.destroyEach();

    stroke("white");
    fill("white");
    text("Oh! The poor monkey got caught.", 100, 160);
    text("Press r to free the monkey", 120, 180);

    if (keyDown("r")) {

      gameState = (PLAY);
      ground.velocityX = 5;
      score = 0;
      hits = 0;
      monkey.scale = 0.11;

    }
  }
}


function Banana() {
  if (frameCount % 60 == 0) {
    banana = createSprite(400, 200, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.07
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -5;
    banana.lifetime = 100;
    FoodGroup.add(banana);
  }
}

function Obstacles() {
  if (frameCount % 150 == 0) {
    obstacle = createSprite(400, 325, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.17;
    obstacle.velocityX = -5;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 100;
  }
}