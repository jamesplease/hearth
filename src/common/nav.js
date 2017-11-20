import React, { Component } from 'react';
import './nav.css';

export default class Nav extends Component {
  render() {
    const { onNavigate } = this.props;

    return (
      <nav className="nav">
        <ul className="nav-navList">
          <li className="nav-navListItem">
            <a onClick={() => onNavigate('historicalSuccess')}>
              Historical Success
            </a>
          </li>
          <li className="nav-navListItem">
            <a onClick={() => onNavigate('compoundInterestCalculator')}>
              Compound Interest
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}