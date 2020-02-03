import React from 'react';
import classnames from 'classnames';

import { className } from './Kingfisher.less';
/*eslint-disable */
import Processing from 'processing-js';
/*eslint-enable */

module.exports = React.createClass({
  getInitialState: function getInitialState() {
    return {
      fullScreen: false,
      showButtons: false
    };
  },
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
    ].map(src => 'projects/' + src);
    const that = this;
    window.Processing.loadSketchFromSources('kingfisher', sources, function onLoad() {
      const canvas = document.getElementById('kingfisher');
      canvas.focus();
      canvas.classList.add('border');

      // set scale of game based on screensize
      const clientWidth = canvas.offsetWidth;
      const sketch = window.Processing.getInstanceById('kingfisher');
      if (clientWidth < 768) {
        if (that.isTouchDevice()) {
          that.setState({
            showButtons: true,
            fullScreen: true
          });
        }
      }
      sketch.setSize(clientWidth, clientWidth * 0.6);
    });
  },
  setMouseState: function setMouseState(state) {
    const sketch = window.Processing.getInstanceById('kingfisher');
    sketch.setMouseState(state);
  },
  isTouchDevice: function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  },
  render() {
    let containerClass = 'container';
    if (this.state.fullScreen) {
      containerClass += ' fullScreen';
    }
    if (this.state.showButtons) {
      containerClass += ' showButtons';
    }

    return (
        <div className={classnames(className, containerClass)}>
          <div className="col-lg-12 gameContainer" id="gameContainer">
            <button className="btn btn-primary leftButton" onTouchStart={() => this.setMouseState('LEFT')} onTouchEnd={() => this.setMouseState('NONE')} ></button>
            <canvas id="kingfisher" autoFocus></canvas>
            <button className="btn btn-primary rightButton" onTouchStart={() => this.setMouseState('RIGHT')} onTouchEnd={() => this.setMouseState('NONE')}></button>
          </div>
        </div>
    );
  }
});
