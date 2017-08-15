class StereoLayer {

  constructor( scene, leftImageFileName, rightImageFileName, depth, lOffset, vOffset ) {

    this.scene = scene;
    this.position = new THREE.Vector3( lOffset ? lOffset : 0, vOffset ? vOffset : 3, -depth  );
    // this.position = new THREE.Vector3(  -5, 3, -depth  );

    this.originalY = vOffset ? vOffset : 3;

    const h = 35;
    const w = h * 1.333; 
    this.scale = new THREE.Vector3(  w, h, 1  );

    this.leftImage = StereoLayer.loadImage( leftImageFileName, ( mesh ) => {
      this.addImage( mesh, true );
    } );
    this.rightImage = StereoLayer.loadImage( rightImageFileName, ( mesh ) => {
      this.addImage( mesh, false );
    } );

  }

  update( rate ) {

    // Move forward
    this.position.z += rate;
    this.leftImage.position.z = this.position.z;
    this.rightImage.position.z = this.position.z;

    this.leftImage.position.y = 0 + this.originalY + Math.pow((this.position.z+15) * 0.012, 2);
    this.rightImage.position.y = 0 + this.originalY + Math.pow((this.position.z+15) * 0.012, 2);

  }

  addImage( texture, isLeftImage ) {

    const material = new THREE.MeshBasicMaterial( {
      map: texture,
      transparent: true,
     }  );
    const geometry = new THREE.PlaneGeometry(1, 1);
    let mesh = new THREE.Mesh( geometry, material );

    mesh.layers.set( isLeftImage ? 1 : 2 );
    mesh.position.copy(this.position);
    mesh.scale.copy(this.scale);

    if ( isLeftImage ) {
      this.leftImage = mesh;
    } else {
      this.rightImage = mesh;
    }
    this.scene.add( mesh );

  }

  static loadImage( fileName, callback ) {

    const loader = new THREE.TextureLoader();
    loader.load( 
      fileName,
      function ( texture ) {

        callback( texture );
      }
     );

  }

}

class StereoLayerGroup {

  constructor(near, far) {

    this.stereoLayers = [];
    this.isLoadingImagesDone = false;
    this.frontZ = near;
    this.farZ = far;

  }



  update( rate ) {

    // Don't start updating until all images loaded
    if ( !this.isLoadingImagesDone ) {
      for ( let stereoLayer of this.stereoLayers ) {
        if ( !stereoLayer.leftImage || !stereoLayer.rightImage ) {
          return
        }
      }
      this.isLoadingImagesDone = true;
    }

    for ( let stereoLayer of this.stereoLayers ) {
      stereoLayer.update( rate );

      if (stereoLayer.position.z >= this.frontZ) {
        stereoLayer.position.z = this.farZ;
      }
    }

  }

}