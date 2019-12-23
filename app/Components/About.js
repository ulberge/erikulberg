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
              <p><b>I'm Erik, a software engineer and artist.</b></p>
              <p>I am currently pursuing a Master of Science degree in Computational Design at Carnegie Mellon University. The best way to describe the program is: social sciences for software. We do critical research on technology and how it shapes the world around us.</p>
            </div>
            <div className="col-md-2">
              <img src={'./assets/me.jpeg'} />
            </div>
          </div>
        </div>
    );
  }
}
