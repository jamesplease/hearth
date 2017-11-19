import React, { Component } from 'react';
import './nav.css';

export default class Nav extends Component {
  render() {
    const { onNavigate } = this.props;

    return (
      <nav className="nav">
        <ul className="nav-navList">
          <li onClick={() => onNavigate('fireSimulation')}>
            FIRE Simulation
          </li>
          <li onClick={() => onNavigate('compoundInterestCalculator')}>
            Compound Interest Calculator
          </li>
        </ul>
      </nav>
    );
  }
}