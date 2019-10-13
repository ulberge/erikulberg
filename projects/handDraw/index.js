window.PVector = window.Vec2;

/* global document */

let debug = true;

function run() {
  let debugGraphics;
  function sketch(p) {
    p.setup = function setup() {
      p.createCanvas(600, 400);
      p.background(255);
      p.noLoop();
      p.strokeWeight(2);
    };

    p.draw = function draw() {
      debugGraphics = p.createGraphics(600, 400);
      const aaron = new AARON(p, debugGraphics);
      aaron.drawPicture();
    };
  }
  new p5(sketch, document.getElementById('graphicsArea'));

  function debugSketch(p) {
    p.setup = function setup() {
      p.createCanvas(600, 400);
    };

    p.draw = function draw() {
      if (debugGraphics) {
        p.image(debugGraphics, 0, 0);
      }
    };
  }
  new p5(debugSketch, document.getElementById('debugArea'));
}

function init() {
  document.getElementById('toggleDebug').onclick = () => {
    debug = !debug;
    const debugArea = document.getElementById('debugArea');
    if (debug) {
      debugArea.style.visibility = 'visible';
    } else {
      debugArea.style.visibility = 'hidden';
    }
  };

  document.getElementById('run').onclick = () => {
    document.getElementById('graphicsArea').innerHTML = '';
    document.getElementById('debugArea').innerHTML = '';
    setTimeout(() => {
      run();
    }, 15000);
  };

  run();
}
