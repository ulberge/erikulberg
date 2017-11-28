import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './BirdNest.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container-fluid projectPage')}>
        <div className="container">
          <div className="detailPageHeader">
            <h2>
              BirdNest&nbsp;&nbsp;<small>2017</small>
            </h2>
            <div>Arduino, Sculpture, Proximity Sensor</div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <p><b>Description</b>: An interactive, animatronic version of a bird nest. When a viewer approaches, the birds wildly jump up and down and make noise.</p>
              <p>Displayed as part of the Nii Modo Pop-up Gallery at the Mini Maker Faire at the Museum of Pop Art (Formerly the Experience Music Project) in Seattle on September 16-17, 2017.</p>
              <p>The Auto-Bas Relief is the internal mechanism.</p>
            </div>
            <div className="col-md-7">
              <img src={"./imgs/birdnest_wide.jpg"}/>
            </div>
          </div>
        </div>

        <div className="accentRow row text-center">
          <div className="container">
            <div style={{ paddingTop: '10px' }}>
              <h3>Videos</h3>
              <hr/>
            </div>
            <div className="col-md-6 col-xs-12">
              <video controls>
                <source src={"imgs/birdnestclip.mp4"} type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="col-md-6 col-xs-12">
              <video controls>
                <source src={"imgs/birdnest.mp4"} type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
