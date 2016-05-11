import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import './main.less';

import Layout from './Components/Layout';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';

render((
  <Router history={browserHistory}>
    <Route component={Layout}>
      <Route
        path="/"
        component={Home}
      />
      <Route
        name="About"
        path="/about"
        component={About}
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
