// Based on:
// https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm

// Modified by: Erik Ulberg

let capture;
let tracker;
const w = 800;
const h = 600;

const meshPointsLeftFace = [
  14, 13, 12, 11, 10, 9, 8, 7, // jaw
  53, 57, 60, 47, // mouth
  37, 62, 41, 33, // nose
  18, 17, 16, 15 // eyebrow
];
const meshPointsRightFace = [
  0, 1, 2, 3, 4, 5, 6, 7, // jaw
  53, 57, 60, 47, // mouth
  37, 62, 41, 33, // nose
  22, 21, 20, 19 // eyebrow
];

let displayType = 1;
let adjustAngle = 0;
let adjustScale = 1;

function setup() {
  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  }, function() {
    console.log('capture ready.');
  });
  capture.elt.setAttribute('playsinline', '');
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();

  colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
}

function draw() {
  image(capture, 0, 0, w, h);
  const positions = tracker.getCurrentPosition();

  if (positions) {
    drawThumbnail(positions);

    const faceCenter = positions[37];
    const rightOutside = positions[2];
    const leftOutside = positions[12];
    const rightWidth = dist(faceCenter[0], faceCenter[1], rightOutside[0], rightOutside[1]);
    const leftWidth = dist(faceCenter[0], faceCenter[1], leftOutside[0], leftOutside[1]);
    const noseTop = createVector(positions[33][0], positions[33][1], 0);
    const noseBottom = createVector(positions[62][0], positions[62][1], 0);
    const noseVector = noseTop.sub(noseBottom);
    const angle = noseVector.heading() + (PI / 2) + adjustAngle;

    const toFilter = get();
    switch (displayType) {
      case 0:
        // normal
        break;
      case 1:
        // all left
        const leftMask = getMask(meshPointsLeftFace, positions);
        toFilter.mask(leftMask);

        push();
        translate(faceCenter[0], faceCenter[1]);
        scale(-(rightWidth * adjustScale / leftWidth), 1);
        rotate(-angle * 2);
        translate(-faceCenter[0], -faceCenter[1]);
        image(toFilter, 0, 0, w, h);
        pop();
        break;
      case 2:
        // all right
        const rightMask = getMask(meshPointsRightFace, positions);
        toFilter.mask(rightMask);

        push();
        translate(faceCenter[0], faceCenter[1]);
        scale(-(leftWidth * adjustScale / rightWidth), 1);
        rotate(-angle * 2);
        translate(-faceCenter[0], -faceCenter[1]);
        image(toFilter, 0, 0, w, h);
        pop();
        break;
    }
  }
}

function drawThumbnail(positions, thumbScale=0.25) {
  image(capture, 0, 0, w * thumbScale, h * thumbScale);
  noFill();
  stroke(255);
  beginShape();
  vertex(positions[14][0] * thumbScale, positions[14][1] * thumbScale);
  vertex(positions[16][0] * thumbScale, positions[16][1] * thumbScale);
  vertex(positions[20][0] * thumbScale, positions[20][1] * thumbScale);
  vertex(positions[0][0] * thumbScale, positions[0][1] * thumbScale);
  vertex(positions[2][0] * thumbScale, positions[2][1] * thumbScale);
  vertex(positions[5][0] * thumbScale, positions[5][1] * thumbScale);
  vertex(positions[7][0] * thumbScale, positions[7][1] * thumbScale);
  vertex(positions[9][0] * thumbScale, positions[9][1] * thumbScale);
  vertex(positions[12][0] * thumbScale, positions[12][1] * thumbScale);
  vertex(positions[14][0] * thumbScale, positions[14][1] * thumbScale);
  endShape();
}

function getMask(indexes, positions) {
  const pg = createGraphics(w, h);

  pg.background(255, 255, 255, 0);
  pg.fill(25, 25, 25, 255);
  pg.noStroke();

  drawShape(pg, indexes, positions);

  return pg;
}

function drawShape(pg, indexes, positions) {
  const bounds = getBounds(indexes, positions);
  drawShapeFromBounds(pg, bounds);
}

// Get a list of PVector points from meshPoints based
function getBounds(indexes, positions) {
  const bounds = [];
  for (let i = 0; i < indexes.length; i += 1) {
    let index = indexes[i];
    bounds.push(positions[index]);
  }
  return bounds;
}

// Get a shape that represents the PVector points given
function drawShapeFromBounds(pg, bounds) {
  pg.beginShape();

  for (let i = 0; i < bounds.length; i += 1) {
    let v = bounds[i];
    pg.vertex(v[0], v[1]);
  }
  pg.endShape(CLOSE);
}

function keyPressed() {
  const angleDiff = 0.01;
  const sizeDiff = 0.03;

  switch (keyCode) {
    case LEFT_ARROW:
      adjustAngle += angleDiff;
      break;
    case RIGHT_ARROW:
      adjustAngle -= angleDiff;
      break;
    case UP_ARROW:
      adjustScale += sizeDiff;
      break;
    case DOWN_ARROW:
      adjustScale -= sizeDiff;
      break;
    case 32: // space
      if (displayType == 2) {
        displayType = 0;
      } else {
        displayType += 1;
      }
      break;
  }
}
