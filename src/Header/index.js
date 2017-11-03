import React, { Component } from 'react';
import NavBar from './Header';

class Header extends Component {
  render() {
    return (
      <NavBar
        leftLinks={[
          { name: 'Simple', path: '/' },
          { name: 'Advanced', path: '/moderator' },
          { name: 'Scoreboard', path: '/scoreboard' }
        ]}
        helpLinks={[
          { name: 'Installation', path: '/help/install' },
          { name: 'Moderating', path: '/help/moderate' }
        ]}
        userLinks={[
          { name: 'Profile', path: '/profile' },
          { name: 'Logout', path: '/logout' }
        ]}
      />
    );
  }
}

export default Header;
