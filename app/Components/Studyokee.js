import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Studyokee.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <h2 className="text-center">Project: Studyokee</h2>
        <div className="row">
          <div className="col-lg-6">
            <p><b>Website</b>: <a href="http://studyokee.com/">studyokee.com</a></p>
            <p><b>Front End</b>: Backbone.js, CoffeeScript, jQuery, Bootstrap, Handlebars, Stylus, RequireJS</p>
            <p><b>Server</b>: Node.js, JavaScript, mongodb</p>
            <p><b>Tools/Ops</b>: Grunt, Bower, npm, Heroku, Travis CI</p>
            <p><b>APIs</b>: Youtube API, Google Translate API</p>
            <p><b>GitHub</b>: <a href="https://github.com/Studyokee/studyokee">github.com/Studyokee/studyokee</a></p>
            <h3>Features:</h3>
            <ul>
              <li>Scrolling lyrics with translations synced to Youtube videos</li>
              <li>Dictionary lookup that saves words to user vocabulary list</li>
              <li>Flashcards for studying vocabulary</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <a className="homeLink" href="http://studyokee.com" target="_blank">
              <div className="imgContainer">
                <img src={"./imgs/studyokee.jpg"}/>
              </div>
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 text-center">
            <a className="homeLink" href="http://studyokee.com" target="_blank">
              <div className="imgContainer">
                <img src={"./imgs/studyokeemobile.jpg"}/>
              </div>
            </a>
          </div>
          <div className="col-lg-8 text-center">
            <a className="homeLink" href="http://studyokee.com" target="_blank">
              <div className="imgContainer">
                <img src={"./imgs/vocabularyscreenshot.jpg"}/>
              </div>
            </a>
            <a className="homeLink" href="http://studyokee.com" target="_blank" className="col-lg-6">
              <div className="imgContainer">
                <img src={"./imgs/dictionaryscreenshot.jpg"}/>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
