Background = function () {

  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };

  var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function ( xhr ) {
  };

  this.create = function() {
    addSoil();
    addPlants();
    addSidewalk();
    addGrass();
  }

  function addSoil() {
    var soilTexture = new THREE.Texture();
    var loader = new THREE.ImageLoader( manager );
    loader.load( 'obj/other/groundextralow.png', function ( image ) {

      soilTexture.image = image;
      soilTexture.needsUpdate = true;
      soilTexture.minFilter = THREE.LinearFilter;

    } );

    var loader = new THREE.OBJLoader( manager );
    loader.load( 'obj/other/groundextralow.obj', function ( object ) {

      object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
          child.material.side = THREE.DoubleSide;
          child.material.map = soilTexture;
          // child.material.transparent = true;
          // child.material.opacity = 0.75;
        }

      } );

      object.scale.y = 50;
      object.scale.x = 225;
      object.scale.z = 200;
      scene.add(object);

    }, onProgress, onError );


    var loader = new THREE.TextureLoader();
    loader.load('obj/other/groundextralow.png', function ( texture ) {
      var height = 30;

      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set( planeWidth/200, planeDepth/200 );

      var groundGeo = new THREE.BoxBufferGeometry( planeWidth, height, planeDepth );
      var groundMat = new THREE.MeshBasicMaterial({
        map: texture, 
        overdraw: 0.5
      });

      var ground = new THREE.Mesh( groundGeo, groundMat );
      ground.position.y = -5-height/2;
      ground.position.z = 0;
      ground.receiveShadow = true;

      scene.add( ground );
    });
  }

  function addSidewalk() {
    var loader = new THREE.TextureLoader();
    loader.load('obj/other/sidewalk.png', function ( texture ) {
      var height = 30;

      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      var groundGeo = new THREE.BoxBufferGeometry( worldSize, height, planeDepth/2 );
      var groundMat = new THREE.MeshBasicMaterial({
        map: texture, 
        overdraw: 0.5
      });

      var ground = new THREE.Mesh( groundGeo, groundMat );

      ground.position.y = -height*0.55;
      ground.position.z = planeDepth * 0.75;
      ground.receiveShadow = true;

      scene.add( ground );
    });
  }

  function addGrass() {
    var loader = new THREE.TextureLoader();
    loader.load('obj/other/grass.png', function ( texture ) {
      var height = 30;

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
      ground.receiveShadow = true;

      scene.add( ground );
    });
  }

  function addPlants() {
    addPlant({name: 'obj/plants/test1_mid'}, new THREE.Vector3( 220, 150, -510 ), new THREE.Vector3( 0, -0.3, 0 ), 5);
    addPlant({name: 'obj/plants/test1_back'}, new THREE.Vector3( -210, 50, -510 ), new THREE.Vector3( 0, -0.7, 0 ), 5);  
  }

  function addPlant(plant, position, rotation, scale) {
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader( manager );
    loader.load( plant.name + '.png', function ( image ) {

      texture.image = image;
      texture.needsUpdate = true;
      texture.minFilter = THREE.LinearFilter;

    } );
      
    var loader = new THREE.OBJLoader( manager );
    loader.load( plant.name + '.obj', function ( object ) {

      object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
          child.material.side = THREE.DoubleSide;
          child.material.map = texture;
        }

      } );

      object.rotation.y = rotation.y;
      object.scale.multiplyScalar( scale );
      object.position.x = position.x;
      object.position.y = position.y;
      object.position.z = position.z;

      scene.add( object );

    }, onProgress, onError );
  }
};