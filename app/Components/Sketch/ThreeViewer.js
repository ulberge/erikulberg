import React, { Component } from 'react';
import * as THREE from 'three';
import {Sketch, Group, Unit} from './JSONToThree';
import $ from 'jquery';
import CustomControls from './CustomControls';

import IconButton from 'material-ui/IconButton';
import BorderBottom from 'material-ui/svg-icons/editor/border-bottom';
import BorderLeft from 'material-ui/svg-icons/editor/border-left';
import BorderRight from 'material-ui/svg-icons/editor/border-right';
import BorderTop from 'material-ui/svg-icons/editor/border-top';

export default class ThreeViewer extends Component {

    componentDidMount() {
        this.initialPos = new THREE.Vector3(42, 75, 300);
        this.initialTarget = new THREE.Vector3(42, 50, 0);
        this.frontPos = new THREE.Vector3(42, 75, 300);
        this.frontTarget = new THREE.Vector3(42, 50, 0);
        this.sidePos = new THREE.Vector3(300,75,-24);
        this.sideTarget = new THREE.Vector3(0,50,-24);
        this.side2Pos = new THREE.Vector3(-300,75,-24);
        this.side2Target = new THREE.Vector3(0,50,-24);
        this.backPos = new THREE.Vector3(42, 75, -300);
        this.backTarget = new THREE.Vector3(42, 50, 0);
        this.cornerPos = new THREE.Vector3(200,200,200);
        this.cornerTarget = new THREE.Vector3(42,50,-24);

        this.init();
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

    init = () => {
        this.container = document.getElementById( 'three_viewer' );

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );

        const width = 200;
        const height = 150;
        this.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

        this.controls = new THREE.CustomControls( this.camera, this.container );
        this.controls.radius = 1;
        this.controls.staticMoving = true;
        this.controls.noRotate = true;
        this.controls.noRoll = true;
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.dynamicDampingFactor = 0.00003;

        this.setView(this.initialPos, this.initialTarget);

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( 1.33 );
        this.container.appendChild( this.renderer.domElement );
        this.controls.handleResize();

        this.updateGridHelper(new THREE.Vector3(Math.PI/2, 0, 0));

        // Lights
        var ambientLight = new THREE.AmbientLight( 0x606060 );
        this.scene.add( ambientLight );
        var directionalLight = new THREE.DirectionalLight( 0xffffff );
        directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
        this.scene.add( directionalLight );
        
        window.addEventListener( 'resize', this.onWindowResize, false );

        if (this.props.json) {
            this.sketch = new Sketch(this.props.json);

            var loader = new THREE.FontLoader();
            loader.load('/assets/font.json' , ( font ) => {
                this.font = font;
                this.objects = this.sketch.addTo(this.scene, {font: font});
            });
        }

        const containerWidth = $(this.container).width();
        const containerHeight = $(this.container).width() * 0.75;
        this.renderer.setSize( containerWidth, containerHeight );

        this.animate();
    };

    onWindowResize = () => {
        const width = $(this.container).width();
        const height = $(this.container).width() * 0.75;
        this.camera.aspect = 1.33;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( width, height );
        this.controls.handleResize();
    };

    animate = () => {
        requestAnimationFrame( this.animate );
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    };

    goToFrontView = () => {
        this.controls.position0 = this.frontPos;
        this.controls.target0 = this.frontTarget;
        this.updateGridHelper(new THREE.Vector3(Math.PI/2, 0, 0));
        this.controls.reset();
    };

    goToBackView = () => {
        this.controls.position0 = this.backPos;
        this.controls.target0 = this.backTarget;
        this.updateGridHelper(new THREE.Vector3(Math.PI/2, 0, 0));
        this.controls.reset();
    };

    goToSideView = () => {
        this.controls.position0 = this.sidePos;
        this.controls.target0 = this.sideTarget;
        this.updateGridHelper(new THREE.Vector3(0, 0, Math.PI/2));
        this.controls.reset();
    };

    goToSide2View = () => {
        this.controls.position0 = this.side2Pos;
        this.controls.target0 = this.side2Target;
        this.updateGridHelper(new THREE.Vector3(0, 0, Math.PI/2));
        this.controls.reset();
    };

    goToCornerView = () => {
        this.controls.position0 = this.cornerPos;
        this.controls.target0 = this.cornerTarget;
        this.updateGridHelper(new THREE.Vector3(0, 0, 0));
        this.controls.reset();
    };

    setView = (position, target) => {
        this.camera.position.copy(position);
        this.controls.target = target;
    };

    updateGridHelper = (rotation) => {
        if (this.gridHelper) {
            this.scene.remove( this.gridHelper );
        }

        var gridSize = 200;
        var gridSquareSize = 12;
        this.gridHelper = new THREE.GridHelper( gridSize*gridSquareSize, gridSize );
        this.gridHelper.rotation.x = rotation.x;
        this.gridHelper.rotation.y = rotation.y;
        this.gridHelper.rotation.z = rotation.z;
        this.scene.add( this.gridHelper );
    };

    render() {
        return (
            <div>
                <div id="three_viewer"></div>
                <div style={{margin: '10px 10px 0'}} >
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
                    <IconButton
                        onClick={this.goToFrontView}
                    >
                      <BorderBottom />
                    </IconButton>
                    <IconButton
                        onClick={this.goToBackView}
                    >
                      <BorderTop />
                    </IconButton>
                    <IconButton
                        onClick={this.goToSide2View}
                    >
                      <BorderRight />
                    </IconButton>
                </div>
            </div>
        );
    }
}