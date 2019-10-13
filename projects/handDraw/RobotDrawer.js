// Fixed width between wheels
const AXLE_WIDTH = 10;

/**
 * Represents a robot with two wheels, a fixed axle and a pen that draws in the middle of the wheels
 */
class RobotDrawer {
  constructor() {
    this.axleWidth = AXLE_WIDTH;

    // Wheel locations
    this.lLoc = new PVector(0, 0);
    this.rLoc = new PVector(AXLE_WIDTH, 0);

    // Wheel speeds
    this.lSpeed = 5;
    this.rSpeed = 5;
  }

  /**
   * @return {PVector}
   *         The direction of the wheels as a vector
   */
  get direction() {
    const { lLoc, rLoc } = this;
    const direction = new PVector(lLoc.x - rLoc.x, lLoc.y - rLoc.y).rotate(Math.PI / 2);
    return direction;
  }

  set direction(direction) {
    // Using the current central location, rotate the offsets to match the direction
    const { location } = this;
    const lOffset = direction.clone().rotate(-Math.PI / 2).normalize().multiply(this.axleWidth / 2);
    const rOffset = direction.clone().rotate(Math.PI / 2).normalize().multiply(this.axleWidth / 2);

    this.lLoc = location.add(lOffset, true);
    this.rLoc = location.add(rOffset, true);
  }

  /**
   * @return {PVector}
   *         The location midway between the wheels where the pen will draw
   */
  get location() {
    const { lLoc, rLoc } = this;
    const location = new PVector((lLoc.x + rLoc.x) / 2, (lLoc.y + rLoc.y) / 2);
    return location;
  }

  set location(location) {
    const offset = location.subtract(this.location);
    this.lLoc.add(offset);
    this.rLoc.add(offset);
  }

  /**
   * @return {PVector}
   *         The angle of robot relative to (0, 1)
   */
  get angle() {
    const angle = this.direction.angleTo(new PVector(0, 1));
    return angle;
  }

  /**
   * Moves the pen based on the independent speeds of its wheels and
   * draw a line connecting the start and end.
   * @param {p5} p
   *         The p5 instance to draw to.
   * @param {number} steps
   *         The number of steps to take.
   */
  moveAndDraw(p, steps = 1) {
    const start = this.location;
    this.move(steps);
    const end = this.location;
    const lineColor = p.color(50, 60, 50, 255);
    p.stroke(lineColor);
    p.line(start.x, start.y, end.x, end.y);
  }

  /**
   * Moves the pen based on the independent speeds of its wheels.
   * @param {number} steps
   *         The number of steps to take.
   */
  move(steps = 1) {
    const t = steps / 10;
    const { lDelta, rDelta } = this.getAbsoluteWheelDelta(t);
    this.lLoc.add(lDelta);
    this.rLoc.add(rDelta);
  }

  /**
   * Update the indepedent wheel speeds based on deviation from signpost and
   * a random factor. If the pen is too far off course, adjust to move back
   * onto course. If close to course, maintain direction.
   * @param {number} steps
   *         The number of steps to take.
   */
  updateWheelSpeeds(diffWithAngleToSignpost, randomness) {
    // Add randomness
    const randomTurn = Math.floor((Math.random() * 3) - 1); // -1, 0, 1
    this.stepLeftSpeed(-randomTurn * randomness);
    this.stepRightSpeed(randomTurn * randomness);

    // Calculate wheel speeds to adjust towards next signpost
    const min = 1;
    const max = 10;
    const range = max - min;
    let lSpeedIdeal;
    let rSpeedIdeal;
    if (Math.abs(diffWithAngleToSignpost) > (Math.PI / 16)) {
      // If the direction deviates too much, adjust wheels to correct
      lSpeedIdeal = (Math.min(1, Math.max(0, (-diffWithAngleToSignpost * 0.5) + 0.5)) * range) + min;
      rSpeedIdeal = (Math.min(1, Math.max(0, (diffWithAngleToSignpost * 0.5) + 0.5)) * range) + min;
    } else {
      // If within deviance, adjust wheels to continue on current heading
      lSpeedIdeal = min + (range / 2);
      rSpeedIdeal = min + (range / 2);
    }

    // Steer wheels towards ideal speed at a constant rate
    if (this.lSpeed < lSpeedIdeal) {
      this.stepLeftSpeed(1);
    } else if (this.lSpeed > lSpeedIdeal) {
      this.stepLeftSpeed(-1);
    }
    if (this.rSpeed < rSpeedIdeal) {
      this.stepRightSpeed(1);
    } else if (this.rSpeed > rSpeedIdeal) {
      this.stepRightSpeed(-1);
    }
  }

  /**
   * Update the left wheel
   * @param {number} amt
   *         The amount to adjust the left wheel.
   */
  stepLeftSpeed(amt) {
    this.lSpeed += amt;

    if (this.lSpeed > 10) {
      this.lSpeed = 10;
    }
    if (this.lSpeed < -5) {
      this.lSpeed = -5;
    }
  }

  /**
   * Update the right wheel
   * @param {number} amt
   *         The amount to adjust the right wheel.
   */
  stepRightSpeed(amt) {
    this.rSpeed += amt;

    if (this.rSpeed > 10) {
      this.rSpeed = 10;
    }
    if (this.rSpeed < -5) {
      this.rSpeed = -5;
    }
  }

  /**
   * Given a drawing robot, calculate the absolute xy offset after
   * time t with its current speeds and locations.
   * @param {Robot} robot
   *         The drawing robot
   * @param {number} t
   *         Amount of time to travel in seconds
   * @return {Object}
   *         The left and right deltas in absolute distances
   */
  getAbsoluteWheelDelta(t) {
    // Get wheel deltas relative to current angle
    const { lSpeed, rSpeed, axleWidth } = this;
    const { lDelta, rDelta } = RobotDrawer.getRelativeWheelDelta(lSpeed, rSpeed, axleWidth, t);

    // Adjust deltas to absolute coordinates
    lDelta.rotate(-this.angle);
    rDelta.rotate(-this.angle);

    return { lDelta, rDelta };
  }

  /**
   * Given two wheels moving at lSpeed and rSpeed and separated by an axle of
   * width axleWidth, calculate the xy offset after time t assuming they are
   * facing in the direction (0, 1).
   * @param {number} lSpeed
   *         Speed of the left wheel in pixels/second
   * @param {number} rSpeed
   *         Speed of the right wheel in pixels/second
   * @param {number} axleWidth
   *         Width separating the two wheels in pixels
   * @param {number} t
   *         Amount of time to travel in seconds
   * @return {Object}
   *         The left and right deltas relative to the current heading as though it were (0, 1)
   */
  static getRelativeWheelDelta(lSpeed, rSpeed, axleWidth, t = 1) {
    const rDist = rSpeed * t;
    const lDist = lSpeed * t;

    // If the wheels are travelling the same speed, move in a straight line
    if (lDist === rDist) {
      return { lDelta: new PVector(0, lDist), rDelta: new PVector(0, rDist) };
    }

    // If the left wheel is moving faster, arc to the left
    if (lDist > rDist) {
      // Get the radius of the right wheel, which will be the smaller, inner radius
      const rRadius = axleWidth / ((lDist / rDist) - 1);
      // The outer, left radius, is offset by the axle width
      const lRadius = rRadius + axleWidth;

      // Both wheels travel the same angle of their respective arcs
      // We subtract from PI, because they are tracing an arc from PI towards 0
      const theta = Math.PI - (lDist / lRadius);

      // Calculate the next xy locations of the right wheel relative to the center of its arc
      const rX = Math.cos(theta) * rRadius;
      const rY = Math.sin(theta) * rRadius;
      // Adjust these locations relative to where the right wheel started
      const rDelta = new PVector(rX + rRadius, rY);

      // Calculate the next xy locations of the left wheel relative to the center of its arc
      const lX = Math.cos(theta) * lRadius;
      const lY = Math.sin(theta) * lRadius;
      // Adjust these locations relative to where the left wheel started
      const lDelta = new PVector(lX + lRadius, lY);

      return { lDelta, rDelta };
    }

    // If the right wheel is moving faster, arc to the right
    if (rDist > lDist) {
      // Get the radius of the left wheel, which will be the smaller, inner radius
      const lRadius = axleWidth / ((rDist / lDist) - 1);
      // The outer, right radius, is offset by the axle width
      const rRadius = lRadius + axleWidth;

      // Both wheels travel the same angle of their respective arcs
      const theta = lDist / lRadius;

      // Calculate the next xy locations of the right wheel relative to the center of its arc
      const rX = Math.cos(theta) * rRadius;
      const rY = Math.sin(theta) * rRadius;
      // Adjust these locations relative to where the right wheel started
      const rDelta = new PVector(rX - rRadius, rY);

      // Calculate the next xy locations of the left wheel relative to the center of its arc
      const lX = Math.cos(theta) * lRadius;
      const lY = Math.sin(theta) * lRadius;
      // Adjust these locations relative to where the left wheel started
      const lDelta = new PVector(lX - lRadius, lY);

      return { lDelta, rDelta };
    }

    return null;
  }
}
