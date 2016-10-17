import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Illustration.less';

import Gallery from './Gallery';

const images = [
  { src: './imgs/seadragon_midsize.jpg', zoom: './imgs/zoom/seadragon.jpg' }
];

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container')}>
          <Gallery images={images}/>
        </div>
    );
  }
}
