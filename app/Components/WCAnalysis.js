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
              <div className="col-md-6">
                <p><b>A custom tool to make me more productive at painting in watercolor.</b></p>
                <p>This program allows me to analyze source photos and produce approximations of what I will paint in each layer of a watercolor. I can select colors to make posterized versions of the photo comprised of light, medium, or dark colors. I can then project those layers, a customized value study version, or a warm/cool version onto a piece of watercolor paper to assist in the painting process.</p>
                <div className="text-center">
                  <div className="col-md-7">
                    <img src="./imgs/wc_analysis.jpg" alt="Watercolor Analysis" />
                    <p>Processing Sketch</p>
                  </div>
                  <div className="col-md-5">
                    <img src="./imgs/wc_proj.jpg" alt="Watercolor Analysis" />
                    <p>Projection Setup</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                  <img src="./imgs/gifs/wc_rollover.gif" />
                <p>Processing Sketch in action</p>
              </div>
            </div>
          </div>

          <div className="accentRow row text-center" style={{ marginBottom: '20px' }}>
            <div className="container">
              <h3>Test Paintings</h3>
              <hr/>
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
