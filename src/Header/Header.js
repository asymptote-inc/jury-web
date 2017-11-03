import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Header({ leftLinks, helpLinks, userLinks }) {
  return (
    <Menu size="mini" attached="top">
      {leftLinks.map(link => (
        <Menu.Item name={link.name} key={link.name}>
          <Link to={link.path}>{link.name}</Link>
        </Menu.Item>
      ))}

      <Menu.Menu position="right">
        <Dropdown item text="Help">
          <Dropdown.Menu>
            {helpLinks.map(link => (
              <Dropdown.Item name={link.name} key={link.name}>
                <Link to={link.path}>{link.name}</Link>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="User">
          <Dropdown.Menu>
            {userLinks.map(link => (
              <Dropdown.Item name={link.name} key={link.name}>
                <Link to={link.path}>{link.name}</Link>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
