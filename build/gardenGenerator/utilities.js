/*
*
* utilities.js
* By: Erik Ulberg
* Date:7/18/2017
*
*/

var Utilities = {

  loadObjAndPng: function (filename, textureCallback, objectCallback) {
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
      console.log( item, loaded, total );
    };

    var onProgress = function ( xhr ) {};
    var onError = function ( xhr ) {};
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader( manager );
    loader.load( filename + '.png', function ( image ) {

      texture.image = image;
      texture.needsUpdate = true;
      texture.minFilter = THREE.LinearFilter;

      if (textureCallback) {
        textureCallback(texture);
      }

    } );
      
    var loader = new THREE.OBJLoader( manager );
    loader.load( filename + '.obj', function ( object ) {

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