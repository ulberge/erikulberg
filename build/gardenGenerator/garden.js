/*
*
* garden.js
* By: Erik Ulberg
*
* 7/18/2017
*
*/

var worldSize = 1000;
var planeWidth = 1000;
var planeDepth = 400;

var zoomRate = 1.05;

var updateCameraRate = 150;
var updatePlantsRate = 150;

var container;
var camera, controls, scene, renderer, effect;
var zoomIn = false;
var zoomOut = false;

var plants = [];

var timer = 1;
var cameraStartVector = new THREE.Vector3(260, 320, 560);
var cameraMoveVector = new THREE.Vector3(-500, 0, 50);

var running = true;

var Plants = new Plants();
var Background = new Background();

init();
animate();

function init() {

  container = document.getElementById( 'garden' );

  camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 9999 );
  camera.position.set(cameraStartVector.x,cameraStartVector.y,cameraStartVector.z);
  camera.zoom = 1.2;

  controls = new THREE.OrbitControls( camera );
  controls.keyPanSpeed = 200;
  controls.update();

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xfefefe );

  var ambient = new THREE.AmbientLight( 0xFFFFFF, 1 );
  scene.add( ambient );

  var gridHelper = new THREE.GridHelper( worldSize, 10, 0x000000, 0x000000 );
  gridHelper.position.z = -100;
  gridHelper.position.y = 0.1;
  scene.add( gridHelper );

  Background.create();

  Plants.loadAllPlantFiles();
  Plants.generateAndAddPlants(plants);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );

  addControls();

  effect = new THREE.OutlineEffect( renderer );

}

function animate() {

  requestAnimationFrame(animate);

  if (running) {
    if ((timer % updatePlantsRate) === (updatePlantsRate-1)) {
      updatePlants();
    }

    if ((timer % updateCameraRate) === 0) {
      cameraMoveVector = new THREE.Vector3((Math.random()*1000)-500, (Math.random()*150)+250, (Math.random()*200)+400);
      cameraMoveVector.sub(camera.position);
      cameraMoveVector.clampScalar(-200, 200);
      cameraStartVector.copy(camera.position);
    }
  }

  render();

  if (running) {
    timer++;
  }

}

function render() {

  if (running) {
    var cameraRatio = (timer%updateCameraRate)/updateCameraRate;
    var cameraX = cameraStartVector.x + (cameraMoveVector.x*cameraRatio);
    var cameraY = cameraStartVector.y + (cameraMoveVector.y*cameraRatio);
    var cameraZ = cameraStartVector.z + (cameraMoveVector.z*cameraRatio);
    camera.position.set(cameraX, cameraY, cameraZ);
  }

  camera.lookAt( new THREE.Vector3(0, 50, 50) );

  if (zoomIn) {
    camera.zoom = camera.zoom*zoomRate;
  }
  if (zoomOut) {
    camera.zoom = camera.zoom/zoomRate;
  }
  camera.updateProjectionMatrix();

  effect.render( scene, camera );

}

// Delete current plants and generate and add new ones
function updatePlants() {

  console.log('Generate new garden!');
  for (var i = 0; i < plants.length; i++) {
    scene.remove(plants[i]);
  }
  Plants.generateAndAddPlants(plants);

}

function addControls() {

  var onkeydown = function(event) {
    console.log(event.keyCode);
    switch(event.keyCode){
      case 187 : 
        zoomIn = true;
        break;
      case 189 : 
        zoomOut = true;
        break;
      case 32 : 
        running = !running;
        break;
    }
  };
  window.addEventListener('keydown', onkeydown, false);

  window.onkeyup = function(event) {
    console.log(event.keyCode);
    switch(event.keyCode){
      case 187 : 
        zoomIn = false;
        break;
      case 189 : 
        zoomOut = false;
        break;
    }
  };
  window.addEventListener('keyup', onkeyup, false);

  onEvent('generateLink', 'click', function() {
    updatePlants();
  });
  onEvent('pauseLink', 'click', function() {
    running = !running;
  });
  onEvent('zoomInLink', 'mousedown', function() {
    zoomIn = true;
  });
  onEvent('zoomInLink', 'mouseup', function() {
    zoomIn = false;
  });
  onEvent('zoomOutLink', 'mousedown', function() {
    zoomOut = true;
  });
  onEvent('zoomOutLink', 'mouseup', function() {
    zoomOut = false;
  });

}

// Helper for native JS
function onEvent(className, event, myFunction) {
  var elements = document.getElementsByClassName(className);

  for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener(event, myFunction, false);
  }
}

