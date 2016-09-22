import React, { Component } from 'react';
import classnames from 'classnames';

import Gallery from './Gallery';

import { className } from './Art.less';

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container')}>
          <Gallery />
        </div>
    );
  }
}
