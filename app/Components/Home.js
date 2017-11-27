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
          <Tile title="Auto Bas-Relief" year="2016" subtitle="Image Processing + Sculpture" img="./imgs/autobas.jpg" link="/relief" styleName="col-md-3" />
          <Tile title="Watercolor Toolkit" year="2017" subtitle="ML + Computer-Aided Watercolor" img="./imgs/wc_icon.png" link="/wcremix" styleName="col-md-3" />
          <Tile title="Endless Stereograph" year="2017" subtitle="Stereography + 3D Animation" img="./imgs/forestflow_cube2.jpg" link="/anaglyph" styleName="col-md-3" />
        </div>
        <div className="row">
        </div>
        <div className="homeLink" className="row">
          <Tile title="Studyokee" year="2013-17" subtitle="Karaoke + Language Learning" img="./imgs/studyokee.jpg" link="/studyokee" styleName="col-md-3" />
          <Tile title="BirdNest" year="2017" subtitle="Sensing System + Animatronics" img="./imgs/birdnest.jpg" link="/birdnest" styleName="col-md-3" />
          <Tile title="Sculpture" subtitle="Clay and Plaster" img="./imgs/kubota.jpg" link="/sculpture" styleName="col-md-3" />
          <Tile title="Painting" subtitle="Watercolor and Oil" img="./imgs/seadragon.jpg" link="/paintings" styleName="col-md-3" />
        </div>
      </div>
    );
  }
}
