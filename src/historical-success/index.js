import React, { Component } from 'react';
import _ from 'lodash';
import getStartYears from './util/get-start-years';
import computeCycle from './util/compute-cycle';

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
    const duration = 30;
    const initialWithdrawal = 25000;
    const initialPortfolioValue = 625000;

    // An array of years that we use as a starting year for cycles
    const startYears = getStartYears();
    // const results = computeCycle({
    //   startYear: startYears[0],
    //   duration: 2,
    //   initialWithdrawal,
    //   initialPortfolioValue
    // });

    const start = performance.now();
    const results = _.map(startYears, startYear => computeCycle({
      startYear,
      duration,
      initialWithdrawal,
      initialPortfolioValue
    }));
    console.log(performance.now() - start);

    console.log('results', results);
  }
}
