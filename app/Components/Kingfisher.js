import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Kingfisher.less';
/*eslint-disable */
import Processing from 'processing-js';
/*eslint-enable */

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container')}>
          <div className="col-lg-12 gameContainer">
            <canvas id="kingfisher" data-processing-sources="processing/kingfisher/boid.pde processing/kingfisher/shark.pde processing/kingfisher/fish.pde processing/kingfisher/flock.pde processing/kingfisher/kingfisher.pde processing/kingfisher/background.pde processing/kingfisher/bubble.pde processing/kingfisher/bird.pde"></canvas>
          </div>
        </div>
    );
  }
}
