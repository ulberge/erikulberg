import React, { Component } from 'react';
import classnames from 'classnames';

import Gallery from './Gallery';

import { className } from './Paintings.less';

const images = [
  { src: './imgs/chickens.jpg', zoom: './imgs/zoom/chickens.jpg' },
  { src: './imgs/stilllife1.jpg', zoom: './imgs/zoom/stilllife1.jpg' }
];

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container')}>
          <div className="row">
            <h2 className="text-center col-md-6 col-md-offset-3">
              Painting
            </h2>
          </div>
          <Gallery images={images}/>
        </div>
    );
  }
}
