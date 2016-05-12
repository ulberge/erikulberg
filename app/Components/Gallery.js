import React from 'react';
import Masonry from 'react-masonry-component';
import classnames from 'classnames';

import Lightbox from 'react-image-lightbox';

import { className } from './Gallery.less';

const masonryOptions = {
  transitionDuration: 0
};

const images = [
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

module.exports = React.createClass({
  getInitialState: function getInitialState() {
    return {
      index: 0,
      isOpen: false
    };
  },
  openLightbox: function openLightbox(event) {
    this.setState({
      isOpen: true,
      index: parseInt(event.currentTarget.getAttribute('data-index'), 10)
    });
    setTimeout(function setBackground() {
      document.querySelector('#react-image-lightbox-portal .toolbar').style.backgroundColor = 'transparent';
    }, 0);
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
    const childElements = images.map(function map(img, index) {
      return (
        <li key={img.src} className="image-element-class col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <a onClick={that.openLightbox} href="#" data-index={index}><img src={img.src} /></a>
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
