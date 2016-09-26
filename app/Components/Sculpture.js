import React, { Component } from 'react';
import classnames from 'classnames';

import Gallery from './Gallery';

import { className } from './Sculpture.less';

const images = [
  { src: './imgs/reliefmeandcarl.jpg', zoom: './imgs/zoom/reliefmeandcarl.jpg' },
  { src: './imgs/gloria1.jpg', zoom: './imgs/zoom/gloria1.jpg' },
  { src: './imgs/gloria2.jpg', zoom: './imgs/zoom/gloria2.jpg' },
  { src: './imgs/7.jpg', zoom: './imgs/7.jpg' },
  { src: './imgs/1.jpg', zoom: './imgs/1.jpg' },
  { src: './imgs/5.jpg', zoom: './imgs/5.jpg' },
  { src: './imgs/9.jpg', zoom: './imgs/9.jpg' }
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
