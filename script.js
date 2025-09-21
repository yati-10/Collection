/* VARIABLES */
let catcher;
let fallingObject;
let fallingObject2;
let score = 0;

/* PRELOAD LOADS FILES */
function preload(){
  backGround = loadImage("assets/bg.png");
  basketImg = loadImage("assets/basket.png");
  basketImg.resize(60, 0);
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);

  // Falling objects
  fallingObject = new Sprite(random(10,390), -10,20);
  fallingObject2 = new Sprite(random(10,390),-10,20);
  fallingObject.vel.y = random(2,4);
  fallingObject2.vel.y = random(2,4);
  fallingObject.color = color(0, 255, 0); 
  fallingObject2.color = color(0, 0, 255); 

  // Create catcher 
  catcher = new Sprite(200,380,100,20);
  catcher.color = color(95,158,160);
  catcher.collider = "k";
  catcher.image = basketImg;

  catcher.width = 10; 
  catcher.height = 10;
} 

/* DRAW LOOP REPEATS */
function draw() {
  image(backGround,0,0,400,400);

  // Catcher movement
  if (kb.pressing("left")){
    catcher.vel.x = -5;
  }
  else if (kb.pressing("right")){
    catcher.vel.x = 5;
  } else {
    catcher.vel.x = 0;
    catcher.vel.y = 0; 
  }

  // Catcher on screen
  if (catcher.y > 380) catcher.y = 380;
  if (catcher.x > width) catcher.x = width;

  // Score
  fill(0);
  textSize(12);
  text("Score: " + score, 10, 20);

  // Object collisions
  if (fallingObject.collide(catcher)){
    score += 1;
    resetObject(fallingObject);
    fallingObject.color = color(random(255), random(255), random(255));
  } else if (fallingObject.y >= height){
    if (score >0) {
      score -= 1;
    }
    resetObject(fallingObject);
    fallingObject.color = color(random(255), random(255), random(255));
  }

  if (fallingObject2.collide(catcher)){
    score += 1;
    resetObject(fallingObject2);
    fallingObject2.color = color(random(255), random(255), random(255));
  } else if (fallingObject2.y >= height){
    if (score > 0){
      score -= 1;
    }
    resetObject(fallingObject2);
    fallingObject2.color = color(random(255), random(255), random(255));
  }

  // Win/lose 
  if (score >= 15){
    gameOver("You\n win!", 30, 110);
  } else if (score <= -5){
    gameOver("You lose!", 70, 80);
  }  
}

function resetObject(obj) {
  obj.pos = {x: random(width), y: -10};
  obj.vel.y = random(2,4);
  obj.direction = "down";
}

function gameOver(message, x, y) {
  background('grey');
  fill('black');
  textSize(35);
  text(message, x, y);

  // Stop  objects
  fallingObject.pos = {x: -200, y: -200};
  fallingObject2.pos = {x: -200, y: -200};
  catcher.pos = {x: -200, y: -200};
  fallingObject.vel.y = 0;
  fallingObject2.vel.y = 0;
}