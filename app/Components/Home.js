import React, { Component } from 'react';
import classnames from 'classnames';

import Tile from './Tile';

import { className } from './Home.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="row">
          <h2 className="text-center col-md-6 col-md-offset-3">
            Hi, I’m Erik Ulberg. I’m an artist and programmer using software to explore the limits of creative possibilites. I build tools to help me make new art.
          </h2>
        </div>
        <div className="row">
          <Tile title="Watercolor Tech (In Progress)" subtitle="AR + ML + Watercolor, 2017" img="./imgs/wc_icon.png" link="/wcremix" styleName="col-md-3" />
          <Tile title="Garden Generator" subtitle="Generative Art + Photogrammetry, 2017" img="./imgs/garden4.jpg" link="/garden" styleName="col-md-3" />
          <Tile title="Endless Stereograph" subtitle="Stereography + 3D Animation, 2017" img="./imgs/forestflow_cube2.jpg" link="/anaglyph" styleName="col-md-3" />
          <Tile title="Auto Bas-Relief" subtitle="Image Processing + Sculpture, 2016" img="./imgs/autobas.jpg" link="/relief" styleName="col-md-3" />
        </div>
        <div className="homeLink" className="row">
          <Tile title="BirdNest" subtitle="Sensing System + Animatronics, 2017" img="./imgs/birdnest.jpg" link="/birdnest" styleName="col-md-3" />
          <Tile title="Programming" subtitle="Software Things" img="./imgs/studyokee.jpg" link="/programming" styleName="col-md-3" />
          <Tile title="Sculpture" subtitle="Clay and Plaster" img="./imgs/kubota.jpg" link="/sculpture" styleName="col-md-3" />
          <Tile title="Painting" subtitle="Watercolor and Oil" img="./imgs/seadragon.jpg" link="/paintings" styleName="col-md-3" />
        </div>
      </div>
    );
  }
}
