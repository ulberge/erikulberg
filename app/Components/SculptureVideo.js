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
                Auto Bas-Relief&nbsp;&nbsp;<small>2016</small>
              </h2>
              <div>Fabrication, Arduino, Processing, Kinect, Relief Sculpture</div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <p><b>Description</b>: An exploration of how video would appear in 3D. We don't currently have matter appropriate for real-time rendering in physical space, but we can control heights. This box represents a proof of concept. Its capacity for expression is limitied by its size. An example of a larger version that works better is the <a href="https://tangible.media.mit.edu/project/inform/">inFORM</a> from the MIT Media Lab. This machine takes a feed from a Kinect and renders it as a 4x4 relief sculpture.</p>
                <img src="./imgs/portfolioassets/bas/guts_sm.jpg" alt="Interior Shot"/>
                <small>Laser cut wood and plastic parts attach to 16 servos controlled by an Arduino</small>
              </div>
              <div className="col-md-8 iframeContainer clearFix">
                <video controls>
                  <source src={"imgs/relief_movie.mp4"} type="video/mp4"/>
                  Your browser does not support the video tag.
                </video>
                <div><small>The Processing sketch and machine running with a Kinect</small></div>
              </div>
            </div>
          </div>

          <div className="accentRow row text-center">
            <div className="container">
              <div style={{ paddingTop: '10px' }}>
                <h3>Example States</h3>
                <hr/>
              </div>
              <div className="stateTiles">
                <div className="col-md-8 col-md-offset-2">
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
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div style={{ paddingTop: '10px' }}>
                <h3 className="text-center">Designs</h3>
              </div>
              <div className="col-md-6">
                <div className="col-md-12">
                  <img src={"./imgs/autobas_sketch4.jpg"}/>
                  <div><small>Sketch of project architecture</small></div>
                </div>
                <div className="col-md-8">
                  <img src={"./imgs/autobas_sketch3.jpg"}/>
                  <div><small>Sketches of machine parts</small></div>
                </div>
                <div className="col-md-4">
                  <img src={"./imgs/autobas_sketch1.jpg"}/>
                  <div><small>Sketches of example states</small></div>
                </div>
              </div>
              <div className="col-md-6">
                <img src={"./imgs/portfolioassets/bas/smalldemo.jpg"}/>
                <div><small>Small test run</small></div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
