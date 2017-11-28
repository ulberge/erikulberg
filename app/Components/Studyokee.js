import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Studyokee.less';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container-fluid projectPage')}>
        <div className="container">
          <div className="detailPageHeader">
            <h2>
              Studyokee&nbsp;&nbsp;<small>2013-2017</small>
            </h2>
            <div>Language Learning through Karaoke</div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <p><b>Description</b>: A web application to teach languages through songs. Users can learn Spanish or German through the lyrics of popular songs. &lt;<a href="http://studyokee.com/" target="_blank">Go to app</a>&gt;</p>
              <p><b>Front End</b>: Backbone.js, CoffeeScript, jQuery, Bootstrap, Handlebars, Stylus, RequireJS</p>
              <p><b>Server</b>: Node.js, JavaScript, mongodb</p>
              <p><b>Tools/Ops</b>: Grunt, Bower, npm, Heroku, Travis CI</p>
              <p><b>GitHub</b>: <a href="https://github.com/Studyokee/studyokee" target="_blank">github.com/Studyokee/studyokee</a></p>
              <h3>Features:</h3>
              <ul>
                <li>Scrolling lyrics with translations synced to Youtube videos</li>
                <li>Dictionary lookup that saves words to user vocabulary list</li>
                <li>Flashcards for studying vocabulary</li>
              </ul>
            </div>
            <div className="col-md-7">
              <a className="homeLink" href="http://studyokee.com" target="_blank">
                <div className="imgContainer">
                  <img src={"./imgs/studyokee2.jpg"}/>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="accentRow row text-center">
          <div className="container">
            <div style={{ paddingTop: '10px' }}>
              <h3>Screenshots</h3>
              <hr/>
            </div>
            <div className="col-md-6 col-xs-12">
              <img src={"./imgs/vocabularyscreenshot.jpg"}/>
              <small>Vocabulary Study</small>
            </div>
            <div className="col-md-3 col-xs-12">
              <img src={"./imgs/dictionaryscreenshot.jpg"}/>
              <small>Dictionary</small>
            </div>
            <div className="col-md-3 col-xs-12">
              <img src={"./imgs/studyokeemobile.jpg"}/>
              <small>Mobile View</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
