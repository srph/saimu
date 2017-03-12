// ==================================================
// Routes
// ==================================================
// This file exports the routes file imported in the
// Root file.
// ==================================================

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import MainView from './views/main';
import HomeView from './views/home';
import HomeCreateView from './views/home.create';
import HomeDetailsView from './views/home.details';

export default (
  <Route component={MainView}>
    <Route path="/" component={HomeView}>
      <Route path="create" component={HomeCreateView} />
      <Route path="details" component={HomeDetailsView} />
    </Route>
  </Route>
);
