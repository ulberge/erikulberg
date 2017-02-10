public class Fish extends Boid {
  float flockSeparation;
  float sepMod;
  float aliMod;
  float cohMod;
  float wanderR;
  float wanderD;
  float wanderlust;
  float wanderChange;
  float wanderTheta;
  float wanderMod;
  
  ArrayList<Boid> fishes;
  private PVector target;
  
  Fish(float x, float y, ArrayList<Boid> fishes) {
    super(x, y);
    
    r = 12;
    sepMod = 0.005;
    aliMod = 0.005;
    cohMod = 0.005;
    wanderMod = 0.1;
    
    wanderR = 2;
    wanderD = 100;
    wanderChange = 0.1;
    wanderlust = 1;
    wanderTheta = 0;
    
    flockSeparation = 25.0;
    
    target = new PVector(0,0);
    
    this.fishes = fishes;
  }
  
  protected HashMap<String, PVector> getForces() {
    target.mult(0);
    HashMap<String, PVector> forces = new HashMap<String, PVector>();
    
    // Fish can only swim in water
    if (isInWater()) {
      wanderTheta += random(-wanderChange,wanderChange);
      PVector wanderForce = wander(wanderR, wanderD, wanderlust, wanderTheta);
      wanderForce.mult(wanderMod);
      forces.put("wander", wanderForce);
      target.add(wanderForce);
      
      // Flock
      //PVector sep = separate(fishes, flockSeparation);   // Separation
      //PVector ali = align(fishes);      // Alignment
      //PVector coh = cohesion(fishes);   // Cohesion
      
      //sep.mult(sepMod);
      //ali.mult(aliMod);
      //coh.mult(cohMod);
  
      //forces.put("sep", sep);
      //forces.put("ali", ali);    
      //forces.put("coh", coh);
      // End Flock
      
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
    pushMatrix();
    rotate(theta);
    
    pushMatrix();
    
    scale(4);
    
    //noStroke();
    pushMatrix();
    beginShape(TRIANGLES);
    translate(-4, 0);
    vertex(0, 0);
    vertex(-6, 6);
    vertex(-6, -6);
    endShape();
    popMatrix();
    ellipse(0,0,12,12);
    
    popMatrix();
    
    fill(color(0,0,0));
    text("Bauer", 0, 0);
    fill(FISH_COLOR);

    popMatrix();
    
    if (DEBUG) {
      drawForces(5000);
    }
  }

}