import React, { Component } from 'react';
import classnames from 'classnames';

import Gallery from './Gallery';

import { className } from './Art.less';

const images = [
  { src: './imgs/ballarddocks.jpg', zoom: './imgs/zoom/ballarddocks.jpg' },
  { src: './imgs/wineandoil.jpg', zoom: './imgs/zoom/wineandoil.jpg' },
  { src: './imgs/goldengardens.jpg', zoom: './imgs/zoom/goldengardens.jpg' },
  { src: './imgs/vashon2.jpg', zoom: './imgs/zoom/vashon2.jpg' },
  { src: './imgs/marsh.jpg', zoom: './imgs/zoom/marsh.jpg' },
  { src: './imgs/port.jpg', zoom: './imgs/zoom/port.jpg' },
  { src: './imgs/waterfall.jpg', zoom: './imgs/zoom/waterfall.jpg' },
  { src: './imgs/carl_cigar2.jpg', zoom: './imgs/zoom/carl_cigar2.jpg' },
  { src: './imgs/ballpark.jpg', zoom: './imgs/zoom/ballpark.jpg' },
  { src: './imgs/chickens.jpg', zoom: './imgs/zoom/chickens.jpg' },
  { src: './imgs/tree.jpg', zoom: './imgs/zoom/tree.jpg' },
  { src: './imgs/vashon1.jpg', zoom: './imgs/zoom/vashon1.jpg' },
  { src: './imgs/carl_cigar.jpg', zoom: './imgs/zoom/carl_cigar.jpg' },
  { src: './imgs/cubanfeast.jpg', zoom: './imgs/zoom/cubanfeast.jpg' },
  { src: './imgs/cubanrooftop.jpg', zoom: './imgs/zoom/cubanrooftop.jpg' },
  { src: './imgs/falltrees.jpg', zoom: './imgs/zoom/falltrees.jpg' },
  { src: './imgs/redshoes.jpg', zoom: './imgs/zoom/redshoes.jpg' },
  { src: './imgs/stilllife1.jpg', zoom: './imgs/zoom/stilllife1.jpg' },
  { src: './imgs/momshouse.jpg', zoom: './imgs/zoom/momshouse.jpg' },
  { src: './imgs/dolores_park.jpg', zoom: './imgs/zoom/dolores_park.jpg' }
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
