import React, { Component } from 'react';
import './app.css';
import Header from './header';
import Nav from './nav';
import Footer from './footer';
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
        <Header/>
        <Nav onNavigate={activePage => this.setState({ activePage })}/>
        <div className="app-body">
          <Child/>
        </div>
        <Footer/>
      </div>
    );
  }

  state = {
    activePage: 'historicalSuccess'
  }
}
