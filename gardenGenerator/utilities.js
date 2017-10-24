/*
*
* utilities.js
* By: Erik Ulberg
* Date:7/18/2017
*
*/

var Utilities = {
  loadingCount: 0,
  isLoadingPlants: function () {
    console.log(this.loadingCount);
    return this.loadingCount > 0;
  },
  loadObjAndPng: function (filename, textureCallback, objectCallback) {
    var that = this;
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
      console.log( item, loaded, total );
    };

    var onProgress = function ( xhr ) {};
    var onError = function ( xhr ) {};
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader( manager );

    this.loadingCount+=2;
    
    loader.load( filename + '.png', function ( image ) {
      that.loadingCount--;
      texture.image = image;
      texture.needsUpdate = true;
      texture.minFilter = THREE.LinearFilter;

      if (textureCallback) {
        textureCallback(texture);
      }

    } );
      
    var loader = new THREE.OBJLoader( manager );
    loader.load( filename + '.obj', function ( object ) {
      that.loadingCount--;
      object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
          child.material.side = THREE.DoubleSide;
          child.material.map = texture;
        }
      } );

      if (objectCallback) {
        objectCallback(object);
      }

    }, onProgress, onError );
  }
  
};