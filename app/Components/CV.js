import React from 'react';
import classnames from 'classnames';

import { className } from './CV.less';

module.exports = React.createClass({
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <iframe src="https://docs.google.com/document/d/e/2PACX-1vQSkgIHRCQGXRGsHEkU7NaEQEtipXeCFsfD_cgjF4bZIm_q2_me50vwNSJYaS5se3WPsmOSZLjKU-5W/pub?embedded=true"></iframe>
      </div>
    );
  }
});
