import React, { Component } from 'react';
import classnames from 'classnames';

import Tile from './Tile';

import { className } from './Home.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="row">
          <Tile title="Wood Grain Collage Maker" year="2019" subtitle="Collage + Fabric.js" img="./imgs/home/collageicon1.jpg" gif="./imgs/home/collageicon2.jpg" link="/collageMaker" styleName="col-md-4" />
          <Tile title="My Two Other Faces" year="2019" subtitle="Face Recognition + P5.js" img="./imgs/home/mytwootherfaces_still.gif" gif="./imgs/home/mytwootherfaces.gif" absoluteLink="/projects/MyTwoOtherFaces/" styleName="col-md-4" />
          <Tile title="Bubble Pop" year="2019" subtitle="Interaction + 2D Physics" img="./imgs/home/bubblepop_first.gif" gif="./imgs/home/bubblepop.gif" absoluteLink="/projects/bubblePop/" styleName="col-md-4" />
        </div>
        <div className="row">
          <Tile title="JSON-aided Design" year="2018" subtitle="Scripting + CAD" img="./imgs/home/script_sketch_first.gif" gif="./imgs/home/script_sketch_rollover.gif" link="/sketch" styleName="col-md-4" />
          <Tile title="Studyokee" year="2013-18" subtitle="Karaoke + Language Learning" img="./imgs/home/studyokee_first.gif" gif="./imgs/home/studyokee_rollover.gif" link="/studyokee" styleName="col-md-4" />
          <Tile title="Endless Stereograph" year="2017" subtitle="Stereography + 3D Animation" img="./imgs/stills/forest_walk_cover.jpg" gif="./imgs/home/forest_walk_rollover.gif" link="/anaglyph" styleName="col-md-4" />
        </div>
        <div className="homeLink" className="row">
          <Tile title="Random Garden" year="2017" subtitle="Photogrammetry + Generative Design" img="./imgs/icons/gg0.jpg" gif="./imgs/home/gg.gif" link="/garden" styleName="col-md-4" />
          <Tile title="Watercolor Planner" year="2017" subtitle="Computer-Aided Watercolor" img="./imgs/icons/wc_analysis_sm.jpeg" gif="./imgs/home/wc_rollover.gif" link="/wcanalysis" styleName="col-md-4" />
          <Tile title="Auto Sculpture" year="2016" subtitle="Fabrication + Sensing Sculpture" img="./imgs/home/sculpture_video_first.gif" gif="./imgs/home/sculpture_video.gif" link="/relief" styleName="col-md-4" />
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
