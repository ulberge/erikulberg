import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './SculptureVideo.less';

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container projectPage')}>
          <h2>Auto Bas-Relief, 2016</h2>
          <div className="row">
            <div className="col-md-12">
              <h3>Project Description</h3>
            </div>
            <div className="col-md-6">
              <p><b>KEYWORDS:</b> Processing, Kinect, Arduino, Relief Sculpture</p>
              <p>The Auto Bas-Relief takes a feed from a Kinect or a webcam and converts it into a 2D array of heights rendered in real-time as a relief sculpture.</p>
              <p>I was interested in how video would appear in 3D. We don't currently have matter appropriate for real-time rendering in physical space, but we can control heights. This box represents a proof of concept. Its capacity for expression is limitied by its size. An example of a larger version that works better is the <a href="https://tangible.media.mit.edu/project/inform/">inFORM</a> from the MIT Media Lab.</p>
              <p>While the inFORM is focused on physical presence a viewer can interact with, the Auto Bas-Relief is a physical display meant as a visual medium. By limiting its capacity, it can borrow ideas from relief sculptures and demonstrate possibilities for them as well. It is liberated from just compressing an axis. It can use trompe l'oeil to acheive more in the compressed space. It also is an intriguing tool for learning about relief sculptures, because it allows me to iterate on ideas faster than in plaster.</p>
            </div>
            <div className="col-md-6">
              <video controls>
                <source src={"imgs/relief_movie.mp4"} type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="row stateTiles">
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
              <div><small>Example states</small></div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h4>Physical Output</h4>
              <p>The physical output of this project is a 4x4 grid of linear actuators controlled by an Arduino with a 16-channel servo shield. There are laser cut wooden parts to hold the servos in place and laser cut plastic arms to convert the circular motion into vertical motion.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-offset-2 col-md-5">
              <img src={"./imgs/autobas_sketch3.jpg"}/>
            </div>
            <div className="col-md-3">
              <img src={"./imgs/autobas_sketch1.jpg"}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-md-offset-2">
              <img src={"./imgs/sculpturevideoinprogress.jpg"}/>
            </div>
            <div className="col-md-4">
              <img src={"./imgs/sculpturevideo.jpg"} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h4>Input and Processing</h4>
              <p>The input is a Kinect or webcam controlled by a Processing sketch that converts the values to a 2D array of heights to send to the Arduino.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <img src={"./imgs/autobas_sketch4.jpg"}/>
              <div><small>Sketch of project architecture</small></div>
            </div>
            <div className="col-md-8 col-md-offset-2">
              <img src={"./imgs/autobas_processing.jpg"}/>
              <div><small>Processing with Kinect sketch screenshot</small></div>
            </div>
            <div className="col-md-8 col-md-offset-2">
              <img src={"./imgs/autobas_still4.jpg"}/>
              <div><small>Whole setup with Kinect running</small></div>
            </div>
            <div className="col-md-8 col-md-offset-2">
              <img src={"./imgs/sculpturevideoscreenshot.jpg"}/>
              <div><small>Auto Bas-Relief version with webcam (makes a visual approximation of input image)</small></div>
            </div>
          </div>
        </div>
    );
  }
}
