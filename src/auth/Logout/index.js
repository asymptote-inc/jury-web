import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import ApiManager from '../../xapi/apiManager';
const logout = ApiManager.logout;

export default class Logout extends Component {
  componentDidMount() {
    logout()
      .then(() => this.setState({ redirect: true }))
      .catch(() => this.setState({ redirect: true }));
  }

  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  render() {
    return (
      <div>{this.state.redirect ? <Redirect to="/login" /> : <div />}</div>
    );
  }
}
