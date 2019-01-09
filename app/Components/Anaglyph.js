import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import FontAwesome from 'react-fontawesome';

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
      __html: '<iframe id="iframe" src="/projects/unendingAnaglyph/index.html" frameBorder="0" scrolling="no"></iframe>'
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
            <div>Stereo Vision + 3D Animation</div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <p><b>Description</b>: Endless Stereograph is a 3D animation composed of repeating stereoscopic images with transparent holes cut out, layered in virtual space, and moving toward the viewer in a curved plane. It represents three dimensions with a small number of 2D images. Stereoscopic photos seem so real, but are normally frustrating, because you cannot dive into them. Now you can!</p>
              <p><b>Technologies</b>: Three.js, Adobe Illustrator</p>
              <div style={{ margin: '20px 0' }}>
                <a href="/projects/unendingAnaglyph/index.html" target="_blank" className="btn btn-info">Full Screen Version <FontAwesome name="external-link" /></a>
              </div>
              <div style={{ paddingTop: '10px' }}>
                <div dangerouslySetInnerHTML={ this.iframe() } />
                <div className="iframeOverlap"></div>
                <div style={{ 'margin': '10px 0' }}>Live Version</div>
                <div className="well">
                  <div><b>Toggle between stereo and anaglyph:</b> (First click on video) &lt;space bar&gt;</div>
                </div>
              </div>
            </div>
            <div className="col-md-6 iframeContainer clearFix">
              <div>
                <img src="./imgs/stills/forest_walk_anaglyph.jpg" alt="Anaglyph view of video"/>
                <p>Anaglyph view of video</p>
              </div>
              <div>
                <img src="./imgs/stills/forest_walk_stereo.jpg" alt="Stereo view of video"/>
                <p>Stereo view of video</p>
              </div>
            </div>
          </div>

          <div className="accentRow row">
            <div className="container">
              <div>
                <h3 className="text-center">Diagram</h3>
                <hr/>
                <div className="col-md-6">
                  <img src="./imgs/forestflowd0.jpg" alt="Depth between layers comes from linear perspective in 3D space. Depth within each layer is conveyed through stereoscopic vision"/>
                  <p>Depth between layers is from linear perspective in 3D space. Depth within each layer is conveyed through stereoscopic vision</p>
                </div>
                <div className="col-md-6">
                  <img src="./imgs/forestflowd1.jpg" alt="Diagram of process"/>
                  <p>Diagram of process</p>
                </div>
                <div className="col-md-6 col-md-offset-3" style={{ marginTop: '20px' }} >
                  <img src="./imgs/gifs/forest_walk_side.gif" alt="Side View"/>
                  <p>Alternate angle and camera location shows how the animation works</p>
                </div>
              </div>
              <div className="col-md-12 col-xs-12" style={{ paddingTop: '10px' }}>
                <h3 className="text-center">Inspiration</h3>
                <hr/>
                <div className="col-md-6 col-xs-12">
                  <img src="./imgs/forestflowd4.jpg" alt="Donatello divides space into clear layers, then sculpts depth within layers"/>
                  <p>Donatello divides space into clear layers, then sculpts depth within layers</p>
                </div>
                <div className="col-md-6 col-xs-12">
                  <img src="./imgs/forestflowd5.jpg" alt="Wolfenstein 3D imitated 3D space by placing 2D images in linear perspective"/>
                  <p>Wolfenstein 3D imitated 3D space by placing 2D images in linear perspective</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
