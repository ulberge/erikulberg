import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class CollageMaker extends Component {
  render() {
    return (
      <div className="container-fluid projectPage">
        <div className="container">
          <div className="detailPageHeader">
            <h2>
              Wood Grain Collage Maker&nbsp;&nbsp;<small>2019</small>
            </h2>
            <div>Collage + Fabric.js</div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <p><b>Description</b>: The Wood Grain Collage Maker is a web-based tool (built with ReactJS, Fabric.js, and P5.js) for planning a collage using the grain in a piece of wood and a sketch. It allows users to drag, rotate, and scale selections and placements of wood to construct a collage. Once finished, the user can export the cut and layout files to make the collage IRL. </p>
              <p><b>Technologies</b>: ReactJS, Fabric.js, P5.js</p>
              <div style={{ margin: '20px 0' }}>
                <a href="/projects/collageMaker/index.html" target="_blank" className="btn btn-info">Full Screen Version <FontAwesome name="external-link" /></a>
              </div>
              <img src={"./imgs/stills/collage/scrn.jpg"}/>
              <p>Example collages</p>
            </div>
            <div className="col-md-6">
              <div className="imgContainer">
                <img src={"./imgs/stills/collage/start.gif"}/>
              </div>
              <div>
                <img src={"./imgs/stills/collage/render_all.jpg"}/>
              </div>
            </div>
          </div>
        </div>
        <div className="accentRow row">
          <div className="container">
            <h3 className="text-center">Process</h3>
            <hr/>
            <p>Starting with a piece of wood with visible grain and a sketch, a collage is made with the tool. The tool produces cut and layout images that can be used to produce the piece.</p>
            <div className="col-md-4">
                <img src={"./imgs/stills/collage/wood.jpg"}/>
                <p>Board of pine wood</p>
                <img src={"./imgs/stills/collage/base.jpg"}/>
                <p>A sketch</p>
            </div>
            <div className="col-md-5">
              <img src={"./imgs/stills/collage/step.jpg"} style={{ maxHeight: '350px', width: 'auto', maxWidth: '100%' }}/>
              <p>Use the Wood Grain Collage Maker to produce a collage</p>
              <img src={"./imgs/stills/collage/trace.jpeg"} style={{ maxHeight: '350px', width: 'auto', maxWidth: '100%' }}/>
              <p>Tracing out the cuts to be jigsawed. The red marks show the overlap, which also needs to be cut.</p>
            </div>
            <div className="col-md-3">
              <img src={"./imgs/stills/collage/render.jpg"}/>
              <p>Layout file</p>
              <img src={"./imgs/stills/collage/final.jpg"}/>
              <p>Final piece glued together and sealed with Tung Oil</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
