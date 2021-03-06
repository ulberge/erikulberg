import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Sketch.less';
import { LinkContainer } from 'react-router-bootstrap';

export default class Sketch extends Component {
  render() {
    const link = '/ScriptSketch';
    const absoluteLink = '/#' + link;

    return (
      <div className={classnames(className, 'container-fluid projectPage')}>
        <div className="container">
          <div className="detailPageHeader">
            <h2>
              JSON-aided Design&nbsp;&nbsp;<small>2018</small>
            </h2>
            <div>Scripting + CAD</div>
          </div>

          <div className="row">
            <div className="col-md-7">
              <p><b>Description</b>: JSON is a comfortable data format for myself and other programmers. CAD programs can be frustrating to learn. To help myself plan and build a shed, I created this program for frame structures built from 2x4's. </p>
              <p><b>Technologies</b>: React, Three,js, Ace Editor</p>
              <LinkContainer to={{ pathname: link }}>
                <a href={absoluteLink}>Go to sketch app</a>
              </LinkContainer>
              <img src={"./imgs/stills/shed.png"}/>
              <p>Designs with measurments generated by frame designer</p>
            </div>
            <div className="col-md-5">
              <div className="imgContainer">
                <img src={"./imgs/gifs/sketch_large.gif"}/>
              </div>
            </div>
          </div>
        </div>
        <div className="accentRow row">
          <div className="container">
            <h3 className="text-center">Constructed Shed</h3>
            <hr/>
            <p className="text-center">The designs generated with the program were used by a group of friends and family to build this shed on Vashon Island.</p>
            <div className="col-md-3 text-center">
              <img src={"./imgs/stills/shed_under_construction.jpeg"} style={{ maxHeight: '350px', width: 'auto', maxWidth: '100%' }}/>
            </div>
            <div className="col-md-3 text-center">
              <img src={"./imgs/stills/shed_completed.jpeg"} style={{ maxHeight: '350px', width: 'auto', maxWidth: '100%' }}/>
            </div>
            <div className="col-md-6 text-center">
              <img src={"./imgs/stills/shed_team.jpeg"} style={{ maxHeight: '350px', width: 'auto', maxWidth: '100%' }}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
