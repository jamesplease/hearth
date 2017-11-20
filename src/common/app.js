import React, { Component } from 'react';
import './app.css';
import Nav from './nav';
import CompoundInterest from '../compound-interest';
import HistoricalSuccess from '../historical-success';

const navMap = {
  historicalSuccess: HistoricalSuccess,
  compoundInterestCalculator: CompoundInterest
};

export default class App extends Component {
  render() {
    const { activePage } = this.state;

    const Child = navMap[activePage];

    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">
            Compound Interest Calculator
          </h1>
        </header>
        <Nav onNavigate={activePage => this.setState({ activePage })}/>
        <div className="app-body">
          <Child/>
        </div>
      </div>
    );
  }

  state = {
    activePage: 'historicalSuccess'
  }
}
