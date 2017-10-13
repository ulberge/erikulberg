import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './WES.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container projectPage')}>
        <h2>Wealth Education Solutions, 2015-2017</h2>
        <div className="row">
          <div className="col-md-12">
            <h3>Project Description</h3>
          </div>
          <div className="col-md-6">
            <p>I built a web application to teach financial education for a client using WordPress.</p>
            <p><b>Website</b>: <a href="http://www.findwes.com/" target="_blank">www.findwes.com</a></p>
            <p><b>Front End</b>: JavaScript, jQuery, Bootstrap, LESS</p>
            <p><b>Server</b>: WordPress, PHP, MySQL</p>
            <p><b>Tools/Ops</b>: Grunt, Bower, npm</p>
            <p><b>Plugins</b>: Advanced Custom Fields</p>
            <h3>Features:</h3>
            <ul>
              <li>Custom Objects</li>
              <li>User Data</li>
            </ul>
          </div>
          <div className="col-md-6">
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
