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
        line.material.depthTest = false;
        line.material.transparent = true;

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
/*

var COLORS = {
    WOOD: 0xfeb74c,
    TREATED_WOOD: 0x8b5a2b,
    CONCRETE: 0x777777
};

var depthHeight = 3.875+3.5;
var blockSize = 8;
var blockHeight = 4;
var blockPosY = -depthHeight-blockHeight;
var margin = (blockSize-3.5)/2;
var doorWidth = 60;
var doorHeight = 82;
var mainHeight = doorHeight + 6.5;
var slantHeight = 18;
var topHeight = mainHeight + slantHeight;
var leanToHeight = mainHeight - slantHeight;
var leanToDistance = -44.5;
var insideHeight = mainHeight-4.5;
var numSupports = 5;
var wlength = 84;


var json = {
    data:   [//sketch
                [//groups
                    [//base
                        [//parts
                            [WOOD, [ 84, 3.875, 48 ], [ 0, -3.875, 0 ]],//floor
                            [TREATED_WOOD, [ 84, 3.5, 3.5 ], [ 0, -3.875-3.5, 0 ]],//ground beam1
                            [TREATED_WOOD, [ 84, 3.5, 3.5 ], [ 0, -3.875-3.5, 48-3.5 ]],//ground beam2
                        ],[0,0,0],[0,0,0]
                    ],
                    [//blocks
                        [//parts
                            [CONCRETE, [ blockSize, blockHeight, blockSize ], [ -margin, 0, -margin ]],
                            [CONCRETE, [ blockSize, blockHeight, blockSize ], [ (84-blockSize)/2, 0, -margin ]],
                            [CONCRETE, [ blockSize, blockHeight, blockSize ], [ 84-margin-3.5, 0, -margin ]],
                            [CONCRETE, [ blockSize, blockHeight, blockSize ], [ -margin, 0, 48-3.5-margin ]],
                            [CONCRETE, [ blockSize, blockHeight, blockSize ], [ (84-blockSize)/2, 0, 48-3.5-margin ]],
                            [CONCRETE, [ blockSize, blockHeight, blockSize ], [ 84-margin-3.5, 0, 48-3.5-margin ]],
                        ],[0,blockPosY,0],[0,0,0]
                    ],
                    [// lean-to blocks
                        [//parts
                            [CONCRETE, [ blockSize, blockHeight, blockSize ], [ -margin, 0, -margin ]],
                            [CONCRETE, [ blockSize, blockHeight, blockSize ], [ 84-margin-3.5, 0, -margin ]],
                        ],[0,blockPosY,leanToDistance],[0,0,0]
                    ],
                    [// lean-to
                        [//parts
                            [TREATED_WOOD, [ 3.5, leanToHeight + depthHeight, 3.5 ], [ 0, -depthHeight, 0 ]], // pillar 1
                            [TREATED_WOOD, [ 3.5, leanToHeight + depthHeight, 3.5 ], [ 84-3.5, -depthHeight, 0 ]], // pillar 2
                            [WOOD, [ 84, 3.5, 1.5 ], [ 0, leanToHeight-3.5, -1.5 ]], // beam 1
                            [WOOD, [ 84, 3.5, 1.5 ], [ 0, leanToHeight-3.5, 3.5 ]], // beam 2
                        ],[0,0,leanToDistance],[0,0,0]
                    ],
                    [// back wall left brace
                        [//parts
                            [WOOD, [ 1.5, insideHeight, 3.5 ], [ 0, 1.5, 0 ]],// side cap
                            [WOOD, [ 1.5, 12, 3.5 ], [ 1.5, 1.5, 0 ]],// short support
                            [WOOD, [ 1.5, 12, 3.5 ], [ 1.5, insideHeight-12+1.5, 0 ]],// short support
                            [WOOD, [ 1.5, 12, 3.5 ], [ 1.5, (insideHeight)/2-(12/2), 0 ]],// short support
                        ],[0,0,0],[0,0,0]
                    ],
                    [// back wall right brace
                        [//parts
                            [WOOD, [ 1.5, insideHeight, 3.5 ], [ 0, 1.5, 0 ]], // side cap
                            [WOOD, [ 1.5, 12, 3.5 ], [ 1.5, 1.5, 0 ]], // short support
                            [WOOD, [ 1.5, 12, 3.5 ], [ 1.5, insideHeight-12+1.5, 0 ]],// short support
                            [WOOD, [ 1.5, 12, 3.5 ], [ 1.5, (insideHeight)/2-(12/2), 0 ]],// short support
                        ],[84,0,3.5],[0,Math.PI,0]
                    ],
                    [// back wall caps
                        [//parts
                            [WOOD, [ wlength, 1.5, 3.5 ], [ 0, mainHeight-1.5, 0 ]], // top cap
                            [WOOD, [ wlength, 1.5, 3.5 ], [ 0, mainHeight-3, 0 ]], // top cap
                            [WOOD, [ wlength, 1.5, 3.5 ], [ 0, 0, 0 ]], // bottom cap
                        ],[84,0,3.5],[0,Math.PI,0]
                    ],
                ]
            ]
};

{
    groups: {
        base: [
            [
                [WOOD, [ 84, 3.875, 48 ], [ 0, -3.875, 0 ]],//floor
                [TREATED_WOOD, [ 84, 3.5, 3.5 ], [ 0, -3.875-3.5, 0 ]],//ground beam1
                [TREATED_WOOD, [ 84, 3.5, 3.5 ], [ 0, -3.875-3.5, 48-3.5 ]],//ground beam2
            ]
        ],
        blocks: [
            [
                [CONCRETE, [ blockSize, blockHeight, blockSize ], [ -margin, 0, -margin ]],
                [CONCRETE, [ blockSize, blockHeight, blockSize ], [ (84-blockSize)/2, 0, -margin ]],
                [CONCRETE, [ blockSize, blockHeight, blockSize ], [ 84-margin-3.5, 0, -margin ]],
                [CONCRETE, [ blockSize, blockHeight, blockSize ], [ -margin, 0, 48-3.5-margin ]],
                [CONCRETE, [ blockSize, blockHeight, blockSize ], [ (84-blockSize)/2, 0, 48-3.5-margin ]],
                [CONCRETE, [ blockSize, blockHeight, blockSize ], [ 84-margin-3.5, 0, 48-3.5-margin ]],
            ], [0,blockPosY,0]
        ],
        lean_to_blocks: [
            [
                [CONCRETE, [ blockSize, blockHeight, blockSize ], [ -margin, 0, -margin ]],
                [CONCRETE, [ blockSize, blockHeight, blockSize ], [ 84-margin-3.5, 0, -margin ]],
            ], [0,blockPosY,leanToDistance]
        ],
        lean_to: [
            [
                [TREATED_WOOD, [ 3.5, leanToHeight + depthHeight, 3.5 ], [ 0, -depthHeight, 0 ]], // pillar 1
                [TREATED_WOOD, [ 3.5, leanToHeight + depthHeight, 3.5 ], [ 84-3.5, -depthHeight, 0 ]], // pillar 2
                [WOOD, [ 84, 3.5, 1.5 ], [ 0, leanToHeight-3.5, -1.5 ]], // beam 1
                [WOOD, [ 84, 3.5, 1.5 ], [ 0, leanToHeight-3.5, 3.5 ]], // beam 2
            ], [0,0,leanToDistance]
        ],
        back_wall_left_brace: [
            [
                [WOOD, [ 1.5, insideHeight, 3.5 ], [ 0, 1.5, 0 ]],// side cap
                [WOOD, [ 1.5, 12, 3.5 ], [ 1.5, 1.5, 0 ]],// short support
                [WOOD, [ 1.5, 12, 3.5 ], [ 1.5, insideHeight-12+1.5, 0 ]],// short support
                [WOOD, [ 1.5, 12, 3.5 ], [ 1.5, (insideHeight)/2-(12/2), 0 ]],// short support
            ]
        ],
        back_wall_right_brace: [
            [
                [WOOD, [ 1.5, insideHeight, 3.5 ], [ 0, 1.5, 0 ]], // side cap
                [WOOD, [ 1.5, 12, 3.5 ], [ 1.5, 1.5, 0 ]], // short support
                [WOOD, [ 1.5, 12, 3.5 ], [ 1.5, insideHeight-12+1.5, 0 ]],// short support
                [WOOD, [ 1.5, 12, 3.5 ], [ 1.5, (insideHeight)/2-(12/2), 0 ]],// short support
            ], [84,0,3.5], [0,Math.PI,0]
        ],
        back_wall_caps: [
            [
                [WOOD, [ wlength, 1.5, 3.5 ], [ 0, mainHeight-1.5, 0 ]], // top cap
                [WOOD, [ wlength, 1.5, 3.5 ], [ 0, mainHeight-3, 0 ]], // top cap
                [WOOD, [ wlength, 1.5, 3.5 ], [ 0, 0, 0 ]], // bottom cap
            ]
        ]
    }
}

*/
