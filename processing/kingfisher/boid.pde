/**************************************************
*  
*  Boid Class
*
*  Based on Boid Class from "The Nature of Code,"
*  by Daniel Shiffman. http://natureofcode.com
*
***************************************************/

public abstract class Boid {

  protected PVector location;
  protected PVector velocity;
  protected PVector acceleration;
  
  private float maxforce = 1;
  
  public float r;
  
  HashMap<String, PVector> currentForces;
  Boid capturer;

  Boid(float x, float y) {
    acceleration = new PVector(0,0);
    velocity = new PVector(random(-0.1,0.1),random(-0.1,0.1));
    location = new PVector(x,y);
    currentForces = new HashMap<String, PVector>();
  }

  protected abstract HashMap<String, PVector> getForces();
  protected abstract void render();

  public void run(boolean updateLogic) {
    if (capturer != null) {
      return;
    }
    
    if (updateLogic) {
      currentForces.clear();
      currentForces = getForces();
      
      if (random(1) < BUBBLE_RATE) {
        //addBubble(location.copy());
        addBubble(location.get());
      }
      
      for (PVector force : currentForces.values()) {
        acceleration.add(force);
      }
    }

    update();
    borders();

    pushMatrix();
    translate(location.x,location.y);
    render();
    popMatrix();
  }
  
  protected void addBubble(PVector origin) {
    //BUBBLES.add(new Bubble(origin.copy()));
    BUBBLES.add(new Bubble(origin.get()));
  }
  
  protected boolean isInWater() {
    return location.y-10 > getWaterLevel();
  }
  
  private void borders() {
    if (location.x < r) {
      location.x = r;
      velocity.x = -velocity.x/2;
    }
    if (location.y < r) {
      location.y = r;
      velocity.y = -velocity.y/2;
    }
    if (location.x > DEFAULT_GAME_WIDTH-r) {
      location.x = DEFAULT_GAME_WIDTH-r;
      velocity.x = -velocity.x/2;
    }
    if (location.y > DEFAULT_GAME_HEIGHT-r) {
      location.y = DEFAULT_GAME_HEIGHT-r;
      velocity.y = -velocity.y/2;
    }
  }

  // Method to update location
  private void update() {
    // Update velocity
    velocity.add(acceleration);
    
    //PVector adjustedVelocity = velocity.copy();
    PVector adjustedVelocity = velocity.get();
    adjustedVelocity.mult(ADJUSTED_SPEED);
    
    location.add(adjustedVelocity);
    // Reset accelertion to 0 each cycle
    acceleration.mult(0);
  }
  
  public void capture(Boid captured) {
    captured.capturer = this;
    captured.velocity = velocity;
  }
  
  void drawForces(float size) {
    fill(color(0, 0, 256));
    ellipse(0, 0, 8, 8);
    for (String name : currentForces.keySet()) {
      PVector force = currentForces.get(name);
      if (force.mag() > 0) {
        pushMatrix();
        float endx = force.x*size;
        float endy = force.y*size;
        fill(color(256, 256, 256));
        if (name == "seek") {
          fill(0,200,0);
        }
        line(0,0,endx,endy);
        ellipse(endx, endy, 8, 8);
        popMatrix();
      }
    }
  }

  /**************************************************
  *  
  *  FORCE FUNCTIONS BELOW
  *
  ***************************************************/

  protected PVector wander(float wanderR, float wanderD, float wanderlust, float wanderTheta) {
    // Now we have to calculate the new location to steer towards on the wander circle
    PVector circleloc = velocity.get();    // Start with velocity
    circleloc.normalize();            // Normalize to get heading
    circleloc.mult(wanderD);          // Multiply by distance
    circleloc.add(location);               // Make it relative to boid's location
    
    float h = velocity.heading2D();        // We need to know the heading to offset wandertheta

    PVector circleOffSet = new PVector(wanderR*cos(wanderTheta+h),wanderR*sin(wanderTheta+h));
    PVector target = PVector.add(circleloc,circleOffSet);
    PVector desired = PVector.sub(target,location);  // A vector pointing from the location to the target

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(wanderlust);
    // Steering = Desired minus Velocity
    PVector steer = PVector.sub(desired,velocity);
    steer.limit(maxforce);  // Limit to maximum steering force

    return steer;
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  protected PVector seek(PVector target) {
    PVector desired = PVector.sub(target,location);  // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    //desired.mult(maxSpeed);
    // Steering = Desired minus Velocity
    PVector steer = PVector.sub(desired,velocity);
    steer.limit(maxforce);  // Limit to maximum steering force
    return steer;
  }

  // Separation
  // Method checks for nearby boids and steers away
  protected PVector separate (ArrayList<Boid> boids, float flockSeparation) {
    return this.getSteerVector(boids, flockSeparation, false);
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  protected PVector align (ArrayList<Boid> boids) {
    float neighbordist = 50;
    PVector sum = new PVector(0,0);
    int count = 0;
    for (Boid other : boids) {
      float d = PVector.dist(location,other.location);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(other.velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div((float)count);
      sum.normalize();
      //sum.mult(maxspeed);
      PVector steer = PVector.sub(sum,velocity);
      steer.limit(maxforce);
      return steer;
    } else {
      return new PVector(0,0);
    }
  }

  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  protected PVector cohesion (ArrayList<Boid> boids) {
    float neighbordist = 50;
    PVector sum = new PVector(0,0);   // Start with empty vector to accumulate all locations
    int count = 0;
    for (Boid other : boids) {
      float d = PVector.dist(location,other.location);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(other.location); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return seek(sum);  // Steer towards the location
    } else {
      return new PVector(0,0);
    }
  }
  
  protected PVector gravity() {
    return new PVector(0,GRAVITY_SCALE);
  }
  
  protected PVector resistanceWater() {
    //PVector resistance = velocity.copy();
    PVector resistance = velocity.get();
    resistance.mult(-0.03*resistance.mag());
    return resistance;
  }
  
  protected PVector resistanceAir() {
    //PVector resistance = velocity.copy();
    PVector resistance = velocity.get();
    resistance.mult(-0.01*resistance.mag());
    return resistance;
  }

  protected PVector getSteerVector(ArrayList<Boid> objects, float distance, boolean isAttractive) {
    PVector steer = new PVector(0,0,0);
    int count = 0;
    // For every boid in the system, check if it's too close
    for (Boid other : objects) {
      float d = PVector.dist(location,other.location);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < distance)) {
        // Calculate vector pointing away from neighbor
        PVector diff = PVector.sub(location,other.location);
        diff.normalize();
        diff.div(d);        // Weight by distance
        steer.add(diff);
        count++;            // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div((float)count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      //steer.mult(maxspeed);
      steer.sub(velocity);
      steer.limit(maxforce);
      // steer towards, not away
      if (isAttractive) {
        steer.mult(-1);
      }
    }
    return steer;
  }

  /**************************************************
  *  
  *  END FORCE FUNCTIONS
  *
  ***************************************************/

}