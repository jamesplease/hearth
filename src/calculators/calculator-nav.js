import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import calculatorsData from './utils/calculators-data';

export default class CalculatorNav extends Component {
  render() {
    const { match } = this.props;

    return (
      <div className="sideNav">
        <h2 className="sideNav-header">
          <Link to="/calculators" className="sideNav-headerLink">
            Calculators
          </Link>
        </h2>
        <ul className="sideNav-list">
          {calculatorsData.map(calculator => (
            <li className="sideNav-listItem">
              <Link
                to={`/calculators${calculator.url}`}
                className="sideNav-link">
                {calculator.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
