import React from 'react';
import classnames from 'classnames';

import { className } from './Garden.less';

module.exports = React.createClass({
  componentDidMount: function componentDidMount() {
    const navbar = document.getElementsByClassName('navbar');
    navbar[0].style.display = 'none';
    const footer = document.getElementsByClassName('footer');
    footer[0].style.display = 'none';
    const canvas = document.getElementById('gardenIframe');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.focus();
  },
  iframe: function iframe() {
    return {
      __html: '<iframe id="gardenIframe" src="gardenGenerator/index.html" frameBorder="0" scrolling="no"></iframe>'
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
