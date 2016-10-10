boolean DEBUG=false;
boolean GAME_OVER = false;
boolean GAME_STARTED = false;
boolean RENDER_ONCE = false;
PFont FONT;

float FISH_SPAWN_RATE= 0.2;
float GRAVITY_SCALE = 0.2;
float MAX_TIME_DECREASE_RATE = 0.02;
float BUBBLE_RATE = 0.001;

// Number of draw frames per second
float FRAME_RATE = 60;
// Frequency of updating animal desires
float LOGIC_RATE = 3;
float LOGIC_COUNTER = 0;

float SHARK_CAPTURE_DISTANCE = 10;

float FISH_TIME_RATE = 0.5;
float TARGET_FISH_POPULATION = 25;

float SHARK_RATE = 10;
float INIT_TIME = 45;
float WATER_LEVEL = 0.6;

float ADJUSTED_SPEED;

float SHARK_TIMER;
int FISH_CAPTURED;
float TIMER;
float MAX_TIME;

float DEFAULT_GAME_WIDTH = 1000;
float DEFAULT_GAME_HEIGHT = 600;

// PALETTE
color FISH_COLOR = color(255, 205, 34);
color SHARK_COLOR = color(140);

Background background;
Flock fishes;
Flock sharks;
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
  
  background = new Background(WATER_LEVEL);
  fishes = new Flock(FISH_COLOR);
  sharks = new Flock(SHARK_COLOR);
  BUBBLES = new ArrayList<Bubble>();
  
  animalKingdom = new HashMap<String, Flock>();
  animalKingdom.put("fishes", fishes);
  animalKingdom.put("sharks", sharks);

  for (int i = 0; i < TARGET_FISH_POPULATION; i++) {
    addFish();
  }
  
  bird = new Bird(DEFAULT_GAME_WIDTH/10, DEFAULT_GAME_HEIGHT/10, fishes.boids);

  for (int i = 0; i < 5; i++) {
    addShark();
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
  float rectWidth = 250;
  float rectHeight = 160;
  stroke(0);
  strokeWeight(2);
  fill(240);
  textSize(16);
  rect((-rectWidth+width)/2, (-rectHeight+height)/2, rectWidth, rectHeight);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Welcome to Kingfisher!\n\nRotate Bird Left: ←\nRotate Bird Right: →\nStart Game: <ENTER>", width/2, height/2);
  strokeWeight(1);
}

void renderGameOver() {
  float rectWidth = 250;
  float rectHeight = 160;
  stroke(0);
  strokeWeight(2);
  fill(240);
  textSize(16);
  rect((-rectWidth+width)/2, (-rectHeight+height)/2, rectWidth, rectHeight);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Game Over!\n\nRotate Bird Left: ←\nRotate Bird Right: →\nRestart Game: <ENTER>", width/2, height/2);
  strokeWeight(1);
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

  strokeWeight(1);
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

void runBubbles() {
  ArrayList<Integer> bubblesToRemove = new ArrayList<Integer>();
  int i = 0;
  fill(color(47, 188, 176));
  strokeWeight(0.6);
  for (Bubble bubble: BUBBLES) {
    if (bubble.isInWater()) {
      bubble.render();
    } else {
      bubblesToRemove.add(0, i);
    }
    i++;
  }
  strokeWeight(1);
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
  float chalkboardSize = 14;
  
  Fish dummyFish = new Fish(0,0,null);
  dummyFish.r = 14;
  pushMatrix();
  translate(0,barHeight/2);
  fill(FISH_COLOR);
  dummyFish.render();
  popMatrix();
  
  pushMatrix();
  translate(dummyFish.r,-chalkboardSize*0.6);
  
  pushMatrix();
  fill(60);
  stroke(0);
  rect(chalkboardSize*0.1,chalkboardSize*0.2,chalkboardSize*2.6,chalkboardSize*1.5);
  popMatrix();
  
  pushMatrix();
  translate(chalkboardSize*1.3,chalkboardSize*1.25);
  fill(255);
  scale(1, 0.85);
  textFont(FONT, 16);
  textAlign(CENTER);
  text(FISH_CAPTURED, 0, 0);
  popMatrix();
  
  popMatrix();
}