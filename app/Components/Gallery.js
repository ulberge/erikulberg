import React from 'react';
import Masonry from 'react-masonry-component';
import classnames from 'classnames';

import $ from 'jquery';
import Lightbox from 'react-image-lightbox';
import imagesLoaded from 'imagesloaded';

import { className } from './Gallery.less';

const masonryOptions = {
  transitionDuration: 0
};

module.exports = React.createClass({
  propTypes: {
    images: React.PropTypes.array
  },
  getDefaultProps: function getDefaultProps() {
    return {
      images: []
    };
  },
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
    event.preventDefault();
  },
  closeLightbox: function closeLightbox() {
    this.setState({ isOpen: false });
  },
  moveNext: function moveNext() {
    this.setState({ index: (this.state.index + 1) % this.props.images.length });
  },
  movePrev: function movePrev() {
    this.setState({ index: (this.state.index + this.props.images.length - 1) % this.props.images.length });
  },
  render: function render() {
    const that = this;
    const childElements = this.props.images.map(function map(img, index) {
      return (
        <li key={img.src} className="image-element-class col-md-4 col-md-4 col-sm-6 col-xs-12">
          <span onClick={that.openLightbox} data-index={index}><img src={img.src} /></span>
        </li>
      );
    });

    const zoomSrcs = this.props.images.map(function map(img) {
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

    imagesLoaded($('.' + className), function showImages() {
      $('.' + className + ' img').fadeTo('slow', 1);
    });

    return (
      <div className={classnames(className)}>
        <Masonry
          className={classnames(className, 'my-gallery-class')} // default ''
          elementType={'ul'} // default 'div'
          options={masonryOptions} // default {}
          disableImagesLoaded={false} // default false
          /*eslint-disable */
          updateOnEachImageLoad={true}
          /*eslint-enable */
        >
          {childElements}
        </Masonry>
        {lightbox}
      </div>
    );
  }
});
