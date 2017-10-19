import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import { className } from './Anaglyph.less';

module.exports = React.createClass({
  componentDidMount: function componentDidMount() {
    const garden = $('#iframe');
    garden.width('100%');
    garden.height(garden.width() * 0.5);
    garden.focus();
  },
  iframe: function iframe() {
    return {
      __html: '<iframe id="iframe" src="unendingAnaglyph/index.html" frameBorder="0" scrolling="no"></iframe>'
    };
  },
  render() {
    return (
      <div className={classnames(className, 'container projectPage')}>
        <h2>Endless Stereograph, 2017</h2>
        <h4>Can we bring 3D photos to life with some visual trickery?</h4>
        <div className="row">
          <div className="col-md-6">
            <h3>Project Description</h3>
            <p><b>KEYWORDS:</b> Stereo Vision, 3D Animation</p>
            <p>Endless Stereograph is a 3D animation composed of endlessly repeating stereoscopic images of a forest path.</p>
            <p>This project was inspired by historical stereographs, like works by Muybridge, and my desire to plunge into them. I also used pictorial strategies from Donatello's relief sculptures in which the problem of resolving depth between layers is treated separately from resolving depth within a layer.</p>
          </div>
          <div className="col-md-6 iframeContainer clearFix">
            <div dangerouslySetInnerHTML={ this.iframe() } />
            <div className="iframeOverlap"></div>
            <div className="well">
              <div><b>CONTROLS:</b> (First click on video)</div>
              <div><span className="text-info">toggle between stereo and anaglyph</span>: &lt;space bar&gt;</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <h3>Method</h3>
            <p>The project consists of stereoscopic images with transparent holes cut out, layered in a virtual 3D space, and moving toward the viewer in a curved plane.</p>
            <div className="">
              <img src="./imgs/forestflowd0.jpg" alt=""/>
              <div></div>
            </div>
            <p>Below you can see an example of Donatello ignoring strict rules of perspective. He divides the space into layers and makes it clear which layer is in front of which. Once he has established a clear hierarchy of layers, he proceeds to depths within sublayers. Even if relative heights between objects in different layers do not follow normal proportions, human perception can comfortably understand the space.</p>
            <div className="">
              <img src="./imgs/forestflowd4.jpg" alt=""/>
              <div></div>
            </div>
            <p>Similarly, I took stereoscopic images, which contain relative depths, and placed them in a strict hierarchy in a 3D space. The depth of layers is established by the virtual world and the stereoscopic nature of the images controls the sublayer depth.</p>
            <div className="col-md-6 pull-right">
              <img src="./imgs/forestflowd5.jpg" alt=""/>
              <div></div>
            </div>
            <p>This method of placing enhanced 2D images in a 3D space has been used extensively in video games. Wolfenstein 3D, a game that debuted in 1992, imitated 3D space by placing 2D images within it. Some of those 2D images turned in space (the bad guys) or could be viewed at different angles (walls and doors). Using linear perspective coupled with 2D images possessing fake volume was enough to allow players to understand the world as a 3D space. It was a groundbreaking game and demonstrated a convincing strategy. This art project also uses 2D objects that feel 3D in a 3D space.</p>


          </div>
          <div className="col-md-8 col-md-offset-2">
            <h3>How it works</h3>
            <p>I took pairs of photos from Seward Park with approximately double human interaxial separation.</p>

            <p>Then, I used Adobe Illustrator/Photoshop to prepare them:
            <ul>
            <li>Aligned left and right photo position and rotation</li>
            <li>Tried to keep horizontal offset to &lt;2% of eventual screen width</li>
            <li>Aimed for no more than 20% of space “in front of screen”</li>
            <li>Cut out center of photo's (~720 by 720px)</li>
            <li>Followed natural foliage</li>
            <li>Applied Gaussian blur to ease transition between photos</li>
            <li>Cropped photos to 2560 by 1920px</li>
            </ul>
            </p>
             <div className="">
              <img src="./imgs/forestflowd2.jpg" alt=""/>
              <div></div>
            </div>
            <h4>Animation</h4>
            <p>I rendered the photos using ThreeJS, a 3D Javascript library for the browser. I placed the pairs of images at consistent intervals meant to simulate “30 feet”. The objects within the photos are approximately 30 to 60 feet from the camera. By placing them at intervals of “30 feet” in 3D space, they have natural offsets and do not appear to overlap. Their distance in the virtual world adjusts the offset between left and right images appropriately (or at least well enough). The layers represent distances of 30 to 60 feet, 60 to 90 feet, 90 to 120 feet, etc. </p>
            <p>In addition, ThreeJS has a stereo camera that supports rendering objects based on their layer. This allowed me to render the left images in the left camera and the right images in the right camera.</p>
            <p>Next, I programmed the photos to move down and towards the camera. Once they pass a certain threshold near the camera, they jump to the back of the queue. Pictorial and binocular cues give the viewer a sense of moving in space and the concavity of the ground imitates a large, curved surface.</p>
            <div className="">
              <img src="./imgs/forestflowd3.jpg" alt=""/>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
