import React, { Component } from 'react';
import _ from 'lodash';
import getStartYears from './util/get-start-years';
import computeCycle from './util/compute-cycle';

export default class FireSimulation extends Component {
  render() {
    return (
      <div>
        <button onClick={this.performCalculation}>
          Run Simulation
        </button>
      </div>
    );
  }

  performCalculation = () => {
    // One day, this can be obtained through user input
    const duration = 30;

    const results = _.chain(getStartYears())
      .map(startYear => computeCycle({ startYear, duration }))
      .value();
    
    console.log('results', results);
  }
}
