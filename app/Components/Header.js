import React, { Component } from 'react';
import classnames from 'classnames';
import jQuery from 'jquery';

import { className } from './Header.less';

export default class Header extends Component {
  render() {
    return (
      <div className={classnames(className)}>
        <h1>Erik Ulberg</h1>
      </div>
    );
  }
}
