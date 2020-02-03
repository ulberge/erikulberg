import React from 'react';

const lineDrawingStyle = { filter: 'opacity(87%)' };
const gifSize = '52px';
const gif1Style = { height: gifSize, width: gifSize, padding: '2px', margin: 0 };
const gif2Style = { height: gifSize, width: gifSize, padding: '4px', margin: 0 };
const gif3Style = { height: gifSize, width: gifSize, padding: '6px', margin: 0 };
const gif4Style = { height: gifSize, width: gifSize, padding: '7px', margin: 0 };

export default function Thesis() {
  return (
    <div className="container-fluid projectPage">
      <div className="container">
        <div className="detailPageHeader">
          <h2>
            Master's Thesis&nbsp;&nbsp;<small>2020</small>
          </h2>
          <div>Crafting the Weights of a CNN to Make a Line Drawing</div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center" style={lineDrawingStyle}>
            <img src={"./imgs/thesis/boxes/gif/box1_0.gif"} style={gif1Style}/>
            <img src={"./imgs/thesis/boxes/gif/box3_0.gif"} style={gif3Style}/>
            <img src={"./imgs/thesis/boxes/gif/box2_0.gif"} style={gif2Style}/>
            <img src={"./imgs/thesis/boxes/gif/box4_0.gif"} style={gif4Style}/>
          </div>
          <div className="col-md-12 text-center" style={lineDrawingStyle}>
            <img src={"./imgs/thesis/boxes/gif/box1_1.gif"} style={gif1Style}/>
            <img src={"./imgs/thesis/boxes/gif/box3_1.gif"} style={gif3Style}/>
            <img src={"./imgs/thesis/boxes/gif/box2_1.gif"} style={gif2Style}/>
            <img src={"./imgs/thesis/boxes/gif/box4_1.gif"} style={gif4Style}/>
          </div>
          <div className="col-md-12 text-center" style={lineDrawingStyle}>
            <img src={"./imgs/thesis/boxes/gif/box1_2.gif"} style={gif1Style}/>
            <img src={"./imgs/thesis/boxes/gif/box3_2.gif"} style={gif3Style}/>
            <img src={"./imgs/thesis/boxes/gif/box2_2.gif"} style={gif2Style}/>
            <img src={"./imgs/thesis/boxes/gif/box4_2.gif"} style={gif4Style}/>
          </div>
          <div className="col-md-12 text-center" style={lineDrawingStyle}>
            <img src={"./imgs/thesis/boxes/gif/box1_3.gif"} style={gif1Style}/>
            <img src={"./imgs/thesis/boxes/gif/box3_3.gif"} style={gif3Style}/>
            <img src={"./imgs/thesis/boxes/gif/box2_3.gif"} style={gif2Style}/>
            <img src={"./imgs/thesis/boxes/gif/box4_3.gif"} style={gif4Style}/>
          </div>
          <div className="col-md-8 col-md-offset-2">
            <p><b>Description</b>:</p>
            <p>This thesis presents a series of web tools for directly crafting the weights of convolutional neural networks (CNNs) to make line drawings. The goal is to make art and to better understand how CNNs encode visual concepts.</p>
            <p><b>Technologies</b>: TensorFlow.js, ReactJS</p>
            <p><b>Code</b>: <a href="https://github.com/ulberge/interactive-network">github.com/ulberge/interactive-network</a></p>
            <p><b>Abstract</b>:</p>
            <p>Recent advances in generative techniques using convolutional neural networks (CNNs), such as GANs and convolutional autoencoders, have enabled data-driven approaches for creating <a href="http://www.aiartonline.com/category/community-2019/" title="AI Art Gallery (NeurIPS 2019)">visual art</a>. However, the representations contained within these deep networks are not well understood and thus creative control is limited to trial and error. In order to further explore the aesthetic potential of CNNs we need to master the basic process of abstraction that occurs within them. This thesis presents an approach to manually crafting and debugging the internal weights of a CNN that recognizes line drawings. It demonstrates a tool and documents a set of recipes for encoding abstract visual concepts.</p>
            <div style={{ maxWidth: '600px', margin: '10px auto' }}>
              <img src={"./imgs/thesis/ridler.jpg"} style={{ width: '32%' }}/>
              <img src={"./imgs/thesis/sarin.jpg"} style={{ width: '32%', marginLeft: '2%' }}/>
              <img src={"./imgs/thesis/neuralglitch.jpg"} style={{ width: '32%', marginLeft: '2%' }}/>
              <small style={{ textAlign: 'left', width: '100%', display: 'inline-block' }}>These are data-driven examples of machine learning art using CNNs. These artists carefully select the training data to determine outcomes. Although Klingemann directly edits the weights at the end of the process to create "glitches." From left to right: <a href="http://annaridler.com/gans-in-art"><i>Fall of the House of Usher</i></a> by Anna Ridler (2017), <a href="https://www.artnome.com/news/2018/11/14/helena-sarin-why-bigger-isnt-always-better-with-gans-and-ai-art" title="Helena Sarin: Why Bigger Isn’t Always Better With GANs And AI Art"><i>Candy Store</i></a> by Helena Sarin (2018), and <a href="http://underdestruction.com/2018/10/28/neural-glitch/"><i>Neural Glitch</i></a> by Mario Klingemann (2018)</small>
            </div>
            <br/>
            <p><b><strike>Machine Learning</strike></b>:</p>
            <p>This project does not actually use machine learning. There is no gradient descent or training of weights. Instead, this project adopts a data structure from machine learning (CNNs) and uses human learning to shape it. The goal is to answer the following question.</p>
            <p><b>Research Question</b>: <i>How are basic visual concepts encoded within convolutional neural networks? Can humans understand and directly craft complete descriptions of basic visual concepts in CNNs?</i></p>
            <p>CNNs are a generic, visual programming language whose low level, spatial representations are conducive to incremental changes by optimization functions and inscrutable to human designers. But maybe, with the right tools and knowledge, they can become pliable. The hope of this project is to uncover a new form of interacting with computational art that bridges the gulf between rule-based and data-driven approaches.</p>
          </div>
        </div>
        <div className="accentRow row">
          <div className="col-md-8 col-md-offset-2">
            <h3 className="text-center">From Pixels -> Line Drawing Features</h3>
            <hr/>
            <p><b>Kernel Tuner</b>:</p>
            <p className="text-left">The kernel tuner is a parametric tool for creating kernels for the first convolutional layer. Inspired by Gabor filters and early CV work, kernels are generated using a Gaussian function and a sine wave. They detect different types of interesting features in a line drawing such as lines, line ends, corners, T, X and Y-intersections.</p>
            <div className="imgContainer text-center">
              <img src={"./imgs/thesis/kerneltuner.gif"} style={{ maxWidth: '600px' }} />
            </div>
            <br/>
            <p><b>Kernel Inspector</b>:</p>
            <p className="text-left">The inspector tool is useful for diagnosing how kernels interact with line drawings. After making a drawing, users can see the top activation at a given point in a color-coded map. When they select a point, a chart shows the top activations at the point and the kernels are displayed as overlays to demonstrate how they are being activated. The inspector can be used simultaneously with the tuner for fine-grained adjusting.</p>
            <div className="imgContainer text-center">
              <img src={"./imgs/thesis/kernelinspector.gif"} style={{ maxWidth: '600px' }}/>
            </div>
            <br/>
            <p className="text-left">The above tools provide the first convolutional layer that translates from pixels to a higher level of abstraction: line drawing features. Users can then build networks on top of this foundation.</p>
          </div>
        </div>
        <div className="accentRow row">
          <div className="col-md-8 col-md-offset-2">
            <h3 className="text-center">Crafting a Network to Make a Line Drawing</h3>
            <hr/>
            <p><b>Drawing a box</b>:</p>
            <p className="text-left">Let's say you want to draw a box. What is a box? You might say a box is a rectangle of flexible size, formed by a single continuous line with no loose ends and squared corners. The corners should be approximately in line with each other. Maybe they look something like the following:</p>
            <div className="imgContainer text-center" style={lineDrawingStyle}>
              <img src={"./imgs/thesis/boxes/box8.png"} style={{ maxWidth: '600px' }} />
            </div>
            <p className="text-left">But how do you acheive this using a CNN?</p>
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
              <img src={"./imgs/thesis/houses/results/house0.png"} style={{ maxWidth: '600px' }} />
            </div>
            <br/>
          </div>
        </div>
      </div>
    </div>
  );
}
