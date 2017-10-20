import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SignUp from './auth/SignUp';
import Login from './auth/Login';
import RatingView from './main/Rating';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={RatingView} />
          <Route exact path="/profile" />
          <Route exact path="/scoreboard" />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
