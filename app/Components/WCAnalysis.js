import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './WCAnalysis.less';

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'projectPage')}>

          <div className="container">
            <div className="detailPageHeader">
              <h2>
                Watercolor Planning Tool&nbsp;&nbsp;<small>2017</small>
              </h2>
              <div>Computer-Aided Watercolor, Processing</div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <h4><b>Features</b>:</h4>
                <ul>
                  <li>value and color studies</li>
                  <li>measures proportions</li>
                  <li>tests light/medium/dark layers</li>
                </ul>
              </div>
              <div className="col-md-9">
                <img className="screenShot" src="./imgs/wc_analysis.jpg" style={{ paddingTop: '10px' }} />
                <small>Processing Sketch</small>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="col-md-5">
                  <img src="./imgs/wc_proj.jpg" style={{ paddingTop: '10px' }} />
                  <small>Projection Setup</small>
                </div>
                <div className="col-md-7">
                  <img src="./imgs/portfolioassets/wcanalysis/sketch.jpg" style={{ paddingTop: '10px' }} />
                  <small>Example Painting</small>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
