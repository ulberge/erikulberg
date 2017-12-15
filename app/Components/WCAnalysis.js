import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './WCAnalysis.less';

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container-fluid projectPage')}>
          <div className="container">
            <div className="detailPageHeader">
              <h2>
                Watercolor Planning Tool&nbsp;&nbsp;<small>2017</small>
              </h2>
              <div>Computer-Aided Watercolor, Processing</div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <p><b>A custom tool to make me more productive at painting in watercolor.</b></p>
                <p>This program allows me to analyze source photos and produce approximations of what I will paint in each layer of a watercolor. I can select colors to make posterized versions of the photo comprised of the lightest, medium, or darkest colors. I can then project those versions of the source, a customized value study version, or warm/cool version onto a piece of watercolor to assist in the painting process. </p>
                <img src="./imgs/wc_proj.jpg" style={{ paddingTop: '10px' }} />
                <small>Projection Setup</small>
              </div>
              <div className="col-md-8">
                <img className="screenShot" src="./imgs/wc_analysis.jpg" style={{ paddingTop: '10px' }} />
                <small>Processing Sketch</small>
              </div>
            </div>
          </div>

          <div className="accentRow row text-center" style={{ marginBottom: '20px' }}>
            <div className="container">
              <h3>Example Paintings</h3>
              <div className="col-md-7">
                <img src="./imgs/portfolioassets/wcanalysis/bg.jpg" style={{ paddingTop: '10px' }} />
              </div>
              <div className="col-md-5">
                <img src="./imgs/portfolioassets/wcanalysis/sketch.jpg" style={{ paddingTop: '10px' }} />
              </div>
            </div>
          </div>

        </div>
    );
  }
}
