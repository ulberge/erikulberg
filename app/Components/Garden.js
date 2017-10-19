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
      <div className={classnames(className, 'container projectPage')}>
        <h2>Garden Generator, 2017</h2>
        <h4>A tool for garden inspiration. Which combinations of shape, size, and color work?</h4>
        <div className="row">
          <div className="col-md-12">
            <h3>Project Description</h3>
          </div>
          <div className="col-md-6">
            <p><b>KEYWORDS:</b> Photogrammetry, Horticulture, Three.js</p>
            <p>An interactive, 3D model populated with random combinations of plants from the South Seattle College Arboretum.</p>
            <p>I had an interest in garden design from when I took classes in Landscape Horticulture at South Seattle College and worked part-time as a gardener. I wanted to experiment with the use of size, shape, and color plants in different combinations by creating a tool that rapidly iterated over possibilities.</p>
            <p>I also wanted to explore generative art and see what happens when one limits the output to pleasing materials and reduces the complexity of the system. I believe it leads to more aesthetically useful results than a generic image generator operating over the entire space of digital images.</p>
            <p><br/></p>
            <div className="col-md-5 col-md-offset-1 text-center">
              <img src="./imgs/garden_plants_drawings0.jpg" alt="Plant Sketches"/>
            </div>
            <div className="col-md-5 text-center">
              <img src="./imgs/garden_plants_drawings1.jpg" alt="Plant Sketches"/>
            </div>
            <div>
              <small>Sketches from a class on perennials</small>
            </div>
          </div>
          <div className="col-md-6 iframeContainer clearFix">
            <div dangerouslySetInnerHTML={ this.iframe() } />
            <div className="iframeOverlap"></div>
            <div className="well">
              <b>CONTROLS:</b> (First click on Generator) <span className="text-info">pause</span>: &lt;space bar&gt;, <span className="text-info">zoom in</span>: &lt;+&gt;, <span className="text-info">zoom out</span>: &lt;-&gt;
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <h4>Method</h4>
            <p>For this project, I took photos of plants at the South Seattle College Arboretum and created 3D models using Photoscan photogrammetry software. Then, I created a scene using Three.js and randomly placed the plants in the world. (Making sure they had enough space)</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-md-offset-2">
            <img src="./imgs/garden_plants0.jpg" alt="Cynara cardunculus at South Seattle College Arboretum"/>
            <div>Cynara cardunculus at South Seattle College Arboretum</div>
          </div>
          <div className="col-md-1 hidden-xs hidden-sm" style={{ textAlign: 'center', paddingTop: '120px' }}><span style={{ fontSize: '30px' }} className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>
          <div className="col-md-3">
            <img src="./imgs/garden_plants_obj.jpg" alt="Virtual Cynara cardunculus in Meshlab"/>
            <div>Virtual Cynara cardunculus in Meshlab</div>
          </div>
        </div>
      </div>
    );
  }
});
