import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Kubota.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="row">
          <div className="col-md-12 text-center detailPageHeader">
            <h2>
              Kubota Gardens&nbsp;&nbsp;<small>2017</small>
            </h2>
            <div>10.5" x 11"</div>
            <div>Plaster, Watercolor, Permanent Marker</div>
          </div>
          <div className="col-md-6" style={{ paddingBottom: '20px' }}>
            <img src="/imgs/kubota.jpg" alt="Kubota Gardens"/>
            <span>Final Painted Version</span>
          </div>
          <div className="col-md-6 col-xs-12" style={{ paddingBottom: '20px' }}>
            <div className="col-xs-4">
              <img src="/imgs/portfolioassets/kubota/sketch.jpg" alt="Sketch"/>
              <span>Sketch</span>
            </div>
            <div className="col-xs-4">
              <img src="/imgs/portfolioassets/kubota/clay.jpg" alt="Clay"/>
              <span>Clay</span>
            </div>
            <div className="col-xs-4">
              <img src="/imgs/portfolioassets/kubota/plaster_cast.jpg" alt="Plaster Cast"/>
              <span>Plaster Cast</span>
            </div>
          </div>

          <div className="col-md-6 col-xs-12" style={{ paddingBottom: '20px' }}>
            <div className="col-xs-4">
              <img src="/imgs/portfolioassets/kubota/plaster_original.jpg" alt="Plaster Original"/>
              <span>Plaster Original</span>
            </div>
            <div className="col-xs-4">
              <img src="/imgs/portfolioassets/kubota/silicone.jpg" alt="Silicone Mold"/>
              <span>Silicone Mold</span>
            </div>
            <div className="col-xs-4">
              <img src="/imgs/portfolioassets/kubota/plain.jpg" alt="Final Cast"/>
              <span>Final Cast</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
