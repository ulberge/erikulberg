import React, { Component } from 'react';
import classnames from 'classnames';

import Tile from './Tile';

import { className } from './Home.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="row">
          <Tile title="Sketch Repeater" year="2019" subtitle="Line Drawing + ML (Python, JS)" img="./imgs/home/sketchrepeat_first.gif" gif="./imgs/home/sketchrepeat.gif" link="/sketchrepeater" styleName="col-md-4" />
          <Tile title="Visual Concepts in Sketch-A-Net" year="2019" subtitle="Line Drawing + ML Interpretability (JS)" img="./imgs/home/visualconcepts_first.gif" gif="./imgs/home/visualconcepts.gif" absoluteLink="https://github.com/ulberge/SketchANetClustering" styleName="col-md-4" />
          <Tile title="Hand Drawn Effect in AARON" year="2019" subtitle="Line Drawing + Expert AI (JS)" img="./imgs/home/aaron_first.gif" gif="./imgs/home/aaron.gif" absoluteLink="/projects/handDraw/" styleName="col-md-4" />
        </div>
        <div className="row">
          <Tile title="A Conversation with a Machine" year="2019" subtitle="Drawing + ML (JS, Python)" img="./imgs/home/mldraw_first.gif" gif="./imgs/home/mldraw_rollover.gif" link="/conversationwithamachine" styleName="col-md-4" />
          <Tile title="Wood Grain Collage Maker" year="2019" subtitle="Digital Collage (ReactJS)" img="./imgs/home/collageicon1.jpg" gif="./imgs/home/collageicon2.jpg" link="/collageMaker" styleName="col-md-4" />
          <Tile title="My Two Other Faces" year="2019" subtitle="Digital Funhouse Mirror (JS)" img="./imgs/home/mytwootherfaces_still.gif" gif="./imgs/home/mytwootherfaces.gif" absoluteLink="/projects/MyTwoOtherFaces/" styleName="col-md-4" />
        </div>
        <div className="row">
          <Tile title="Bubble Pop" year="2019" subtitle="Interaction Design (JS)" img="./imgs/home/bubblepop_first.gif" gif="./imgs/home/bubblepop.gif" absoluteLink="/projects/bubblePop/" styleName="col-md-4" />
          <Tile title="JSON-aided Design" year="2018" subtitle="Experimental CAD (ReactJS)" img="./imgs/home/script_sketch_first.gif" gif="./imgs/home/script_sketch_rollover.gif" link="/sketch" styleName="col-md-4" />
          <Tile title="Studyokee" year="2013-18" subtitle="Karaoke + Language Learning (JS)" img="./imgs/home/studyokee_first.gif" gif="./imgs/home/studyokee_rollover.gif" link="/studyokee" styleName="col-md-4" />
        </div>
        <div className="homeLink" className="row">
          <Tile title="Endless Stereograph" year="2017" subtitle="Stereography (JS)" img="./imgs/stills/forest_walk_cover.jpg" gif="./imgs/home/forest_walk_rollover.gif" link="/anaglyph" styleName="col-md-4" />
          <Tile title="Random Garden" year="2017" subtitle="Generative Design (JS)" img="./imgs/icons/gg0.jpg" gif="./imgs/home/gg.gif" link="/garden" styleName="col-md-4" />
          <Tile title="Watercolor Planner" year="2017" subtitle="Watercolor (Processing)" img="./imgs/icons/wc_analysis_sm.jpeg" gif="./imgs/home/wc_rollover.gif" link="/wcanalysis" styleName="col-md-4" />
        </div>
        <div className="homeLink" className="row">
          <Tile title="Auto Sculpture" year="2016" subtitle="Sculpture (Processing, Arduino)" img="./imgs/home/sculpture_video_first.gif" gif="./imgs/home/sculpture_video.gif" link="/relief" styleName="col-md-4" />
          <Tile title="Kubota Gardens" year="2017" subtitle="Plaster Relief Sculpture" img="./imgs/kubota.jpg" gif="./imgs/home/kubota_rollover.gif" link="/kubota" styleName="col-md-4" />
          <Tile title="Study of Gloria" year="2016" subtitle="Life-Size Clay Sculpture" img="./imgs/home/gloria_first.gif" gif="./imgs/home/gloria_rollover.gif" link="/gloria" styleName="col-md-4" />
        </div>
        <div className="homeLink" className="row">
          <Tile title="Sea Dragon Mural" year="2015" subtitle="Watercolor Illustration" img="./imgs/seadragon.jpg" link="/seadragon" styleName="col-md-4" />
        </div>
      </div>
    );
  }
}
