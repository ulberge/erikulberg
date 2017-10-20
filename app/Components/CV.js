import React from 'react';
import classnames from 'classnames';

import { className } from './CV.less';

module.exports = React.createClass({
  render() {
    return (
      <div className={classnames(className, 'container')}>
        <div className="col-md-8 col-md-offset-2">
          <div className="text-center">
            <h3>Erik Ulberg</h3>
            <div>ulberge@gmail.com</div>
            <div>(206) 948-3348</div>
          </div>
          <div className="row">
            <h4>Education:</h4>
            <hr/>
            <div>
              <div className="clearfix">
                <span className="pull-left"><b>Carleton College</b>, Northfield, MN</span>
                <span className="pull-right">2009</span>
              </div>
              <div>B.A. in Computer Science, 2009, GPA: 3.85, Major GPA: 3.97</div>
              <div>Honors: <i>magna cum laude</i>, Distinction in Major</div>
              <div>Distinction in Thesis: "Learning Through Gaming"</div>
            </div>
            <br/>
            <h4>Additional Coursework:</h4>
            <div>
              <div className="clearfix">
                <span className="pull-left"><b>University of Washington</b>, Seattle, WA, GPA: 4.0</span>
                <span className="pull-right">2016-2017</span>
              </div>
              <div>DXARTS courses: Photogrammetric Modeling, Sensing and Controlling Systems, Immersive Art</div>
            </div>
            <br/>
            <div>
              <div className="clearfix">
                <span className="pull-left"><b>South Seattle College</b>, Seattle, WA, GPA: 3.68</span>
                <span className="pull-right">2017</span>
              </div>
              <div>Landscape Horticulture courses: Soils, Permaculture, Edible Plants, Perennials</div>
            </div>
            <br/>
            <div>
              <div className="clearfix">
                <span className="pull-left"><b>North Seattle College</b>, Seattle, WA, GPA: 4.0</span>
                <span className="pull-right">2016-2017</span>
              </div>
              <div>German 101, German 102</div>
            </div>
            <br/>
            <div>
              <div className="clearfix">
                <span className="pull-left"><b>Gage Academy of Art</b>, Seattle, WA</span>
                <span className="pull-right">2014-2016</span>
              </div>
              <div>Magrath Atelier in Sculpture</div>
              <div>Additional courses in: Watercolor, Drawing, Painting</div>
            </div>
          </div>

          <div className="row">
            <h4>Work Experience:</h4>
            <hr/>
            <div>
              <div className="clearfix">
                <span className="pull-left"><b>Freelance Web Developer</b>, Seattle, WA</span>
                <span className="pull-right">2014-Present</span>
              </div>
              <ul>
                <li>Built and edited WordPress and Shopify sites with JS, PHP, and Liquid.</li>
                <li>Completed projects for over 30 clients ranging from small features to custom web applications.</li>
              </ul>
            </div>
            <br/>
            <div>
              <div className="clearfix">
                <span className="pull-left"><b>Senior Member of Technical Staff</b>, Salesforce.com, Seattle, WA</span>
                <span className="pull-right">May 2013-August 2013</span>
              </div>
              <div className="clearfix">
                <span className="pull-left"><b>Member of Technical Staff</b>, Salesforce.com, Seattle, WA</span>
                <span className="pull-right">Sept 2011-May 2013</span>
              </div>
              <div className="clearfix">
                <span className="pull-left"><b>Associate Member of Technical Staff</b>, Salesforce.com, San Francisco, CA</span>
                <span className="pull-right">Aug 2009-Sept 2010</span>
              </div>
              <ul>
                <li>Worked as a software engineer on Salesforce Chatter, a social collaboration tool for the enterprise.</li>
                <li>Built features in Java, JS, and PL/SQL being used by millions of users.</li>
                <li>Developed a responsive UI compatible across phone, tablet, and desktop browsers.</li>
              </ul>
            </div>
            <br/>
            <div>
              <div className="clearfix">
                <span className="pull-left"><b>Software Development Intern</b>, Labkey Software, Seattle, WA</span>
                <span className="pull-right">Summers 2007-2008</span>
              </div>
              <ul>
                <li>Fixed bugs in software used by scientists to collect, analyze, and share data from high-throughput experiments and observational studies.</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <h4>Exhibitions:</h4>
            <hr/>
            <div>2017 – NiiModo Pop-up Gallery@Mini Maker Faire – Museum of Pop Culture (Formerly EMP), Seattle – Group show</div>
            <div>2016 – Magrath Atelier Show – Gage Academy of Arts, Seattle – Group Show</div>
            <div>2015 – Magrath Atelier Show – Gage Academy of Arts, Seattle – Group Show</div>
          </div>

          <div className="row">
            <h4>Skills:</h4>
            <hr/>
            <div><b>Programming Languages:</b> Java, JS, PHP, CSS, HTML</div>
            <div><b>Technologies:</b> Processing, Arduino, WordPress, Shopify, ThreeJS, ReactJS, NodeJS, Bootstrap, jQuery, BackboneJS, MongoDB, LESS, Grunt, git, npm, bower, TravisCI, Heroku, requireJS</div>
            <div><b>Languages:</b> English (native), Spanish (advanced), French (basic), German (basic)</div>
          </div>
        </div>
      </div>
    );
  }
});
