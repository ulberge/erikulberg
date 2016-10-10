import React from 'react';
import classnames from 'classnames';

import { className } from './Kingfisher.less';
/*eslint-disable */
import Processing from 'processing-js';
/*eslint-enable */

module.exports = React.createClass({
  componentDidMount: function componentDidMount() {
    const sources = [
      'processing/kingfisher/boid.pde',
      'processing/kingfisher/shark.pde',
      'processing/kingfisher/fish.pde',
      'processing/kingfisher/flock.pde',
      'processing/kingfisher/kingfisher.pde',
      'processing/kingfisher/background.pde',
      'processing/kingfisher/bubble.pde',
      'processing/kingfisher/bird.pde'
    ];
    window.Processing.loadSketchFromSources('kingfisher', sources, function onLoad() {
      document.getElementById('kingfisher').focus();
    });
  },
  render() {
    return (
        <div className={classnames(className, 'container')}>
          <div className="col-lg-12 gameContainer">
            <canvas id="kingfisher" autoFocus></canvas>
          </div>
        </div>
    );
  }
});
