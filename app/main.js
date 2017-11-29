import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
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

const history = createHashHistory({
  queryKey: false
});

render((
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route component={Layout}>
      <Route
        name="Work"
        path="/"
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
        path="*"
        component={Home}
      />
    </Route>
  </Router>
), document.getElementById('main'));
