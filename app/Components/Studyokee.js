import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Studyokee.less';
import FontAwesome from 'react-fontawesome';

export default class extends Component {
  render() {
    return (
      <div className={classnames(className, 'container-fluid projectPage')}>
        <div className="container">
          <div className="detailPageHeader">
            <h2>
              Studyokee&nbsp;&nbsp;<small>2013-2018</small>
            </h2>
            <div>Language Learning through Karaoke</div>
          </div>

          <div className="row">
            <div className="col-md-7">
              <p><b>Description</b>: A web application to supplement and enrich traditional language learning. Users can improve their Spanish skills through the lyrics of popular songs. Songs are an enjoyable way to master pronunciation and rhythm, as well as to introduce interesting phrases and vocabulary.</p>
              <a className="btn btn-info" href="https://studyokee.herokuapp.com" target="_blank">Launch Studyokee <FontAwesome name="external-link" /></a><br/><br/>
              <p><b>Front End</b>: CoffeeScript, Backbone.js, Handlebars, Stylus, jQuery, Bootstrap</p>
              <p><b>Server</b>: Node.js, mongodb</p>
              <p><b>Tools/Ops</b>: Grunt, Heroku, Travis CI</p>
              <p><b>GitHub</b>: <a href="https://github.com/Studyokee/studyokee" target="_blank">github.com/Studyokee/studyokee</a></p>
            </div>
            <div className="col-md-5">
              <a className="homeLink" href="https://studyokee.herokuapp.com" target="_blank">
                <div className="imgContainer">
                  <img src="./imgs/gifs/studyokee_start.gif" alt="Studyokee" />
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="accentRow row">
          <div className="container">
            <div className="col-md-4">
              <h3 className="text-center">Scrolling Lyrics</h3>
              <hr/>
              <p>Follow along with songs. Pause and jump between lines. Hide translations. Vocabulary is highlighted.</p>
              <div>
                <img src={"./imgs/gifs/studyokee_lyrics.gif"}/>
              </div>
            </div>
            <div className="col-md-4">
              <h3 className="text-center">Dictionary Lookup</h3>
              <hr/>
              <p>Lookup with one click. Add words to your vocabulary lists with "Make Card."</p>
              <div>
                <img src={"./imgs/gifs/studyokee_dict.gif"}/>
              </div>
            </div>
            <div className="col-md-4">
              <h3 className="text-center">Vocabulary Study</h3>
              <hr/>
              <p>Study lists of vocabulary organized by known and unknown. Words presented as flash cards.</p>
              <div>
                <img src={"./imgs/gifs/studyokee_vocab.gif"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
