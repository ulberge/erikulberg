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

const history = createHashHistory({
  queryKey: false
});

render((
  <Router history={history}>
    <Route component={Layout}>
      <Route
        name="Work"
        path="/"
        component={Home}
      />
      <Route
        name="Art"
        path="/art"
        component={Art}
      />
      <Route
        name="CV"
        path="/cv"
        component={CV}
      />
      <Route
        name="Contact"
        path="/contact"
        component={Contact}
      />
      <Route
        path="*"
        component={Home}
      />
    </Route>
  </Router>
), document.getElementById('main'));
