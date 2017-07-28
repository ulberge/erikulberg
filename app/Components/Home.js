import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Home.less';
import { LinkContainer } from 'react-router-bootstrap';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="row">
          <h2 className="text-center col-lg-12">Art and programming projects by Erik Ulberg using Javascript, Arduino, watercolor, clay, etc.</h2>
        </div>
        <div className="row">

          <div className="col-lg-4">
            <LinkContainer to={{ pathname: '/garden' }}>
            <a className="homeLink" href="/#/garden">
              <div className="homeLink">
                <h3>Garden Generator</h3>
                <div className="imgContainer artImg">
                  <img src={"./imgs/gardenScrnsht.png"} style={{ marginTop: '0px' }} alt="Garden Generator by Erik Ulberg"/>
                  <div className="goIcon">⇨</div>
                </div>
              </div>
            </a>
            </LinkContainer>
            <p>3D plant arrangements with ThreeJS</p>
          </div>

          <div className="col-lg-4">
            <LinkContainer to={{ pathname: '/studyokee' }}>
            <a className="homeLink" href="/#/studyokee">
              <h3>Studyokee</h3>
              <div className="imgContainer">
                <img src={"./imgs/studyokee.jpg"} alt="Studyokee by Erik Ulberg"/>
                <div className="goIcon">⇨</div>
              </div>
            </a>
            </LinkContainer>
            <p>A language learning through karaoke web app using Node.js and Backbone.js</p>
          </div>

          <div className="col-lg-4">
            <LinkContainer to={{ pathname: '/kingfisher' }}>
            <a className="homeLink" href="/#/kingfisher">
              <div className="homeLink">
                <h3>Kingfisher</h3>
                <div className="imgContainer artImg">
                  <img src={"./imgs/kingfisherScrnsht.jpg"} style={{ marginTop: '0px' }} alt="Kingfisher by Erik Ulberg"/>
                  <div className="goIcon">⇨</div>
                </div>
              </div>
            </a>
            </LinkContainer>
            <p>2D Action Game built with Processing.js</p>
          </div>

        </div>
        <div className="homeLink" className="row">

          <div className="col-lg-4">
            <LinkContainer to={{ pathname: '/relief' }}>
            <a className="homeLink" href="/#/relief">
              <div className="homeLink">
                <h3>Real-Time Bas-Relief</h3>
                <div className="imgContainer artImg">
                  <img src={"./imgs/sculpturevideo.jpg"} style={{ marginTop: '-40px' }} alt="Real-Time Bas-Relief by Erik Ulberg"/>
                  <div className="goIcon">⇨</div>
                </div>
              </div>
            </a>
            </LinkContainer>
            <p>Dynamic relief sculpture using Processing, Arduino, and 16 servos.</p>
          </div>

          <div className="col-lg-4">
            <LinkContainer to={{ pathname: '/paintings' }}>
            <a href="/#/paintings">
              <div className="homeLink">
                <h3>Paintings</h3>
                <div className="imgContainer artImg" style={{ height: '225px' }}>
                  <img src={"./imgs/ballpark.jpg"} style={{ marginTop: '-25px' }} alt="Paintings by Erik Ulberg"/>
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
                  <img src={"./imgs/gloria1.jpg"} style={{ marginTop: '-60px' }} alt="Sculpture by Erik Ulberg"/>
                  <div className="goIcon">⇨</div>
                </div>
              </div>
            </a>
            </LinkContainer>
            <p>Sculptures in Plaster, Clay, and Plasticine</p>
          </div>

        </div>

        <div className="homeLink" className="row">

          <div className="col-lg-4">
            <LinkContainer to={{ pathname: '/wes' }}>
            <a className="homeLink" href="/#/wes">
              <h3>Wealth Education Solutions</h3>
              <div className="imgContainer">
                <img src={"./imgs/wes.jpg"} alt="WES Development by Erik Ulberg"/>
                <div className="goIcon">⇨</div>
              </div>
            </a>
            </LinkContainer>
            <p>Development for a financial literacy app using WordPress</p>
          </div>

          <div className="col-lg-4">
            <LinkContainer to={{ pathname: '/illustration' }}>
            <a className="homeLink" href="/#/illustration">
              <div className="homeLink">
                <h3>Illustrations</h3>
                <div className="imgContainer artImg">
                  <img src={"./imgs/seadragon_close.jpg"} style={{ marginTop: '-100px' }} alt="Illustration by Erik Ulberg"/>
                  <div className="goIcon">⇨</div>
                </div>
              </div>
            </a>
            </LinkContainer>
            <p>Illustrations using watercolor and conté.</p>
          </div>

        </div>
      </div>
    );
  }
}
