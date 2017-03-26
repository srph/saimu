// ==================================================
// Routes
// ==================================================
// This file exports the routes file imported in the
// Root file.
// ==================================================

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import MainView from './views/main';
import AppView from './views/app';
import HomeView from './views/app.home';
import DebtorView from './views/app.debtor';
import DebtorCreateView from './views/app.debtor.create';
import DebtorDetailsView from './views/app.debtor.details';

export default (
  <Route component={MainView}>
    <Route path="/" component={AppView}>
      <IndexRoute component={HomeView} />
      <Route path="d/:id" component={DebtorView}>
        <Route path="create" component={DebtorCreateView} />
        <Route path="details" component={DebtorDetailsView} />
      </Route>
    </Route>
  </Route>
);
