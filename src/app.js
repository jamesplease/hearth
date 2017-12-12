import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';
import Home from './common/home';
import Header from './common/header';
import Nav from './common/nav';
import Footer from './common/footer';
import CompoundInterest from './compound-interest';
import HistoricalSuccess from './historical-success';
import InflationAdjusted from './inflation-adjusted';
import DataSources from './data-sources';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header key="header" />
          <Nav key="nav" />
          <div className="app-body" key="appBody">
            <Route exact path="/" component={Home} />
            <Route path="/compound-interest" component={CompoundInterest} />
            <Route path="/historical-success" component={HistoricalSuccess} />
            <Route path="/inflation-adjusted" component={InflationAdjusted} />
            <Route path="/data-sources" component={DataSources} />
          </div>
          <Footer key="footer" />
        </Fragment>
      </Router>
    );
  }
}
