import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import FontAwesome from 'react-fontawesome';

import { className } from './Garden.less';

module.exports = React.createClass({
  componentDidMount: function componentDidMount() {
    const garden = $('#gardenIframe');
    garden.width('100%');
    garden.height('360px');
    $('.iframeOverlap').click(function focusGarden() {
      garden.focus();
    });
  },
  iframe: function iframe() {
    return {
      __html: '<iframe id="gardenIframe" src="/projects/gardenGenerator/index.html" frameBorder="0" scrolling="no"></iframe>'
    };
  },
  render() {
    return (
      <div className={classnames(className, 'container-fluid projectPage')}>
        <div className="container">
          <div className="detailPageHeader">
            <h2>
              Random Garden&nbsp;&nbsp;<small>2017</small>
            </h2>
            <div>What combinations of size, shape, and color work?</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p><b>Description:</b> This tool randomly explores the garden design space. It uses photogrammetric models of species from the South Seattle College Arboretum. By observing and noting our reactions, we can find inspiration for designs.</p>
              <p><b>Technologies</b>: Three.js, Photogrammetry</p>
              <img src="./imgs/garden_plants0.jpg" alt="Cynara cardunculus at South Seattle College Arboretum"/>
              <p>South Seattle College Arboretum</p>
            </div>
            <div className="col-md-8 iframeContainer clearFix">
              <div dangerouslySetInnerHTML={ this.iframe() } />
              <div className="iframeOverlap"></div>
              <div className="well">
                <a href="/projects/gardenGenerator/index.html" target="_blank" className="btn btn-info">Full Screen Version <FontAwesome name="external-link" /></a>
                <br/><br/>
                <b>CONTROLS:</b> (First click on Generator) <span className="text-info">pause</span>: &lt;space bar&gt;, <span className="text-info">zoom in</span>: &lt;+&gt;, <span className="text-info">zoom out</span>: &lt;-&gt;
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <img src="./imgs/stills/gg_0.jpg"/>
          </div>
          <div className="col-md-4">
            <img src="./imgs/stills/gg_1.jpg"/>
          </div>
          <div className="col-md-4">
            <img src="./imgs/stills/gg_2.jpg"/>
          </div>
        </div>
        <div className="accentRow row">
          <div className="container">
              <h3 className="text-center">Process</h3>
              <hr/>
              <div className="col-md-8 col-md-offset-2">
                <p>Plants of different size, foliage type, and color were chosen and photographed at the South Seattle College Arboretum. These images were converted to 3D models using photogrammetry software. The models are randomly arranged in a virtual environment (avoiding overlaps).</p>
              </div>
              <div className="col-md-4 text-center">
                <img src="./imgs/portfolioassets/garden/drawing0.jpg" style={{ maxHeight: '300px', width: 'auto' }}/>
                <p>Drawings from a class on perennials</p>
              </div>
              <div className="col-md-4 text-center">
                <img src="./imgs/garden_plants_obj.jpg" alt="Virtual Cynara cardunculus in Meshlab"/>
                <p>Virtual Cynara cardunculus in Meshlab</p>
              </div>
              <div className="col-md-4 text-center">
                <img src="./imgs/portfolioassets/garden/garden_illustration.png" alt="Illustration of Program"/>
                <p>Illustration of the program</p>
              </div>
          </div>
        </div>
      </div>
    );
  }
});
