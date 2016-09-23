import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Home.less';
import { LinkContainer } from 'react-router-bootstrap';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="row">
          <div className="col-lg-4">
            <LinkContainer to={{ pathname: '/studyokee' }}>
            <a className="homeLink" href="/#/studyokee">
              <h3>Project: Studyokee</h3>
              <div className="imgContainer">
                <img src={"./imgs/studyokee.jpg"}/>
                <div className="goIcon">⇨</div>
              </div>
            </a>
            </LinkContainer>
            <p>Design and Development for a language learning app using Node.js and Backbone.js</p>
          </div>
          <div className="col-lg-4">
            <LinkContainer to={{ pathname: '/wes' }}>
            <a className="homeLink" href="/#/wes">
              <h3>Project: WES</h3>
              <div className="imgContainer">
                <img src={"./imgs/wes.jpg"}/>
                <div className="goIcon">⇨</div>
              </div>
            </a>
            </LinkContainer>
            <p>Development for a financial literacy app using WordPress</p>
          </div>
          <div className="col-lg-4">
            <LinkContainer to={{ pathname: '/relief' }}>
            <a className="homeLink" href="/#/relief">
              <div className="homeLink">
                <h3>Project: Dynamic Bas-Relief</h3>
                <div className="imgContainer artImg">
                  <img src={"./imgs/sculpturevideo.jpg"}/>
                  <div className="goIcon">⇨</div>
                </div>
              </div>
            </a>
            </LinkContainer>
            <p>Real-time relief sculpture using Processing, Arduino, and 16 servos.</p>
          </div>
        </div>
        <div className="homeLink" className="row">
          <div className="col-lg-4">
            <LinkContainer to={{ pathname: '/paintings' }}>
            <a href="/#/paintings">
              <div className="homeLink">
                <h3>Paintings</h3>
                <div className="imgContainer artImg" style={{ height: '225px' }}>
                  <img src={"./imgs/ballpark.jpg"} style={{ marginTop: '-25px' }}/>
                  <div className="goIcon">⇨</div>
                </div>
              </div>
            </a>
            </LinkContainer>
            <p>Paintings in Watercolor, Gouache, Oil</p>
          </div>
          <div className="col-lg-4">
            <LinkContainer to={{ pathname: '/sculpture' }}>
            <a className="homeLink" href="/#/sculpture">
              <div className="homeLink">
                <h3>Sculpture</h3>
                <div className="imgContainer artImg">
                  <img src={"./imgs/gloria1.jpg"} style={{ marginTop: '-40px' }}/>
                  <div className="goIcon">⇨</div>
                </div>
              </div>
            </a>
            </LinkContainer>
            <p>Sculptures in Plaster, Clay, and Plasticine</p>
          </div>
        </div>
      </div>
    );
  }
}
