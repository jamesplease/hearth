import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.css';
import Home from './common/home';
import Header from './common/header';
import Nav from './common/nav';
import Footer from './common/footer';
import Calculators from './calculators';
import DataSources from './data-sources';
import Guides from './guides';
import About from './meta/about';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header key="header" />
          <Nav key="nav" />
          <div className="app-body" key="appBody">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/calculators" component={Calculators} />
              <Route path="/guides" component={Guides} />
              <Route path="/data-sources" component={DataSources} />
              <Route path="/about" component={About} />
            </Switch>
          </div>
          <Footer key="footer" />
        </Fragment>
      </Router>
    );
  }
}
