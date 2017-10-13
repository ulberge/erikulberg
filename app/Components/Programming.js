import React, { Component } from 'react';
import classnames from 'classnames';
import Tile from './Tile';

import { className } from './Programming.less';

export default class extends Component {
  render() {
    return (
              <div className={classnames(className, 'container')}>
                <div className="row">
                  <h2 className="text-center col-md-6 col-md-offset-3">
                    Programming Projects
                  </h2>
                </div>
                <div className="row">
                  <Tile title="Studyokee" subtitle="Karaoke + Language Learning, 2013-2017" img="./imgs/studyokee.jpg" link="/studyokee" styleName="col-md-3" />
                  <Tile title="KingfisherJS" subtitle="Boids + Fishing Game, 2016" img="./imgs/kingfisherScrnsht.jpg" link="/kingfisher" styleName="col-md-3" />
                </div>
              </div>
    );
  }
}
