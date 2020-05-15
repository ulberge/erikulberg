import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Tile.less';
import { LinkContainer } from 'react-router-bootstrap';
import RolloverImage from './RolloverImage.js';

export default class extends Component {
  render() {
    const { alt, img, gif, absoluteLink, link, year, subtitle, title, styleName } = this.props;

    if (absoluteLink) {
      return (
        <div className={classnames(className, styleName)}>
          <div>
            <a href={absoluteLink} target="_blank">
              <RolloverImage img={img} gif={gif} alt={alt} />
            </a>
          </div>
          <div className="tileBottom">
            <h3>
              <a href={absoluteLink}>{title}</a>
              <small>{year}</small>
            </h3>
            <span>{subtitle}</span>
          </div>
        </div>
      )
    }

    return (
        <div className={classnames(className, styleName)}>
            <div>
              <LinkContainer to={{ pathname: link }}>
              <a href={'/#' + link}>
                <RolloverImage img={img} gif={gif} alt={alt} />
              </a>
              </LinkContainer>
            </div>
            <div className="tileBottom">
              <h3>
                <LinkContainer to={{ pathname: link }}>
                  <a href={'/#' + link}>{title}</a>
                </LinkContainer>
                <small>{year}</small>
              </h3>
              <span>{subtitle}</span>
            </div>
        </div>
    );
  }
}
