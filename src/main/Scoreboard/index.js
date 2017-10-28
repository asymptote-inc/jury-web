import React, { Component } from 'react';
import Board from './Scoreboard';
import Header from '../../Header';

import ApiManager from '../../xapi/apiManager';

export default class Scoreboard extends Component {
  state = {
    records: []
  };

  async componentDidMount() {
    this.setState({ records: await ApiManager.apiManager.getScoreboard() });
  }

  render() {
    return (
      <div>
        <Header />
        <Board records={this.state.records} />
      </div>
    );
  }
}
