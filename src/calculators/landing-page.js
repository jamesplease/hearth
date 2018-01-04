import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import calculatorsData from './utils/calculators-data';

export default class LandingPage extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="landingPage">
        <div className="landingPage-introduction">
          <h1 className="primaryHeader primaryHeader_centered">Calculators</h1>
          <p className="subheaderText subheaderText_centered">
            These calculators should help you reach FIRE.
          </p>
        </div>
        <div className="panelContainer">
          {calculatorsData.map(calculator => (
            <div className="panel panel-padding" key={calculator.name}>
              <h2 className="panel-header">
                <Link
                  to={`${match.url}${calculator.url}`}
                  className="panel-headerLink">
                  {calculator.name}
                </Link>
              </h2>
              <p className="panel-description">{calculator.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
