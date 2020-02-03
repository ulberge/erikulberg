import React, { Component } from 'react';
import classnames from 'classnames';

import Tile from './Tile';

import { className } from './Home.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="homeLink" className="row">
          <Tile title="Painting" subtitle="Works in Watercolor, Gouche, Mixed Media" img="./imgs/zoom/vashon2_icon.jpg" link="/watercolor" styleName="col-md-4" />
          <Tile title="Sculpture" subtitle="Works in Clay and Plaster" img="./imgs/zoom/reliefmeandcarl_icon.jpg" link="/sculpture" styleName="col-md-4" />
          <Tile title="Painting" subtitle="Works in Oil" img="./imgs/zoom/chickens_icon.jpg" link="/oil" styleName="col-md-4" />
        </div>
        <div className="homeLink" className="row">
          <Tile title="Kubota Gardens" year="2017" subtitle="Plaster Relief Sculpture" img="./imgs/kubota.jpg" gif="./imgs/home/kubota_rollover.gif" link="/kubota" styleName="col-md-4" />
          <Tile title="Study of Gloria" year="2016" subtitle="Life-Size Clay Sculpture" img="./imgs/home/gloria_first.gif" gif="./imgs/home/gloria_rollover.gif" link="/gloria" styleName="col-md-4" />
          <Tile title="Sea Dragon Mural" year="2015" subtitle="Watercolor Illustration" img="./imgs/seadragon.jpg" link="/seadragon" styleName="col-md-4" />
        </div>
      </div>
    );
  }
}
