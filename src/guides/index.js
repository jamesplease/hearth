import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './landing-page';
import Glossary from './glossary';
import Fire from './fire';
import Inflation from './inflation';
import StockMarketInvesting from './stock-market-investing';
import GuidesNav from './guides-nav';
import NotFound from '../common/not-found';

export default class Guides extends Component {
  render() {
    const { match } = this.props;

    return (
      <div className="standardPage-contentWithSideNav">
        <Route path={`${match.url}/:foo+`} component={GuidesNav} />
        <Switch>
          <Route exact path={`${match.url}`} component={LandingPage} />
          <Route exact path={`${match.url}/glossary`} component={Glossary} />
          <Route exact path={`${match.url}/fire`} component={Fire} />
          <Route exact path={`${match.url}/inflation`} component={Inflation} />
          <Route
            exact
            path={`${match.url}/stock-market-investing`}
            component={StockMarketInvesting}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
