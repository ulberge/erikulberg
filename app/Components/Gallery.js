import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import classnames from 'classnames';

import { className } from './Gallery.less';

const masonryOptions = {
  transitionDuration: 0
};

const images = [
  './imgs/vashon2.jpg',
  './imgs/marsh.jpg',
  './imgs/port.jpg',
  './imgs/waterfall.jpg',
  './imgs/carl_cigar2.jpg',
  './imgs/ballpark.jpg',
  './imgs/chickens.jpg',
  './imgs/tree.jpg',
  './imgs/vashon1.jpg',
  './imgs/carl_cigar.jpg',
  './imgs/cubanfeast.jpg',
  './imgs/cubanrooftop.jpg',
  './imgs/falltrees.jpg',
  './imgs/redshoes.jpg',
  './imgs/stilllife1.jpg',
  './imgs/momshouse.jpg',
  './imgs/dolores_park.jpg'
];

export default class Gallery extends Component {
  render() {
    const childElements = images.map(function map(src) {
      return (
        <li className="image-element-class col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <img src={src} />
        </li>
      );
    });

    return (
      <Masonry className={classnames(className, 'my-gallery-class container')} // default ''
        elementType={'ul'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
      >
        {childElements}
      </Masonry>
    );
  }
}
