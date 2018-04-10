class Unit {

    constructor(json) {
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

    addTo(parent, isSelected) {
        var group = new THREE.Group();

        var color = this.color ? this.color : '#ffffff';
        var lineColor = this.blendColors(color, '#363527', 0.5);
        if (isSelected) { // group is selected
            //console.log('beforecolor ' + color);
            color = this.shadeColor(color, -0.2);
            lineColor = this.blendColors(color, '#363527', 0.8);
            //console.log('aftercolor ' + color);
        }

        if (this.isSelected) {
            color = this.blendColors(color, '#FF0000', 0.3);
            lineColor = this.blendColors(lineColor, '#FF0000', 0.5);
        }

        var material = new THREE.MeshToonMaterial( { color: color } );
        var geometry = new THREE.BoxGeometry( this.size[0], this.size[1], this.size[2] );
        var mesh = new THREE.Mesh( geometry, material );

        var edges = new THREE.EdgesGeometry( geometry );
        var line = new THREE.LineSegments( edges,  new THREE.LineBasicMaterial( { color: lineColor } ) );
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
        this.parts = json.parts.map(partJson => {
            if (Array.isArray(partJson)) {
                return new Unit(partJson);
            }
            // is sub group
            return Object.keys(partJson).map(groupKey => new Group(groupKey, partJson[groupKey]))[0];

        });
        this.position = json.position || [0,0,0];
        this.rotation = json.rotation || [0,0,0];
        this.isSelected = json.isSelected;
    }

    addTo(scene) {
        var group = new THREE.Group();
        var isSelected = this.isSelected;
        this.parts.forEach(part => {
            part.addTo(group, isSelected);
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
