import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './SeaDragon.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="row">
          <div className="col-md-12 text-center detailPageHeader">
            <h2>
              Sea Dragon Mural&nbsp;&nbsp;<small>2015</small>
            </h2>
            <div>50" x 30"</div>
            <div>Watercolor, Charcoal</div>
          </div>
          <div className="col-md-12" style={{ paddingBottom: '20px' }}>
            <img src="/imgs/portfolioassets/seadragon/seadragon_lg.jpg" alt="Sea Dragon Mural"/>
            <span></span>
          </div>
        </div>
      </div>
    );
  }
}
