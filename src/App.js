import React from "react";
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Container from 'react-bootstrap/Container';

import Navigation from './components/Navigation';
import Home from './components/pages/Home';
import SubmitLetterRequest from './components/pages/SubmitLetterRequest';
import ViewOpenRequests from './components/pages/ViewOpenRequests';
import SignIn from './components/pages/SignIn';

export default function App() {
  return (
    <Router>
      <div>
        <Navigation />

        <MainContainer>
          <Switch>
          <Route path="/open-requests">
              <ViewOpenRequests />
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/new">
              <SubmitLetterRequest />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </MainContainer>
      </div>
    </Router>
  );
}

const MainContainer = styled(Container)`
  padding: 10px 30px;
`;
