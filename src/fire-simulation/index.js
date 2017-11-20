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
    // One day, this value can be obtained through user input
    const duration = 30;
    const initialWithdrawal = 25000;
    // An array of years that we use as a starting year for cycles
    const startYears = getStartYears();
    const results = _.map(startYears, startYear => computeCycle({
      startYear,
      duration,
      initialWithdrawal
    }));
    
    console.log('results', results);
  }
}
