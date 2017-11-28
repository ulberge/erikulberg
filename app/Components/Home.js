import React, { Component } from 'react';
import classnames from 'classnames';

import Tile from './Tile';

import { className } from './Home.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="row">
          <Tile title="Garden Generator" year="2017" subtitle="Generative Design + Photogrammetry" img="./imgs/icons/gg0.jpg" link="/garden" styleName="col-md-3" />
          <Tile title="Auto Bas-Relief" year="2016" subtitle="Fabrication + Sensing Sculpture" img="./imgs/autobas.jpg" link="/relief" styleName="col-md-3" />
          <Tile title="Watercolor Collage Toolkit" year="2017" subtitle="ML + Image Processing" img="./imgs/icons/mlwc_sm.png" link="/wcremix" styleName="col-md-3" />
          <Tile title="Endless Stereograph" year="2017" subtitle="Stereography + 3D Animation" img="./imgs/icons/anaglyph.jpg" link="/anaglyph" styleName="col-md-3" />
        </div>
        <div className="row">
          <Tile title="Watercolor Planning Tool" year="2017" subtitle="Computer-Aided Watercolor" img="./imgs/icons/wc_analysis_sm.jpeg" link="/wcanalysis" styleName="col-md-3" />
          <Tile title="Studyokee" year="2013-17" subtitle="Karaoke + Language Learning" img="./imgs/studyokee.jpg" link="/studyokee" styleName="col-md-3" />
          <Tile title="BirdNest" year="2017" subtitle="Sensing System + Animatronics" img="./imgs/birdnest.jpg" link="/birdnest" styleName="col-md-3" />
          <Tile title="Kubota Gardens" year="2017" subtitle="Plaster Relief Sculpture" img="./imgs/kubota.jpg" link="/kubota" styleName="col-md-3" />
        </div>
        <div className="homeLink" className="row">
          <Tile title="Sea Dragon Mural" year="2015" subtitle="Watercolor Illustration" img="./imgs/seadragon.jpg" link="/seadragon" styleName="col-md-3" />
          <Tile title="Study of Gloria" year="2016" subtitle="Life-Size Clay Sculpture" img="./imgs/icons/gloria_icon_sm2.jpg" link="/gloria" styleName="col-md-3" />
        </div>
      </div>
    );
  }
}
