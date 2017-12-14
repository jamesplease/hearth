import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './landing-page';
import CompoundInterest from './compound-interest';
import HistoricalSuccess from './historical-success';
import InflationAdjusted from './inflation-adjusted';

export default class Calculators extends Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}`} component={LandingPage} />
        <Route
          path={`${match.url}/compound-interest`}
          component={CompoundInterest}
        />
        <Route
          path={`${match.url}/historical-success`}
          component={HistoricalSuccess}
        />
        <Route
          path={`${match.url}/inflation-adjusted`}
          component={InflationAdjusted}
        />
      </Switch>
    );
  }
}
