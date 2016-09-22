import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Home.less';
import { LinkContainer } from 'react-router-bootstrap';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="col-lg-4">
          <a className="homeLink" href="http://studyokee.com" target="_blank">
            <h3>Project: Studyokee</h3>
            <div className="imgContainer">
              <img src={"./imgs/studyokee.jpg"}/>
              <div className="goIcon">⇨</div>
            </div>
          </a>
          <p>Design and Development for a language learning app using Node.js and Backbone.js</p>
        </div>
        <div className="col-lg-4">
          <a className="homeLink" href="http://www.findwes.com" target="_blank">
            <h3>Project: WES</h3>
            <div className="imgContainer">
              <img src={"./imgs/wes.jpg"}/>
              <div className="goIcon">⇨</div>
            </div>
          </a>
          <p>Development for a financial literacy app using WordPress</p>
        </div>
        <div className="col-lg-4">
          <LinkContainer to={{ pathname: '/art' }}>
            <div className="homeLink">
              <h3>Art Work</h3>
              <div className="imgContainer artImg">
                <img src={"./imgs/redshoes.jpg"}/>
                <div className="goIcon">⇨</div>
              </div>
            </div>
          </LinkContainer>
          <p>Sculptures, Drawings and Other Projects</p>
        </div>
      </div>
    );
  }
}
