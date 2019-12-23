import React, { Component } from 'react';

export default class SketchRepeat extends Component {
  render() {
    return (
      <div className="container-fluid projectPage">
        <div className="container">
          <div className="detailPageHeader">
            <h2>
              Sketch Repeater&nbsp;&nbsp;<small>2019</small>
            </h2>
            <div>Sketching + ML</div>
          </div>

          <div className="row">
            <div className="col-md-7">
              <p><b>Description</b>:</p>
              <p>Open-ended sketching helps to explore or create new ideas. While AI systems such as <a href="https://magenta.tensorflow.org/assets/sketch_rnn_demo/index.html">sketch-rnn</a> and <a href="http://vision.cs.utexas.edu/projects/shadowdraw/shadowdraw.html">ShadowDraw</a> can support sketching with clear goals, their prediction and auto-completion are limited to classes in their datasets. Open-ended sketching remains difficult to support because a goal is required to narrow the infinite search space of suggestions.</p>
              <p>This project presents an interactive drawing tool that provides suggestions by extrapolating the user's previous action. It makes the strong assumption that the user will want to semantically repeat their actions. The goal of the tool is to "play along" with the designer as they move towards an undefined goal. The hope is that the designer finds the AI suggestions useful and inspiring.</p>
              <p><b>Technologies</b>: TensorFlow, Spotify ANNOY, Python, JS</p>
              <p><b>Code</b>: <a href="https://github.com/ulberge/SketchRepeater">github.com/ulberge/SketchRepeater</a></p>
              <img src={"./imgs/stills/sketchrepeat_examples1.png"}/>
              <img src={"./imgs/stills/sketchrepeat_examples2.png"}/>
              <small>The AI suggestions are most relevant in images of patterns or repetitive landscapes.  In these examples, the human marks are in orange and AI marks are in blue.</small>
            </div>
            <div className="col-md-5">
              <div className="imgContainer">
                <img src={"./imgs/gifs/sketchrepeat2.gif"}/>
                <small className="text-left">A debug view to demonstrate functionality. The user draws in the top center. AI suggestions appear in the four canvases below.</small>
              </div>
              <br/>
              <div className="imgContainer">
                <img src={"./imgs/gifs/sketchrepeat1.gif"}/>
                <small className="text-left">If the user selects an AI mark suggestion, it is added as the next mark and new suggestions are fetched.</small>
              </div>
            </div>
          </div>
        </div>
        <div className="accentRow row">
          <div className="container">
            <h3 className="text-center">How it works</h3>
            <hr/>
            <p>When a user makes a mark, the system records the mark, the state of the canvas at its location before the mark, and the state after the mark. The before state is matched to other areas in the current canvas and the mark is matched to a corpus of chopped up human sketches (from the <a href="http://cybertron.cg.tu-berlin.de/eitz/projects/classifysketch/">TU Berlin dataset</a> and the <a href="https://quickdraw.withgoogle.com/data">Google "Quick, Draw" dataset</a>). These matches are used to generate suggestions which are compared to the after state. The best suggestions are sent back and displayed.</p>
            <p>Matching happens at different levels of abstraction by matching activations at different layers of a pre-trained <a href="http://sketchx.eecs.qmul.ac.uk/downloads/">Sketch-A-Net</a>"model_without_order_info_224.matmodel_without_order_info_224.mat" convolutional neural network. </p>
            <div className="imgContainer" className="text-center">
              <img src={"./imgs/stills/ballontri.png"} style={{ maxHeight: '350px', width: 'auto', maxWidth: '100%' }}/>
            </div>
            <p>The designer has just added a circle on top of the triangle. The “before”, mark, and “after” images can be seen on the right. The AI suggestions are displayed below along with their “before”, mark, and “after” images. The AIs take the mark and the location of the match and use an agent-based algorithm to draw something similar to the mark in a matching style.</p>
          </div>
        </div>
      </div>
    );
  }
}
