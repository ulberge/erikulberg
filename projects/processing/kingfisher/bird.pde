public class Bird extends Boid {
  
  PVector target;
  float rotation;
  float rotationSpeed;
  float flySpeed;
  float swimSpeed;
  
  float wingPosition;
  float flapSpeed;
  
  boolean openBeak;
  boolean wasInWater;
  
  float openBeakDistance;
  float catchFishDistance;
  float depositFishDistance;
  
  ArrayList<Boid> fishes;
  ArrayList<Boid> capturedFishes;
  
  Bird(float x, float y, ArrayList<Boid> fishes) {
    super(x, y);
    
    r = 22;
    flySpeed = 0.5;
    swimSpeed = 0.3;
    openBeakDistance = 100;
    catchFishDistance = 15;
    depositFishDistance = 30;
    
    rotation = PI/2;
    wingPosition = 0;
    rotationSpeed = 0.1*ADJUSTED_SPEED;
    flapSpeed = 0.2*ADJUSTED_SPEED;
    
    openBeak = false;
    wasInWater = false;
    
    this.fishes = fishes;
    capturedFishes = new ArrayList<Boid>();
    
    target = new PVector(0,0);
    currentForces = new HashMap<String, PVector>();
  }
  
  protected HashMap<String, PVector> getForces() {
    rotationSpeed = 0.1*ADJUSTED_SPEED;
    flapSpeed = 0.2*ADJUSTED_SPEED;
    currentForces.clear();
    target.mult(0);
    
    if (isInWater()) {
      if (!wasInWater) {
        // just entered water
        splash();
        wasInWater = true;
      }
      
      PVector swim = new PVector(sin(rotation), cos(rotation));
      swim.mult(swimSpeed);
      swim.mult(Math.max(0.2, 1-(0.08*capturedFishes.size())));
      currentForces.put("swim", swim);
      target.add(swim);
    } else {
      if (wasInWater) {
        // just left water
        splash();
        wasInWater = false;
      }
      
      PVector fly = new PVector(sin(rotation), cos(rotation));
      fly.mult(flySpeed);
      fly.mult(Math.max(0.2, 1-(0.03*capturedFishes.size())));
      currentForces.put("fly", fly);
      target.add(fly);
    }
    
    // Add natural forces
    if (isInWater()) {
      PVector water = resistanceWater();
      currentForces.put("water", water);
    } else {
      // Gravity affects bird more in climb and dive
      PVector birdGravity = new PVector(0, abs(cos(rotation)*GRAVITY_SCALE));
      currentForces.put("birdGravity", birdGravity);
      
      PVector air = resistanceAir();
      currentForces.put("air", air);
    }
    
    updateBird();
    
    return currentForces;
  }
  
  protected void splash() {
    float numBubbles = random(10, 30);
    for (int i = 0; i < numBubbles; i++) {
      PVector beakLocation = getBeakLocation();
      beakLocation.add(location);
      beakLocation.add(new PVector(random(-r,r), random(-r,r)));
      addBubble(beakLocation);
    }
  }

  protected void render() {
    float theta = target.heading();
    pushMatrix();
    rotate(theta);
    
    if (capturer != null) {
      rotate(rotation);
    }

    fill(BIRD_COLOR);
    
    // tail
    pushMatrix();
    translate(-6.6, 0);
    beginShape(TRIANGLES);
    vertex(0, 0);
    vertex(-13.2, 6.6);
    vertex(-13.2, -6.6);
    endShape();
    popMatrix();
    
    // body
    ellipse(0,0,17.6,13.2);
    
    // head
    pushMatrix();
    translate(13.2, 0);
    ellipse(0,0,11,11);
    popMatrix();
    
    renderWing();
    renderBeak();

    popMatrix();
    
    if (DEBUG) {
      drawForces(500);
    }
  }
  
  private void updateBird() {
    float flapChange;
    if (isInWater()) {
      flapChange = flapSpeed*0.1;
    } else {
      // flap at flapSpeed 1x at even, 0x at dive, 4x at climb
      flapChange = flapSpeed*sq(-cos(rotation)+1);
    }
    wingPosition += flapChange;
    
    openBeak = false;
    
    PVector beakLocation = getBeakLocation();
    float theta = target.heading();
    beakLocation.rotate(theta);
    beakLocation.add(location);
    
    ArrayList<Integer> fishToRemove = new ArrayList<Integer>();
    // Capture fish near bird beak
    int i = 0;
    for (Boid fish : fishes) {
      float d = PVector.dist(location,fish.location);
      
      if (d < openBeakDistance) {
        openBeak = true;
      }
      
      if (fish.capturer == null) {
        if (PVector.dist(beakLocation,fish.location) < catchFishDistance) {
          capture(fish);
          fishToRemove.add(0, i);
          capturedFishes.add(fish);
        }
      }
      i++;
    }
    
    for (int index : fishToRemove) {
      fishes.remove(index);
    }
    
    // deposit fish from bird beak in nest
    PVector nestLocation = getNestLocation();
    if (PVector.dist(beakLocation,nestLocation) < depositFishDistance) {
      int fishCount = capturedFishes.size();
      depositFish(fishCount);
      capturedFishes.clear();
    }
  }
  
  private PVector getBeakLocation() {
    return new PVector(25.08,0);
  }
  
  private void renderBeak() {
    pushMatrix();
    PVector beakLocation = getBeakLocation();
    translate(beakLocation.x, beakLocation.y);
    
    fill(FISH_COLOR);
    for (Boid fish: capturedFishes) {
       fish.render(); 
    }
    
    fill(BIRD_BEAK_COLOR);
    
    if (openBeak) {
      beginShape();
      // top
      vertex(-8.8, 0);
      vertex(-8.8, 4.4);
      vertex(-2.2, 6.6);
      vertex(-8.8, 0);
      
      //bottom
      vertex(-8.8, -4.4);
      vertex(-2.2, -6.6);
      vertex(-8.8, 0);
      endShape();
    } else {
      beginShape(TRIANGLES);
      vertex(0, 0);
      vertex(-8.8, 4.4);
      vertex(-8.8, -4.4);
      endShape();
    }
    
    popMatrix();
  }
  
  private void renderWing() {
    float wingHeight = sin(wingPosition)*0.6;
    
    // wing
    pushMatrix();
    translate(0, 0);
    beginShape(TRIANGLES);
    vertex(8.8, 0);
    vertex(0, r*wingHeight);
    vertex(-8.8, 0);
    endShape();
    popMatrix();
  }
  
  public void turnLeft () {
    rotation += rotationSpeed;
  }
  
  public void turnRight () {
    rotation -= rotationSpeed;
  }

}