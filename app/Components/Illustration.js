import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import { className } from './Illustration.less';

module.exports = React.createClass({
  componentDidMount: function componentDidMount() {
    $('#main').css({
      background: 'url(../../imgs/zoom/seadragon.jpg)',
      'background-size': '100%',
      'min-height': '900px'
    });
    $('.navbar .container').css({
      'background-color': 'rgba(255, 255, 255, 0.8)'
    });
    $('.navbar .container .navbar-collapse').css({
      'padding-bottom': '2em'
    });
  },
  componentWillUnmount: function componentWillUnmount() {
    $('#main').css({
      background: '#fff',
      'min-height': 'none'
    });
    $('.navbar .container').css({
      'background-color': 'rgba(255, 255, 255, 0.6)'
    });
    $('.navbar .container .navbar-collapse').css({
      'padding-bottom': '1em'
    });
  },
  render() {
    return (
        <div className={classnames(className, 'container wallpaper')}>
        </div>
    );
  }
});
