import React, { Component } from 'react';
import NavBar from './Header';

class Header extends Component {
  render() {
    return (
      <NavBar
        links={[
          { name: 'Scoreboard', path: '/scoreboard' },
          { name: 'Simple', path: '/' },
          { name: 'Advanced', path: '/moderator' }
        ]}
      />
    );
  }
}

export default Header;
