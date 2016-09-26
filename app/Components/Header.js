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
              <LinkContainer to={{ pathname: '/' }}>
                <a href="/">Erik Ulberg</a>
              </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to={{ pathname: '/' }}>
                <NavItem eventKey={1}>Work</NavItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: '/resume' }}>
                <NavItem eventKey={3}>Resume</NavItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: '/contact' }}>
                <NavItem eventKey={5}>Contact</NavItem>
              </LinkContainer>
              <NavItem eventKey={6} href="https://www.instagram.com/erikulberg/" className="socialMediaLink" target="_blank"><FontAwesome name="instagram" /></NavItem>
              <NavItem eventKey={7} href="https://github.com/ulberge" className="socialMediaLink" target="_blank"><FontAwesome name="github" /></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
