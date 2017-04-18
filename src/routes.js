// ==================================================
// Routes
// ==================================================
// This file exports the routes file imported in the
// Root file.
// ==================================================

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import MainView from './views/main';
import IntroView from './views/intro';
import AppView from './views/app';
import HomeView from './views/app.home';
import DebtorView from './views/app.debtor';
import DebtorViewCreateView from './views/app.debtor.create';
import DebtorViewDetailsView from './views/app.debtor.details';
import DebtorCreateView from './views/app.debtor-create';

export default (
  <Route component={MainView}>
    <Route path="/" component={AppView}>
      <IndexRoute component={HomeView} />
      <Route path="d/create" component={DebtorCreateView} />
      <Route path="d/:id" component={DebtorView}>
        <Route path="create" component={DebtorViewCreateView} />
        <Route path=":debtId/details" component={DebtorViewDetailsView} />
      </Route>
    </Route>

    <Route path="/intro" component={IntroView} />
  </Route>
);
