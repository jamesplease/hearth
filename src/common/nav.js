import React, { Component } from 'react';
import classnames from 'classnames';
import './nav.css';

const navItems = [
  {
    key: 'historicalSuccess',
    label: 'Historical Success'
  },
  {
    key: 'compoundInterest',
    label: 'Compound Interest'
  },
  {
    key: 'inflationAdjusted',
    label: 'Inflation Adjusted'
  },
];

export default class Nav extends Component {
  render() {
    const { onNavigate, activePage } = this.props;

    return (
      <nav className="nav">
        <ul className="nav-navList">
          {navItems.map(navItem => {
            const isActivePage = navItem.key === activePage;
            const linkClassName = classnames({
              'nav-navListLink_active': isActivePage
            });
            return (
              <li className="nav-navListItem" key={navItem.key}>
                <a onClick={() => onNavigate(navItem.key)} className={linkClassName}>
                  {navItem.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    );
  }
}