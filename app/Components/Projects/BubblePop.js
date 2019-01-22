import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import { className } from './BubblePop.less';

module.exports = React.createClass({
  componentDidMount: function componentDidMount() {
    const project = $('#iframe');
    project.width('100%');
    project.height(project.width() * 0.66);
    project.focus();
  },
  iframe: function iframe() {
    return {
      __html: '<iframe id="iframe" src="/projects/bubblePop/index.html" frameBorder="0" scrolling="no"></iframe>'
    };
  },
  render() {
    return (
      <div className={classnames(className, 'container-fluid projectPage')}>
        <div className="container">
          <div className="detailPageHeader">
            <h2>
              Bubble Pop&nbsp;&nbsp;<small>2019</small>
            </h2>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div style={{ paddingTop: '10px' }}>
                <div dangerouslySetInnerHTML={ this.iframe() } />
                <div className="iframeOverlap"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
