/*
*
* StereoCollage.js
*
* By: Erik Ulberg
*
*/

(function() {
  const diff = 35;
  const rate = 0.2;
  const near = -diff*0.2;
  const far = -diff*5.2;
  const STEREO_LAYERS = [
    {
      left: 'img/1_L2-01.png',
      right: 'img/1_R2-01.png',
      depth: diff
    },
    {
      left: 'img/97_L2-01.png',
      right: 'img/97_R2-01.png',
      depth: diff*2
    },
    {
      left: 'img/93_L2-01.png',
      right: 'img/93_R2-01.png',
      depth: diff*3
    },
    {
      left: 'img/99_L2-01.png',
      right: 'img/99_R2-01.png',
      depth: diff*4
    },
    {
      left: 'img/990_L2-01.png',
      right: 'img/990_R2-01.png',
      depth: diff*5
    },
    // {
    //   left: 'img/1_L_edit-01.png',
    //   right: 'img/1_R_edit-01.png',
    //   depth: 60
    // },
    // {
    //   left: 'img/1_L_edit-01.png',
    //   right: 'img/1_R_edit-01.png',
    //   depth: 90
    // },
    // {
    //   left: 'img/1_L_edit-01.png',
    //   right: 'img/1_R_edit-01.png',
    //   depth: 120
    // },
    // {
    //   left: 'img/1_L_edit-01.png',
    //   right: 'img/1_R_edit-01.png',
    //   depth: 150
    // },
    // {
    //   left: 'img/1_L_edit-01.png',
    //   right: 'img/1_R_edit-01.png',
    //   depth: 180
    // },
    // {
    //   left: 'img/93_L_edit2-01.png',
    //   right: 'img/93_R_edit2-01.png',
    //   depth: 70
    // },
    // {
    //   left: 'img/93_L_edit2-01.png',
    //   right: 'img/93_R_edit2-01.png',
    //   depth: 110
    // },
    // {
    //   left: 'img/1_L_edit-01.png',
    //   right: 'img/1_R_edit-01.png',
    //   depth: 30,
    //   lOffset: -4,
    //   vOffset: 5,
    // },
    // {
    //   left: 'img/97_L_edit-01.png',
    //   right: 'img/97_R_edit-01.png',
    //   depth: 60,
    //   lOffset: 2,
    //   vOffset: 5,
    // },
    // {
    //   left: 'img/1_L_edit-01.png',
    //   right: 'img/1_R_edit-01.png',
    //   depth: 90,
    //   lOffset: -4,
    //   vOffset: 5,
    // },
    // {
    //   left: 'img/97_L_edit-01.png',
    //   right: 'img/97_R_edit-01.png',
    //   depth: 120,
    //   lOffset: 2,
    //   vOffset: 5,
    // },
    // {
    //   left: 'img/93_L_edit-01.png',
    //   right: 'img/93_R_edit-01.png',
    //   depth: 180
    // },
  ]

  if ( !Detector.webgl ) {
    Detector.addGetWebGLMessage();
    return;
  }

  var container;
  let layers = [];
  var camera, scene, renderer, effect;

  init();
  animate();

  function init() {

    container = document.getElementById( 'main' );

    camera = new THREE.PerspectiveCamera( 60, 1.33, 0.1, 200 );
    camera.position.z = 0;
    //camera.setFocalLength( 1 );

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0xABCDEF, 0.01);

    layers = new StereoLayerGroup(near, far);
    for (let layer of STEREO_LAYERS) {
      const stereoLayer = new StereoLayer( scene, layer.left, layer.right, layer.depth, layer.lOffset, layer.vOffset );
      layers.stereoLayers.push( stereoLayer );
    }

    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( scene.fog.color );

    container.appendChild( renderer.domElement );

    //effect = new THREE.AnaglyphEffect( renderer );
    effect = new THREE.StereoEffect( renderer );
    //effect.setSize( window.innerHeight * 1.333, window.innerHeight );
    effect.setSize( window.innerWidth, window.innerWidth * 0.75 );

  }

  function animate() {

    layers.update(rate);

    requestAnimationFrame( animate );
    render();

  }

  function render() {

    effect.render( scene, camera );

  }
})();