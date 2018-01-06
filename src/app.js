import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.css';
import ScrollToTop from './common/scroll-to-top';
import Home from './common/home';
import Header from './common/header';
import Nav from './common/nav';
import Footer from './common/footer';
import NotFound from './common/not-found';
import Calculators from './calculators';
import DataSources from './data-sources';
import Guides from './guides';
import About from './meta/about';
import Contact from './meta/contact';
import Privacy from './meta/privacy';
import Terms from './meta/terms';

export default class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Fragment>
            <Header />
            <div className="app-body">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/calculators" component={Calculators} />
                <Route path="/guides" component={Guides} />
                <Route exact path="/data-sources" component={DataSources} />
                <Route exact path="/about" component={About} />
                <Route exact path="/privacy" component={Privacy} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/contact" component={Contact} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
            <Nav isBottomNav={true} />
          </Fragment>
        </ScrollToTop>
      </Router>
    );
  }
}
