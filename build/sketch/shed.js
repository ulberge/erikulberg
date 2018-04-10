var container;
var camera, scene, renderer, controls, effect;
var plane, cube;
var mouse, raycaster, isShiftDown = false;
var rollOverMesh, rollOverMaterial;

var sketch;

init();
animate();

function init() {
    container = document.getElementById( 'shed' );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.x = 160;
    camera.position.y = 150;
    camera.position.z = 120;

    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0xFDFDFB );
    scene.background = new THREE.Color( 0xFFFFFF );

    // grid
    var gridSize = 20;
    var gridSquareSize = 12;
    var gridHelper = new THREE.GridHelper( gridSize*gridSquareSize, gridSize );
    scene.add( gridHelper );
    // Lights
    var ambientLight = new THREE.AmbientLight( 0x606060 );
    scene.add( ambientLight );
    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
    scene.add( directionalLight );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
}
function updateSketch(json) {
    if (sketch && sketch.clear) {
        sketch.clear();
    }
    if (json) {
        sketch = new Sketch(json);
        sketch.addTo(scene);
    }
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    controls.update();
    renderer.render( scene, camera );
}