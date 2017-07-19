Plants = function () {
  var PLANTS = [
    {
      name: 'obj/plants/echinacea_text',
      offsetY: 25,
      size: 1 * plantScale
    },
    {
      name: 'obj/plants/redflower',
      offsetY: 10,
      size: 1 * plantScale
    },
    {
      name: 'obj/plants/rodgersia',
      offsetY: 45,
      scale: plantScale*1.5,
      size: 1.6 * plantScale
    },
    {
      name: 'obj/plants/cardoon',
      offsetY: 100,
      scale: plantScale*1.5,
      size: 2.3 * plantScale
    },
    {
      name: 'obj/plants/lavendar',
      offsetY: 20,
      scale: plantScale*1.5,
      size: 1.3 * plantScale
    },
    {
      name: 'obj/plants/rosemary',
      offsetY: 20,
      size: 0.6 * plantScale
    },
    {
      name: 'obj/plants/hydrangea',
      offsetY: 20,
      size: 2.3 * plantScale
    },
    {
      name: 'obj/plants/mukdenia',
      offsetY: 15,
      scale: plantScale*1.5,
      size: 1.4 * plantScale
    },
    {
      name: 'obj/plants/crocus',
      offsetY: 20,
      size: 0.6 * plantScale
    },
    {
      name: 'obj/plants/yellowbush',
      offsetY: 20,
      size: 1.4 * plantScale,
      scale: plantScale*1.5
    },
    {
      name: 'obj/plants/hosta1',
      offsetY: 30,
      size: 1.5 * plantScale,
      scale: plantScale*1
    },
    {
      name: 'obj/plants/hosta2',
      offsetY: 55,
      size: 2 * plantScale,
      scale: plantScale*1.5
    },
    {
      name: 'obj/plants/euphorbia_dis',
      offsetY: 35,
      scale: plantScale*2,
      size: 1.5 * plantScale
    },
  ];

  this.loadAllPlantFiles = function() {
    for (var i = 0; i < PLANTS.length; i++) {
      loadPlantFiles(PLANTS[i]);
    }
  };

  this.generatePlants = function (plantList) {
    var plantsAdded = [];

    var numPlants = Math.floor(Math.random()*plantVariance) + minPlants;
    var numTry = 400;
    for (var i = 0; i < numTry; i++) {
      if (plantsAdded.length >= numPlants) {
        break;
      }

      // Select a random plant and make copy
      var plantIndex = Math.floor(Math.random()*PLANTS.length);
      var newPlant = {};
      Object.assign(newPlant, PLANTS[plantIndex]);

      // Calculate random placement
      var minX = (-planeWidth/2) + newPlant.size + bedPadding;
      var maxX = (planeWidth/2) - newPlant.size - bedPadding;
      var minZ = (-planeDepth/2) + newPlant.size + bedPadding;
      var maxZ = (planeDepth/2) - newPlant.size - bedPadding;
      var posX = (Math.random()*(maxX-minX)) + minX;
      var posZ = (Math.random()*(maxZ-minZ)) + minZ;
      newPlant.pos2D = new THREE.Vector3( posX, 0, posZ );
      newPlant.pos3D = new THREE.Vector3( posX, newPlant.offsetY, posZ );

      // Don't add if plant is too close to others
      var isOverlapping = false;
      for (var j = 0; j < plantsAdded.length; j++) {
        var distanceBetween = plantsAdded[j].pos2D.distanceTo(newPlant.pos2D);
        var minDistanceRequired = plantsAdded[j].size + newPlant.size;
        if (distanceBetween < minDistanceRequired) {
          isOverlapping = true;
          break;
        }
      }
      if (isOverlapping) {
        continue;
      }

      // Add this plant
      plantsAdded.push(newPlant);

      addPlant(plantList, newPlant, newPlant.pos3D, new THREE.Vector3(0,0,0), newPlant.scale);
    }
    console.log('Plants added: ' + plantsAdded.length);
    console.log('Plants desired: ' + numPlants);
  };

  function loadPlantFiles (currentPlant) {
      // texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
      console.log( item, loaded, total );
    };

    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader( manager );
    loader.load( currentPlant.name + '.png', function ( image ) {

      texture.image = image;
      texture.needsUpdate = true;
      texture.minFilter = THREE.LinearFilter;
      currentPlant.texture = texture;
    } );

    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };

    var onError = function ( xhr ) {
    };
    
    // model
    var loader = new THREE.OBJLoader( manager );
    loader.load( currentPlant.name + '.obj', function ( object ) {

      object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
          child.material.side = THREE.DoubleSide;
          child.material.map = texture;
        }

      } );

      currentPlant.obj = object;

    }, onProgress, onError );
  }

  function addPlant(plantList, plant, position, rotation, scale) {
    // texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
      console.log( item, loaded, total );
    };

    var texture;
    if (!plant.texture) {
      texture = new THREE.Texture();
      var loader = new THREE.ImageLoader( manager );
      loader.load( plant.name + '.png', function ( image ) {

        texture.image = image;
        texture.needsUpdate = true;
        texture.minFilter = THREE.LinearFilter;

      } );
    } else {
      texture = plant.texture;
    }

    if (!plant.obj) {
      var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
          var percentComplete = xhr.loaded / xhr.total * 100;
          console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
      };

      var onError = function ( xhr ) {
      };
      
      // model
      var loader = new THREE.OBJLoader( manager );
      loader.load( plant.name + '.obj', function ( object ) {

        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            child.material.side = THREE.DoubleSide;
            child.material.map = texture;
          }

        } );

        addPlantObject(plantList, plant, object, position, rotation, scale);

      }, onProgress, onError );
    } else {
      addPlantObject(plantList, plant, plant.obj.clone(), position, rotation, scale);
    }
  }

  function addPlantObject(plantList, plant, object, position, rotation, scale) {
    object.position.set( location.x, location.y, location.z );
    if (rotation) {
      object.rotation.y = rotation.y;
    }
    if (scale) {
      object.scale.multiplyScalar( scale );
    } else {
      object.scale.multiplyScalar( plantScale );
    }

    object.position.x = position.x;
    object.position.y = position.y;
    object.position.z = position.z;

    var geometry = new THREE.CircleGeometry( plant.size, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0x000000, transparent: true, opacity: 0.3, depthWrite: false } );
    var circle = new THREE.Mesh( geometry, material );
    circle.position.x = position.x;
    circle.position.y = 0.1;
    circle.position.z = position.z;
    circle.rotation.x = -Math.PI/2;


    scene.add( circle );
    plantList.push(circle);

    scene.add( object );
    plantList.push(object);
  }
};

