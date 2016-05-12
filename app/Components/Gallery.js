import React from 'react';
import Masonry from 'react-masonry-component';
import classnames from 'classnames';

import Lightbox from 'react-image-lightbox';

import { className } from './Gallery.less';

const masonryOptions = {
  transitionDuration: 0
};

const images = [
  { src: './imgs/vashon2.jpg', zoom: './imgs/vashon2.jpg' },
  { src: './imgs/marsh.jpg', zoom: './imgs/marsh.jpg' },
  { src: './imgs/port.jpg', zoom: './imgs/port.jpg' },
  { src: './imgs/waterfall.jpg', zoom: './imgs/waterfall.jpg' },
  { src: './imgs/carl_cigar2.jpg', zoom: './imgs/carl_cigar2.jpg' },
  { src: './imgs/ballpark.jpg', zoom: './imgs/ballpark.jpg' },
  { src: './imgs/chickens.jpg', zoom: './imgs/chickens.jpg' },
  { src: './imgs/tree.jpg', zoom: './imgs/tree.jpg' },
  { src: './imgs/vashon1.jpg', zoom: './imgs/vashon1.jpg' },
  { src: './imgs/carl_cigar.jpg', zoom: './imgs/carl_cigar.jpg' },
  { src: './imgs/cubanfeast.jpg', zoom: './imgs/cubanfeast.jpg' },
  { src: './imgs/cubanrooftop.jpg', zoom: './imgs/cubanrooftop.jpg' },
  { src: './imgs/falltrees.jpg', zoom: './imgs/falltrees.jpg' },
  { src: './imgs/redshoes.jpg', zoom: './imgs/redshoes.jpg' },
  { src: './imgs/stilllife1.jpg', zoom: './imgs/stilllife1.jpg' },
  { src: './imgs/momshouse.jpg', zoom: './imgs/momshouse.jpg' },
  { src: './imgs/dolores_park.jpg', zoom: './imgs/dolores_park.jpg' }
];

module.exports = React.createClass({
  getInitialState: function getInitialState() {
    return {
      index: 0,
      isOpen: false
    };
  },
  openLightbox: function openLightbox() {
    this.setState({ isOpen: true });
  },
  closeLightbox: function closeLightbox() {
    this.setState({ isOpen: false });
  },
  moveNext: function moveNext() {
    this.setState({ index: (this.state.index + 1) % images.length });
  },
  movePrev: function movePrev() {
    this.setState({ index: (this.state.index + images.length - 1) % images.length });
  },
  render: function render() {
    const that = this;
    const childElements = images.map(function map(img) {
      return (
        <li key={img.src} className="image-element-class col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <a onClick={that.openLightbox} href="#" zoomSrc={img.zoom}><img src={img.src} /></a>
        </li>
      );
    });

    const zoomSrcs = images.map(function map(img) {
      return img.zoom;
    });
    let lightbox = '';
    if (this.state.isOpen) {
      lightbox = (<Lightbox
        mainSrc={zoomSrcs[this.state.index]}
        nextSrc={zoomSrcs[(this.state.index + 1) % zoomSrcs.length]}
        prevSrc={zoomSrcs[(this.state.index + zoomSrcs.length - 1) % zoomSrcs.length]}

        onCloseRequest={this.closeLightbox}
        onMovePrevRequest={this.movePrev}
        onMoveNextRequest={this.moveNext}
      />);
    }

    return (
      <div className={classnames(className)}>
        <Masonry className={classnames(className, 'my-gallery-class')} // default ''
          elementType={'ul'} // default 'div'
          options={masonryOptions} // default {}
          disableImagesLoaded={false} // default false
        >
          {childElements}
        </Masonry>
        {lightbox}
      </div>
    );
  }
});
