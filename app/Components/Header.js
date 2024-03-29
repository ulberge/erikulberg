import React from 'react';
import classnames from 'classnames';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';
import $ from 'jquery';

import { className } from './Header.less';

module.exports = React.createClass({
  componentDidMount: function componentDidMount() {
    $('.navbar a').click(function navClick() {
      $('.navbar-toggle').click();
    });
  },
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
              <LinkContainer to={{ pathname: '/home' }}>
                <NavItem eventKey={1}>Projects</NavItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: '/art' }}>
                <NavItem eventKey={4}>Art</NavItem>
              </LinkContainer>
              <NavItem eventKey={2} href="/assets/resume.pdf">Resume</NavItem>
              <LinkContainer to={{ pathname: '/about' }}>
                <NavItem eventKey={3}>About</NavItem>
              </LinkContainer>
              <LinkContainer className="socialMediaLink" to={{ pathname: '/contact' }}>
                <NavItem eventKey={8} href="" target="_blank"><FontAwesome name="envelope" /></NavItem>
              </LinkContainer>
              <NavItem eventKey={7} href="https://github.com/ulberge" className="socialMediaLink" target="_blank"><FontAwesome name="github" /></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
});
