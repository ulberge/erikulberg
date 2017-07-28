import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import { className } from './Garden.less';

module.exports = React.createClass({
  componentDidMount: function componentDidMount() {
    const garden = $('#gardenIframe');
    garden.width('100%');
    garden.height(window.innerHeight);
    garden.focus();
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
