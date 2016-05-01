import React, { Component } from 'react';
import classnames from 'classnames';

import Gallery from './Gallery';

import { className } from './Home.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, '')}>
        <Gallery />
      </div>
    );
  }
}
