import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Gloria.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="row">
          <div className="col-md-12 text-center detailPageHeader">
            <h2>
              Study of Gloria&nbsp;&nbsp;<small>2016</small>
            </h2>
            <div>Life-Size</div>
            <div>Fired Clay, Wax</div>
          </div>
          <div className="col-md-8 col-xs-12" style={{ paddingBottom: '20px' }}>
            <img src="/imgs/portfolioassets/gloria/gloria_detail2.jpg" alt="Gloria Detail"/>
            <span></span>
          </div>
          <div className="col-md-4 col-xs-12" style={{ paddingBottom: '20px' }}>
            <div className="col-xs-6">
              <img src="/imgs/portfolioassets/gloria/edit/gloria_lg0.jpg" alt="0"/>
              <span></span>
            </div>
            <div className="col-xs-6">
              <img src="/imgs/portfolioassets/gloria/edit/gloria_lg1.jpg" alt="1"/>
              <span></span>
            </div>
          </div>
          <div className="col-md-4 col-xs-12" style={{ paddingBottom: '20px' }}>
            <div className="col-xs-6">
              <img src="/imgs/portfolioassets/gloria/edit/gloria_lg2.jpg" alt="2"/>
              <span></span>
            </div>
            <div className="col-xs-6">
              <img src="/imgs/portfolioassets/gloria/edit/gloria_lg3.jpg" alt="3"/>
              <span></span>
            </div>
          </div>

          <div className="col-md-4 col-xs-12" style={{ paddingBottom: '20px' }}>
            <div className="col-xs-12">
              <img src="/imgs/portfolioassets/gloria/gloria_clay.jpg" alt="Before Firing"/>
              <span>Before Firing</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
