import React, { Component } from 'react';

export default class MLDraw extends Component {
  render() {
    return (
      <div className="container-fluid projectPage">
        <div className="container">
          <div className="detailPageHeader">
            <h2>
              A Conversation with a Machine&nbsp;&nbsp;<small>2019</small>
            </h2>
            <div>CV + ML</div>
          </div>

          <div className="row">
            <div className="col-md-7">
              <p><b>Description</b>: A conversational interaction with the hidden layers of a deep learning model about a drawing. As an artist draws a dog, a machine gives friendly suggestions and acknowledgement about what parts are missing, have recently been improved, or seem fully drawn. It provides text mixed with visualization icons as well as continuous feedback in the form of a colorful bar graph.</p>
              <p>Inspired by ideas and code from <a href="https://distill.pub/2018/building-blocks/">“The Building Blocks of Interpretability.”</a> by Olah et al.</p>
              <p><b>Technologies</b>: Python, JS, TensorFlow, InceptionV1, Flask, Charts.js</p>
              <br />
              <video controls>
                <source src={"./imgs/stills/mldraw/vid.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="col-md-5">
              <div>
                <img src={"./imgs/stills/mldraw/sampleui.png"}/>
                <p>Sample of the types of information provided by the UI</p>
              </div>
              <div className="imgContainer">
                <img src={"./imgs/stills/mldraw/showwhole.jpg"}/>
                <p>Machine setup at exhibition</p>
              </div>
            </div>
          </div>
        </div>
        <div className="accentRow row">
          <div className="container">
            <h3 className="text-center">Details</h3>
            <hr/>
            <div className="col-md-5 col-md-offset-1">
              <p>This project investigates the question, “Can the hidden layers help us to develop a deeper understanding of the world?”</p>
              <p>We can often say what something is or whether we like it or not. However, it is more difficult to explain why. We can say, “This is a Labrador retriever.” But how did we come to that conclusion? If we were forced to articulate it (for example in a drawing) we would have trouble.</p>
              <p>Can the hidden layers in machine learning assist us in articulating our subconscious?</p>
              <p>This machine’s understanding of the world is based on the hidden layers of a deep learning model. The model was originally trained to classify whole entities in photos, such as “Labrador retriever” or “tennis ball.” During this process, the hidden layers end up representing abstract concepts. The model creates its own understanding of “ears,” “snouts,” “legs,” etc. We have co-opted the model to communicate about dog body parts in half-finished sketches.</p>
              <p>This project uses a pre-trained version of Google’s InceptionV1 (trained on ImageNet) to calculate how much a channel of neurons in the mixed4d layer causes an image to be labeled as a Labrador retriever. This attribution is compared across frames and against complete drawings of dogs. Using this information, the machine talks about what dog parts seem to be missing, to be recently improved, or to be fully fleshed out.</p>
            </div>
            <div className="col-md-5">
                <img src={"./imgs/stills/mldraw/showcloseup.png"}/>
                <p>A visitor drawing with the machine</p>
                <img src={"./imgs/stills/mldraw/showdrawings.jpg"}/>
                <p>Sketches made by visitors with the machine</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
