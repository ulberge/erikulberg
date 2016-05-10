import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Contact.less';

export default class Contact extends Component {
  render() {
    return (
        <div className={classnames(className, 'container')}>
            e: ulberge@gmail.com
        </div>
    );
  }
}
