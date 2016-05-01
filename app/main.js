import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { createHashHistory } from 'history';
import './main.less';

import Layout from './Components/Layout';
import Home from './Components/Home';

// setup routing
const history = createHashHistory({
  queryKey: false
});

render((
  <Router history={history}>
    <Route component={Layout}>
      <Route
        path="/"
        component={Home}
      />
      <Route
        path="*"
        component={Home}
      />
    </Route>
  </Router>
), document.getElementById('main'));
