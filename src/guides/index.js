import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import _ from 'lodash';
import LandingPage from './landing-page';
import guidesData from './utils/guides-data';
import GuideContent from './guide-content';
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
          {_.map(guidesData, guide => {
            if (guide.component) {
              return (
                <Route
                  key={`${guide.name}-main`}
                  exact
                  path={`${match.url}${guide.url}`}
                  component={guide.component}
                />
              );
            }

            return (
              <Route
                key={`${guide.name}-main`}
                exact
                path={`${match.url}${guide.url}`}
                render={props => (
                  <GuideContent {...props} markdownUrl={guide.markdownUrl} />
                )}
              />
            );
          })}
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
