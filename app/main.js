import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';

import './main.less';

import Layout from './Components/Layout';
import Home from './Components/Home';
import Contact from './Components/Contact';
import CV from './Components/CV';
import Art from './Components/Art';
import SculptureVideo from './Components/SculptureVideo';
import Sculpture from './Components/Sculpture';
import Studyokee from './Components/Studyokee';
import WES from './Components/WES';
import Kingfisher from './Components/Kingfisher';
import Illustration from './Components/Illustration';
import Garden from './Components/Garden';
import Anaglyph from './Components/Anaglyph';
import BirdNest from './Components/BirdNest';
import Programming from './Components/Programming';
import WCRemix from './Components/WCRemix';
import WCAnalysis from './Components/WCAnalysis';
import Gloria from './Components/Gloria';
import SeaDragon from './Components/SeaDragon';
import Kubota from './Components/Kubota';
import Huckleberry from './Components/Huckleberry';
import TwoByFour from './Components/sketch/TwoByFour';
import Sketch from './Components/Sketch';
import About from './Components/About';
import BubblePop from './Components/Projects/BubblePop';
import CollageMaker from './Components/CollageMaker';
import Thesis from './Components/Thesis';
import MLDraw from './Components/MLDraw';

const history = createHashHistory();

ReactDom.render(
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Layout>
      <Switch>
        <Route
          name="Home"
          path="/home"
          component={Home}
        />
        <Route
          name="Paintings"
          path="/paintings"
          component={Art}
        />
        <Route
          name="Resume"
          path="/resume"
          component={CV}
        />
        <Route
          name="Contact"
          path="/contact"
          component={Contact}
        />
        <Route
          name="Relief"
          path="/relief"
          component={SculptureVideo}
        />
        <Route
          name="Sculpture"
          path="/sculpture"
          component={Sculpture}
        />
        <Route
          name="Studyokee"
          path="/studyokee"
          component={Studyokee}
        />
        <Route
          name="WES"
          path="/wes"
          component={WES}
        />
        <Route
          name="Kingfisher"
          path="/kingfisher"
          component={Kingfisher}
        />
        <Route
          name="Illustration"
          path="/illustration"
          component={Illustration}
        />
        <Route
          name="Garden"
          path="/garden"
          component={Garden}
        />
        <Route
          name="Anaglyph"
          path="/anaglyph"
          component={Anaglyph}
        />
        <Route
          name="BirdNest"
          path="/birdnest"
          component={BirdNest}
        />
        <Route
          name="Programming"
          path="/programming"
          component={Programming}
        />
        <Route
          name="WCRemix"
          path="/wcremix"
          component={WCRemix}
        />
        <Route
          name="WCAnalysis"
          path="/wcanalysis"
          component={WCAnalysis}
        />
        <Route
          name="Gloria"
          path="/gloria"
          component={Gloria}
        />
        <Route
          name="SeaDragon"
          path="/seadragon"
          component={SeaDragon}
        />
        <Route
          name="Kubota"
          path="/kubota"
          component={Kubota}
        />
        <Route
          name="Huckleberry"
          path="/huckleberry"
          component={Huckleberry}
        />
        <Route
          name="ScriptSketch"
          path="/ScriptSketch"
          component={TwoByFour}
        />
        <Route
          name="Sketch"
          path="/sketch"
          component={Sketch}
        />
        <Route
          name="About"
          path="/about"
          component={About}
        />
        <Route
          name="BubblePop"
          path="/bubblepop"
          component={BubblePop}
        />
        <Route
          name="CollageMaker"
          path="/collageMaker"
          component={CollageMaker}
        />
        <Route
          name="Thesis"
          path="/thesis"
          component={Thesis}
        />
        <Route
          name="MLDraw"
          path="/conversationwithamachine"
          component={MLDraw}
        />
        <Redirect path="*" to="/home" />
      </Switch>
    </Layout>
  </Router>,
  document.getElementById('main')
);
