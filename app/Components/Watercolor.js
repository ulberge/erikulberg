import React, { Component } from 'react';
import classnames from 'classnames';

import Gallery from './Gallery';

import { className } from './Paintings.less';

const images = [
  { src: './imgs/seadragon_midsize.jpg', zoom: './imgs/zoom/seadragon.jpg' },
  { src: './imgs/port.jpg', zoom: './imgs/zoom/port.jpg' },
  { src: './imgs/waterfall.jpg', zoom: './imgs/zoom/waterfall.jpg' },
  { src: './imgs/ballpark.jpg', zoom: './imgs/zoom/ballpark.jpg' },
  { src: './imgs/carl_cigar.jpg', zoom: './imgs/zoom/carl_cigar.jpg' },
  { src: './imgs/cuba.jpg', zoom: './imgs/zoom/cuba.jpg' },
  { src: './imgs/falltrees.jpg', zoom: './imgs/zoom/falltrees.jpg' },
  { src: './imgs/dolores_park.jpg', zoom: './imgs/zoom/dolores_park.jpg' },
  { src: './imgs/momshouse.jpg', zoom: './imgs/zoom/momshouse.jpg' },
  { src: './imgs/vashon1.jpg', zoom: './imgs/zoom/vashon1.jpg' },
  { src: './imgs/vashon2.jpg', zoom: './imgs/zoom/vashon2.jpg' },
  { src: './imgs/marsh.jpg', zoom: './imgs/zoom/marsh.jpg' },
  { src: './imgs/cubanrooftop.jpg', zoom: './imgs/zoom/cubanrooftop.jpg' },
  { src: './imgs/goldengardens.jpg', zoom: './imgs/zoom/goldengardens.jpg' },
  { src: './imgs/ballarddocks.jpg', zoom: './imgs/zoom/ballarddocks.jpg' },
  { src: './imgs/wineandoil.jpg', zoom: './imgs/zoom/wineandoil.jpg' },
  { src: './imgs/redshoes.jpg', zoom: './imgs/zoom/redshoes.jpg' }
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
