import React from 'react';
import classnames from 'classnames';
import { className } from './KernelTuner.less';

const lineDrawingStyle = { filter: 'opacity(87%)' };

export default function Thesis() {
  return (
    <div className={classnames(className, 'container-fluid projectPage')}>
      <div className="container">
        <div className="detailPageHeader">
          <h2>
            Master's Thesis&nbsp;&nbsp;<small>2020</small>
          </h2>
          <div>Crafting the Weights of a Convolutional Neural Network to Make a Line Drawing</div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <p><b>Description</b>:</p>
            <p>Deep learning has powered dramatic advances in image recognition and generation in the last decade (the generation part is becoming increasingly popular with <a href="http://www.aiartonline.com/category/community-2019/" title="AI Art Gallery (NeurIPS 2019)" target="_blank">artists</a>). These feats are possible because of the remarkable power of neural networks to represent abstract visual concepts.</p>

            <p>However, humans can only interact with neural networks indirectly through the choice of datasets. It is generally assumed that these networks are too complex to manipulate by hand and that they require the mediation of machine learning algorithms.</p>

            <p>This thesis rejects that assumption and attempts to dive right in. Instead of training networks through gradient descent or what have you, it presents an approach to manually editing and debugging the internal weights. It adopts a data structure from machine learning, neural networks, and uses human reasoning to shape it.</p>
            <p><b>Research Question:</b> Can humans use networks as a low level shape grammar to make art? How do the layers of convolution in a neural network flexibly encode shape, size, and structural relations at different scales in a line drawing?</p>
            <p><b>Technologies</b>: TensorFlow.js, ReactJS</p>
            <p><b>Demo</b>: <i>Under construction</i></p>
            <p><b>Code</b>: <a href="https://github.com/ulberge/interactive-network" target="_blank">github.com/ulberge/interactive-network</a></p>
          </div>
          <div className="col-md-7">
            <div style={{ margin: '30px' }}>
              <div className="imgContainer text-center" style={lineDrawingStyle}>
                <img src={"./imgs/thesis/thesisimg.png"} style={{ maxWidth: '120px', width: '30%', marginRight: '5%' }} />
                <img src={"./imgs/thesis/houses/results/housesgood.png"} style={{ maxWidth: '200px', width: '50%' }} />
              </div>
              <small className="text-left">Early drawings by the system. So many types of boxes are possible! And some attempts at a house.</small>
              <div className="imgContainer text-center">
                <img src={"./imgs/thesis/house2.gif"} style={{ width: '100%', marginTop: '20px' }} />
              </div>
              <small className="text-left">The interface provides a drawing area and editable network that updates in real-time with respect to the drawing. It uses the kernels produced by the <a href="/#/kerneltuner" target="_blank">Kernel Tuner</a> for the first layer.</small>
            </div>
          </div>
        </div>
        <hr/>
        <div className="accentRow row">
          <div className="col-md-8 col-md-offset-2">
            <h3 className="text-center">Crafting a Network to Make a Line Drawing</h3>
            <hr/>
            <p><b>Drawing a box</b>:</p>
            <p className="text-left">Let's say you want to draw a box. What is a box? You might say a box is a rectangle of flexible size, formed by a single continuous line with no loose ends and squared corners. The corners should be approximately in line with each other. Maybe they look something like the following:</p>
            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/boxes/box8.png"} />
            </div>
            <p className="text-left">But how do you achieve this using a CNN?</p>
            <br/>
            <p><b>Approach</b>:</p>
            <p>For the following study I used a line drawing algorithm that has two functions. It can start lines and continue lines. It chooses where to start lines and how to continue lines based on whether the action increases the activation at the end of a network.</p>
            <div className="col-md-12 text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/boxes/box5.gif"} style={{ height: '64px', width: '64px' }}/>
              <img src={"./imgs/thesis/boxes/box6.gif"} style={{ height: '64px', width: '64px' }}/>
              <img src={"./imgs/thesis/boxes/box7.gif"} style={{ height: '64px', width: '64px' }}/>
              <img src={"./imgs/thesis/boxes/box8.gif"} style={{ height: '64px', width: '64px' }}/>
            </div>
            <br/>
            <p>As a foundation, I used the six kernels shown below as the first layer and a max pool layer as the second layer. All the networks are built on top.</p>
            <div className="imgContainer text-center">
              <img src={"./imgs/thesis/boxes/results/base.png"} style={{ maxWidth: '200px' }} />
            </div>
            <br/>
            <p><b>Results</b>:</p>
            <p>First, I tried matching pairs of vertical and horizontal lines.</p>
            <div className="imgContainer text-center">
              <img src={"./imgs/thesis/boxes/results/box0.png"} style={{ maxWidth: '300px' }} />
            </div>
            <br/>
            <p>Next, I wanted to add <b>size flexibility</b>, so I added width to the receptive areas.</p>
            <div className="imgContainer text-center">
              <img src={"./imgs/thesis/boxes/results/box1.png"} style={{ maxWidth: '300px' }} />
              <img src={"./imgs/thesis/boxes/results/box2.png"} style={{ maxWidth: '300px' }} />
            </div>
            <br/>
            <p>I also wanted the shape to have a <b>continuous line</b>. These boxes were too broken up, so I added receptive areas for the corners at different widths.</p>
            <div className="imgContainer text-center">
              <img src={"./imgs/thesis/boxes/results/box3.png"} style={{ maxWidth: '300px' }} />
              <img src={"./imgs/thesis/boxes/results/box4.png"} style={{ maxWidth: '300px' }} />
              <img src={"./imgs/thesis/boxes/results/box5.png"} style={{ maxWidth: '300px' }} />
            </div>
            <br/>
            <p>These boxes had more continuous lines. The receptive field that is only one pixel wide is starting to look like a box, but it is not flexible.</p>
            <p>I also decided to test different weights for the corners and edges to see how that affected the outcome.</p>
            <div className="imgContainer text-center">
              <img src={"./imgs/thesis/boxes/results/box6.png"} style={{ maxWidth: '300px' }} />
              <img src={"./imgs/thesis/boxes/results/box7.png"} style={{ maxWidth: '300px' }} />
            </div>
            <br/>
            <p>The different weights seemed to give an even cleaner finish.</p>
            <p>I still wanted the shapes to only use a <b>single line</b>. I encountered duplicate lines as I tried to increase the size of their receptive fields to add flexibility. I decided to try adding another layer. Now, I would start with a layer that recognized edges comprising of a wall and two corners. I would have four of these filters and combine them in the next layer to make a box. Here, I tried to add flexibility in the second layer.</p>
            <div className="imgContainer text-center">
              <img src={"./imgs/thesis/boxes/results/box8.png"} style={{ maxWidth: '300px' }} />
              <img src={"./imgs/thesis/boxes/results/box9.png"} style={{ maxWidth: '300px' }} />
            </div>
            <br/>
            <p>After testing the addition of a layer, I was ready to add negative weights to prevent duplicate lines. I tested out different widths at each layer.</p>
            <div className="imgContainer text-center">
              <img src={"./imgs/thesis/boxes/results/box10.png"} style={{ maxWidth: '300px' }} />
              <img src={"./imgs/thesis/boxes/results/box11.png"} style={{ maxWidth: '300px' }} />
              <img src={"./imgs/thesis/boxes/results/box12.png"} style={{ maxWidth: '300px' }} />
            </div>
            <br/>
            <p>I found that sufficient thickness at both layers yield the best result. However, the corners still needed to be cleaned up. To do this, I added a negative backstop behind each edge for the other type of edge.</p>
            <div className="imgContainer text-center">
              <img src={"./imgs/thesis/boxes/results/box13b.png"} style={{ maxWidth: '300px' }} />
            </div>
            <p>The result was a flexible, clean looking box.</p>
            <br/>
            <p><b>Next Steps</b>:</p>
            <p>Can more complex shapes be drawn in the same manner? The next step is to try to make a house.</p>
            <div className="imgContainer text-center">
              <img src={"./imgs/thesis/houses/results/house0.png"} />
            </div>
            <br/>
          </div>
        </div>
      </div>
    </div>
  );
}
