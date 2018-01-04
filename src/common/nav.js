import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';

const navItems = [
  {
    key: 'calculators',
    label: 'Calculators'
  },
  {
    key: 'guides',
    label: 'Guides'
  },
  {
    key: 'about',
    label: 'About'
  }
];

export default class Nav extends Component {
  render() {
    const { className = '' } = this.props;
    return (
      <nav className={`${className} nav`}>
        <ul className="nav-navList">
          {navItems.map(navItem => {
            return (
              <li className="nav-navListItem" key={navItem.key}>
                <NavLink
                  to={`/${navItem.key}`}
                  className="nav-navListLink"
                  activeClassName="nav-navListLink_active">
                  {navItem.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
