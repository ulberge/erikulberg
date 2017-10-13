import React, { Component } from 'react';
import classnames from 'classnames';

import Gallery from './Gallery';

import { className } from './Art.less';

const images = [
  { src: './imgs/port.jpg', zoom: './imgs/zoom/port.jpg' },
  { src: './imgs/waterfall.jpg', zoom: './imgs/zoom/waterfall.jpg' },
  { src: './imgs/ballpark.jpg', zoom: './imgs/zoom/ballpark.jpg' },
  { src: './imgs/chickens.jpg', zoom: './imgs/zoom/chickens.jpg' },
  { src: './imgs/carl_cigar.jpg', zoom: './imgs/zoom/carl_cigar.jpg' },
  { src: './imgs/cubanfeast.jpg', zoom: './imgs/zoom/cubanfeast.jpg' },
  { src: './imgs/falltrees.jpg', zoom: './imgs/zoom/falltrees.jpg' },
  { src: './imgs/dolores_park.jpg', zoom: './imgs/zoom/dolores_park.jpg' }
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
