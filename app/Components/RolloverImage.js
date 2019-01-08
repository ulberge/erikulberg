import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './RolloverImage.less';

export default class RolloverImage extends Component {
  render() {
    const { alt, img, gif } = this.props;
    return (
        <div className={classnames(className)}>
          <div className="imgContainer artImg still">
            <img src={img} alt={alt}/>
          </div>
          <div className="imgContainer artImg gif">
            <img src={gif ? gif : img} alt={alt}/>
          </div>
        </div>
    );
  }
}
