import React, { Component } from 'react';
import classnames from 'classnames';

import Tile from './Tile';

import { className } from './Home.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="row">
          <Tile title="Studyokee" year="2013-17" subtitle="Karaoke + Language Learning" img="./imgs/home/studyokee_first.gif" gif="./imgs/home/studyokee_rollover.gif" link="/studyokee" styleName="col-md-4" />
          <Tile title="Auto Bas-Relief" year="2016" subtitle="Fabrication + Sensing Sculpture" img="./imgs/autobas.jpg" link="/relief" styleName="col-md-4" />
          <Tile title="Random Garden" year="2017" subtitle="Photogrammetry + ThreeJS" img="./imgs/icons/gg0.jpg" link="/garden" styleName="col-md-4" />
        </div>
        <div className="row">
          <Tile title="ScriptSketch" year="2018" subtitle="Scripting + CAD" img="./imgs/icons/scriptsketch.jpg" link="/scriptsketch" styleName="col-md-4" />
          <Tile title="Endless Stereograph" year="2017" subtitle="Stereography + 3D Animation" img="./imgs/home/forest_walk_first.gif" gif="./imgs/home/forest_walk_rollover.gif" link="/anaglyph" styleName="col-md-4" />
          <Tile title="Watercolor Collage" year="2017" subtitle="ML + Image Processing" img="./imgs/icons/mlwc_sm.png" link="/wcremix" styleName="col-md-4" />
        </div>
        <div className="homeLink" className="row">
          <Tile title="Watercolor Planner" year="2017" subtitle="Computer-Aided Watercolor" img="./imgs/icons/wc_analysis_sm.jpeg" link="/wcanalysis" styleName="col-md-4" />
          <Tile title="BirdNest" year="2017" subtitle="Sensing System + Animatronics" img="./imgs/birdnest.jpg" link="/birdnest" styleName="col-md-4" />
          <Tile title="Kubota Gardens" year="2017" subtitle="Plaster Relief Sculpture" img="./imgs/kubota.jpg" link="/kubota" styleName="col-md-4" />
        </div>
        <div className="homeLink" className="row">
          <Tile title="Sea Dragon Mural" year="2015" subtitle="Watercolor Illustration" img="./imgs/seadragon.jpg" link="/seadragon" styleName="col-md-4" />
          <Tile title="Study of Gloria" year="2016" subtitle="Life-Size Clay Sculpture" img="./imgs/icons/gloria_icon_sm2.jpg" link="/gloria" styleName="col-md-4" />
        </div>
      </div>
    );
  }
}
