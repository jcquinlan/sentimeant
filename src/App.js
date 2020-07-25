import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/pages/Home';
import SubmitLetterRequest from './components/pages/SubmitLetterRequest';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/new">New Letter Request</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/new">
            <SubmitLetterRequest />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
