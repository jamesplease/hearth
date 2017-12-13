import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  },
];

export default class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <ul className="nav-navList">
          {navItems.map(navItem => {
            return (
              <li className="nav-navListItem" key={navItem.key}>
                <Link to={`/${navItem.key}`}>{navItem.label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
