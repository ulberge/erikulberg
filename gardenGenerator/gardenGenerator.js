/*
*
* GardenGenerator.js
* By: Erik Ulberg
*
*/

var worldSize = 1000;
var planeWidth = 1000;
var planeDepth = 400;
var zoomRate = 1.05;
var minDistanceBetweenPlants = 70;
var minPlants = 40;
var plantVariance = 20;
var plantScale = 30;
var bedPadding = 80;

var container;
var camera, controls, scene, renderer, effect, axes, zoomIn, zoomOut;

var plants = [];

var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var canvasSizeX = 1;
var canvasSizeY = 1;

var boundingWidth = 300;
var boundingHeight = 100;
var boundingDepth = 30;

var timer = 1;
var cameraStartVector = new THREE.Vector3(260, 320, 560);
var cameraMoveVector = new THREE.Vector3(-500, 0, 50);
var cameraTimer = 0;
var updateCameraRate = 150;
var updatePlantsRate = 150;

var running = true;

var Plants = new Plants();
var Background = new Background();

init();
animate();

function init() {

  container = document.getElementById( 'garden' );

  camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, planeWidth*2 );
  camera.position.set(cameraStartVector.x,cameraStartVector.y,cameraStartVector.z);
  camera.zoom = 1.2;

  controls = new THREE.OrbitControls( camera );
  controls.maxPolarAngle = Math.PI*0.41; 
  controls.maxAzimuthAngle = Math.PI * 0.75;
  controls.minAzimuthAngle = -Math.PI * 0.25;
  controls.update();

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xfefefe );
  var ambient = new THREE.AmbientLight( 0xFFFFFF );
  scene.add( ambient );
  var gridHelper = new THREE.GridHelper( worldSize, 10, 0x000000, 0x000000 );
  gridHelper.position.z = -100;
  scene.add( gridHelper );

  Background.create();

  Plants.loadAllPlantFiles();
  Plants.generatePlants(plants);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth*canvasSizeX, window.innerHeight*canvasSizeY );

  container.appendChild( renderer.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'resize', onWindowResize, false );

  zoomIn = false;
  zoomOut = false;

  $(window).keydown(function(event) {
    console.log(event.keyCode);
    switch(event.keyCode){
      case 189 : 
        zoomIn = true;
        break;
      case 187 : 
        zoomOut = true;
        break;
      case 32 : 
        running = !running;
        break;
    }
  });
  $(window).keyup(function(event) {
    console.log(event.keyCode);
    switch(event.keyCode){
      case 189 : 
        zoomIn = false;
        break;
      case 187 : 
        zoomOut = false;
        break;
    }
  });

  $('.generateLink').click(function() {
    updatePlants();
  });
  $('.pauseLink').click(function() {
    running = !running;
  });

  effect = new THREE.OutlineEffect( renderer );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) / 2;
  mouseY = ( event.clientY - windowHalfY ) / 2;

}

function animate() {
  requestAnimationFrame( animate );

  if ((timer % updatePlantsRate) === (updatePlantsRate-1)) {
    updatePlants();
  }

  if ((timer % updateCameraRate) === 0) {
    cameraNewVector = new THREE.Vector3((Math.random()*1000)-500, (Math.random()*150)+250, (Math.random()*200)+400);
    cameraMoveVector.copy(cameraNewVector);
    cameraMoveVector.sub(camera.position);
    cameraMoveVector.clampScalar(-200, 200);
    cameraStartVector.copy(camera.position);
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

  camera.lookAt( new THREE.Vector3(0, 100, 0) );

  if (zoomIn) {
    camera.zoom = camera.zoom/zoomRate;
  }
  if (zoomOut) {
    camera.zoom = camera.zoom*zoomRate;
  }
  camera.updateProjectionMatrix();

  effect.render( scene, camera );
}

function updatePlants() {
  console.log('generate new garden!');
  for (var i = 0; i < plants.length; i++) {
    scene.remove(plants[i]);
  }
  Plants.generatePlants(plants);
}

