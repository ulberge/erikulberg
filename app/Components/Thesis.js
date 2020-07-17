import React from 'react';
import classnames from 'classnames';
import { className } from './KernelTuner.less';
import setHead from '../setHead';

const lineDrawingStyle = { filter: 'opacity(87%)' };

export default function Thesis() {
  setHead('Hand-Crafting CNNs for Art-Making',
          'Master\'s thesis exploring hand-crafting CNNs for artists.',
          'https://www.erikulberg.com/#/thesis',
          'https://www.erikulberg.com/imgs/thesis/final/thesis_cover.png');

  return (
    <div className={classnames(className, 'container-fluid projectPage')}>
      <div className="container">
        <div className="detailPageHeader">
          <h2>
            Hand-Crafting CNNs for Art-Making&nbsp;&nbsp;<small>2020</small>
          </h2>
          <div>ML + Art</div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p><b>Description</b>:</p>
            <p>A growing number of visual artists use convolutional neural networks (CNNs) in their practice. While CNNs show promise as a form of representation in <a href="http://www.aiartonline.com/category/community-2019/" title="AI Art Gallery (NeurIPS 2019)" target="_blank">art</a>, the lack of interpretability of CNNs limits creative control to high level decisions around datasets, algorithms, and hyperparameters.</p>
            <p>As an alternative, the field of computer vision presents a more immediate paradigm of control through the hand-crafting of convolutional kernels. <b>This thesis investigates hand-crafting as a creative lever for artists working with CNNs.</b> It reimagines network weights as a continuous, spatial, and computational material supporting direct human interaction.</p>
            <p>Two experimental tools are proposed: one for parametrically generating first layer kernels and the other for editing multiple layers. These tools attempt to transform the hand-crafting of features into “crafting” in a more traditional sense by bringing CNNs and visual materials into a close feedback loop.</p>
            <p>The results are rough-hewn networks. But are they rough-hewn in the negative sense of lacking refinement or the positive sense of being crafted to satisfy a minimum set of functional requirements?</p>
            <p><b>Technologies</b>: TensorFlow.js, ReactJS, p5.js</p>
            <p><b>Demo</b>: <a href="https://ulberge.github.io/interactive-network/" target="_blank">Kernel Tuner</a></p>
            <p><b>Code</b>: <a href="https://github.com/ulberge/interactive-network" target="_blank">github.com/ulberge/interactive-network</a></p>
          </div>
          <div className="col-md-6">
            <div style={{ margin: '30px', width: '80%' }}>
              <div className="imgContainer text-center" style={lineDrawingStyle}>
                <img src={"./imgs/thesis/final/full_canvas_slow.gif"} style={{ marginTop: '10px' }} />
              </div>
              <small className="text-left">A generative algorithm at work using a hand-crafted bottle-detecting network as its reward function.</small>
            </div>
          </div>
        </div>
        <hr/>
        <div className="accentRow row">
          <div className="col-md-8 col-md-offset-2">
            <h3 className="text-center">The Kernel Tuner</h3>
            <hr/>
            <p>The Kernel Tuner is a parametric tool for crafting the first layer of kernels in a CNN to extract basic features from line drawings. It puts the visual material of a line drawing in direct communication with the design of convolutional kernels. The kernels can be exported for use in larger networks.
            </p>
            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/final/image15.png"} style={{ width: '90%', marginTop: '10px' }} />
            </div>
            <small className="text-left">A labeled diagram of the Kernel Tuner, a tool for crafting kernels for the first layer of a CNN.</small>
            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/final/kt.gif"} style={{ width: '80%', marginTop: '40px', marginRight: '5%' }} />
            </div>
            <small className="text-left">Designing a line-end detector using the Kernel Tuner.</small>
            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/final/image12.gif"} style={{ width: '30%', marginTop: '40px' }} />
            </div>
            <small className="text-left">The resulting detector with red dots indicating its dynamic perception of line ends.</small>
          </div>
        </div>
        <div className="accentRow row">
          <div className="col-md-8 col-md-offset-2">
            <h3 className="text-center">The Network Builder</h3>
            <hr/>
            <p>The second tool is called the Network Builder and assists with building a CNN with multiple layers of convolution and pooling. Like the Kernel Tuner, the goal of the tool is to support the creation of these kernels with close attention to a particular visual material. To that end, the Network Builder provides a drawing area and a visualization of a network with respect to that drawing. Drawings can be executed by a human or through a generative algorithm. As lines are drawn or changes are made to kernels, the interactive visualization of the network updates in real time.
            </p>
            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/final/image8.png"} style={{ width: '90%', marginTop: '10px' }} />
            </div>
            <small className="text-left">A labeled diagram of the Network Builder, a tool for crafting multiple layers of a CNN.</small>
            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/final/nb.gif"} style={{ width: '90%', marginTop: '40px' }} />
            </div>
            <small className="text-left">The Network Builder being used to test changes to a line drawing to see how the activations respond.</small>

            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/final/image14.png"} style={{ width: '80%', marginTop: '40px' }} />
            </div>
            <small className="text-left">The rough-hewn weights of a bottle network hand-crafted using the Network Builder (left). A drawing system using the bottle network running on random input (right).</small>

            <div className="imgContainer text-center" style={lineDrawingStyle}>
                <img src={"./imgs/thesis/final/image1.gif"} style={{ width: '30%', marginRight: '5%' }} />
                <img src={"./imgs/thesis/final/bottles.png"} style={{ width: '65%' }} />
              <small className="text-left">The drawing system was run using various composition strategies to generate artworks.</small>
            </div>
          </div>
        </div>
        <div className="accentRow row">
          <div className="col-md-8 col-md-offset-2">
            <h3 className="text-center">Artistic Explorations</h3>
            <hr/>
            <p>The following explorations demonstrate a few of the ways hand-crafted CNNs can be used for art making. The drawing system uses a network crafted with the Network Builder as its guiding reward function and a line end detector designed with the Kernel Tuner to help it narrow the search space of places to start new lines.
            </p>
            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/final/image7.gif"} style={{ width: '40%', marginTop: '10px' }} />
            </div>
            <small className="text-left">Animations of composition algorithms combining multiple bottle drawing systems.</small>
            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/final/full_canvas_build.gif"} style={{ width: '40%', marginTop: '10px' }} />
            </div>
            <small className="text-left">Animations of composition algorithms combining multiple bottle drawing systems.</small>
            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/final/image6.png"} style={{ maxWidth: '600px', width: '80%', marginTop: '40px' }} />
            </div>
            <small className="text-left">A bottle texture generated with the drawing system, printed out and hand-painted.</small>
            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/final/image17.gif"} style={{ width: '90%', marginTop: '10px' }} />
            </div>
            <small className="text-left">The bottle drawing system run on Jackson Pollock's Autumn Rhythm (Number 30).</small>
            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/final/image2.png"} style={{ width: '90%', marginTop: '40px' }} />
            </div>
            <small className="text-left">The result of running the system on Pollock's piece after the background painting was removed.</small>
            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/final/image4.gif"} style={{ width: '40%', marginTop: '10px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
