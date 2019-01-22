const bubbles = [];

function BubbleDemo() {
  camera.position.y = 3;
  camera.position.z = 6;
  const bounds = { minX: -6, maxX: 6, minY: -1, maxY: 7 };

  // Outer bounds
  // const bd = new b2BodyDef;
  // const ground = world.CreateBody(bd);
  // const shape = new b2ChainShape;
  // shape.vertices.push(new b2Vec2(bounds.minX, bounds.minY));
  // shape.vertices.push(new b2Vec2(bounds.maxX, bounds.minY));
  // shape.vertices.push(new b2Vec2(bounds.maxX, bounds.maxY));
  // shape.vertices.push(new b2Vec2(bounds.minX, bounds.maxY));
  // shape.CreateLoop();
  // ground.CreateFixtureFromShape(shape, 0.0);

  // 0 is piercer fingers, 1 is smasher fingers
  this.fingersType = 0;

  this.bubbleSpawner = new BubbleSpawner(bounds);
}

BubbleDemo.prototype.Step = function() {
  const that = this;

  this.bubbleSpawner.step();

  if (this.fingers) {
    this.fingers.step();
  }
};

BubbleDemo.prototype.MouseDown = function(pos) {
  // Create fingers
  this.fingers = new Fingers(pos, this.fingersType);
};

BubbleDemo.prototype.KeyPress = function(pos) {
  // Switch fingers type
  if (this.fingersType === 0) {
    this.fingersType = 1;
  } else {
    this.fingersType = 0;
  }
};

BubbleDemo.prototype.MouseUp = function(coords) {
  // Get rid of fingers
  if (this.fingers) {
    this.fingers.destroy();
    this.fingers = null;
  }
};


