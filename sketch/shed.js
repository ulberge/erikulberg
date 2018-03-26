var container;
var camera, scene, renderer, controls, effect;
var plane, cube;
var mouse, raycaster, isShiftDown = false;
var rollOverMesh, rollOverMaterial;
var woodMaterial, treatedWoodMaterial, concreteMaterial;
var objects = [];

var doorWidth = 60;
var doorHeight = 82;
var mainHeight = doorHeight + 6.5;
var slantHeight = 18;
var topHeight = mainHeight + slantHeight;
var leanToHeight = mainHeight - slantHeight;
var leanToDistance = -44.5;

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
    scene.background = new THREE.Color( 0xf0f0f0 );

    woodMaterial = new THREE.MeshToonMaterial( { color: 0xfeb74c } );
    treatedWoodMaterial = new THREE.MeshToonMaterial( { color: 0x8b5a2b } );
    concreteMaterial = new THREE.MeshToonMaterial( { color: 0x777777 } );


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

function drawStuff() {
    drawBoard(scene, new THREE.Vector3( 84, 3.875, 48 ), new THREE.Vector3( 0, -3.875, 0 ));
    drawBoard(scene, new THREE.Vector3( 84, 3.5, 3.5 ), new THREE.Vector3( 0, -3.875-3.5, 0 ), treatedWoodMaterial);
    drawBoard(scene, new THREE.Vector3( 84, 3.5, 3.5 ), new THREE.Vector3( 0, -3.875-3.5, 48-3.5 ), treatedWoodMaterial);

    // drawWall(new THREE.Vector3( 84, mainHeight, 0 ), new THREE.Vector3( 0, 0, 0 ));

    // drawDoorWall(new THREE.Vector3( 84, mainHeight, 0 ), new THREE.Vector3( 0, 0, 48-3 ));

    // drawSideWall(new THREE.Vector3( 48-6, mainHeight, 0 ), new THREE.Vector3( 0, 0, 48-3 ), new THREE.Vector3( 0, Math.PI/2, 0 ));
    // drawSideWall(new THREE.Vector3( 48-6, mainHeight, 0 ), new THREE.Vector3( 84-3.5, 0, 48-3 ), new THREE.Vector3( 0, Math.PI/2, 0 ));

    // drawRoof();
    // drawLeanTo();
    // drawBlocks();
}

function drawBlocks() {
    var blockSize = 8;
    var blockHeight = 4;
    var height = -3.875-3.5-blockHeight;
    var margin = (blockSize-3.5)/2;
    drawBoard(scene, new THREE.Vector3( blockSize, blockHeight, blockSize ), new THREE.Vector3( -margin, height, -margin ), concreteMaterial);
    drawBoard(scene, new THREE.Vector3( blockSize, blockHeight, blockSize  ), new THREE.Vector3( (84-blockSize)/2, height, -margin ), concreteMaterial);
    drawBoard(scene, new THREE.Vector3( blockSize, blockHeight, blockSize  ), new THREE.Vector3( 84-margin-3.5, height, -margin ), concreteMaterial);
    drawBoard(scene, new THREE.Vector3( blockSize, blockHeight, blockSize ), new THREE.Vector3( -margin, height, 48-3.5-margin ), concreteMaterial);
    drawBoard(scene, new THREE.Vector3( blockSize, blockHeight, blockSize ), new THREE.Vector3( (84-blockSize)/2, height, 48-3.5-margin ), concreteMaterial);
    drawBoard(scene, new THREE.Vector3( blockSize, blockHeight, blockSize  ), new THREE.Vector3( 84-margin-3.5, height, 48-3.5-margin ), concreteMaterial);

    drawBoard(scene, new THREE.Vector3( blockSize, blockHeight, blockSize ), new THREE.Vector3( -margin, height, leanToDistance-margin ), concreteMaterial);
    drawBoard(scene, new THREE.Vector3( blockSize, blockHeight, blockSize  ), new THREE.Vector3( 84-margin-3.5, height, leanToDistance-margin ), concreteMaterial);
}

function drawRoof() {
    var roofWidth = 120;
    var angle = Math.atan(slantHeight/48);
    drawBoards(scene, 5, new THREE.Vector3(84, roofWidth, 0), new THREE.Vector3( 0, leanToHeight+1, -52 ), new THREE.Vector3( (Math.PI/2)-(angle*1.05), 0, 0 ));
}

function drawLeanTo() {
    var group = new THREE.Group();
    var depthHeight = 3.875+3.5;
    drawBoard(group, new THREE.Vector3( 3.5, leanToHeight + depthHeight, 3.5 ), new THREE.Vector3( 0, -depthHeight, leanToDistance ), treatedWoodMaterial);
    drawBoard(group, new THREE.Vector3( 3.5, leanToHeight + depthHeight, 3.5 ), new THREE.Vector3( 84-3.5, -depthHeight, leanToDistance ), treatedWoodMaterial);
    drawBoard(group, new THREE.Vector3( 84, 3.5, 1.5 ), new THREE.Vector3( 1.5, leanToHeight-3.5, leanToDistance-1.5 ));
    drawBoard(group, new THREE.Vector3( 84, 3.5, 1.5 ), new THREE.Vector3( 1.5, leanToHeight-3.5, leanToDistance+3.5 ));
    scene.add(group);
}

function drawWall(scale, position, rotation) {
    var group = new THREE.Group();

    var insideHeight = scale.y-4.5;
    var numSupports = 5;

    // repeating boards
    drawBoards(group, numSupports, new THREE.Vector3(scale.x-6, insideHeight, 0), new THREE.Vector3( 3, 1.5, 0 ));

    // edges
    drawBoard(group, new THREE.Vector3( 1.5, insideHeight, 3.5 ), new THREE.Vector3( 0, 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, 12, 3.5 ), new THREE.Vector3( 1.5, 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, 12, 3.5 ), new THREE.Vector3( 1.5, insideHeight-12+1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, 12, 3.5 ), new THREE.Vector3( 1.5, (insideHeight)/2-(12/2), 0 ));

    drawBoard(group, new THREE.Vector3( 1.5, insideHeight, 3.5 ), new THREE.Vector3( scale.x-1.5, 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, 12, 3.5 ), new THREE.Vector3( scale.x-3, 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, 12, 3.5 ), new THREE.Vector3( scale.x-3, insideHeight-12+1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, 12, 3.5 ), new THREE.Vector3( scale.x-3, (insideHeight)/2-(12/2), 0 ));

    // caps
    drawBoard(group, new THREE.Vector3(scale.x, 1.5, 3.5), new THREE.Vector3( 0, scale.y-1.5, 0 ));
    drawBoard(group, new THREE.Vector3(scale.x, 1.5, 3.5), new THREE.Vector3( 0, scale.y-3, 0 ));
    drawBoard(group, new THREE.Vector3(scale.x, 1.5, 3.5), new THREE.Vector3( 0, 0, 0 ), treatedWoodMaterial);

    if (position) {
        group.position.set( position.x, position.y, position.z );
    }
    if (rotation) {
        group.rotation.set( rotation.x, rotation.y, rotation.z );
    }
    scene.add(group);
}

function drawDoorWall(scale, position, rotation) {
    var group = new THREE.Group();

    var insideHeight = scale.y-4.5;
    var numSupports = 5;

    // outer edges
    drawBoard(group, new THREE.Vector3( 1.5, topHeight-1.5, 3.5 ), new THREE.Vector3( 0, 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, topHeight-3.5-1.5, 3.5 ), new THREE.Vector3( 1.5, 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, topHeight-1.5, 3.5 ), new THREE.Vector3( scale.x-1.5, 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, topHeight-3.5-1.5, 3.5 ), new THREE.Vector3( scale.x-3, 1.5, 0 ));

    drawBoard(group, new THREE.Vector3( scale.x-3, 3.5, 1.5 ), new THREE.Vector3( 1.5, topHeight-3.5, 0.5 ));
    drawBoard(group, new THREE.Vector3( scale.x-3, 3.5, 1.5 ), new THREE.Vector3( 1.5, topHeight-3.5, 2 ));

    // edges
    drawBoard(group, new THREE.Vector3( 1.5, insideHeight, 3.5 ), new THREE.Vector3( 3, 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, insideHeight, 3.5 ), new THREE.Vector3( scale.x-4.5, 1.5, 0 ));

    // caps
    drawBoard(group, new THREE.Vector3(scale.x-6, 1.5, 3.5), new THREE.Vector3( 3, scale.y-1.5, 0 ));
    drawBoard(group, new THREE.Vector3(scale.x-6, 1.5, 3.5), new THREE.Vector3( 3, scale.y-3, 0 ));

    // door
    drawBoard(group, new THREE.Vector3( 1.5, insideHeight, 3.5 ), new THREE.Vector3( ((scale.x+doorWidth)/2)+1.5, 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, insideHeight, 3.5 ), new THREE.Vector3( ((scale.x-doorWidth)/2)-3, 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, insideHeight-3.5, 3.5 ), new THREE.Vector3( ((scale.x+doorWidth)/2), 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, insideHeight-3.5, 3.5 ), new THREE.Vector3( ((scale.x-doorWidth)/2)-1.5, 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( doorWidth+3, 3.5, 1.5 ), new THREE.Vector3( ((scale.x-doorWidth)/2)-(1.5), insideHeight-2, 2 ));
    drawBoard(group, new THREE.Vector3( doorWidth+3, 3.5, 1.5 ), new THREE.Vector3( ((scale.x-doorWidth)/2)-1.5, insideHeight-2, 0.5 ));

    // base
    var baseWidth = (scale.x-doorWidth)/2;
    drawBoard(group, new THREE.Vector3(baseWidth, 1.5, 3.5), new THREE.Vector3( 0, 0, 0 ), treatedWoodMaterial);
    drawBoard(group, new THREE.Vector3(baseWidth, 1.5, 3.5), new THREE.Vector3( scale.x-baseWidth, 0, 0 ), treatedWoodMaterial);

    // top section
    var topSectionInnerHeight = topHeight-insideHeight-3-3.5-3;
    drawBoards(group, numSupports, new THREE.Vector3(scale.x-6, topSectionInnerHeight, 0), new THREE.Vector3( 3, insideHeight+4.5, 0 ));
    drawBoard(group, new THREE.Vector3(scale.x-6, 1.5, 3.5), new THREE.Vector3( 3, topHeight-3.5-1.5, 0 ));

    if (position) {
        group.position.set( position.x, position.y, position.z );
    }
    if (rotation) {
        group.rotation.set( rotation.x, rotation.y, rotation.z );
    }
    scene.add(group);
}

function drawSideWall(scale, position, rotation) {
    var group = new THREE.Group();

    var insideHeight = scale.y-4.5;
    var numSupports = 3;
    var spacing = (scale.x-1.5)/(numSupports-1);

    // repeating boards
    drawBoards(group, numSupports-1, new THREE.Vector3(scale.x-spacing, insideHeight, 0), new THREE.Vector3( spacing, 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, topHeight-1.5, 3.5 ), new THREE.Vector3( 0, 1.5, 0 ));
    drawBoard(group, new THREE.Vector3( 1.5, (topHeight-insideHeight-4.5)/2, 3.5 ), new THREE.Vector3( (scale.x-1.5)/2, insideHeight+4.5, 0 ));

    // caps
    drawBoard(group, new THREE.Vector3(scale.x-1.5, 1.5, 3.5), new THREE.Vector3( 1.5, scale.y-1.5, 0 ));
    drawBoard(group, new THREE.Vector3(scale.x-1.5, 1.5, 3.5), new THREE.Vector3( 1.5, scale.y-3, 0 ));
    drawBoard(group, new THREE.Vector3(scale.x, 1.5, 3.5), new THREE.Vector3( 0, 0, 0 ), treatedWoodMaterial);

    if (position) {
        group.position.set( position.x, position.y, position.z );
    }
    if (rotation) {
        group.rotation.set( rotation.x, rotation.y, rotation.z );
    }
    scene.add(group);
}

function drawBoards(parent, numSupports, scale, position, rotation) {
    var group = new THREE.Group();

    var spacing = (scale.x-1.5)/(numSupports-1);
    var scale = new THREE.Vector3(1.5, scale.y, 3.5);
    for (var i = 0; i < numSupports; i++) {
        drawBoard(group, scale, new THREE.Vector3((i * spacing), 0, 0));
    }
    if (position) {
        group.position.set( position.x, position.y, position.z );
    }
    if (rotation) {
        group.rotation.set( rotation.x, rotation.y, rotation.z );
    }
    parent.add(group);
}

function drawBoard(parent, scale, position, material) {
    var group = new THREE.Group();
    material = material || woodMaterial;

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.scale.set( scale.x, scale.y, scale.z );

    var edges = new THREE.EdgesGeometry( geometry );
    var line = new THREE.LineSegments( edges,  new THREE.LineBasicMaterial( { color: 0x000000 } ) );
    line.material.depthTest = false;
    line.material.transparent = true;
    line.scale.set( scale.x, scale.y, scale.z );

    group.add( mesh );
    group.add( line );

    objects.push( mesh );

    group.position.set( position.x + (scale.x/2), position.y + (scale.y/2), position.z + (scale.z/2) );
    parent.add( group );
}