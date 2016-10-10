public class Background {
  
  float waterLevel;
  
  float mountainHeight;
  float mountainBase;
  float grassHeight;
  float maxWaveHeight;
  float maxPlantWave;
  float numWaves;
  float birdTimer;
  float birdHeight;
  float plantTimer;
  float plantSpeed;
  int numPlants;
  
  ArrayList<Plant> plants;
  
  Background(float waterLevel) {
    this.waterLevel = waterLevel;
    mountainHeight = 0.25*DEFAULT_GAME_HEIGHT;
    mountainBase = DEFAULT_GAME_HEIGHT*waterLevel;
    grassHeight = 0.03;
    maxWaveHeight = 8;
    maxPlantWave = 8;
    numWaves = 7;
    birdTimer = 0;
    birdHeight = 0;
    plantTimer = 0;
    plantSpeed = 0.005;
    numPlants = 10;
    
    float plantHeight = 100;
    float plantWidth = 8;
    float plantSpread = 5;
    plants = new ArrayList<Plant>();
    for (int i = 0; i < numPlants; i++) {
      float size = Math.min(1, 0.4 + (0.4*randomGaussian()));
      plants.add(new Plant(plantHeight*size, plantWidth*size, plantSpread*size, random(-0.1, 1.1)*DEFAULT_GAME_WIDTH, random(1)>0.5));
    }
  }

  public void render() {
    drawWater();
    drawAir();
    drawMoutains();
    drawTree();
    drawNest();
    drawPlants();
  }
  
  void drawWater() {
    noStroke();
    fill(color(23, 229, 153));
    rect(0, DEFAULT_GAME_HEIGHT*waterLevel, DEFAULT_GAME_WIDTH, DEFAULT_GAME_HEIGHT);
  }
  
  void drawAir() {
    noStroke();
    fill(color(47, 188, 176));
    rect(0, 0, DEFAULT_GAME_WIDTH, DEFAULT_GAME_HEIGHT*waterLevel);
  }
  
  void drawTree() {
    pushMatrix();
    translate(-1,-1);
    stroke(0);
    fill(color(178, 84, 0));
    beginShape();
    vertex(1,317);
    vertex(62,218);
    vertex(78,128);
    vertex(88,109);
    vertex(125,116);
    vertex(181,113);
    vertex(196,127);
    vertex(184,109);
    vertex(212,94);
    vertex(222,84);
    vertex(199,95);
    vertex(163,107);
    vertex(119,104);
    vertex(89,93);
    vertex(115,40);
    vertex(138,28);
    vertex(179,7);
    vertex(190,0);
    vertex(171,0);
    vertex(146,14);
    vertex(107,29);
    vertex(94,54);
    vertex(80,74);
    vertex(63,38);
    vertex(65,27);
    vertex(53,35);
    vertex(63,59);
    vertex(68,91);
    vertex(61,97);
    vertex(50,136);
    vertex(40,200);
    vertex(17,227);
    vertex(0,236);
    vertex(0,317);
    endShape();
    popMatrix();
  }
  
  void drawNest() {
    stroke(0);
    pushMatrix();
    translate(120,89);
    
    birdTimer += (3-(TIMER/INIT_TIME)) * 0.025 * ADJUSTED_SPEED;
    birdHeight = 3-(TIMER/INIT_TIME);
    
    pushMatrix();
    translate(20, 6);
    drawBabyBird(0);
    translate(10, 2);
    drawBabyBird(1);
    translate(10, -5);
    drawBabyBird(2);
    popMatrix();
    
    fill(color(229, 169, 23));
    stroke(0);
    beginShape();
    vertex(0,4);
    vertex(6,17);
    vertex(40,20);
    vertex(54,15);
    vertex(57,0);
    vertex(22,7);
    vertex(0,4);
    endShape();
    
    
    popMatrix();
  }
  
  void drawBabyBird(float seed) {
    pushMatrix();
    float speed = 5;
    float pos = abs(sin(birdTimer*speed + seed));
    float vpos = birdHeight*abs(sin(birdTimer*speed + seed));
    
    fill(220);
    translate(-1.25*vpos,-2.5*vpos);
    ellipse(0,0,10,10);
    fill(color(255, 205, 34));
    translate(0,-5);
    beginShape();
    vertex(0,0);
    vertex(-3,1);
    vertex(-5*pos,-3);
    vertex(-2.5*pos,-2);
    vertex(0,0);
    vertex(2.5*pos,-2);
    vertex(5*pos,-3);
    vertex(3,1);
    vertex(0,0);
    endShape();
    popMatrix();
  }
  
  void drawMoutains() {
    
    // far mountains
    fill(color(64, 115,127));
    stroke(0);
    beginShape();
    vertex(-100,360);
    vertex(1100,360);
    vertex(1000,285);
    vertex(800,240);
    vertex(700,290);
    vertex(550,250);
    vertex(450,270);
    vertex(250,220);
    vertex(50,246);
    vertex(0,283);
    vertex(-100,320);
    endShape();
    
    // close hills
    fill(color(203, 194, 92));
    stroke(0);
    beginShape();
    vertex(-100,360);
    vertex(1100,360);
    vertex(1100,330);
    vertex(900,320);
    vertex(730,330);
    vertex(590,303);
    vertex(350,318);
    vertex(150,301);
    vertex(-100,360);
    endShape();
    
    // water top
    fill(color(89, 255, 241));
    beginShape();
    float locX = 0;
    float locY = 0;
    vertex(-100,  mountainBase);
    for (int i = 0; i < numWaves; i++) {
      locX+=DEFAULT_GAME_WIDTH/numWaves;
      float waveHeight = map(noise(locX, TIMER),0,1,-maxWaveHeight,maxWaveHeight);
      locY=mountainBase+waveHeight;
      //quadraticVertex(locX, locY, locX, locY);
      vertex(locX, locY);
    }
    vertex(1100, mountainBase);
    endShape();
  }
  
  void drawPlants() {
    stroke(0);
    plantTimer += plantSpeed*ADJUSTED_SPEED;
    pushMatrix();
    translate(0, 601);
    fill(color(40, 201, 96));
    
    for (Plant plant: plants) {
      plant.render(plantTimer);
    }
    
    popMatrix();
  }
  
  PVector getNestLocation() {
    return new PVector(137, 85);  
  }
  
  float getWaterLevel() {
    return waterLevel*DEFAULT_GAME_HEIGHT;
  }
}

public class Plant {
   float plantHeight;
   float plantWidth;
   float plantSpread;
   float locX;
   boolean isReverse;
   
   ArrayList<PVector> vertices;
   
   Plant(float plantHeight, float plantWidth, float plantSpread, float locX, boolean isReverse) {
     this.plantHeight = plantHeight;
     this.plantWidth = plantWidth;
     this.plantSpread = plantSpread;
     this.locX = locX;
     this.isReverse = isReverse;
     vertices = new ArrayList<PVector>();
     vertices.add(new PVector(0,0));
     vertices.add(new PVector(plantSpread*2,-plantHeight*0.3));
     vertices.add(new PVector(plantSpread*0.1,-plantHeight*0.4));
     vertices.add(new PVector(-plantSpread*1,-plantHeight*0.7));
     vertices.add(new PVector(plantSpread*0.5,-plantHeight*0.9));
     vertices.add(new PVector(plantSpread*0.5+plantWidth,-plantHeight*0.8));
     vertices.add(new PVector(-plantSpread*1+plantWidth,-plantHeight*0.7));
     vertices.add(new PVector(plantSpread*0.1+plantWidth,-plantHeight*0.4));
     vertices.add(new PVector(plantSpread*2+plantWidth,-plantHeight*0.3));
     vertices.add(new PVector(plantWidth,0));
   }
   
  void render(float plantTimer) {
    pushMatrix();
    translate(locX, 0);
    rotate(-0.314159 + (noise(plantTimer+(locX*0.001))*0.6283));
    if (isReverse) {
      scale(-1,1);
    }
    
    pushMatrix();
    beginShape();
    for(PVector v: vertices) {
      vertex(v.x, v.y); 
    }
    endShape();
    popMatrix();
    popMatrix();
  }
  
}