import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './WCRemix.less';

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container projectPage')}>
          <h2>Watercolor Toolkit, 2017 (In Progress)</h2>
          <h4>An adaptive system to let me focus on the good parts of watercolor.</h4>
          <div className="row">
            <div className="col-md-12">
              <h3>Project Description</h3>
            </div>
            <div className="col-md-4">
              <p><b>KEYWORDS:</b> Computer-Aided Watercolor, Machine Learning, <a href="http://www.wekinator.org/">Wekinator</a>, Processing</p>
              <p>A custom toolkit to make watercolor easier and allow me to focus on creating beautiful and expressive marks.</p>
              <h4>Tools:</h4>
              <ul>
                <li><b>Analysis Tool</b>: value studies, color studies, test out light/medium/dark layers</li>
                <li><b>Projection/Camera Setup</b>: proportions, test changes before doing them, check color differences</li>
                <li><b>Filter Tools</b>: cropping and compositing pieces</li>
              </ul>
            </div>
            <div className="col-md-5 text-center" style={{ paddingTop: '0px' }}>
              <img src="./imgs/wc_composite.jpg" />
              <small>Collage</small>
            </div>
            <div className="col-md-1 hidden-xs hidden-sm" style={{ textAlign: 'center', paddingTop: '120px' }}><span style={{ fontSize: '30px' }} className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>
            <div className="col-md-2 text-center" style={{ paddingTop: '60px' }}>
              <img src="./imgs/wc_post.jpg" />
              <small>Filter tools built with Machine Learning and Wekinator</small>
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
            <div className="col-md-12">
              <h3>Filter Tools</h3>
              <div>
                <p>I used machine learning with <a href="http://www.wekinator.org/">Wekinator</a> to crop the unpainted areas and make the paintings as transparent as possible while maintaining the color.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="col-md-1 ">
                <img src="./imgs/wc_tree_0.jpg" style={{ paddingTop: '90px' }} />
                <small>Original</small>
              </div>
              <div className="col-md-1 hidden-xs hidden-sm" style={{ textAlign: 'center', paddingTop: '120px' }}><span style={{ fontSize: '30px' }} className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>
              <div className="col-md-4">
                <img src="./imgs/wc_croptool.jpg" />
                <small>Smart crop using machine learning trained to recognize cold press watercolor paper</small>
              </div>
              <div className="col-md-3">
                <img src="./imgs/wc_transtool.jpg" />
                <small>Convert colors to transparent version that maintains intensity (on top of white background should be same color as original)</small>
              </div>
              <div className="col-md-1 hidden-xs hidden-sm" style={{ textAlign: 'center', paddingTop: '120px' }}><span style={{ fontSize: '30px' }} className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>
              <div className="col-md-2 text-center">
                <img src="./imgs/wc_tree_1.png" style={{ paddingTop: '60px' }} />
                <small>Final</small>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img src="./imgs/wc_trainer.jpg" style={{ paddingTop: '20px' }} />
              <small>Program for training machine learning tool</small>
            </div>
            <div className="col-md-6">
              <img src="./imgs/wc_chart2.jpg" style={{ paddingTop: '20px' }} />
              <small>Results from testing different transparency algorithms</small>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <h3>Analysis Tool</h3>
              <div>
                <p>I made a program that allowed me to work layer by layer, picking colors and adjusting their strength. This gives me the ability to understand how important value and different colors are to creating a convincing atmosphere and space.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="col-md-8 col-md-offset-2">
                <img src="./imgs/wc_analysis.jpg" style={{ paddingTop: '20px' }} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <h3>Projection/Camera Setup</h3>
              <div>
                <p>I am testing out various projection/camera setups to assist with measuring proportions and checking colors against a goal color. This saves me having to make a prepatory sketch and helps me understand color better. The setup projects an image from a Processing sketch and records the result and compares with the original image.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="col-md-4 col-md-offset-2">
                <img src="./imgs/wc_projection.jpg" style={{ paddingTop: '20px' }} />
                <small>Example Projection</small>
              </div>
              <div className="col-md-4">
                <img src="./imgs/wc_proj.jpg" />
                <small>Augmented Reality Projection/Camera setup</small>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
