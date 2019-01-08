import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import FontAwesome from 'react-fontawesome';

import RolloverImage from './RolloverImage.js';
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
            <div>Stereo Vision, 3D Animation, Three.js</div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <p><b>Description</b>: Endless Stereograph is a 3D animation composed of repeating stereoscopic images with transparent holes cut out, layered in virtual space, and moving toward the viewer in a curved plane. It probes the boundaries of stereo vision optics by attempting to represent three dimensions with a small number of 2D images. Stereoscopic photos seem so real, but are normally frustrating, because you cannot dive into them.</p>
              <RolloverImage img="./imgs/gifs/forest_walk_side_first.gif" gif="./imgs/gifs/forest_walk_side.gif" alt="Alternate View" />
              <small>Alternate view</small>
            </div>
            <div className="col-md-7 iframeContainer clearFix">
              <div dangerouslySetInnerHTML={ this.iframe() } />
              <div className="iframeOverlap"></div>
              <div className="well">
                <a href="/unendingAnaglyph/index.html" target="_blank" className="btn btn-info">Full Screen Version <FontAwesome name="external-link" /></a>
                <br/><br/>
                <div><b>Toggle between stereo and anaglyph:</b> (First click on video) &lt;space bar&gt;</div>
              </div>
            </div>
          </div>
        </div>

        <div className="accentRow row text-center">
          <div className="container">
            <div className="col-md-12 col-xs-12">
              <h3>Diagram</h3>
              <hr/>
              <div className="col-md-offset-2 col-md-8 col-xs-12">
                <img src="./imgs/forestflowd0.jpg" alt=""/>
                <small>Depth between layers comes from linear perspective in 3D space. Depth within each layer is conveyed through stereoscopic vision.</small>
              </div>
            </div>
            <div className="col-md-12 col-xs-12" style={{ paddingTop: '10px' }}>
              <h3>Inspiration</h3>
              <hr/>
              <div className="col-md-6 col-xs-12">
                <img src="./imgs/forestflowd4.jpg" alt=""/>
                <small>Donatello divides space into clear layers, then sculpts depth within layers.</small>
              </div>
              <div className="col-md-6 col-xs-12">
                <img src="./imgs/forestflowd5.jpg" alt=""/>
                <small>Wolfenstein 3D imitated 3D space by placing 2D images in linear perspective.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
