import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './About.less';

export default class About extends Component {
  render() {
    return (
        <div className={classnames(className, 'container')}>
          <div>
            <h2 className="text-center">About</h2>
            <hr/>
            <div className="col-md-6 col-md-offset-2 text-justify">
              <p><b></b></p>
              <p>I'm Erik, a software engineer, researcher, and artist exploring new forms of interaction involving machine learning, computer vision, perception, and visual information.</p>
            </div>
            <div className="col-md-2">
              <img src={'./assets/me.jpeg'} />
            </div>
          </div>
        </div>
    );
  }
}
