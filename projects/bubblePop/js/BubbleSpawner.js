/**
 * Class to spawn bubbles
 */
class BubbleSpawner {
  constructor(bounds) {
    this.bubbles = [];
    this.bounds = bounds;
    this.radiusBounds = { min: 0.15, max: 0.6 };
    this.spawnRate = 0.03;
    this.maxPop = 10;
    this.initPop = 4;

    // Create an initial pop
    for (let i = 0; i < this.initPop; i++) {
      this.spawn();
    }
  }

  step() {
    // Have all the bubbles update (i.e. check for breaks)
    this.bubbles.forEach(function(bubble) {
      bubble.step();
    });

    // Get rid of destroyed bubbles
    this.bubbles = this.bubbles.filter(function(bubble) {
      return !bubble.zombie;
    });

    // Make more bubbles if none left or we need more and there arent too many
    if (this.bubbles.length < 1 || (Math.random() < this.spawnRate && this.bubbles.length < this.maxPop)) {
      this.spawn();
    }
  }

  /* Make new bubbles that dont overlap previous bubbles */
  spawn() {
    let newBubbleData;
    let count = -1;
    do {
      newBubbleData = this.getPosAndRadius();
      count++;
    } while (!this.isLegal(newBubbleData) && count < 100);

    if (this.isLegal(newBubbleData)) {
      const bubble = new Bubble(newBubbleData.radius, newBubbleData.pos);
      this.bubbles.push(bubble);
    }
  }

  /* Return a random radius and position for a bubble within bounds */
  getPosAndRadius() {
    const radius = (Math.random() * this.radiusBounds.max) + this.radiusBounds.min;
    const x = (Math.random() * (this.bounds.maxX - this.bounds.minX - 3)) + (this.bounds.minX + 1.5);
    const y = (Math.random() * (this.bounds.maxY- this.bounds.minY - 3)) + (this.bounds.minY + 1.5);
    const pos = {x: x, y: y};

    return {radius, pos};
  }

  /* Check if the bubble is overlapping any existing bubble */
  isLegal(newBubble) {
    const that = this;
    let isLegal = true;
    this.bubbles.forEach(function(bubble) {
      if (that.hasOverlap(bubble, newBubble)) {
        isLegal = false; // too close
      }
    });

    return isLegal;
  }

  /* Check if bubble1 is overlapping a bubble2 */
  hasOverlap(bubble1, bubble2) {
    const distanceBetweenCenters = this.dist(bubble1.pos, bubble2.pos);
    const combinedRadii = bubble1.radius + bubble2.radius;
    if (distanceBetweenCenters < combinedRadii) {
      return true; // has overlap
    }
    return false;
  }

  // from: https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas
  /* Get the distance between two points */
  dist(pos1, pos2) {
    const x1 = pos1.x;
    const y1 = pos1.y;
    const x2 = pos2.x;
    const y2 = pos2.y;
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
  }

}
