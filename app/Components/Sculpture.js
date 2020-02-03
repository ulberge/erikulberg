import React, { Component } from 'react';
import classnames from 'classnames';

import Gallery from './Gallery';

import { className } from './Sculpture.less';

const images = [
  { src: './imgs/kubota.jpg', zoom: './imgs/kubota.jpg' },
  { src: './imgs/reliefmeandcarl.jpg', zoom: './imgs/zoom/reliefmeandcarl.jpg' },
  { src: './imgs/gloria.jpg', zoom: './imgs/gloria.jpg' },
  { src: './imgs/7.jpg', zoom: './imgs/7.jpg' },
  { src: './imgs/9.jpg', zoom: './imgs/9.jpg' }
];

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container')}>
          <div className="row">
            <h2 className="text-center col-md-6 col-md-offset-3">
              Sculpture
            </h2>
          </div>
          <Gallery images={images}/>
        </div>
    );
  }
}
