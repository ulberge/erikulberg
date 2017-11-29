import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Huckleberry.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container-fluid projectPage')}>
        <div className="container">
          <div className="detailPageHeader">
            <h2>
              Huckleberry processor&nbsp;&nbsp;<small>2016-2017</small>
            </h2>
            <div>Industrial Design, Wild Farming</div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <p><b>Description</b>: Evergreen huckleberry have tiny berries and are difficult to harvest. These are attempts to make the task easier.</p>
              <img className="screenShot" src="/imgs/portfolioassets/huckleberry/tube0.jpg" alt="Plaster Original"/>
              <small>Test of rotating filter with water</small>
              <div className="col-md-6">
                <img className="screenShot" src="/imgs/portfolioassets/huckleberry/sample.jpg" alt="Silicone Mold"/>
                <small>Sample of berries before sorting</small>
              </div>
              <div className="col-md-6">
                <img className="screenShot" src="/imgs/portfolioassets/huckleberry/branch.jpg" alt="Silicone Mold"/>
                <small>Berries on branch</small>
              </div>
            </div>
            <div className="col-md-8">
              <h3>Rotating Water Filter</h3>
              <img className="screenShot" src="/imgs/portfolioassets/huckleberry/tube1.jpg" alt="Silicone Mold"/>
              <small>Water in bucket pushes berries into filter with different size holes. A small motor at the bottom turns the tube to keep the berries from sticking and to move them across the holes.</small>
              <div className="col-md-8 col-md-offset-2">
              </div>
            </div>
          </div>
        </div>

        <div className="accentRow row text-center">
          <div className="container">
            <div style={{ paddingTop: '10px' }}>
              <h3>Optical Sorter</h3>
              <hr/>
              <p className="text-left">Original design (inspired by blueberry sorters) included a slide that directed the berries across a digital, optical filter. The berries were too small and moisture caused them to stick to the slide.</p>
            </div>
            <div className="col-md-6">
              <img className="screenShot" src="/imgs/portfolioassets/huckleberry/sketch.jpg" alt="Sketch of optical sorter"/>
              <span>Sketch of optical sorter</span>
            </div>
            <div className="col-md-6">
              <div className="col-xs-5">
                <img className="screenShot" src="/imgs/portfolioassets/huckleberry/glue.jpg" alt="Glue"/>
                <span>Gluing optical sorter</span>
              </div>
              <div className="col-xs-7">
                <img className="screenShot" src="/imgs/portfolioassets/huckleberry/seal.jpg" alt="Seal"/>
                <span>Water-sealing slide</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <h3>Concept Designs</h3>
            <p>Drawing of a concept where small, self-driving airships collect berries and jettison their compost tea ballast during flight.</p>
            <div className="col-md-6">
              <img className="screenShot" src="./imgs/portfolioassets/huckleberry/dream0.jpg" />
            </div>
            <div className="col-md-6">
              <img className="screenShot" src="./imgs/portfolioassets/huckleberry/dream1.jpg" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
