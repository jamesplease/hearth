import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.css';
import Home from './common/home';
import Header from './common/header';
import Footer from './common/footer';
import NotFound from './common/not-found';
import Calculators from './calculators';
import DataSources from './data-sources';
import Guides from './guides';
import About from './meta/about';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <div className="app-body">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/calculators" component={Calculators} />
              <Route path="/guides" component={Guides} />
              <Route exact path="/data-sources" component={DataSources} />
              <Route exact path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}
