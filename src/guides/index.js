import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './landing-page';
import NotFound from '../common/not-found';

export default class Guides extends Component {
  render() {
    const { match } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path={`${match.url}`} component={LandingPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
