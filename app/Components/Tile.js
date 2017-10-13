import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Tile.less';
import { LinkContainer } from 'react-router-bootstrap';

export default class extends Component {
  render() {
    const absoluteLink = '/#' + this.props.link;
    return (
        <div className={classnames(className, this.props.styleName)}>
          <LinkContainer to={{ pathname: this.props.link }}>
          <a href={absoluteLink}>
            <div>
              <div className="imgContainer artImg">
                <img src={this.props.img} style={{ marginTop: '0px' }} alt={this.props.alt}/>
                <div className="goIcon">⇨</div>
              </div>
            </div>
          </a>
          </LinkContainer>
          <h4>{this.props.title}</h4>
          <span>{this.props.subtitle}</span>
        </div>
    );
  }
}
