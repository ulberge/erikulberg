// By Casey Reas and Ben Fry

abstract class Button {

  PVector location;
  PVector adjustedLocation;
  float size;
  float adjustedSize;
  color basecolor, highlightcolor;
  color currentcolor;
  public boolean isOver = false;

  abstract boolean over();

  void update() {
    if(over()) {
      currentcolor = highlightcolor;
    } else {
      currentcolor = basecolor;
    }
  }
}

class CircleButton extends Button { 

  CircleButton(PVector location, float isize, color icolor, color ihighlight) {
    this.location = location;
    adjustedLocation = new PVector(location.x*width/DEFAULT_GAME_WIDTH, location.y*height/DEFAULT_GAME_HEIGHT);
    size = isize;
    adjustedSize = size*width/DEFAULT_GAME_WIDTH;
    basecolor = icolor;
    highlightcolor = ihighlight;
    currentcolor = basecolor;
  }
  
  boolean over() {
    PVector mouse = new PVector(mouseX, mouseY);
    isOver = PVector.dist(mouse,adjustedLocation) < (adjustedSize/2);
    return isOver;
  }

  void display() {
    stroke(0);
    fill(currentcolor);
    ellipse(location.x, location.y, size, size);
  }
}

class RectButton extends Button {
  float iheight;
  float iwidth;
  float adjustedHeight;
  float adjustedWidth;

  RectButton(PVector location, float iwidth, float iheight, color icolor, color ihighlight) {
    this.location = location;
    adjustedLocation = new PVector(location.x*width/DEFAULT_GAME_WIDTH, location.y*height/DEFAULT_GAME_HEIGHT);
    this.iwidth = iwidth;
    this.iheight = iheight;
    adjustedWidth = iwidth*width/DEFAULT_GAME_WIDTH;
    adjustedHeight = iheight*height/DEFAULT_GAME_HEIGHT;
    basecolor = icolor;
    highlightcolor = ihighlight;
    currentcolor = basecolor;
  }

  boolean over() {
    if (mouseX >= adjustedLocation.x && mouseX <= adjustedLocation.x+adjustedWidth && 
      mouseY >= adjustedLocation.y && mouseY <= adjustedLocation.y+adjustedHeight) {
      return isOver = true;
    } else {
      return isOver = false;
    }
  }

  void display() {
    stroke(0);
    fill(currentcolor);
    rect(location.x, location.y, iwidth, iheight);
  }
}