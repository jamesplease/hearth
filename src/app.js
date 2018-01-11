import React, { Component, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import queryString from 'query-string';
import './app.css';
import historyWithQuery from './common/utils/history-with-query';
import ScrollToTop from './common/scroll-to-top';
import Home from './common/home';
import Analytics from './common/analytics';
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
import registerGoogleAnalytics from './common/utils/register-google-analytics';

const isProduction = process.env.NODE_ENV === 'production';

const history = historyWithQuery(
  createBrowserHistory(),
  queryString.stringify,
  queryString.parse
);

if (isProduction) {
  registerGoogleAnalytics();
}

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <ScrollToTop>
          {isProduction && <Route path="/" component={Analytics} />}
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
