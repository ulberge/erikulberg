/*
*
* plants.js
* By: Erik Ulberg
* Date:7/18/2017
*
* Functions for adding a random assortment of plants to the scene.
*
*/

Plants = function () {
  var minDistanceBetweenPlants = 70;
  var minPlants = 40;
  var plantVariance = 20;
  var plantScale = 30;
  var bedPadding = 10;

  // Generate a random assortment of plants and add the plants and their shadows to the scene
  this.generateAndAddPlants = function(plantList) {
    var plantsToAdd = generatePlants();
    addPlantsOnceLoaded(plantList, plantsToAdd);
  };

  function addPlantsOnceLoaded (plantList, plantsToAdd) {
      if (Utilities.isLoadingPlants()) {
        setTimeout(function() {
          addPlantsOnceLoaded(plantList, plantsToAdd);
        }, 50);
        return;
      } 
      addPlants(plantList, plantsToAdd);
  };

  // Load the obj and png files for the plants into a cache for faster regeneration of gardens
  this.loadAllPlantFiles = function() {
    for (var i = 0; i < PLANTS.length; i++) {
      loadPlantFiles(PLANTS[i]);
    }
  };

  // Given a list of scene objects to add to and a list of plants to add, add the plants and their shadows
  function addPlants (plantList, plantsToAdd) {
    for (var i = 0; i < plantsToAdd.length; i++) {
      addPlant(plantList, plantsToAdd[i]);
    }
  };

  // Generate a random assortment of plants and return them
  function generatePlants () {

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
      newPlant.plantIndex = plantIndex;

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

      plantsAdded.push(newPlant);
    }

    console.log('Plants added: ' + plantsAdded.length);
    console.log('Plants desired: ' + numPlants);

    return plantsAdded;
  };

  function loadPlantFiles (plant) {
    Utilities.loadObjAndPng(plant.name,
      function(texture) {
        plant.texture = texture;
      },
      function(object) {
        plant.obj = object;
      }
    );
  }

  function addPlant(plantList, plant) {
    // If the plant files haven't been loaded yet for the static list, load them to prevent objects not showing up
    // if (!plant.obj || !plant.texture) {
    //   Utilities.loadObjAndPng(plant.name,
    //     function(texture) {},
    //     function(object) {
    //       addPlantObject(plantList, plant, object);
    //     }
    //   );
    // } else {
      addPlantObject(plantList, plant, PLANTS[plant.plantIndex].obj.clone());
    //}
  }

  function addPlantObject(plantList, plant, object) {
    object.position.copy(plant.pos3D);
    if (plant.scale) {
      object.scale.multiplyScalar( plant.scale );
    } else {
      // if no scale provided, use default
      object.scale.multiplyScalar( plantScale );
    }

    scene.add(object);
    plantList.push(object);

    // Draw shadow circle
    var geometry = new THREE.CircleGeometry( plant.size, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0x000000, transparent: true, opacity: 0.3, depthWrite: false } );
    var circle = new THREE.Mesh( geometry, material );
    circle.position.x = plant.pos3D.x;
    circle.position.y = 0.1;
    circle.position.z = plant.pos3D.z;
    circle.rotation.x = -Math.PI/2;

    scene.add(circle);
    plantList.push(circle);
  }

  // Static list of plants to draw from. Scale is for scaling the object file, size is for their size in the world
  var PLANTS = [
    {
      name: 'obj/plants/echinacea_text',
      offsetY: 25,
      size: 1 * plantScale
    },
    {
      name: 'obj/plants/redflower',
      offsetY: 10,
      size: 1 * plantScale,
      scale: plantScale*0.8
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
};

