/*
*
* background.js
* By: Erik Ulberg
* Date:7/18/2017
*
* Functions for adding a background and ground to the garden.
*
*/

Background = function () {

  this.create = function() {
    addSoil();
    addBackgroundPlants();
    addSidewalk();
    addGrass();
  };

  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };

  var onProgress = function ( xhr ) {};
  var onError = function ( xhr ) {};

  function addSoil() {

    var loader = new THREE.TextureLoader();
    loader.load('obj/other/groundextralow.png', function ( texture ) {
      var height = 40;

      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set( planeWidth/200, planeDepth/200 );

      var groundGeo = new THREE.BoxBufferGeometry( planeWidth, height, planeDepth );
      var groundMat = new THREE.MeshBasicMaterial({
        map: texture, 
        overdraw: 0.5
      });

      var ground = new THREE.Mesh( groundGeo, groundMat );
      ground.position.y = -height/2;
      ground.position.z = 0;

      scene.add( ground );
    });
  }

  function addSidewalk() {
    var loader = new THREE.TextureLoader();
    loader.load('obj/other/sidewalk.png', function ( texture ) {
      var height = 40;

      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set( 10, 2 );

      var groundGeo = new THREE.BoxBufferGeometry( worldSize, height, planeDepth/2 );
      var groundMat = new THREE.MeshBasicMaterial({
        map: texture, 
        overdraw: 0.5
      });

      var ground = new THREE.Mesh( groundGeo, groundMat );

      ground.position.y = -height*0.5;
      ground.position.z = planeDepth * 0.75;

      scene.add( ground );
    });
  }

  function addGrass() {
    var loader = new THREE.TextureLoader();
    loader.load('obj/other/grass.jpg', function ( texture ) {
      var height = 40;

      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set( planeWidth/100, planeDepth/100 );

      var groundGeo = new THREE.BoxBufferGeometry( worldSize, height, planeDepth );
      var groundMat = new THREE.MeshBasicMaterial({
        map: texture, 
        overdraw: 0.5
      });

      var ground = new THREE.Mesh( groundGeo, groundMat );

      ground.position.y = -height*0.5;
      ground.position.z = -planeDepth * 1;

      scene.add( ground );
    });
  }

  function addBackgroundPlants() {
    Utilities.loadObjAndPng('obj/plants/test1_mid',
      function(texture) {},
      function(object) {
        object.rotation.y = -0.3;
        object.scale.multiplyScalar(5);
        object.position.copy(new THREE.Vector3( 220, 150, -510 ));

        scene.add(object);
      }
    );

    Utilities.loadObjAndPng('obj/plants/test1_back',
      function(texture) {},
      function(object) {
        object.rotation.y = -0.7;
        object.scale.multiplyScalar(5);
        object.position.copy(new THREE.Vector3( -210, 50, -510 ));

        scene.add(object);
      }
    );
  }
};