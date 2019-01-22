/**
 * Represents a pair of converging fingers that can pop bubbles
 */
class Fingers {
  constructor(pos, type) {
    this.defaultDistance = 4;
    this.length = 1;
    this.zombie = false;
    this.pos = pos;
    this.speed = 10;
    const height = 0.2;
    const halfDistance = this.defaultDistance / 2;

    const bd = new b2BodyDef;
    bd.type = b2_kinematicBody;
    bd.bullet = true;
    bd.position.Set(pos.x, pos.y);

    // Create first finger
    const shape0 = new b2PolygonShape();
    if (type === 1) {
      shape0.vertices[0] = new b2Vec2(-halfDistance, height);
      shape0.vertices[1] = new b2Vec2(-halfDistance-this.length, 0);
      shape0.vertices[2] = new b2Vec2(-halfDistance, -height);
    } else {
      shape0.vertices[0] = new b2Vec2(-halfDistance-this.length, height);
      shape0.vertices[1] = new b2Vec2(-halfDistance, 0);
      shape0.vertices[2] = new b2Vec2(-halfDistance-this.length, -height);
    }

    this.body0 = world.CreateBody(bd);
    this.body0.fixedRotation = true;
    this.body0.CreateFixtureFromShape(shape0, 10000.0);

    // Create second finger
    const shape1 = new b2PolygonShape();
    if (type === 1) {
      shape1.vertices[0] = new b2Vec2(halfDistance, height);
      shape1.vertices[1] = new b2Vec2(halfDistance+this.length, 0);
      shape1.vertices[2] = new b2Vec2(halfDistance, -height);
    } else {
      shape1.vertices[0] = new b2Vec2(halfDistance+this.length, height);
      shape1.vertices[1] = new b2Vec2(halfDistance, 0);
      shape1.vertices[2] = new b2Vec2(halfDistance+this.length, -height);
    }

    this.body1 = world.CreateBody(bd);
    this.body1.fixedRotation = true;
    this.body1.CreateFixtureFromShape(shape1, 10000.0);

    // Start the fingers moving towards eachother
    this.body0.SetLinearVelocity(new b2Vec2(this.speed, 0));
    this.body1.SetLinearVelocity(new b2Vec2(-this.speed, 0));
  }

  step() {
    // Check if the fingers are touching or have moved past each other
    const x0 = this.body0.GetPosition().x;
    const x1 = this.body1.GetPosition().x;
    if (Math.abs(x0 - x1) >= this.defaultDistance) {
      // If they have come together, freeze them touching
      this.body0.SetTransform(new b2Vec2(this.pos.x+this.defaultDistance/2, this.pos.y), 0);
      this.body1.SetTransform(new b2Vec2(this.pos.x-this.defaultDistance/2, this.pos.y), 0);
      this.body0.SetLinearVelocity(new b2Vec2(0, 0));
      this.body1.SetLinearVelocity(new b2Vec2(0, 0));
    }
  }

  /* Destroy these fingers */
  destroy() {
    if (!this.zombie) {
      world.DestroyBody(this.body0);
      world.DestroyBody(this.body1);
      this.zombie = true;
    }
  }

}
