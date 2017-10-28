import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import SignUp from './auth/SignUp';
import Login from './auth/Login';
import RatingView from './main/Rating';
import SimpleRatingView from './main/SimpleRating';
import Scoreboard from './main/Scoreboard';

function loggedIn() {
  return !!localStorage.getItem('token');
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/"
            render={() =>
              loggedIn() ? <SimpleRatingView /> : <Redirect to="/login" />}
          />
          <Route
            exact
            path="/moderator"
            render={() =>
              loggedIn() ? <RatingView /> : <Redirect to="/login" />}
          />
          <Route exact path="/stats" />
          <Route
            exact
            path="/scoreboard"
            render={() =>
              loggedIn() ? <Scoreboard /> : <Redirect to="/login" />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
