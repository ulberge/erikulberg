//
function AARON(p, debugGraphics) {
  /**
  * Settings
  */
  // Draw extra information besides main lines
  // let debug = true;
  // Determines the amount of pause after each movement control update
  const speed = 50;
  // Factor that adjusts how "arthritic" the steering is
  const randomness = 1;
  // Determine bounds of randomness for shape length and corner angles
  const irregularityOfShapes = 0.3;
  const irregularityOfDirections = 0.3;
  // Set max amount of curvature for lines
  const modulationAmt = 10;
  // Factor that adjusts number of steps to take
  const speedOfDrawing = 1;
  // Number of pixels between signposts
  const spacingOfSignposts = 40;

  const lineColor = p.color(50, 50, 50, 255);

  const numFigures = 6;

  const blocked = p.createGraphics(p.width, p.height);
  blocked.background(255);

  /**
  * Helper Functions
  */
  /*
  * Pauses the execution loop to allow animation of action.
  */
  async function pause(t) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, t);
    });
  }

  /*
  * Return the distance between two vectors.
  */
  function dist(a, b) {
    return Math.sqrt(((a.x - b.x) ** 2) + ((a.y - b.y) ** 2));
  }

  /*
  * Return the shortest distance from the point to the line
  */
  function distToLine(pt, line) {
    const { a, b, c } = line;
    const { x, y } = pt;

    let d;
    if (a === 0) {
      d = c - pt.x;
    } else if (b === 0) {
      d = c - pt.y;
    } else {
      d = ((a * x) + (b * y) + c) / Math.sqrt((a * a) + (b * b));
    }
    return Math.abs(d);
  }

  /*
  * Return a random number between the given min and max
  */
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  /*
  * Return a list of n random divisions of a line with a minimum padding between them
  */
  function divideLine(line, n) {
    let pts = [0];
    let sum = 0;

    const minDist = 0.3;
    for (let i = 0; i < n; i += 1) {
      const pt = sum + (Math.random() * (1 - minDist)) + minDist;
      pts.push(pt);
      sum = pt;
    }
    pts = pts.map((pt) => pt / sum);

    const vecSamples = pts.map((pt) => line.multiply(pt, true));
    return vecSamples;
  }

  /*
  * Bow the given vectors out from their current line by the given amount
  */
  function curveVecs(vecs, amt) {
    // Get a vector permindicular to row of vectors
    if (vecs.length > 1) {
      const perpVec = vecs[1].clone().subtract(vecs[0]).skew().normalize();
      const origin = vecs[0].clone();
      const lineLength = vecs[vecs.length - 1].clone().subtract(origin).length();

      return vecs.map((vec) => {
        // Bow the vectors out the given amount based on how far along line they are
        const currentLength = vec.clone().subtract(origin).length();
        const adjVec = perpVec.clone().multiply(Math.sin(Math.PI * (currentLength / lineLength)) * amt);
        const adjustedVec = vec.add(adjVec, true);
        return adjustedVec;
      });
    }

    return vecs;
  }

  function getFinishLine(start, end) {
    const perp = new PVector(end.x - start.x, end.y - start.y).normalize();
    const a = perp.x;
    const b = perp.y;

    if (a === 0) {
      return { a: 0, b: 0, c: end.x };
    }
    if (b === 0) {
      return { a: 0, b: 0, c: end.y };
    }

    // Solve for intercept
    const c = -((a * end.x) + (b * end.y));
    return { a, b, c };
  }

  /**
   * Given a start and end point, check if any pixels are non-white
   * @param {PVector} start
   *         The beginning of the path to check
   * @param {number} end
   *         The end of the path to check
   * @return {boolean}
   *         Return true if clear, false if not
   */
  function isPathClear(start, end) {
    // max check should be manhattan distance
    const numPtsToCheck = Math.floor(Math.abs(end.x - start.x) + Math.abs(end.y - start.y));
    const checkVec = end.subtract(start, true);
    const stepSize = checkVec.length() / numPtsToCheck;
    checkVec.normalize();

    blocked.loadPixels();
    const d = blocked.pixelDensity();
    const isEmpty = (x, y) => {
      const i = (4 * (blocked.width * d) * (Math.floor(y) * d)) + (4 * (Math.floor(x) * d));
      return blocked.pixels[i] === 255;
    };

    for (let i = 0; i < numPtsToCheck; i += 1) {
      const offsetVec = checkVec.multiply(stepSize * i, true);
      const toCheck = start.add(offsetVec, true);
      const [x, y] = toCheck.toArray().map(Math.floor);

      if (x > 0 && x < p.width && y > 0 && y < p.height) {
        if (!isEmpty(x, y)) {
          return false;
        }
      }
    }

    return true;
  }

  function getValidStartLocation() {
    const distFromEdge = 150;
    const location = new PVector(
      getRandomArbitrary(distFromEdge, p.width - distFromEdge),
      getRandomArbitrary(distFromEdge, p.height - distFromEdge),
    );

    const c = blocked.get(location.x, location.y);
    // If not special color, it is clear
    if (blocked.red(c) === 255) {
      return location;
    }

    return getValidStartLocation();
  }

  function drawShapeFromPts(pg, pts) {
    pg.beginShape();
    pts.forEach((pt) => {
      const { x, y } = pt;
      pg.vertex(x, y);
    });
    pg.endShape(pg.CLOSE);
  }

  /**
  *
  * Evaluation Functions
  *
  * Evaluate the current state of the picture to determine control flow
  *
  */

  function isLineDone(p, state) {
    // if (distToLine(state.pen.location, state.line.finishLine) > 15) {
    if (dist(state.pen.location, state.line.end.location) > 15) {
      return false;
    }

    // cheat: draw line to end
    if (state.line.end.location.x) {
      p.stroke(lineColor);
      p.line(state.pen.location.x, state.pen.location.y, state.line.end.location.x, state.line.end.location.y);
      state.pen.location = state.line.end.location;
    }
    return true;
  }

  function isSectorDone(state) {
    // if (!state.signpost || distToLine(state.pen.location, state.signpost.finishLine) < 10) {
    if (!state.signpost || !state.signpost.location || dist(state.pen.location, state.signpost.location) < 10) {
      return true;
    }
    return false;
  }

  function isDevelopmentDone(state) {
    if (state.figure.lineIndex < state.figure.numLines) {
      return false;
    }
    return true;
  }

  function isFigureDone(state) {
    // cheat and draw interior to block it out
    // If we just finished another figure, close it and save location
    if (state.figure && state.figure.pts) {
      blocked.fill(0);
      drawShapeFromPts(blocked, state.figure.pts);
    }

    return true;
  }

  function isPictureDone(state) {
    if (state.picture.figureCount >= state.picture.figureMax) {
      return true;
    }
    return false;
  }

  /**
  *
  * Control Functions
  *
  * Update the current state of the picture
  *
  */
  // ARTWORK
  function artwork(state) {
    state.picture.figureCount += 1;
    console.log(`ARTWORK: Draw figure ${state.picture.figureCount} of ${state.picture.figureMax}`);
  }

  // MAPPING
  function mapping(state) {
    // TODO: implement
  }

  // PLANNING - decide what this figure will look like
  function planning(state) {
    // Make a closed figure
    state.figure = {};
    state.figure.numLines = Math.floor(getRandomArbitrary(3, 5));
    state.figure.lineIndex = 0;
    state.figure.size = getRandomArbitrary(50, 120);
    state.figure.collisions = 0;
    state.figure.pts = [];

    state.figure.start = {
      location: getValidStartLocation(),
      direction: new PVector(getRandomArbitrary(-1, 1), getRandomArbitrary(-1, 1)),
    };

    // state.figure.start = {
    //   location: new PVector(300, 300),
    //   direction: new PVector(10, 0),
    // };

    // Set pen to start location
    state.pen.location = state.figure.start.location;
    state.pen.direction = state.figure.start.direction;

    state.figure.start.location = state.pen.location;
    state.figure.pts.push(state.figure.start.location.clone());

    // Draw figure start
    debugGraphics.stroke(0, 0, 155, 100);
    debugGraphics.ellipse(state.figure.start.location.x, state.figure.start.location.y, 8);

    console.log(`PLANNING: Draw figure with ${state.figure.numLines} pts and size ${state.figure.size}`);
  }

  // LINES - each line has a start and end point
  function lines(state) {
    state.figure.lineIndex += 1;

    // If we just finished another line, turn pen
    if (state.line && state.line.end) {
      state.pen.direction = state.line.end.direction.clone();
    }

    state.line = {};
    state.line.start = {
      location: state.pen.location.clone(),
      direction: state.pen.direction.clone(),
    };

    if (state.figure.lineIndex < state.figure.numLines) {
      // Calculate line end
      const length = getRandomArbitrary(state.figure.size * (1 - irregularityOfShapes), state.figure.size * (1 + irregularityOfShapes));
      const delta = state.line.start.direction.clone().normalize().multiply(length);
      const end = state.line.start.location.clone().add(delta);

      let rotation;
      if (state.figure.lineIndex === state.figure.numLines - 1) {
        // On second to last, we need to have end direction towards end
        rotation = -state.figure.start.location.clone().subtract(end).angleTo(state.line.start.direction);
      } else {
        const rotationIdeal = (Math.PI * 2) / state.figure.numLines;
        // Add some randomness
        rotation = getRandomArbitrary(
          rotationIdeal * (1 - irregularityOfDirections),
          rotationIdeal * (1 - irregularityOfDirections),
        );
      }

      state.line.end = {
        location: end,
        direction: state.line.start.direction.clone().rotate(rotation).normalize().multiply(30),
      };
    } else {
      // Calculate path to start
      state.line.end = state.figure.start;
    }

    state.line.finishLine = getFinishLine(state.line.start.location, state.line.end.location);

    // Draw end point and end direction
    debugGraphics.stroke(0, 0, 155, 100);
    debugGraphics.ellipse(state.line.end.location.x, state.line.end.location.y, 8);
    const directionVec = state.line.end.location.clone().add(state.line.end.direction);
    debugGraphics.line(state.line.end.location.x, state.line.end.location.y, directionVec.x, directionVec.y);

    // Calculate sectors
    const line = state.line.end.location.clone().subtract(state.line.start.location);

    state.sectors = [];
    if (line.length() > 0) {
      let sectors = divideLine(line, (line.length() / spacingOfSignposts) + 1);
      sectors = curveVecs(sectors, Math.random() * -modulationAmt);
      sectors = sectors.slice(1, sectors.length).map((pt) => pt.add(state.line.start.location));
      state.sectors = sectors.reverse();

      // Adjust to face first signpost
      if (state.sectors.length > 1) {
        state.pen.direction = state.sectors[state.sectors.length - 1].clone().subtract(state.pen.location);
      }

      // Draw sector points
      state.sectors.forEach((pt) => {
        debugGraphics.stroke(0, 0, 155, 100);
        debugGraphics.ellipse(pt.x, pt.y, 5);
      });

      console.log(`LINES: Draw line ${state.figure.lineIndex} of ${state.figure.numLines}`);
      console.log(`LINES: From (${state.line.start.location.x.toFixed(1)}, ${state.line.start.location.y.toFixed(1)}) at angle ${(Math.atan2(state.line.start.direction.x, state.line.start.direction.y) * (180 / Math.PI)).toFixed(2)} to (${state.line.end.location.x.toFixed(1)}, ${state.line.end.location.y.toFixed(1)}) at angle ${(Math.atan2(state.line.end.direction.x, state.line.end.direction.y) * (180 / Math.PI)).toFixed(2)}`);
    }
  }

  // SECTORS - each sector has a signpost which indicates an end location and direction to acheive
  function sectors(state) {
    state.signpost = {};
    if (state.sectors && state.sectors.length > 0) {
      // Set new signpost
      state.signpost.location = state.sectors.pop();
      state.originalDistanceToSignpost = dist(state.signpost.location, state.pen.location);
      state.signpost.finishLine = getFinishLine(state.pen.location, state.signpost.location);

      // Draw end point and end direction
      debugGraphics.stroke(0, 0, 0, 200);
      debugGraphics.ellipse(state.pen.location.x, state.pen.location.y, 2);
      // const directionVec = state.pen.location.clone().add(state.pen.direction.normalize().multiply(20));
      // p.stroke(0, 255, 0, 200);
      // p.line(state.pen.location.x, state.pen.location.y, directionVec.x, directionVec.y);

      console.log(`SECTORS: Move towards signpost (${state.signpost.location.x.toFixed(1)}, ${state.signpost.location.y.toFixed(1)})`);
    }
  }

  // CURVES - each curve is a series of adjustments towards a signpost
  function curves(state) {
    state.curve = {};
    if (state.signpost && state.signpost.location) {
      // Adjust pen to reach signpost
      const signpostDirection = state.signpost.location.subtract(state.pen.location, true);
      const angleToSignpost = signpostDirection.angleTo(state.pen.direction);
      state.pen.updateWheelSpeeds(angleToSignpost, randomness);

      const distToSignpost = dist(state.signpost.location, state.pen.location);
      state.curve.steps = Math.floor((((distToSignpost / state.originalDistanceToSignpost) * 3) + 3) * speedOfDrawing);
    }
  }

  // LOOKAHEAD
  function lookahead(state) {
    // Check the area ahead for other objects
    const distToCheck = spacingOfSignposts;
    const start = state.pen.location.clone();
    const path = state.pen.direction.clone().normalize().multiply(distToCheck);
    const end = start.clone().add(path);
    if (isPathClear(start, end)) {
      // no collision
      return false;
    }

    const maxCollisions = 20;
    console.log('state.figure.collisions', state.figure.collisions);
    if (state.figure.collisions < maxCollisions) {
      console.log('COLLISION!');
      // There is a collision!
      state.line.collision = true;
      state.figure.collisions += 1;
      return true;
    }

    console.log('ignore COLLISION!');
    // // If collision, but too many collisions, just draw it behind
    return false;
  }

  // AVOIDANCE
  function avoidance(state) {
    debugGraphics.stroke(155, 0, 0);
    debugGraphics.ellipse(state.pen.location.x, state.pen.location.y, 10);
    debugGraphics.line(state.pen.location.x, state.pen.location.y, state.line.end.location.x, state.line.end.location.y);
  }

  // MOVEMENT CONTROL
  function movementControl(state) {
    if (state.curve && state.curve.steps) {
      state.pen.moveAndDraw(p, state.curve.steps);
      state.figure.pts.push(state.pen.location.clone());
    }
  }

  /**
  * The high level control flow for drawing a picture
  */
  async function drawPicture() {
    // start - initialize
    let control = 'ARTWORK';
    const state = {
      pen: new RobotDrawer(),
    };
    state.picture = {};
    state.picture.isDone = false;
    state.picture.figureCount = 0;
    state.picture.figureMax = numFigures;

    while (!state.picture.isDone) {
      switch (control) {
        case 'ARTWORK':
          artwork(state);
          control = 'MAPPING';
          break;
        case 'MAPPING':
          mapping(state);
          control = 'PLANNING';
          break;
        case 'PLANNING':
          planning(state);
          control = 'LINES';
          break;
        case 'LINES':
          lines(state);
          control = 'SECTORS';
          break;
        case 'SECTORS':
          sectors(state);
          control = 'CURVES';
          break;
        case 'CURVES':
          curves(state);
          control = 'LOOKAHEAD';
          break;
        case 'LOOKAHEAD':
          const collision = lookahead(state);
          if (collision) {
            control = 'AVOIDANCE';
            break;
          }

          control = 'MOVEMENT_CONTROL';
          break;
        case 'MOVEMENT_CONTROL':
          movementControl(state);

          // Add pause to animate drawing
          await pause(1000 / speed);

          if (!isSectorDone(state)) {
            control = 'CURVES';
            break;
          }
          if (!isLineDone(p, state)) {
            control = 'SECTORS';
            break;
          }
          if (!isDevelopmentDone(state)) {
            control = 'LINES';
            break;
          }
          if (!isFigureDone(state)) {
            control = 'PLANNING';
            break;
          }
          if (!isPictureDone(state)) {
            control = 'ARTWORK';
            break;
          }
          // done with ARTWORK
          state.picture.isDone = true;
          // p.image(blocked, 0, 0);
          console.log('Picture is done');
          break;
        case 'AVOIDANCE':
          avoidance(state);
          control = 'LINES';
          break;
        default:
          console.log('Unknown state!');
          break;
      }
    }
  }

  this.drawPicture = drawPicture;
}
