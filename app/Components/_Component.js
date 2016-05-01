import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './ValueProposition.less';

export default class extends Component {
  render() {
    return (
        <div className={classnames(className)}></div>
    );
  }
}
