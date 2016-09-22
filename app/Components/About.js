import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './About.less';

export default class About extends Component {
  render() {
    return (
        <div className={classnames(className, 'container')}>
          <div className="imgContainer">
            <img src={'./imgs/me.jpg'} />
            <small>Photo by Chris Ajemian</small>
          </div>
          <p>Erik Ulberg is a Seattle-based web developer and artist.</p>
        </div>
    );
  }
}
