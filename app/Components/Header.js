import React, { Component } from 'react';
import classnames from 'classnames';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';

import { className } from './Header.less';

export default class Header extends Component {
  render() {
    return (
      <div className={classnames(className, '')}>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Erik Ulberg</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to={{ pathname: '/' }}>
                <NavItem eventKey={1}>Work</NavItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: '/about' }}>
                <NavItem eventKey={2}>About</NavItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: '/contact' }}>
                <NavItem eventKey={3}>Contact</NavItem>
              </LinkContainer>
              <NavItem eventKey={4} href="https://www.instagram.com/erikulberg/"><FontAwesome name="instagram" /></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
