class Unit {

    constructor(json) {
        this.color = json[0].color;
        this.size = json[1];
        this.position = json[2] || [0,0,0];
        this.rotation = json[3] || [0,0,0];
    }

    addTo(parent) {
        var group = new THREE.Group();

        var material = new THREE.MeshToonMaterial( { color: this.color } );
        var geometry = new THREE.BoxGeometry( this.size[0], this.size[1], this.size[2] );
        var mesh = new THREE.Mesh( geometry, material );

        var edges = new THREE.EdgesGeometry( geometry );
        var line = new THREE.LineSegments( edges,  new THREE.LineBasicMaterial( { color: 0x000000 } ) );
        //line.material.depthTest = false;
        //line.material.transparent = true;

        group.add( mesh );
        group.add( line );

        group.rotation.set( this.rotation[0], this.rotation[1], this.rotation[2] );
        group.position.set( this.position[0] + (this.size[0]/2), this.position[1] + (this.size[1]/2), this.position[2] + (this.size[2]/2) );

        parent.add( group );
    }

}

class Group {

    constructor(name, json) {
        this.parts = json[0].map(partJson => {
            if (Array.isArray(partJson)) {
                return new Unit(partJson);
            }
            // is sub group
            return Object.keys(partJson).map(groupKey => new Group(groupKey, partJson[groupKey]))[0];

        });
        this.position = json[1] || [0,0,0];
        this.rotation = json[2] || [0,0,0];
    }

    addTo(scene) {
        var group = new THREE.Group();

        this.parts.forEach(part => {
            part.addTo(group);
        });

        group.position.set( this.position[0], this.position[1], this.position[2] );
        group.rotation.set( this.rotation[0], this.rotation[1], this.rotation[2] );

        scene.add(group);
    }

}

class Sketch {

    constructor(json) {
        this.groups = Object.keys(json).map(groupKey => new Group(groupKey, json[groupKey]));
        this.position = json.position || [0,0,0];
        this.rotation = json.rotation || [0,0,0];
    }

    addTo(scene) {
        this.sketch = new THREE.Group();

        this.groups.forEach(group => {
            group.addTo(this.sketch);
        });

        this.sketch.position.set( this.position[0], this.position[1], this.position[2] );
        this.sketch.rotation.set( this.rotation[0], this.rotation[1], this.rotation[2] );

        scene.add(this.sketch);
    }

    clear() {
        scene.remove(this.sketch);
    }

}
