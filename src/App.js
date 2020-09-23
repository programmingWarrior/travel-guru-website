import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Component/Home/Home';
import DetailsItem from './Component/DetailsItem/DetailsItem';
import Header from './Component/Header/Header';
import Hotel from './Component/Hotel/Hotel';
import SignUp from './Component/SignUp/SignUp';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import NoMatch from './Component/NoMatch/NoMatch';
import Login from './Component/Login/Login';
import UserPropail from './Component/UserPropail/UserPropail';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})
  return (
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
          <Header/>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/Login">
              <Login/>
            </Route>
            <Route path="/DetailsItem/:id">
              <DetailsItem />
            </Route>
            <Route path="/UserPropail">
              <UserPropail></UserPropail>
            </Route>
            <PrivateRoute path="/Hotel">
              <Hotel/>
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
            <NoMatch/>
            </Route>
          </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
