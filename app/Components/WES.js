import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './WES.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
          <h2 className="text-center">Project: WES</h2>
          <div className="row">
            <div className="col-lg-6">
              <p><b>Website</b>: <a href="http://www.findwes.com/">www.findwes.com</a></p>
              <p><b>Front End</b>: JavaScript, jQuery, Bootstrap, LESS, RequireJS</p>
              <p><b>Server</b>: WordPress, PHP, MySQL</p>
              <p><b>Tools/Ops</b>: Grunt, Bower, npm</p>
              <p><b>Plugins</b>: Advanced Custom Fields</p>
              <h3>Features:</h3>
              <ul>
                <li>Custom Objects</li>
                <li>User Data</li>
              </ul>
            </div>
            <div className="col-lg-6">
              <a className="homeLink" href="http://www.findwes.com" target="_blank">
                <div className="imgContainer">
                  <img src={"./imgs/wes.jpg"}/>
                </div>
              </a>
            </div>
          </div>
        </div>
    );
  }
}
