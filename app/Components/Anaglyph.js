import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import { className } from './Anaglyph.less';

module.exports = React.createClass({
  componentDidMount: function componentDidMount() {
    const garden = $('#iframe');
    garden.width('100%');
    garden.height(garden.width() * 0.5);
    garden.focus();
  },
  iframe: function iframe() {
    return {
      __html: '<iframe id="iframe" src="unendingAnaglyph/index.html" frameBorder="0" scrolling="no"></iframe>'
    };
  },
  render() {
    return (
      <div className={classnames(className, 'container-fluid projectPage')}>
        <div className="container">
          <div className="detailPageHeader">
            <h2>
              Endless Stereograph&nbsp;&nbsp;<small>2017</small>
            </h2>
            <div>Stereo Vision, 3D Animation</div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <p><b>Description</b>: Endless Stereograph is a 3D animation composed of repeating stereoscopic images with transparent holes cut out, layered in 3D space, and moving toward the viewer in a curved plane. &lt;<a href="/unendingAnaglyph/index.html">See Full Screen Version</a>&gt;</p>
              <img src="./imgs/portfolioassets/anaglyph/screenshot.jpg" alt=""/>
              <small>Alternate view</small>
            </div>
            <div className="col-md-7 iframeContainer clearFix">
              <div dangerouslySetInnerHTML={ this.iframe() } />
              <div className="iframeOverlap"></div>
              <div className="well">
                <div><b>CONTROLS:</b> (First click on video)</div>
                <div><span className="text-info">toggle between stereo and anaglyph</span>: &lt;space bar&gt;</div>
              </div>
            </div>
          </div>
        </div>

        <div className="accentRow row text-center">
          <div className="container">
            <div style={{ paddingTop: '10px' }}>
              <h3>Method</h3>
              <hr/>
            </div>
            <div className="col-md-8 col-xs-12">
              <h4>Diagram</h4>
              <img src="./imgs/forestflowd0.jpg" alt=""/>
              <small>Depth between layers comes from linear perspective in 3D space. Depth within each layer is conveyed through stereoscopic vision.</small>
            </div>
            <div className="col-md-4 col-xs-12">
              <h4>Inspiration</h4>
              <img src="./imgs/forestflowd4.jpg" alt=""/>
              <small>Donatello divides space into clear layers, then sculpts depth within layers.</small>
              <img src="./imgs/forestflowd5.jpg" alt=""/>
              <small>Wolfenstein 3D imitated 3D space by placing 2D images in linear perspective.</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
