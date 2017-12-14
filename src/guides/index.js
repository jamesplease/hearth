import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './landing-page';

export default class Guides extends Component {
  render() {
    const { match } = this.props;

    return (
      <div>
        <Route exact path={`${match.url}`} component={LandingPage} />
      </div>
    );
  }
}
