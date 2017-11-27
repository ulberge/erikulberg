import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './WCRemix.less';

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container-fluid projectPage')}>
          <div className="container">
            <div className="detailPageHeader">
              <h2>
                Watercolor Collage Toolkit&nbsp;&nbsp;<small>2017</small>
              </h2>
              <div>Machine Learning, <a href="http://www.wekinator.org/">Wekinator</a>, Processing</div>
            </div>

            <h4><b>Description</b>: Tools for processing watercolor images to allow me to iterate on sections separately.</h4>
            <div className="row">
              <div className="col-md-6">
                <h3>Crop Tool</h3>
                <p>Uses neural network to convert blank watercolor paper to transparency.</p>
                <img className="col-md-10 col-md-offset-1 screenShot" src="./imgs/wc_croptool.jpg" />
              </div>
              <div className="col-md-6">
                <h3>Transparency Tool</h3>
                <p>Uses neural network to convert colors to transparent version while maintaining the color value over white background.</p>
                <img className="col-md-8 col-md-offset-2 screenShot" src="./imgs/wc_transtool.jpg" />
              </div>
            </div>
          </div>
          <div className="accentRow row text-center">
            <div className="container">
              <div className="row" style={{ paddingTop: '10px' }}>
                <h2>Work Flow</h2>
                <hr/>
                <div className="col-md-4 text-center" style={{ paddingTop: '20px' }}>
                  <img src="./imgs/wc_montage.png" />
                  <small>Individual Watercolor Paintings</small>
                </div>
                <div className="col-md-4 text-center" style={{ paddingTop: '0px' }}>
                  <img className="col-md-8 col-md-offset-2" src="./imgs/wc_croptool.jpg" style={{ paddingBottom: '0px' }}/>
                  <img className="col-md-8 col-md-offset-2" src="./imgs/wc_transtool.jpg" style={{ paddingBottom: '0px' }}/>
                  <small className="col-md-12">Digital Collage Tools</small>
                </div>
                <div className="col-md-4 text-center" style={{ paddingTop: '60px' }}>
                  <img src="./imgs/wc_composite.jpg" />
                  <small>Collage</small>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3>Goal</h3>
                <div>
                  <p>I want the frugal use of bold marks with dynamic and meaningful shapes, pigment blending freely wet-in-wet to create transparent and spontaneous mixes. I want to avoid fussiness, lack of contrast, boring colors mixed on the palette, or a focus on content over form.</p>
                </div>
              </div>
              <div className="col-md-6">
                <h4>Good:</h4>
                <div className="col-md-6">
                  <p>
                    <img src="./imgs/wc_good_0.jpg" />
                  </p>
                  <img src="./imgs/wc_good_1.jpg" />
                </div>
                <div className="col-md-6">
                  <img src="./imgs/wc_good_2.jpg" />
                  (JS Sargent)
                </div>
                <small></small>
              </div>
              <div className="col-md-6">
                <h4>Bad:</h4>
                <div className="col-md-6">
                  <img src="./imgs/wc_bad_0.jpg" style={{ paddingBottom: '10px' }} />
                  <img src="./imgs/wc_bad_1.jpg" />
                </div>
                <div className="col-md-6">
                  <img src="./imgs/wc_bad_2.jpg" />
                </div>
                <small></small>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <h4>Program for training machine learning tool</h4>
                <img className="screenShot" src="./imgs/wc_trainer.jpg" />
              </div>
              <div className="col-md-6">
                <h4>Results from testing different transparency algorithms</h4>
                <img className="screenShot" src="./imgs/wc_chart2.jpg" />
              </div>
            </div>
          </div>
        </div>
    );
  }
}
