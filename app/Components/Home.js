import React, { Component } from 'react';
import classnames from 'classnames';

import Tile from './Tile';

import { className } from './Home.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="row">
          <Tile title="Watercolor Toolkit (In Progress)" subtitle="ML + Computer-Aided Watercolor, 2017" img="./imgs/wc_icon.png" link="/wcremix" styleName="col-md-3" />
          <Tile title="Garden Generator" subtitle="Generative Design + Photogrammetry, 2017" img="./imgs/garden4.jpg" link="/garden" styleName="col-md-3" />
          <Tile title="Endless Stereograph" subtitle="Stereography + 3D Animation, 2017" img="./imgs/forestflow_cube2.jpg" link="/anaglyph" styleName="col-md-3" />
          <Tile title="Auto Bas-Relief" subtitle="Image Processing + Sculpture, 2016" img="./imgs/autobas.jpg" link="/relief" styleName="col-md-3" />
        </div>
        <div className="homeLink" className="row">
          <Tile title="BirdNest" subtitle="Sensing System + Animatronics, 2017" img="./imgs/birdnest.jpg" link="/birdnest" styleName="col-md-3" />
          <Tile title="Studyokee" subtitle="Karaoke + Language Learning, 2013-17" img="./imgs/studyokee.jpg" link="/studyokee" styleName="col-md-3" />
          <Tile title="Sculpture" subtitle="Clay and Plaster" img="./imgs/kubota.jpg" link="/sculpture" styleName="col-md-3" />
          <Tile title="Painting" subtitle="Watercolor and Oil" img="./imgs/seadragon.jpg" link="/paintings" styleName="col-md-3" />
        </div>
      </div>
    );
  }
}
