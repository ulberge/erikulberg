// By Casey Reas and Ben Fry

abstract class Button {

  PVector location;
  int size;
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

  CircleButton(PVector location, int isize, color icolor, color ihighlight) {
    this.location = location;
    size = isize;
    basecolor = icolor;
    highlightcolor = ihighlight;
    currentcolor = basecolor;
  }
  
  boolean over() {
    PVector mouse = new PVector(mouseX, mouseY);
    isOver = PVector.dist(mouse,location) < (size/2);
    return isOver;
  }

  void display() {
    stroke(0);
    fill(currentcolor);
    ellipse(location.x, location.y, size, size);
  }
}

class RectButton extends Button {
  int iheight;
  int iwidth;

  RectButton(PVector location, int iwidth, int iheight, color icolor, color ihighlight) {
    this.location = location;
    this.iwidth = iwidth;
    this.iheight = iheight;
    basecolor = icolor;
    highlightcolor = ihighlight;
    currentcolor = basecolor;
  }

  boolean over() {
    if (mouseX >= location.x && mouseX <= location.x+iwidth && 
      mouseY >= location.y && mouseY <= location.y+iheight) {
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