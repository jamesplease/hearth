import React, { Component } from 'react';
import _ from 'lodash';
import './index.css';
import getStartYears from './util/get-start-years';
import computeCycle from './util/compute-cycle';
import evaluateCycles from './util/evaluate-cycles';
import InputWithUnit from '../inputs/input-with-unit';

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

function formatNumber(val, unit) {
  const naiveNumber = Number(val);

  if (!_.isFinite(naiveNumber)) {
    return 'Number required';
  }

  const number = Number(val).toLocaleString('en', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  });

  if (unit === '$') {
    return `${unit}${number}`;
  } else {
    return `${number}${unit}`;
  }
}

function formatYears(val) {
  return `${val} Years`;
}

export default class HistoricalSuccess extends Component {
  render() {
    const { inputs, result } = this.state;
    const { initialPortfolioValue, firstYearWithdrawal, duration } = inputs;

    return (
      <div className="historicalSuccess">
        <label className="historicalSuccess-label">
          Initial Portfolio Value
        </label>
        <div className="historicalSuccess-inputContainer">
          <InputWithUnit
            value={initialPortfolioValue.value}
            unit="$"
            inputProps={{
              type: 'number',
              inputMode: 'numeric',
              id: 'historicalSuccess_initialPortfolioValue'
            }}
            onChange={value => this.updateValue('initialPortfolioValue', value)}
            unitOptions={['$', '%']}
            formatValue={formatNumber}
          />
        </div>
        <label className="historicalSuccess-label">First Year Withdrawal</label>
        <div className="historicalSuccess-inputContainer">
          <InputWithUnit
            value={firstYearWithdrawal.value}
            unit="$"
            inputProps={{
              type: 'number',
              inputMode: 'numeric',
              id: 'inflationAdjusted_firstYearWithdrawal'
            }}
            onChange={value => this.updateValue('firstYearWithdrawal', value)}
            unitOptions={['$', '%']}
            formatValue={formatNumber}
          />
        </div>
        <label className="historicalSuccess-label">Duration</label>
        <div className="historicalSuccess-inputContainer">
          <InputWithUnit
            value={duration.value}
            unit="Years"
            inputProps={{
              type: 'number',
              inputMode: 'numeric',
              id: 'inflationAdjusted_duration'
            }}
            onChange={value => this.updateValue('duration', value)}
            unitOptions={['$', '%']}
            formatValue={formatYears}
          />
        </div>
        <div>Success rate: {result}</div>
      </div>
    );
  }

  state = {
    test: '1000',
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
    result: ''
  };

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
  };

  computeResult = inputs => {
    const {
      duration,
      firstYearWithdrawal,
      initialPortfolioValue,
      spendingMethod
    } = inputs;

    // An array of years that we use as a starting year for cycles
    const startYears = getStartYears();

    const cycles = _.map(startYears, startYear =>
      computeCycle({
        startYear,
        duration: Number(duration.value),
        firstYearWithdrawal: Number(firstYearWithdrawal.value),
        initialPortfolioValue: Number(initialPortfolioValue.value),
        spendingMethod: spendingMethod.value
      })
    );

    const results = evaluateCycles({ cycles });
    const successRate = `${(results.successRate * 100).toFixed(2)}%`;
    return successRate;
  };
}
