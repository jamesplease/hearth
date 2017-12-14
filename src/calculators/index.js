import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import './index.css';
import './common.css';
import LandingPage from './landing-page';
import CompoundInterest from './compound-interest';
import HistoricalSuccess from './historical-success';
import InflationAdjusted from './inflation-adjusted';
import CalculatorNav from './calculator-nav';

export default class Calculators extends Component {
  render() {
    const { match } = this.props;

    return (
      <div className="calculatorsWrapper">
        <Route path={`${match.url}/:foo+`} component={CalculatorNav} />
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
      </div>
    );
  }
}
