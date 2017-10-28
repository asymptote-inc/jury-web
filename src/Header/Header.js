import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Header({ links }) {
  return (
    <Menu inverted>
      {links.map(link => (
        <Menu.Item name="home">
          <Link to={link.path}>{link.name}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default Header;
