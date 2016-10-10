public class Shark extends Boid {
  
  float wanderR;
  float wanderD;
  float wanderlust;
  float wanderChange;
  float wanderTheta;
  float wanderMod;
  float seekSpeed;
  float separation;
  
  float tailPosition;
  float tailSpeed;
  
  int turnTimer;
  int turnLimit;
  boolean isLeftFacing;
  boolean openMouth;
  float openMouthDistance;
  
  boolean hasTarget;
  
  private Boid prey;
  private PVector target;
  
  ArrayList<Boid> sharks;
  ArrayList<Boid> capturedPrey;
  
  Shark(float x, float y, Boid prey, ArrayList<Boid> sharks) {
    super(x, y);
    
    r = 40;
    wanderMod = 0.1;
    
    wanderR = 2;
    wanderD = 100;
    wanderChange = 0.1;
    wanderlust = 0.3;
    wanderTheta = 0;
    separation = 60;
    
    tailPosition = random(2*PI);
    tailSpeed = 0.2*ADJUSTED_SPEED;
    
    turnTimer = 0;
    turnLimit = 10;
    isLeftFacing = false;
    openMouth = false;
    openMouthDistance = r*3;
    
    hasTarget = false;
    
    target = new PVector(0,0);
    this.prey = prey;
    this.sharks = sharks;
    capturedPrey = new ArrayList<Boid>();
  }
  
  protected HashMap<String, PVector> getForces() {
    tailSpeed = 0.2*ADJUSTED_SPEED;
    target.mult(0);
    HashMap<String, PVector> forces = new HashMap<String, PVector>();
    
    // Fish can only swim in water
    if (isInWater()) {
      if (prey != null && prey.capturer == null && prey.isInWater()) {
        PVector seekForce = seek(prey.location);
        forces.put("seek", seekForce);
        target.add(seekForce);
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
          target.add(wanderForce);
        }
      }
      
      PVector separateVector = separate(sharks, separation);
      forces.put("separate", separateVector);
      
      PVector water = resistanceWater();
      forces.put("water", water);
    } else {
      PVector gravityVector = gravity();
      forces.put("gravity", gravityVector);
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
    mouthLocation.add(location);
    
    float preyDistance = PVector.dist(prey.location, mouthLocation);
    if (capturedPrey.size() > 0 || (prey.capturer == null && preyDistance < openMouthDistance)) {
      openMouth = true;
    } else {
      openMouth = false;
    }
    
    if (preyDistance < SHARK_CAPTURE_DISTANCE) {
      if (prey.capturer == null) {
        capture(prey);
        capturedPrey.add(prey);
      }
    }
    
    pushMatrix();
    
    if (isLeftFacing) {
      scale(-1, 1);
    }

    renderPrey();
    
    pushMatrix();
    beginShape();
    // fin
    vertex(4, -8);
    vertex(6, -10);
    vertex(6, -18);
    vertex(16, -8);
    // end fin
    vertex(28, -8);
    renderMouth();
    // bottom wing
    vertex(24, 8);
    vertex(14, 8);
    // end bottom wing
    // belly
    
    // back half
    renderTail();
    
    // end back half
    vertex(4, -8);
    endShape();
    popMatrix();

    popMatrix();
    
    if (DEBUG) {
      drawForces(5000);
    }
  }
  
  void renderMouth() {
    if (openMouth) {
      vertex(42, -8);
      vertex(36.8, -4);
      vertex(28, 0);
      vertex(36, 6);
      vertex(34.4, 8);
    } else {
      vertex(44, -6);
      vertex(38, -2);
      vertex(28, 0);
      vertex(36.8, 2);
      vertex(36, 4);
    }
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
  
  void renderTail() {
    tailPosition += tailSpeed*velocity.mag();
    pushMatrix();
    // horizonatl scaling
    float tailDelta = -34.4 + (cos(tailPosition)*3.2);
    //vertical scaling
    float tailModifier = sin(tailPosition/2)*(0.8);
    
    vertex(tailDelta*0.5, 2-(tailModifier/2));
    
    // tail bottom tip
    vertex(tailDelta*0.7, 8-(tailModifier));
    
    vertex(tailDelta*0.6, 0);
    
    // tail toptip
    vertex(tailDelta*0.9, -12+(tailModifier));
    
    vertex(tailDelta*0.4, -2+(tailModifier/2));
    popMatrix();
  }
  
  private PVector getMouthLocation() {
    return new PVector(36,0);
  }
}