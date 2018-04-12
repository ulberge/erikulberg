import React, { Component } from 'react';
import * as THREE from 'three';
import {Sketch, Group, Unit} from './JSONToThree';
import $ from 'jquery';

export default class ThreeView2D extends Component {

    constructor(props) {
        super(props);

        const width = 200;
        const height = 150;
        this.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
        this.camera.position.x = 42;
        this.camera.position.y = 42;
        this.camera.position.z = 100;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );

        // grid
        var gridSize = 200;
        var gridSquareSize = 12;
        var gridHelper = new THREE.GridHelper( gridSize*gridSquareSize, gridSize );
        gridHelper.rotation.x = Math.PI/2;
        this.scene.add( gridHelper );

        // Lights
        var ambientLight = new THREE.AmbientLight( 0x606060 );
        this.scene.add( ambientLight );
        var directionalLight = new THREE.DirectionalLight( 0xffffff );
        directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
        this.scene.add( directionalLight );

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( 1.33 );
        
        window.addEventListener( 'resize', this.onWindowResize, false );

        this.mouse = new THREE.Vector2();
        this.INTERSECTED = null;
        this.raycaster = new THREE.Raycaster();
        this.objects = [];
    }

    onSketchMouseMove = ( event ) => {
        event.preventDefault();
        let canvasBounds = this.renderer.context.canvas.getBoundingClientRect();
        this.mouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
        this.mouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
        //console.log(this.mouse.x, this.mouse.y);

    };

    onSketchMouseDown = ( event ) => {
        event.preventDefault();
        if (this.INTERSECTED) {
            this.props.onViewSelect(this.INTERSECTED.userData);
        }
    };

    componentDidMount() {
        this.container = document.getElementById( 'sketch2D' );

        this.container.addEventListener( 'mousemove', this.onSketchMouseMove, false );
        this.container.addEventListener( 'mousedown', this.onSketchMouseDown, false );

        if (this.props.json) {
            this.sketch = new Sketch(this.props.json);

            var loader = new THREE.FontLoader();
            loader.load('/assets/font.json' , ( font ) => {
                this.font = font;
                this.objects = this.sketch.addTo(this.scene, {font: font});
            });
        }

        this.container.appendChild( this.renderer.domElement );
        const width = $(this.container).width();
        const height = $(this.container).width() * 0.75;
        this.renderer.setSize( width, height );

        this.animate();
    }

    componentDidUpdate() {
        if (this.sketch && this.sketch.removeFrom) {
            this.sketch.removeFrom(this.scene);
        }
        if (this.props.json) {
            this.sketch = new Sketch(this.props.json);
            this.objects = this.sketch.addTo(this.scene, {font: this.font});
        }
    }

    onWindowResize = () => {
        const width = $(this.container).width();
        const height = $(this.container).width() * 0.75;
        this.camera.aspect = 1.33;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( width, height );
    };

    animate = () => {
        requestAnimationFrame( this.animate );

        // find intersections
        this.raycaster.setFromCamera( this.mouse, this.camera );
        var intersects = this.raycaster.intersectObjects( this.objects );
        if ( intersects.length > 0 ) {
            if ( this.INTERSECTED != intersects[ 0 ].object ) {
                this.INTERSECTED = intersects[ 0 ].object;
                //console.log('found', this.INTERSECTED);
            }
        } else {
            //console.log('none', this.INTERSECTED);
            this.INTERSECTED = null;
        }


        this.renderer.render( this.scene, this.camera );
    };

    render() {
        return (
            <div>
                <div id="sketch2D"></div>
            </div>
        );
    }
}