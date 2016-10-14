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
      'processing/kingfisher/bird.pde',
      'processing/kingfisher/hawk.pde',
      'processing/kingfisher/button.pde'
    ];
    window.Processing.loadSketchFromSources('kingfisher', sources, function onLoad() {
      const canvas = document.getElementById('kingfisher');
      canvas.focus();
      canvas.classList.add('border');

      // set scale of game based on screensize
      const clientWidth = canvas.offsetWidth;
      const sketch = window.Processing.getInstanceById('kingfisher');
      if (clientWidth < 768) {
        sketch.setShowButtons(true);
      }
      sketch.setSize(clientWidth, clientWidth * 0.6);
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
