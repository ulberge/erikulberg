import * as THREE from 'three';

class Unit {

    constructor(json, info) {
        this.info = info;
        this.color = json[0].color;
        this.size = json[1];
        this.position = json[2] || [0,0,0];
        this.rotation = json[3] || [0,0,0];
        this.isSelected = json.length > 4 ? json[4] : false;
    }

    shadeColor(color, percent) {   
        var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    }
    blendColors(c0, c1, p) {
        var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
        return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
    }
    convertInchesToFeet(l) {
        const ft = Math.floor(l/12);
        const inches = l-(12*ft);
        return ft + '\' ' + inches + '"';
    }

    addTo(parent, allObjects, isSelected, settings) {
        var group = new THREE.Group();

        var color = this.color ? this.color : '#ffffff';
        var lineColor = this.blendColors(color, '#363527', 0.5);

        if (isSelected) { // group is selected
            color = this.shadeColor(color, -0.2);
            //lineColor = this.blendColors(color, '#363527', 0.8);
            lineColor = this.blendColors(lineColor, '#FF0000', 0.5);
        }

        if (this.isSelected) {
            color = this.blendColors(color, '#FF0000', 0.3);
            lineColor = this.blendColors(lineColor, '#FF0000', 0.5);
        }

        var material = new THREE.MeshToonMaterial( { color: color } );
        var geometry = new THREE.BoxGeometry( this.size[0], this.size[1], this.size[2] );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.userData = this.info; // add identifiable info for selection event

        var edges = new THREE.EdgesGeometry( geometry );
        var line = new THREE.LineSegments( edges,  new THREE.LineBasicMaterial( { color: lineColor } ) );
        //line.material.depthTest = false;
        //line.material.transparent = true;

        group.add( mesh );
        group.add( line );

        // if (settings && settings.font) {
        //     var text;
        //     var yOffset, xOffset;
        //     if (this.size[0] > this.size[1]) {
        //         // Print text on wide piece
        //         text = this.convertInchesToFeet(this.size[0]);
        //         yOffset = 0//5 + (allObjects.length % 3) * 4;
        //         xOffset = -20 + (allObjects.length % 3) * 10;
        //     } else {
        //         // Print text on thin piece
        //         text = this.convertInchesToFeet(this.size[1]);
        //         yOffset = -10 + (allObjects.length % 2) * 10;
        //         xOffset = 0//-20 + (allObjects.length % 4) * 10;
        //     }
        //     var textGeometry = new THREE.TextGeometry( text, {
        //         font: settings.font,
        //         size: 3,
        //         height: 5
        //     } );
        //     var matLite = new THREE.MeshBasicMaterial( {
        //         color: lineColor,
        //         transparent: true,
        //         opacity: 0.9,
        //         side: THREE.DoubleSide
        //     } );
        //     textGeometry.computeBoundingBox();
        //     var xMid = - 0.5 * ( textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x );
        //     textGeometry.translate( xMid, 0, 0 );
        //     var textMesh = new THREE.Mesh( textGeometry, matLite );
        //     textMesh.position.z = 5;
        //     textMesh.position.x = xOffset;
        //     textMesh.position.y = yOffset;
        //     group.add( textMesh );
        // }

        group.rotation.set( this.rotation[0], this.rotation[1], this.rotation[2] );
        // set position of the lowest x,y,z corner
        var bbox = new THREE.Box3().setFromObject(group);
        group.position.set( this.position[0] - bbox.min.x, this.position[1] - bbox.min.y, this.position[2] - bbox.min.z );

        parent.add( group );
        allObjects.push(mesh);
    }

}

class Group {

    constructor(key, json, groupIndex) {
        this.key = key;
        this.groupIndex = groupIndex;
        this.parts = json.parts.map((partJson, partIndex) => {
            if (Array.isArray(partJson)) {
                return new Unit(partJson, {groupKey: key, partIndex: partIndex});
            }
            // is sub group
            return Object.keys(partJson).map(groupKey => new Group(groupKey, partJson[groupKey]))[0];

        });
        this.position = json.position || [0,0,0];
        this.rotation = json.rotation || [0,0,0];
        this.isSelected = json.isSelected;
    }

    addTo(scene, allObjects, settings) {
        var group = new THREE.Group();
        var isSelected = this.isSelected;
        this.parts.forEach(part => {
            part.addTo(group, allObjects, isSelected, settings);
        });

        group.position.set( this.position[0], this.position[1], this.position[2] );
        group.rotation.set( this.rotation[0], this.rotation[1], this.rotation[2] );

        scene.add(group);
    }

}

class Sketch {

    constructor(json) {
        this.groups = Object.keys(json).map((groupKey, index) => new Group(groupKey, json[groupKey], index));
        this.position = json.position || [0,0,0];
        this.rotation = json.rotation || [0,0,0];
    }

    addTo(scene, settings) {
        this.sketch = new THREE.Group();

        let allObjects = [];
        this.groups.forEach(group => {
            group.addTo(this.sketch, allObjects, settings);
        });

        this.sketch.position.set( this.position[0], this.position[1], this.position[2] );
        this.sketch.rotation.set( this.rotation[0], this.rotation[1], this.rotation[2] );

        scene.add(this.sketch);
        return allObjects;
    }

    removeFrom(scene) {
        scene.remove(this.sketch);
    }

}

export { // without default
  Sketch,
  Group,
  Unit,
};