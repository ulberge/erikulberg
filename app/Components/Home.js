import React, { Component } from 'react';
import classnames from 'classnames';
import setHead from '../setHead';

import Tile from './Tile';

import { className } from './Home.less';

export default class extends Component {
  render() {
    setHead('Work by Erik Ulberg',
          'Work by Erik Ulberg.',
          'https://www.erikulberg.com',
          'https://www.erikulberg.com/imgs/thesis/final/thesis_cover.png');

    return (
      <div className={classnames(className, 'container')}>
        <div className="row">
          <Tile title="Hand-Crafting CNNs for Art" year="2020" subtitle="ReactJS, TensorFlow" img="./imgs/thesis/final/thesis_cover.png" gif="./imgs/thesis/final/handpaint.gif" absoluteLink="https://github.com/ulberge/interactive-network" styleName="col-md-4" />
          <Tile title="Sketch Repeater" year="2019" subtitle="Python, JS, TensorFlow, OpenCV" img="./imgs/home/sketchrepeat3_first.gif" gif="./imgs/home/sketchrepeat3.gif" link="/sketchrepeater" styleName="col-md-4" />
          <Tile title="A Conversation with a Machine" year="2019" subtitle="Python, JS, TensorFlow" img="./imgs/home/mldraw_first.gif" gif="./imgs/home/mldraw_rollover.gif" link="/conversationwithamachine" styleName="col-md-4" />
        </div>
        <div className="row">
          <Tile title="Visual Concepts in Sketch-A-Net" year="2019" subtitle="Python, JS, TensorFlow, OpenCV" img="./imgs/home/concept_sprite_thick.png" gif="./imgs/home/sketchanetconcept.gif" absoluteLink="https://ulberge.github.io/SketchANetClustering/" styleName="col-md-4" />
          <Tile title="Wood Grain Collage Maker" year="2019" subtitle="ReactJS, p5.js" img="./imgs/home/collageicon1.jpg" gif="./imgs/home/collageicon2.jpg" link="/collageMaker" styleName="col-md-4" />
          <Tile title="My Two Other Faces" year="2019" subtitle="JS, p5.js, clmtrackr.js" img="./imgs/home/mytwootherfaces_still.gif" gif="./imgs/home/mytwootherfaces.gif" absoluteLink="/projects/MyTwoOtherFaces/" styleName="col-md-4" />
        </div>
        <div className="row">
          <Tile title="Bubble Pop" year="2019" subtitle="JS, LiquidFun.js" img="./imgs/home/bubblepop_first.gif" gif="./imgs/home/bubblepop.gif" absoluteLink="/projects/bubblePop/" styleName="col-md-4" />
          <Tile title="JSON-aided Design" year="2018" subtitle="ReactJS, Ace, Three.js" img="./imgs/home/script_sketch_first.gif" gif="./imgs/home/script_sketch_rollover.gif" link="/sketch" styleName="col-md-4" />
          <Tile title="Studyokee" year="2013-18" subtitle="Backbone.js, node.js" img="./imgs/home/studyokee_first.gif" gif="./imgs/home/studyokee_rollover.gif" link="/studyokee" styleName="col-md-4" />
        </div>
        <div className="homeLink" className="row">
          <Tile title="Endless Stereograph" year="2017" subtitle="JS, Three.js" img="./imgs/stills/forest_walk_cover.jpg" gif="./imgs/home/forest_walk_rollover.gif" link="/anaglyph" styleName="col-md-4" />
          <Tile title="Random Garden" year="2017" subtitle="JS, Three.js" img="./imgs/icons/gg0.jpg" gif="./imgs/home/gg.gif" link="/garden" styleName="col-md-4" />
          <Tile title="Auto Sculpture" year="2016" subtitle="Processing, Arduino" img="./imgs/home/sculpture_video_first.gif" gif="./imgs/home/sculpture_video.gif" link="/relief" styleName="col-md-4" />
        </div>
      </div>
    );
  }
}
