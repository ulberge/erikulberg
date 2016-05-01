import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import classnames from 'classnames';

import { className } from './Gallery.less';

const masonryOptions = {
  transitionDuration: 0
};

const images = [
  './imgs/ballpark.jpg',
  './imgs/carl_cigar.jpg',
  './imgs/carl_cigar2.jpg',
  './imgs/chickens.jpg',
  './imgs/cubanfeast.jpg',
  './imgs/cubanrooftop.jpg',
  './imgs/dolores_park.jpg',
  './imgs/falltrees.jpg',
  './imgs/marsh.jpg',
  './imgs/momshouse.jpg',
  './imgs/port.jpg',
  './imgs/redshoes.jpg',
  './imgs/stilllife1.jpg',
  './imgs/tree.jpg',
  './imgs/vashon1.jpg',
  './imgs/vashon2.jpg',
  './imgs/waterfall.jpg'
];

export default class Gallery extends Component {
  render() {
    const childElements = images.map(function map(src) {
      return (
        <li className="image-element-class">
          <img src={src} />
        </li>
      );
    });

    return (
      <Masonry className={classnames(className, 'my-gallery-class')} // default ''
        elementType={'ul'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
      >
        {childElements}
      </Masonry>
    );
  }
}
