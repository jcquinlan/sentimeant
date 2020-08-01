import React, { useEffect } from "react";
import styled from 'styled-components';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navigation from './components/Navigation';
import {useDataContext, DataContext} from './contexts/data';
import Home from './components/pages/Home';
import SubmitLetterRequest from './components/pages/SubmitLetterRequest';
import ViewOpenRequests from './components/pages/ViewOpenRequests';
import SignIn from './components/pages/SignIn';
import RequestDetail from './components/pages/RequestDetail';

export default function App() {
  const data = useDataContext();

  useEffect(() => {
    if (!data.currentUser) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          data.setCurrentUser(user);
        }
      });
    }
  }, [data]);

  return (
    <DataContext.Provider value={data}>
      <Router>
        <div>
          <Navigation />

          <MainContainer>
            <Switch>
              <Route path="/request/:requestId">
                <RequestDetail />
              </Route>
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
    </DataContext.Provider>
  );
}

const MainContainer = styled(Container)`
  padding: 10px 30px;
`;
