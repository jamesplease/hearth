import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';
import './common.css';
import './results.css';
import './share-results.css';
import LandingPage from './landing-page';
import CalculatorNav from './calculator-nav';
import calculatorsData from './utils/calculators-data';
import NotFound from '../common/not-found';

export default class Calculators extends Component {
  render() {
    const { match } = this.props;

    return (
      <div className="calculatorPage-contentWithSideNav">
        <Route path={`${match.url}/:foo+`} component={CalculatorNav} />
        <Switch>
          <Route exact path={`${match.url}`} component={LandingPage} />
          {_.map(calculatorsData, calculator => {
            const mainComponents = [
              <Route
                key={`${calculator.name}-main`}
                exact
                path={`${match.url}${calculator.url}`}
                component={calculator.component}
              />,
              <Route
                exact
                key={`${calculator.name}-about`}
                path={`${match.url}${calculator.url}/about`}
                component={calculator.aboutComponent}
              />
            ];

            const redirects = _.map(calculator.pastUrls, pastUrl => [
              <Redirect
                key={`${pastUrl.url}-main`}
                from={`${match.url}/inflation-adjusted`}
                to={`${match.url}/inflation-adjusted-spending`}
              />,
              <Redirect
                key={`${pastUrl.url}-about`}
                from={`${match.url}/inflation-adjusted/about`}
                to={`${match.url}/inflation-adjusted-spending/about`}
              />
            ]);

            return [...mainComponents, ...redirects];
          })}
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
