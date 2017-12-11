import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const navItems = [
  {
    key: 'historical-success',
    label: 'Historical Success'
  },
  {
    key: 'compound-interest',
    label: 'Compound Interest'
  },
  {
    key: 'inflation-adjusted',
    label: 'Inflation Adjusted'
  }
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
