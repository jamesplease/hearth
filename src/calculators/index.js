import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './common.css';
import './results.css';
import './share-results.css';
import LandingPage from './landing-page';
import CompoundInterest from './compound-interest';
import CompoundInterestAbout from './compound-interest-about';
import HistoricalSuccess from './historical-success';
import HistoricalSuccessAbout from './historical-success-about';
import InflationAdjusted from './inflation-adjusted';
import InflationAdjustedAbout from './inflation-adjusted-about';
import CalculatorNav from './calculator-nav';
import NotFound from '../common/not-found';

export default class Calculators extends Component {
  render() {
    const { match } = this.props;

    return (
      <div className="calculatorPage-contentWithSideNav">
        <Route path={`${match.url}/:foo+`} component={CalculatorNav} />
        <Switch>
          <Route exact path={`${match.url}`} component={LandingPage} />
          <Route
            exact
            path={`${match.url}/compound-interest`}
            component={CompoundInterest}
          />
          <Route
            exact
            path={`${match.url}/compound-interest/about`}
            component={CompoundInterestAbout}
          />
          <Route
            exact
            path={`${match.url}/historical-success`}
            component={HistoricalSuccess}
          />
          <Route
            exact
            path={`${match.url}/historical-success/about`}
            component={HistoricalSuccessAbout}
          />
          <Route
            exact
            path={`${match.url}/inflation-adjusted-spending`}
            component={InflationAdjusted}
          />
          <Route
            exact
            path={`${match.url}/inflation-adjusted-spending/about`}
            component={InflationAdjustedAbout}
          />
          <Redirect
            from={`${match.url}/inflation-adjusted`}
            to={`${match.url}/inflation-adjusted-spending`}
          />
          <Redirect
            from={`${match.url}/inflation-adjusted/about`}
            to={`${match.url}/inflation-adjusted-spending/about`}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
