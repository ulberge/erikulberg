import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';

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
      __html: '<iframe id="gardenIframe" src="gardenGenerator/index.html" frameBorder="0" scrolling="no"></iframe>'
    };
  },
  render() {
    return (
      <div className={classnames(className, 'container-fluid projectPage')}>
        <div className="container">
          <div className="detailPageHeader">
            <h2>
              Garden Generator&nbsp;&nbsp;<small>2017</small>
            </h2>
            <div>Generative Design, Photogrammetry, Horticulture, Three.js</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p><b>What combinations of size, shape, and color work? Are there certain rhythms that are more appealing?</b></p>
              <p>This tool rapidly explores a subset of the garden design space by randomly generating combinations of plants. It uses photogrammetric models of species from the South Seattle College Arboretum. By observing and noting our reactions, we can find inspiration for designs. &lt;<a href="/gardenGenerator/index.html">See Full Screen Version</a>&gt;</p>
              <img src="./imgs/portfolioassets/garden/garden_illustration.png" alt="Illustration of Program"/>
              <small>Illustration of the program</small>
            </div>
            <div className="col-md-8 iframeContainer clearFix">
              <div dangerouslySetInnerHTML={ this.iframe() } />
              <div className="iframeOverlap"></div>
              <div className="well">
                <b>CONTROLS:</b> (First click on Generator) <span className="text-info">pause</span>: &lt;space bar&gt;, <span className="text-info">zoom in</span>: &lt;+&gt;, <span className="text-info">zoom out</span>: &lt;-&gt;
              </div>
            </div>
          </div>
        </div>
        <div className="accentRow row text-center">
          <div className="container">
            <div style={{ paddingTop: '10px' }}>
              <h3>Background</h3>
              <div className="col-md-4">
                <img src="./imgs/portfolioassets/garden/drawing0.jpg"/>
                <div>Drawings from a class on perennials</div>
              </div>
              <div className="col-md-4">
                <img src="./imgs/garden_plants0.jpg" alt="Cynara cardunculus at South Seattle College Arboretum"/>
                <div>Cynara cardunculus at South Seattle College Arboretum</div>
              </div>
              <div className="col-md-4">
                <img src="./imgs/garden_plants_obj.jpg" alt="Virtual Cynara cardunculus in Meshlab"/>
                <div>Virtual Cynara cardunculus in Meshlab</div>
              </div>
              <div className="col-md-4">
              </div>
            </div>
            <a href="https://docs.google.com/presentation/d/1w2ZLmeZXKM4tcg2T31dPkfU8ebIWdJDr0gnfIHMKk5M/edit?usp=sharing">New Version</a>
          </div>
        </div>
      </div>
    );
  }
});
