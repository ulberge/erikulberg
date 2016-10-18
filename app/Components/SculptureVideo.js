import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './SculptureVideo.less';

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container')}>
          <h2 className="text-center">Real-Time Bas-Relief</h2>
          <div>
            <div className="row">
              <video className="col-lg-6" controls>
                <source src={"imgs/sculpturevideo.mp4"} type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
              <div className="col-lg-6">
                <h3>Project Description:</h3>
                <p>This project was an attempt to build a machine that renders a live sculpture of a video feed. My goal was to explore how a 3D representation that updates in real-time would compare to face-to-face interaction and traditional video.</p>
                <p></p>
                <p>Digital video allows us to see objects and movements, but it lacks the physical and tactile understanding that comes with viewing an object in physical space. We lose information when we experience something digitally. A sculpture-video narrows that gap and brings us closer to full fidelity with real life.</p>
                <p></p>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <h3>Relief Machine:</h3>
                <p>I chose to approach this problem with relief (instead of sculpture in the full round), because it is simpler to control a grid of heights versus free-floating points in space.</p>
                <p></p>
                <p>I built a box with moving arms that poked out at programmable heights. An array of servo motors controlled the arms. I sewed a piece of fabric to their tips to catch the light and highlight the shapes created.</p>
                <p></p>
                <img src={"./imgs/sculpturevideoinprogress.jpg"} className="col-lg-6"/>
                <img src={"./imgs/sculpturevideoupclose.jpg"} className="col-lg-6"/>
              </div>
              <img src={"./imgs/sculpturevideo.jpg"} className="col-lg-6"/>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <h3>Code:</h3>
                <p>The servos were controlled by an Arduino that recieved a 2D array of heights through its Serial port. The height array was supplied by a video feed that I converted using Processing. I calculated the heights using the relative brightness of sections in the images. To assist with this process, I created a 3D simulation.</p>
                <p></p>
                <p>Since the sculpture-video machine only had a 4x4 grid, I was unable to create recognizable sculpture-videos of people. As a proof of concept, I reproduced just the center subsection of the grid on the sculpture-video machine. The subsection can be seen highlighted in green in the screenshot.</p>
                <p></p>
                <p>In retrospect, a Kinect would have been simpler and more accurate in reading the 3D space.</p>
                <p></p>
              </div>
              <div className="col-lg-6">
                <img src={"./imgs/sculpturevideoscreenshot.jpg"} style={{ marginTop: '0px' }}/>
                <p>(Screenshot from Processing 3D simulation)</p>
              </div>

              <div className="col-lg-12">
                <h3>Pseudocode:</h3>
                <p>Processing -></p>
                <div><code>{'void draw() {'}</code></div>
                <div><code>&nbsp;&nbsp;{'image = camera.get()'}</code></div>
                <div><code>&nbsp;&nbsp;{'PImage image = crop(image)'}</code></div>
                <div><code>&nbsp;&nbsp;{'PImage image = resize(image)'}</code></div>
                <div><code>&nbsp;&nbsp;{'PImage image = flip(image)'}</code></div>
                <div><code>&nbsp;&nbsp;{'PImage image = contrastAndBrightness(image)'}</code></div>
                <div><code>{''}</code></div>
                <div><code>&nbsp;&nbsp;{'float[][] triangulatedGrid = getGrayscaleTriangles(image)'}</code></div>
                <div><code>{''}</code></div>
                <div><code>&nbsp;&nbsp;{'float[][] heights = getHeights(triangulatedGrid)'}</code></div>
                <div><code>{''}</code></div>
                <div><code>&nbsp;&nbsp;{'// render simulation'}</code></div>
                <div><code>{''}</code></div>
                <div><code>&nbsp;&nbsp;{'// every 0.1s write to serial port'}</code></div>
                <div><code>&nbsp;&nbsp;{'Serial.write(heights);'}</code></div>
                <div><code>{'}'}</code></div>
                <p></p>
                <p>Arduino -></p>
                <div><code>{'void loop() {'}</code></div>
                <div><code>&nbsp;&nbsp;{'if (Serial.available()) {'}</code></div>
                <div><code>&nbsp;&nbsp;&nbsp;&nbsp;{'heights = Serial.read()'}</code></div>
                <div><code>&nbsp;&nbsp;{'}'}</code></div>
                <div><code>{''}</code></div>
                <div><code>&nbsp;&nbsp;{'for (int rowIndex = 0; rowIndex < rowSize; rowIndex++) {'}</code></div>
                <div><code>&nbsp;&nbsp;&nbsp;&nbsp;{'for (int colIndex = 0; colIndex < colSize; colIndex++) {'}</code></div>
                <div><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'setHeight(servo[rowIndex][colIndex], heights[rowIndex][colIndex])'}</code></div>
                <div><code>&nbsp;&nbsp;&nbsp;&nbsp;{'}'}</code></div>
                <div><code>&nbsp;&nbsp;{'}'}</code></div>
                <div><code>{'}'}</code></div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
