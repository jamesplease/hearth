import React, { Component } from 'react';
import _ from 'lodash';
import getStartYears from './util/get-start-years';
import computeCycle from './util/compute-cycle';
import evaluateCycles from './util/evaluate-cycles';

function isNumber(val) {
  const valueToVerify = Number(val);

  if (!_.isFinite(valueToVerify)) {
    return 'NaN';
  }
}

const validators = {
  initialPortfolioValue: isNumber,
  firstYearWithdrawal: isNumber,
  duration: isNumber
};

export default class HistoricalSuccess extends Component {
  render() {
    const {inputs, result} = this.state;
    const {
      initialPortfolioValue,
      firstYearWithdrawal,
      duration
    } = inputs;

    return (
      <div>
        <div>
          <label>Initial Portfolio Value</label>
          <input
            id="historicalSuccess_initialPortfolioValue"
            type="number"
            inputMode="numeric"
            onChange={event => this.updateValue('initialPortfolioValue', event.target.value)}
            value={initialPortfolioValue.value}/>
        </div>
        <div>
          <label>First Year Withdrawal</label>
          <input
            id="inflationAdjusted_firstYearWithdrawal"
            type="number"
            inputMode="numeric"
            onChange={event => this.updateValue('firstYearWithdrawal', event.target.value)}
            value={firstYearWithdrawal.value}/>
        </div>
        <div>
          <label>Duration</label>
          <input
            id="inflationAdjusted_duration"
            type="number"
            inputMode="numeric"
            onChange={event => this.updateValue('duration', event.target.value)}
            value={duration.value}/>
        </div>
        <div>
          Success rate: {result}
        </div>
      </div>
    );
  }

  state = {
    inputs: {
      initialPortfolioValue: {
        value: '625000',
        error: null
      },
      firstYearWithdrawal: {
        value: '150000',
        error: null
      },
      duration: {
        value: '4',
        error: null
      },
      spendingMethod: {
        value: 'inflationAdjusted',
        error: null
      }
    },
    result: '',
  }

  componentDidMount() {
    const result = this.computeResult(this.state.inputs);
    this.setState({ result });
  }

  updateValue = (valueName, newValue) => {
    const { inputs } = this.state;
    const currentValue = inputs[valueName];

    const validationFn = validators[valueName];
    let validationError;
    if (typeof validationFn === 'function') {
      validationError = validationFn(newValue, this.state);
    }

    const newInputs = {
      ...inputs,
      [valueName]: {
        ...currentValue,
        error: validationError ? validationError : null,
        value: newValue
      }
    };

    const formInvalid = _.chain(newInputs)
      .mapValues('error')
      .some()
      .value();

    let newResult;
    if (!formInvalid) {
      newResult = this.computeResult(newInputs);
    } else {
      newResult = 'There was an error';
    }

    this.setState({
      inputs: newInputs,
      result: newResult
    });
  }

  computeResult = (inputs) => {
    const {
      duration,
      firstYearWithdrawal,
      initialPortfolioValue,
      spendingMethod
    } = inputs;

    // An array of years that we use as a starting year for cycles
    const startYears = getStartYears();

    const cycles = _.map(startYears, startYear => computeCycle({
      startYear,
      duration: Number(duration.value),
      firstYearWithdrawal: Number(firstYearWithdrawal.value),
      initialPortfolioValue: Number(initialPortfolioValue.value),
      spendingMethod: spendingMethod.value
    }));

    const results = evaluateCycles({ cycles });
    const successRate = `${(results.successRate * 100).toFixed(2)}%`;
    return successRate;
  }
}
