public class Bubble {
  
  PVector location;
  float r;
  float BUBBLE_SPEED = 0.7;
  
  Bubble(PVector location) {
    this.location = location;
    r = 4;
  }
  
  public void render() {
    if (!PAUSED) {
     this.location.add(new PVector(0, -0.7));
    }
     
    pushMatrix();
    translate(location.x, location.y);
    ellipse(0,0,r,r);
    popMatrix();
  }
  
  public boolean isInWater() {
    return location.y-2 > getWaterLevel();
  }
  
}