import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './WCRemix.less';

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container projectPage')}>
          <h2>Watercolor Tech, 2017 (In Progress)</h2>
          <h4>An adaptive system to let me focus on the good parts of watercolor.</h4>
          <div className="row">
            <div className="col-md-12">
              <h3>Project Description</h3>
            </div>
            <div className="col-md-5">
              <p><b>KEYWORDS:</b> User-Centered Design, Augmented Reality Projection, Machine Learning, Watercolor, <a href="http://www.wekinator.org/">Wekinator</a>, Processing</p>
              <p>A custom toolkit to make watercolor easier and allow me to focus on creating beautiful and expressive marks.</p>
              <h4>Tools:</h4>
              <ul><li><b>Analysis Program</b>: value studies, color studies, testing out light/medium/dark layers</li><li><b>Projection Program</b>: proportions, would it look better if it was darker?</li><li><b>Transparency Conversion Tool</b>: compositing pieces</li></ul>
            </div>
            <div className="col-md-4 text-center" style={{ paddingTop: '0px' }}>
              <img src="./imgs/wc_composite.jpg" />
              <small>Collage</small>
            </div>
            <div className="col-md-1 hidden-xs hidden-sm" style={{ textAlign: 'center', paddingTop: '120px' }}><span style={{ fontSize: '30px' }} className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>
            <div className="col-md-2 text-center" style={{ paddingTop: '60px' }}>
              <img src="./imgs/wc_post.png" />
              <small>Transparency conversion tool built with Machine Learning and Wekinator</small>
              <div className=" hidden-xs hidden-sm" style={{ textAlign: 'center', paddingTop: '60px' }}><span style={{ fontSize: '30px' }} className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>
            </div>

          </div>
          <div className="row">
            <div className="col-md-2 col-md-offset-1">
              <img src="./imgs/wc_source_composite.png" style={{ paddingTop: '20px' }} />
              <small>Source photos</small>
            </div>
            <div className="col-md-1 hidden-xs hidden-sm" style={{ textAlign: 'center', paddingTop: '60px' }}><span style={{ fontSize: '30px' }} className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>
            <div className="col-md-2">
              <img src="./imgs/wc_analysis.jpg" style={{ paddingTop: '30px' }} />
              <small>Analysis program</small>
            </div>
            <div className="col-md-1 hidden-xs hidden-sm" style={{ textAlign: 'center', paddingTop: '60px' }}><span style={{ fontSize: '30px' }} className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>
            <div className="col-md-2">
              <img src="./imgs/wc_proj.jpg" />
              <small>Augmented Reality Projection/Camera setup</small>
            </div>
            <div className="col-md-1 hidden-xs hidden-sm" style={{ textAlign: 'center', paddingTop: '60px' }}><span style={{ fontSize: '30px' }} className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>
            <div className="col-md-2 text-center">
              <img src="./imgs/wc_montage.png" />
              <small>Watercolor paintings</small>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h4>What I want:</h4>
              <div className="col-md-6">
                <p>
                  <img src="./imgs/wc_good_0.jpg" />
                </p>
                <img src="./imgs/wc_good_1.jpg" />
              </div>
              <div className="col-md-6">
                <img src="./imgs/wc_good_2.jpg" />
              </div>
              <small>Frugal use of bold marks with dynamic and meaningful shapes, pigment blending freely wet-in-wet to create transparent and spontaneous mixes</small>
            </div>
            <div className="col-md-6">
              <h4>What I don't want:</h4>
              <div className="col-md-6">
                <img src="./imgs/wc_bad_0.jpg" style={{ paddingBottom: '10px' }} />
                <img src="./imgs/wc_bad_1.jpg" />
              </div>
              <div className="col-md-6">
                <img src="./imgs/wc_bad_2.jpg" />
              </div>
              <small>Fussiness, lack of contrast, boring colors mixed on the palette, focus on content over form</small>
            </div>
          </div>
        </div>
    );
  }
}
