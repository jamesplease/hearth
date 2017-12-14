import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import calculatorsData from './utils/calculators-data';

export default class CalculatorNav extends Component {
  render() {
    return (
      <div className="sideNav">
        <h2 className="sideNav-header">
          <Link to="/calculators" className="sideNav-headerLink">
            Calculators
          </Link>
        </h2>
        <ul className="sideNav-list">
          {calculatorsData.map(calculator => (
            <li className="sideNav-listItem" key={calculator.name}>
              <NavLink
                to={`/calculators${calculator.url}`}
                className="sideNav-link"
                activeClassName="sideNav-link_active">
                {calculator.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
