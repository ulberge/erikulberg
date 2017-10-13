import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './BirdNest.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container projectPage')}>
        <h2>BirdNest, 2017</h2>

        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <img src={"./imgs/birdnest_wide.jpg"}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3>Project Description</h3>
          </div>
          <div className="col-md-6">
            <p><b>KEYWORDS:</b> Arduino, Sculpture, Proximity Sensor</p>
            <p>This piece is an interactive, animatronic version of a bird nest. When a viewer approaches, the birds wildly jump up and down and make noise. I built it to display at the Mini Maker Faire at the Museum of Pop Art in Seattle.</p>
            <p>This piece has a grid of 16 arms with springs attached to bird shaped heads. The arms are controlled by an Arduino that also controls a proximity sensor and speaker.</p>
          </div>
          <div className="col-md-6">
            <video controls>
              <source src={"imgs/birdnestclip.mp4"} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <video controls>
              <source src={"imgs/birdnest.mp4"} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    );
  }
}
