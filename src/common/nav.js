import React, { Component } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import './nav.css';

const navItems = [
  {
    key: 'calculators',
    label: 'Calculators',
    icon: 'zmdi-apps'
  },
  {
    key: 'guides',
    label: 'Guides',
    icon: 'zmdi-file-text'
  },
  {
    key: 'about',
    label: 'About',
    icon: 'zmdi-info-outline'
  }
];

export default class Nav extends Component {
  render() {
    const { isBottomNav } = this.props;

    const className = classnames('nav', {
      'nav_bottom': isBottomNav
    });

    const linkClass = classnames('nav-navListLink', {
      'nav-navListLink_bottomLink': isBottomNav
    });

    return (
      <nav className={`${className} nav`}>
        <ul className="nav-navList">
          {navItems.map(navItem => {
            return (
              <li className="nav-navListItem" key={navItem.key}>
                <NavLink
                  to={`/${navItem.key}`}
                  className={linkClass}
                  activeClassName="nav-navListLink_active">
                  <i className={`zmdi ${navItem.icon} nav-navListLinkIcon`}/>
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
