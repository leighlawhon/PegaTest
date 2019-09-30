/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage/Loadable';
import Agenda from '../Agenda/Loadable';
import Logistics from '../Logistics/Loadable';

import NotFoundPage from '../NotFoundPage/Loadable';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/agenda/" component={Agenda} />
        <Route exact path="/logistics/" component={Logistics} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
