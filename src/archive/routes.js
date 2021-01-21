import React from 'react';

import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from './App';
import Alarm from './components/make-item/alarm';
import Note from './components/window/note';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={App} />
    <Route path="/make-alarm" component={Alarm} />
    <Route path="/make-note" component={Note} />
  </Route>
);
