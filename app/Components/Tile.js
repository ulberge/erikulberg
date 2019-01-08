import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Tile.less';
import { LinkContainer } from 'react-router-bootstrap';
import RolloverImage from './RolloverImage.js';

export default class extends Component {
  render() {
    const absoluteLink = '/#' + this.props.link;

    const { alt, img, gif } = this.props;
    return (
        <div className={classnames(className, this.props.styleName)}>
            <div>
              <LinkContainer to={{ pathname: this.props.link }}>
              <a href={absoluteLink}>
                <RolloverImage img={img} gif={gif} alt={alt} />
              </a>
              </LinkContainer>
            </div>
            <div className="tileBottom">
              <h3>
                <LinkContainer to={{ pathname: this.props.link }}>
                  <a href={absoluteLink}>{this.props.title}</a>
                </LinkContainer>
                <small>{this.props.year}</small>
              </h3>
              <span>{this.props.subtitle}</span>
            </div>
        </div>
    );
  }
}
