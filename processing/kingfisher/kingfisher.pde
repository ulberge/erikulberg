boolean DEBUG=false;
boolean GAME_OVER = false;
boolean GAME_STARTED = false;
boolean RENDER_ONCE = false;
PFont FONT;

float FISH_SPAWN_RATE= 0.2;
float GRAVITY_SCALE = 0.2;
float MAX_TIME_DECREASE_RATE = 0.005;
float BUBBLE_RATE = 0.001;

// Number of draw frames per second
float FRAME_RATE = 50;
// Frequency of updating animal desires
float LOGIC_RATE = 1;
float LOGIC_COUNTER = 0;
float STROKE_WEIGHT = 1.5;

float SHARK_CAPTURE_DISTANCE = 10;

float FISH_TIME_RATE = 1;
float TARGET_FISH_POPULATION = 25;

float SHARK_RATE = 20;
float HAWK_RATE = 40;
float INIT_TIME = 45;
float WATER_LEVEL = 0.6;

float ADJUSTED_SPEED;

float SHARK_TIMER;
float HAWK_TIMER;
int FISH_CAPTURED;
float TIMER;
float MAX_TIME;

float DEFAULT_GAME_WIDTH = 1000;
float DEFAULT_GAME_HEIGHT = 600;

// PALETTE
color WATER_COLOR = #33FFB4;
color AIR_COLOR = #26D7FF;
color PLANT_COLOR = #26FF35;
color MOUNTAIN_COLOR = #39737F;
color HILL_COLOR = #D4C84A;
color FISH_COLOR = #EBCC46;
color BIRD_BEAK_COLOR = #EBCC46;
color NEST_COLOR = #EBCC46;
color TREE_COLOR = #B25400;
color SHARK_COLOR = #5C8E99;
color HAWK_COLOR = color(110);
color BIRD_COLOR = color(220);

Background background;
Flock fishes;
Flock sharks;
Flock hawks;
HashMap<String, Flock> animalKingdom;
Bird bird;

ArrayList<Bubble> BUBBLES;

void setup() {
  size(1000,600);
  FONT = createFont("Helvetica",16,true);
  
  frameRate(FRAME_RATE);
  ADJUSTED_SPEED = 60.0/frameRate;
  
  restart();
}

void restart() {
  FISH_CAPTURED = 0;
  TIMER = INIT_TIME;
  MAX_TIME = INIT_TIME;
  SHARK_TIMER = 0;
  HAWK_TIMER = 0;
  
  background = new Background(WATER_LEVEL);
  fishes = new Flock(FISH_COLOR);
  sharks = new Flock(SHARK_COLOR);
  hawks = new Flock(HAWK_COLOR);
  BUBBLES = new ArrayList<Bubble>();
  
  animalKingdom = new HashMap<String, Flock>();
  animalKingdom.put("fishes", fishes);
  animalKingdom.put("sharks", sharks);
  animalKingdom.put("hawks", hawks);

  for (int i = 0; i < TARGET_FISH_POPULATION; i++) {
    addFish();
  }
  
  bird = new Bird(DEFAULT_GAME_WIDTH/10, DEFAULT_GAME_HEIGHT/10, fishes.boids);

  for (int i = 0; i < 5; i++) {
    addShark();
  }
  for (int i = 0; i < 1; i++) {
    addHawk();
  }
}

void draw() {
  if (!GAME_STARTED) {
    if (!RENDER_ONCE) {
      runGame(); 
      RENDER_ONCE = true;
    }
    
    renderStartMenu();
    return;
  }
  if (GAME_OVER) {
    renderGameOver();
    return;
  }
  
  runGame();
}

void renderStartMenu() {
  float rectWidth = 450;
  float rectHeight = 250;
  fill(40);
  stroke(0);
  strokeWeight(STROKE_WEIGHT*1.5);
  textSize(16);
  rect((-rectWidth+width)/2, (-rectHeight+height)/2, rectWidth, rectHeight, 6, 6, 6, 6);
  textAlign(CENTER, CENTER);
  
  fill(255);
  textFont(FONT, 30);
  text("Kingfisher.js", width/2, (height/2)-rectHeight*0.31);
  textFont(FONT, 18);
  text("Bring fish to your nest before time runs out.\nAvoid sharks and hawks!\n\nRotate Bird: ← and →\nStart Game: <ENTER>", width/2, (height/2)+rectHeight*0.12);
  
  strokeWeight(STROKE_WEIGHT);
  
  Bird dummyBird = new Bird(0,0,null);
  pushMatrix();
  translate((width/2)-150, (height/2)-rectHeight*0.31);
  rotate(-PI/4);
  scale(1.3);
  dummyBird.render();
  popMatrix();
  
  Fish dummyFish = new Fish(0,0,null);
  dummyFish.r = 14;
  pushMatrix();
  translate((width/2)+150, (height/2)-rectHeight*0.31);
  rotate(PI/4);
  fill(FISH_COLOR);
  scale(1.3);
  dummyFish.render();
  popMatrix();
}

void renderGameOver() {
  float rectWidth = 450;
  float rectHeight = 250;
  fill(40);
  stroke(0);
  strokeWeight(STROKE_WEIGHT*1.5);
  textSize(16);
  rect((-rectWidth+width)/2, (-rectHeight+height)/2, rectWidth, rectHeight, 6, 6, 6, 6);
  textAlign(CENTER, CENTER);
  
  fill(255);
  textFont(FONT, 30);
  text("Game Over!", width/2, (height/2)-rectHeight*0.31);
  textFont(FONT, 18);
  text("Bring fish to your nest before time runs out.\nAvoid sharks and hawks!\n\nRotate Bird: ← and →\nRestart Game: <ENTER>", width/2, (height/2)+rectHeight*0.12);
  
  strokeWeight(STROKE_WEIGHT);
  
  Bird dummyBird = new Bird(0,0,null);
  pushMatrix();
  translate((width/2)-150, (height/2)-rectHeight*0.31);
  rotate(-PI/4);
  scale(1.3);
  dummyBird.render();
  popMatrix();
  
  Fish dummyFish = new Fish(0,0,null);
  dummyFish.r = 14;
  pushMatrix();
  translate((width/2)+150, (height/2)-rectHeight*0.31);
  rotate(PI/4);
  fill(FISH_COLOR);
  scale(1.3);
  dummyFish.render();
  popMatrix();
}
  
void runGame() {
  ADJUSTED_SPEED = 60.0/frameRate;
  LOGIC_COUNTER++;
  boolean updateLogic = false;
  if (LOGIC_COUNTER == LOGIC_RATE) {
    updateLogic = true;
    LOGIC_COUNTER = 0;
  }
  
  runKeyboard();
  
  TIMER -= 1.0/frameRate;
  if (TIMER <= 0 || bird.capturer != null) {
    GAME_OVER = true;
    return;
  }
  MAX_TIME -= MAX_TIME_DECREASE_RATE/frameRate;

  strokeWeight(STROKE_WEIGHT);
  pushMatrix();
  scale(width/DEFAULT_GAME_WIDTH, height/DEFAULT_GAME_HEIGHT);
  
  background.render();
  
  renderInfo();
  
  for (Flock f : animalKingdom.values()) {
    f.run(updateLogic);
  }
  
  bird.run(true);
  
  runBubbles();
  popMatrix();
  
  runSpawn();
}

void addFish() {
  Boid b = new Fish(random(DEFAULT_GAME_WIDTH),random(getWaterLevel(), DEFAULT_GAME_HEIGHT), fishes.boids);
  fishes.addBoid(b);
}

void addShark() {
  Boid b = new Shark(random(DEFAULT_GAME_WIDTH),random(getWaterLevel(), DEFAULT_GAME_HEIGHT), bird, sharks.boids);
  sharks.addBoid(b);
}

void addHawk() {
  Boid b = new Hawk(random(DEFAULT_GAME_WIDTH/2, DEFAULT_GAME_WIDTH),random(0, getWaterLevel()), bird, hawks.boids);
  hawks.addBoid(b);
}


void runBubbles() {
  ArrayList<Integer> bubblesToRemove = new ArrayList<Integer>();
  int i = 0;
  fill(color(47, 188, 176));
  strokeWeight(1);
  for (Bubble bubble: BUBBLES) {
    if (bubble.isInWater()) {
      bubble.render();
    } else {
      bubblesToRemove.add(0, i);
    }
    i++;
  }
  strokeWeight(STROKE_WEIGHT);
  for (int index : bubblesToRemove) {
    BUBBLES.remove(index);
  }
}

void runSpawn() {
  float fishProbability = (FISH_SPAWN_RATE * (1-((float)fishes.boids.size()/TARGET_FISH_POPULATION)));
  if (random(1) < fishProbability) {
    addFish();
  }
  
  if (SHARK_TIMER > SHARK_RATE && !bird.isInWater()) {
    addShark();
    SHARK_TIMER -= SHARK_RATE;
  }
  SHARK_TIMER += 1.0/frameRate;
  
  if (HAWK_TIMER > HAWK_RATE && bird.isInWater()) {
    addHawk();
    HAWK_TIMER -= HAWK_RATE;
  }
  HAWK_TIMER += 1.0/frameRate;
}

void runKeyboard() {
  if (keyPressed == true && key == CODED) {
    if (keyCode == LEFT) {
      // rotate bird counter clockwise
      bird.turnLeft();
    } else if (keyCode == RIGHT) {
      // rotate bird clockwise
      bird.turnRight();
    }
  }
}

void keyPressed() {
  if (!GAME_STARTED && (keyCode == RETURN || keyCode == ENTER)) {
    GAME_STARTED = true;
  } 
  if (GAME_OVER && (keyCode == RETURN || keyCode == ENTER)) {
    GAME_OVER = false;
    restart();
  } 
}

float getWaterLevel() {
  return background.getWaterLevel();
}

PVector getNestLocation() {
  return background.getNestLocation();  
}

void depositFish(int fishCount) {
  FISH_CAPTURED += fishCount;
  TIMER += FISH_TIME_RATE;
  TIMER = Math.min(TIMER, MAX_TIME);
}

void renderInfo() {
  pushMatrix();
  translate(DEFAULT_GAME_WIDTH*0.68, DEFAULT_GAME_HEIGHT*0.03);
  //renderLives();
  translate(DEFAULT_GAME_WIDTH*0.105, 0);
  renderTimer();
  translate(DEFAULT_GAME_WIDTH*0.115, 0);
  renderScore();
  popMatrix(); 
}

void renderTimer() {
  float clockSize = 16;
  float barWidth = 60;
  float barHeight = 10;
  
  stroke(0);
  fill(255);
  
  pushMatrix();
  translate(0,(clockSize*0.0625)+barHeight/2);
  ellipse(0,0,clockSize,clockSize);
  ellipse(0,-clockSize*0.625,clockSize*0.375,clockSize*0.125);
  line(0,0,clockSize*0.25,-clockSize*0.1875);
  popMatrix();
  
  pushMatrix();
  translate(clockSize,0);
  fill(255);
  rect(0, 0, barWidth, barHeight);
  float percentFull = TIMER/INIT_TIME;
  color c = color(100+((1-percentFull)*(155)), 100*percentFull, 100*percentFull);
  fill(c);
  rect(0, 0, percentFull*barWidth, barHeight);
  popMatrix();
}

void renderScore() {
  float barHeight = 10;
  
  Fish dummyFish = new Fish(0,0,null);
  dummyFish.r = 14;
  pushMatrix();
  translate(0,barHeight/2);
  fill(FISH_COLOR);
  dummyFish.render();
  popMatrix();
  
  pushMatrix();
  translate(dummyFish.r,-6);
  
  pushMatrix();
  fill(60);
  stroke(0);
  rect(0,0,34,24);
  popMatrix();
  
  pushMatrix();
  translate(17,12);
  fill(255);
  scale(1, 0.85);
  textFont(FONT, 16);
  textAlign(CENTER, CENTER);
  text(FISH_CAPTURED, 0, 0);
  popMatrix();
  
  popMatrix();
}