/**
 * Class to represent burstable bubbles
 */
class Bubble {
  constructor(radius, pos) {
    this.radius = radius;
    this.pos = pos;
    this.broken = false;
    this.zombie = false;
    this.isScheduledForDestroy = false;
    this.particleSize = 0.05;
    this.skinThickness = 0.025;
    this.jointLimit = 1;
    this.dissipationTime = 3000;
    this.lifeSpan = 12000;

    const psd = new b2ParticleSystemDef();
    psd.radius = this.particleSize;
    this.particleSystem = world.CreateParticleSystem(psd);

    this.createContents();
    this.createMembrane();

    // Delete after a set time in case they drift off
    const that = this;
    setTimeout(function() {
      that.scheduleForDestroy();
    }, this.lifeSpan);
  }

  step() {
    if (this.zombie) {
      return;
    }

    this.checkBreak();

    if (this.broken) {
      this.scheduleForDestroy();
    }
  }

  /**
   * Check if any of the joints in this bubble are beyond their strength, if so, break
   */
  checkBreak() {
    if (this.joints) {
      const that = this;
      this.joints.forEach(function(joint) {
        if (joint._eu_broken) {
          return; // already broken, ignore
        }

        let angle = joint.GetJointAngle();
        if (angle > that.jointLimit) {
          that.breakJoint(joint);
          joint._eu_broken = true;
          that.broken = true;
        }
      });
    }
  }

  /* Once a bubble has been broken, it disappears after a given time. */
  scheduleForDestroy() {
    if (!this.isScheduledForDestroy) {
      const that = this;
      setTimeout(function() {
        that.joints.forEach(function(joint) {
          if (!joint._eu_broken) {
            world.DestroyJoint(joint);
          }
        });

        that.bodies.forEach(function(body) {
          world.DestroyBody(body);
        });

        world.DestroyParticleSystem(that.particleSystem);
        that.zombie = true;
      }, this.dissipationTime);
      this.isScheduledForDestroy = true;
    }
  }

  /**
   * Create the liquid contents of this bubble. They are a collection of particles
   * starting in a circle shape, but can separate after break.
   */
  createContents() {
    const circle = new b2CircleShape();
    circle.position.Set(this.pos.x, this.pos.y);
    circle.radius = this.radius * 0.9;
    const pgd = new b2ParticleGroupDef();
    pgd.groupFlags = b2_solidParticleGroup;
    pgd.shape = circle;
    pgd.color.Set(255, 110, 0, 255);
    this.contents = this.particleSystem.CreateParticleGroup(pgd);
  }

  /**
   * Create a series of particles that represent the membrane. They are connected until
   * a certain level of force is applied to their connection, causing a break.
   */
  createMembrane() {
    const stretch = 2.5;
    let count = Math.floor((this.radius * Math.PI * 2)/(this.skinThickness * 2 * stretch));
    const bd = new b2BodyDef();
    const rjoint = new b2RevoluteJointDef();

    const box = new b2PolygonShape();
    box.SetAsBoxXY(this.skinThickness * stretch, this.skinThickness * 1);
    const fd = new b2FixtureDef();
    fd.shape = box;
    fd.density = 20;
    fd.friction = 0.2;

    // The bodies that form the wall
    this.bodies = [];
    for (let i = 0; i < count; i++) {
      const angle = i * Math.PI * 2 / count;
      bd.type = b2_dynamicBody;
      bd.position.Set(this.pos.x + (Math.sin(angle) * this.radius), this.pos.y + (Math.cos(angle) * this.radius));
      bd.angle = -angle;
      const body = world.CreateBody(bd);
      body.CreateFixtureFromDef(fd);
      this.bodies.push(body);
    }

    // The connective tissue between the walls
    this.joints = [];
    for (let i = 0; i < count; i++) {
      const body = this.bodies[i];
      // Get next body, or wrap around to first
      const nextBody = (i + 1) < count ? this.bodies[i + 1] : this.bodies[0];
      const jointAngle = (i + 0.5) * Math.PI * 2 / count;

      const anchor = new b2Vec2(this.pos.x + (Math.sin(jointAngle) * this.radius), this.pos.y + (Math.cos(jointAngle) * this.radius));
      const joint = rjoint.InitializeAndCreate(body, nextBody, anchor);
      this.joints.push(joint);
    }
  }

  /**
   * Triggered when a certain threshold of pressure is applied to membrane joint
   */
  breakJoint(joint) {
    world.DestroyJoint(joint);
  }
}
