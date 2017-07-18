import React from 'react';
import classnames from 'classnames';

import { className } from './Garden.less';

module.exports = React.createClass({
  iframe: function iframe() {
    return {
      __html: '<iframe src="https://www.w3schools.com"></iframe>'
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
