import React, { Component } from 'react';
import inflationFromCpi from './util/inflation-from-cpi';
import yearsForDuration from './util/years-for-duration';

export default class FireSimulation extends Component {
  render() {
    return (
      <div>
        hello
      </div>
    );
  }

  componentDidMount() {
    const years = yearsForDuration(30);
    const inflation = inflationFromCpi({
      startCpi: 12.33,
      endCpi: 10
    });
  }
}
