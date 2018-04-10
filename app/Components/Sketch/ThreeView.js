import React, { Component } from 'react';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';
import {Sketch, Group, Unit} from './Sketch';
import $ from 'jquery';
import IconButton from 'material-ui/IconButton';
import BorderBottom from 'material-ui/svg-icons/editor/border-bottom';
import BorderLeft from 'material-ui/svg-icons/editor/border-left';

export default class ThreeView extends Component {

    constructor(props) {
        super(props);

        this.initialTarget = new THREE.Vector3(42, 50, 0);
        this.frontPos = new THREE.Vector3(42, 75, 300);
        this.frontTarget = new THREE.Vector3(42, 50, 0);
        this.sidePos = new THREE.Vector3(300,75,-24);
        this.sideTarget = new THREE.Vector3(0,50,-24);
        this.cornerPos = new THREE.Vector3(200,100,200);
        this.cornerTarget = new THREE.Vector3(42,50,-24);

        this.camera = new THREE.PerspectiveCamera( 45, 1.33, 1, 10000 );
        this.camera.position.x = 42;
        this.camera.position.y = 75;
        this.camera.position.z = 300;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );

        // grid
        var gridSize = 200;
        var gridSquareSize = 12;
        var gridHelper = new THREE.GridHelper( gridSize*gridSquareSize, gridSize );
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
        this.container = document.getElementById( 'sketch' );

        this.container.addEventListener( 'mousemove', this.onSketchMouseMove, false );
        this.container.addEventListener( 'mousedown', this.onSketchMouseDown, false );

        if (this.props.json) {
            this.sketch = new Sketch(this.props.json);
            this.objects = this.sketch.addTo(this.scene);
        }

        this.controls = new TrackballControls( this.camera, this.container );
        this.controls.target = this.initialTarget;
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.dynamicDampingFactor = 0.3;

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
            this.objects = this.sketch.addTo(this.scene);
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
        this.controls.update();

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

    goToFrontView = () => {
        this.controls.position0 = this.frontPos;
        this.controls.target0 = this.frontTarget;
        this.controls.reset();
    };

    goToSideView = () => {
        this.controls.position0 = this.sidePos;
        this.controls.target0 = this.sideTarget;
        this.controls.reset();
    };

    goToCornerView = () => {
        this.controls.position0 = this.cornerPos;
        this.controls.target0 = this.cornerTarget;
        this.controls.reset();
    };

    render() {
        this.onWindowResize();
        return (
            <div>
                <div id="sketch"></div>
                <div style={{margin: '10px 10px 0'}} >
                    <IconButton
                        onClick={this.goToFrontView}
                    >
                      <BorderBottom />
                    </IconButton>
                    <IconButton
                        onClick={this.goToSideView}
                    >
                      <BorderLeft />
                    </IconButton>
                    <IconButton
                        onClick={this.goToCornerView}
                        style={{transform: 'rotate(-45deg)'}}
                    >
                      <BorderLeft />
                    </IconButton>
                </div>
            </div>
        );
    }
}