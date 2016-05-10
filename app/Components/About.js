import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './About.less';

export default class About extends Component {
  render() {
    return (
        <div className={classnames(className, 'container')}>
            <p>Erik Ulberg is a Seattle-based artist focused on painting in watercolor and oil and sculpting in a variety of mediums. He is currently enrolled in the Magrath Sculpture Atelier at Gage Academy of Art and is a part-time web developer and designer from Seattle. </p>

            <img src={'./imgs/me.jpg'} />
            <small>Photo by Chris Ajemian</small>
        </div>
    );
  }
}
