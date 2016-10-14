public class Hawk extends Boid {
  
  float wanderR;
  float wanderD;
  float wanderlust;
  float wanderChange;
  float wanderTheta;
  float wanderMod;
  float seekSpeed;
  float separation;
  
  float airSpeed;
  float wingPosition;
  float flapSpeed;
  
  int turnTimer;
  int turnLimit;
  boolean isLeftFacing;
  boolean openMouth;
  float openMouthDistance;
  
  boolean hasTarget;
  
  private Boid prey;
  private PVector target;
  
  ArrayList<Boid> hawks;
  ArrayList<Boid> capturedPrey;
  
  Hawk(float x, float y, Boid prey, ArrayList<Boid> hawks) {
    super(x, y);
    
    r = 16;
    wanderMod = 1;
    
    wanderR = 2;
    wanderD = 100;
    wanderChange = 0.1;
    wanderlust = 1.3;
    wanderTheta = 0;
    separation = 60;
    
    airSpeed = 0.3;
    wingPosition = 0;
    flapSpeed = 0.1;
    
    turnTimer = 0;
    turnLimit = 10;
    openMouth = false;
    openMouthDistance = r*3;
    
    hasTarget = false;
    
    target = new PVector(0,0);
    this.prey = prey;
    this.hawks = hawks;
    capturedPrey = new ArrayList<Boid>();
  }
  
  protected HashMap<String, PVector> getForces() {
    target.mult(0);
    HashMap<String, PVector> forces = new HashMap<String, PVector>();
    
    // Fish can only swim in water
    if (!isInWater()) {
      if (prey != null && prey.capturer == null && !prey.isInWater()) {
        PVector seekForce = seek(prey.location);
        forces.put("seek", seekForce);
      
        PVector fly = velocity.get();
        fly.mult(airSpeed);
        forces.put("fly", fly);
        target.add(fly);
        hasTarget = true;
      } else {
        if (hasTarget) {
          // maintain target for a little bit before losing interest
          target.add(velocity);
          if (random(1) < 0.01) {
             hasTarget = false;
          }
        } else {
          wanderTheta += random(-wanderChange,wanderChange);
          PVector wanderForce = wander(wanderR, wanderD, wanderlust, wanderTheta);
          wanderForce.mult(wanderMod);
          forces.put("wander", wanderForce);
        }
      }
    } else {
      PVector gravityVector = gravity();
      gravityVector.mult(-1);
      forces.put("gravity", gravityVector);
    }
    
    // Add natural forces
    if (isInWater()) {
      PVector water = resistanceWater();
      currentForces.put("water", water);
    } else {
      // Gravity affects bird more in climb and dive
      PVector birdGravity = new PVector(0, abs(cos(target.heading())*GRAVITY_SCALE));
      currentForces.put("birdGravity", birdGravity);
      
      PVector separateVector = separate(hawks, separation);
      forces.put("separate", separateVector);
      
      PVector air = resistanceAir();
      currentForces.put("air", air);
    }
    
    return forces;
  }

  protected void render() {
    float theta = target.heading();
    
    turnTimer -= 1;
    if (turnTimer <= 0) {
      // only update isLeftFacing if turnTimer = 0;
      if (cos(theta) <= 0) {
        isLeftFacing = true;
      } else {
        isLeftFacing = false;
      }
      turnTimer = turnLimit;
    }
    
    PVector mouthLocation = getMouthLocation();
    if (isLeftFacing) {
      mouthLocation.rotate(PI);
    }
    mouthLocation.rotate(theta);
    mouthLocation.add(location);
    
    float preyDistance = PVector.dist(prey.location, mouthLocation);
    if (capturedPrey.size() > 0 || (prey.capturer == null && preyDistance < openMouthDistance)) {
      openMouth = true;
    } else {
      openMouth = false;
    }
    
    if (preyDistance < 10) {
      if (prey.capturer == null) {
        capture(prey);
        capturedPrey.add(prey);
      }
    }
    pushMatrix();
    
    if (!isLeftFacing) {
      scale(-1, 1);
    }
    
    pushMatrix();
    scale(1.8);
    strokeWeight(STROKE_WEIGHT/1.8);
    
    fill(HAWK_COLOR);
    
    // tail
    pushMatrix();
    translate(-20, -20);
    beginShape();
    vertex(1.88,22.78);
    vertex(0.63,17.41);
    vertex(4.5,17.28);
    vertex(15,18.28);
    vertex(16.13,17.03);
    vertex(18.75,17.03);
    vertex(29.88,3.03);
    vertex(34,0.66);
    vertex(37.63,5.66);
    vertex(32.38,16.28);
    vertex(24.88,23.16);
    vertex(31.25,24.78);
    vertex(30.75,30.53);
    vertex(25.38,35.28);
    vertex(21.25,34.66);
    vertex(18.13,32.78);
    vertex(19.75,25.78);
    vertex(13,26.53);
    vertex(1.88,22.78);
    endShape();
    popMatrix();
    
    // body
    pushMatrix();
    rotate(PI/4);
    translate(2, 2);
    ellipse(0,0,12,6);
    popMatrix();
    
    // head
    pushMatrix();
    translate(-4, -2.5);
    ellipse(0,0,6,5);
    popMatrix();
    
    renderBeak();
    
    strokeWeight(STROKE_WEIGHT);
    popMatrix();
    
    renderPrey();
    popMatrix();
    if (DEBUG) {
      drawForces(500);
    }
  }
  
  
  private void renderBeak() {
    pushMatrix();
    PVector beakLocation = getMouthLocation();
    translate(beakLocation.x, beakLocation.y);
    
    fill(color(255, 205, 34));
    
    float preyDistance = PVector.dist(prey.location, location);
    if (capturedPrey.size() > 0 || (prey.capturer == null && preyDistance < openMouthDistance)) {
      openMouth = true;
    } else {
      openMouth = false;
    }
    
    if (openMouth) {
      beginShape();
      // top
      vertex(4, 0);
      vertex(0.5, -2);
      vertex(4, -2);
      vertex(4, 0);
      
      //bottom
      vertex(4, 3);
      vertex(0.5, 2);
      vertex(4, 0);
      endShape();
    } else {
      beginShape(TRIANGLES);
      vertex(0, 0);
      vertex(4, 3);
      vertex(4, -2);
      endShape();
    }
    
    popMatrix();
  }
  
  void renderPrey() {
    pushMatrix();
    PVector mouthLocation = getMouthLocation();
    translate(mouthLocation.x, mouthLocation.y);
    
    for (Boid prey: capturedPrey) {
       prey.render(); 
       fill(SHARK_COLOR);
    }
    
    popMatrix();
  }
  
  private PVector getMouthLocation() {
    return new PVector(-8,-3);
  }
}