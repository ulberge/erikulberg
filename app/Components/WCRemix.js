import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './WCRemix.less';

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container projectPage')}>
          <h2>Transparent Collage, 2017</h2>
          <div className="row">
            <div className="col-md-12">
              <h3>Project Description</h3>
            </div>
            <div className="col-md-5">
              <p><b>KEYWORDS:</b> Machine Learning, Watercolor, <a href="http://www.wekinator.org/">Wekinator</a>, Processing</p>
              <p>Watercolor is a difficult medium. Each painting has moments that are exceptional, but they tend to fall apart through the course of painting an entire scene. To circumvent this issue, I used digital collaging.</p>
              <p>In order to make digital collages, I needed a program to convert digital images of watercolor into transparent versions approximating the pigment on the paper (without the white of the paper). I needed an algorithm to convert an opaque color into the most transparent color within a certain visual threshold.</p>
            </div>
            <div className="col-md-2 text-center" style={{ paddingTop: '60px' }}>
              <img src="./imgs/wc_montage.png" />
              <small>Paintings to collage</small>
            </div>
            <div className="col-md-1 hidden-xs hidden-sm" style={{ textAlign: 'center', paddingTop: '120px' }}><span style={{ fontSize: '30px' }} className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>
            <div className="col-md-4 text-center" style={{ paddingTop: '0px' }}>
              <img src="./imgs/wc_composite.jpg" />
              <small>Collage</small>
            </div>
          </div>
          <div className="row text-center">
            <h4>Transparency Conversion Tool</h4>
            <div className="col-md-3 col-md-offset-2 text-center">
                <img src="./imgs/wc_tool.jpg" className="" />
                <small>Tool for converting images</small>
            </div>
            <div style={{ paddingTop: '80px' }}>
              <div className="col-md-2 text-center">
                  <img src="./imgs/wc_tree0.jpg" className="" />
                  <small>Before</small>
              </div>
              <div className="col-md-1 hidden-xs hidden-sm" style={{ textAlign: 'center', paddingTop: '60px' }}><span style={{ fontSize: '30px' }} className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>
              <div className="col-md-2 text-center">
                  <img src="./imgs/wc_tree_2.png" className="" style={{ border: '1px solid #333' }} />
                  <small>After</small>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h3>Machine Learning</h3>
            </div>
            <div className="col-md-8 col-md-offset-2">
              <p>The simple linear algorithm I tried did not work well and a brute force algorithm searching for a good transparent match was not performant. After testing various strategies, I trained a neural network to convert colors into transparent versions with a program I made using Processing and <a href="http://www.wekinator.org/">Wekinator</a>.</p>
            </div>

            <div className="col-md-8 col-md-offset-2 colorChart text-center">
              <h4>Color Test Chart</h4>
              <div className="withMargin">
                <img src="./imgs/wc_chart2.jpg"/>
                <small>Outcomes for the different algorithms at various saturation and brightness, with and without an image behind the chart.</small>
              </div>
            </div>
            <div className="col-md-12 text-center">
              <h4>Processing Training Sketch</h4>
              <div className="withMargin">
                <img src="./imgs/wc_trainer.jpg"/>
                <small>Processing sketch to send training examples to Wekinator.</small>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h3>Watercolor</h3>
            </div>
            <div className="col-md-8 col-md-offset-2">
              <p>This method required some sensitivity to hard and soft edges. Before starting to make the sections, I did some planning and decided where the hard, dark edges would be and how the parts would layer.</p>
            </div>
            <div className="col-md-4 col-md-offset-2 colorChart text-center">
              <div className="withMargin">
                <img src="./imgs/wc_sketch2.jpg"/>
                <small>Diagram showing sections. Lines represent a soft edge and arrows represent a hard edge.</small>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="withMargin">
                <img src="./imgs/wc_sketch0.jpg"/>
                <small>Some planning for each section</small>
              </div>
            </div>

          </div>
        </div>
    );
  }
}
