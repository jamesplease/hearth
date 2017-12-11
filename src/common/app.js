import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';
import Home from './home';
import Header from './header';
import Nav from './nav';
import Footer from './footer';
import CompoundInterest from '../compound-interest';
import HistoricalSuccess from '../historical-success';
import InflationAdjusted from '../inflation-adjusted';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="appWrapper">
          <Header key="header" />
          <Nav key="nav" />
          <div className="app-body" key="appBody">
            <Route exact path="/" component={Home} />
            <Route path="/compound-interest" component={CompoundInterest} />
            <Route path="/historical-success" component={HistoricalSuccess} />
            <Route path="/inflation-adjusted" component={InflationAdjusted} />
          </div>
          <Footer key="footer" />
        </div>
      </Router>
    );
  }
}
