import React, { Component } from 'react';
import './nav.css';

export default class Nav extends Component {
  render() {
    const { onNavigate } = this.props;

    return (
      <nav className="nav">
        <ul className="nav-navList">
          <li>
            <a onClick={() => onNavigate('historicalSuccess')}>
              Historical Success
            </a>
          </li>
          <li>
            <a onClick={() => onNavigate('compoundInterestCalculator')}>
              Compound Interest Calculator
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}