import React from 'react';
import classnames from 'classnames';

import { className } from './CV.less';

module.exports = React.createClass({
  componentDidMount: function componentDidMount() {
    const canvas = document.getElementById('resume');
    canvas.width = '100%';
    canvas.style.maxWidth = '600px';
    function adjustHeight() {
      canvas.height = canvas.contentWindow.document.body.scrollHeight + 100 + 'px';
    }
    adjustHeight();
    canvas.onload = adjustHeight;
  },
  iframe: function iframe() {
    return {
      __html: '<iframe id="resume" src="resume/index.html" frameBorder="0" scrolling="no"></iframe>'
    };
  },
  render() {
    return (
      <div className={classnames(className)}>
        <div dangerouslySetInnerHTML={ this.iframe() } />
      </div>
    );
  }
});
