import React, { Component } from 'react';
import _ from 'lodash';
import getStartYears from './util/get-start-years';
import computeCycle from './util/compute-cycle';
import evaluateCycles from './util/evaluate-cycles';

export default class HistoricalSuccess extends Component {
  render() {
    return (
      <div>
        <button onClick={this.performCalculation}>
          Calculate
        </button>
      </div>
    );
  }

  performCalculation = () => {
    // One day, these value can be obtained through user input
    const duration = 3;
    const initialWithdrawal = 25000;
    const initialPortfolioValue = 625000;

    // An array of years that we use as a starting year for cycles
    const startYears = getStartYears();

    const cycles = _.map(startYears, startYear => computeCycle({
      startYear,
      duration,
      initialWithdrawal,
      initialPortfolioValue
    }));

    const results = evaluateCycles({ cycles });

    console.log('results', results, cycles);
  }
}
