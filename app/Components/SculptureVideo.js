import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './SculptureVideo.less';

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container-fluid projectPage')}>
          <div className="container">
            <div className="detailPageHeader">
              <h2>
                Auto Sculpture&nbsp;&nbsp;<small>2016</small>
              </h2>
              <div>Fabrication, Arduino, Processing, Kinect, Relief Sculpture</div>
            </div>

            <div className="row">
              <div className="col-md-7">
                <p><b>How would video appear as a physical object?</b></p>
                <p>This machine takes a feed from a Kinect and renders it as a 4x4 relief sculpture. A Processing sketch controls an Arduino with 16 servos that move a laser-cut wood and plastic apparatus. This is meant as a test to see what a real-time relief sculpture would feel like.</p>
                <p>An example of a similar, but larger device, is the <a href="https://tangible.media.mit.edu/project/inform/">inFORM</a> from the MIT Media Lab.</p>
                <div className="stateTiles">
                  <div>
                    <img src={"./imgs/pairs/v3.jpg"}/>
                    <img src={"./imgs/pairs/v0.jpg"}/>
                    <img src={"./imgs/pairs/v1.jpg"}/>
                    <img src={"./imgs/pairs/v2.jpg"}/>
                  </div>
                  <div>
                    <img src={"./imgs/pairs/r3.jpg"}/>
                    <img src={"./imgs/pairs/r0.jpg"}/>
                    <img src={"./imgs/pairs/r1.jpg"}/>
                    <img src={"./imgs/pairs/r2.jpg"}/>
                  </div>
                </div>
                <p>Example states</p>
              </div>
              <div className="col-md-5">
                <img src="./imgs/home/sculpture_video.gif" alt="Auto Sculpture"/>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div style={{ paddingTop: '10px' }}>
                <h3 className="text-center">Designs</h3>
                <hr/>
              </div>
              <div className="col-md-6">
                <div className="col-md-8">
                  <img src={"./imgs/autobas_sketch3.jpg"}/>
                  <div><p>Sketches of machine parts</p></div>
                </div>
                <div className="col-md-4">
                  <img src={"./imgs/autobas_sketch1.jpg"}/>
                  <div><p>Sketches of example states</p></div>
                </div>
              </div>
              <div className="col-md-6">
                <img src="./imgs/portfolioassets/bas/guts_sm.jpg" alt="Interior Shot"/>
                <p>Under construction</p>
              </div>
            </div>
          </div>

          <div className="accentRow row text-center hidden-xs hidden-sm">
            <div className="container iframeContainer clearFix">
              <div style={{ paddingTop: '10px' }}>
                <h3 className="text-center">Video</h3>
                <hr/>
              </div>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/5o94N8MtwzU" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullscreen></iframe>
              <div><p>The Processing sketch and machine running with a webcam</p></div>
            </div>
          </div>
        </div>
    );
  }
}
