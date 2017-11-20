import React, { Component } from 'react';
import './app.css';
import Header from './header';
import Nav from './nav';
import Footer from './footer';
import Children from './children';
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
      <Children>
        <Header key="header"/>
        <Nav key="nav" onNavigate={activePage => this.setState({ activePage })}/>
        <div className="app-body" key="appBody">
          <Child/>
        </div>
        <Footer key="footer"/>
      </Children>
    );
  }

  state = {
    activePage: 'historicalSuccess'
  }
}
