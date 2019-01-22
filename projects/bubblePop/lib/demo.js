// Based heavily on the testbed.js code from google
var world = null;
var threeRenderer;
var renderer;
var camera;
var scene;
var timeStep = 1 / 60.0;
var velocityIterations = 8;
var positionIterations = 3;
var demo = {};
var projector = new THREE.Projector();
var planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

function initDemo() {
  camera = new THREE.PerspectiveCamera(70
    , windowWidth / windowHeight
    , 1, 1000);

  try {
    threeRenderer = new THREE.WebGLRenderer();
  } catch( error ) {
    printErrorMsg('<p>Sorry, your browser does not support WebGL.</p>');
    return;
  }

  threeRenderer.setClearColor(0xEEEEEE);
  threeRenderer.setSize(windowWidth, windowHeight);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 100;
  scene = new THREE.Scene();
  camera.lookAt(scene.position);

  document.body.appendChild( this.threeRenderer.domElement);

  renderer = new Renderer();
  var gravity = new b2Vec2(0, 0);
  world = new b2World(gravity);
  demo = new window['BubbleDemo'];

  document.addEventListener('keypress', function(event) {
    // Switch to different type of smasher
    if (demo.KeyPress !== undefined) {
      demo.KeyPress();
    }
  });

  document.addEventListener('mousedown', function (event) {
    // Begin smash
    var p = getMouseCoords(event);
    if (event.button === 0 && demo.MouseDown !== undefined) {
      demo.MouseDown(p);
    }
  });

  document.addEventListener('mouseup', function(event) {
    // End smash
    if (demo.MouseUp !== undefined) {
      demo.MouseUp(getMouseCoords(event));
    }
  });

  render();
}

var render = function() {
  // bring objects into world
  renderer.currentVertex = 0;
  if (demo.Step !== undefined) {
    demo.Step();
  }
  Step();
  renderer.draw();

  threeRenderer.render(scene, camera);
  requestAnimationFrame(render);
};

var Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);
};

function getMouseCoords(event) {
  var mouse = new THREE.Vector3();
  mouse.x = (event.clientX / windowWidth) * 2 - 1;
  mouse.y = -(event.clientY / windowHeight) * 2 + 1;
  mouse.z = 0.5;

  projector.unprojectVector(mouse, camera);
  var dir = mouse.sub(camera.position).normalize();
  var distance = -camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar(distance));
  var p = new b2Vec2(pos.x, pos.y);
  return p;
}
