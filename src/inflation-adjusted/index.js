import React, { Component } from 'react';
import _ from 'lodash';
import marketDataByYear from '../common/util/market-data-by-year';
import inflationFromCpi from '../common/util/inflation-from-cpi';

const validators = {
  initialValue(val) {
    const valueToVerify = Number(val);

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    }
  },

  startYear(val, state) {
    const valueToVerify = Number(val);
    const { minYear, maxYear } = state;

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    } else if (valueToVerify > maxYear) {
      return 'tooLarge';
    } else if (valueToVerify < minYear) {
      return 'tooSmall';
    }

    // Also need to make sure this is <= endYear
  },

  endYear(val, state) {
    const valueToVerify = Number(val);
    const { minYear, maxYear } = state;

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    } else if (valueToVerify > maxYear) {
      return 'tooLarge';
    } else if (valueToVerify < minYear) {
      return 'tooSmall';
    }
    
    // Also need to make sure this is >= startYear
  },
};

export default class InflationAdjusted extends Component {
  render() {
    const {inputs, result} = this.state;
    const {
      initialValue,
      startYear,
      endYear
    } = inputs;

    return (
      <div className="inflationAdjusted">
        <div>
          <label>Initial Value</label>
          <input
            id="inflationAdjusted_initialValue"
            type="number"
            inputMode="numeric"
            onChange={event => this.updateValue('initialValue', event.target.value)}
            value={initialValue.value}/>
        </div>
        <div>
          <label>Start Year</label>
          <input
            id="inflationAdjusted_startYear"
            type="number"
            inputMode="numeric"
            onChange={event => this.updateValue('startYear', event.target.value)}
            value={startYear.value}/>
        </div>
        <div>
          <label>End Year</label>
          <input
            id="inflationAdjusted_endYear"
            type="number"
            inputMode="numeric"
            onChange={event => this.updateValue('endYear', event.target.value)}
            value={endYear.value}/>
        </div>
        <div>
          Result: {result}
        </div>
      </div>
    );
  }

  state = {
    inputs: {
      initialValue: {
        value: '10000',
        error: null
      },
      startYear: {
        value: '2007',
        error: null
      },
      endYear: {
        value: '2017',
        error: null
      }
    },
    result: '',
    marketDataYears: []
  }

  componentDidMount() {
    const marketData = marketDataByYear();
    const marketDataYears = _.chain(marketData)
      .map(data => Number(data.year))
      .value();

    const minYear = Math.min(...marketDataYears);
    const maxYear = Math.max(...marketDataYears);

    const result = this.computeResult(this.state.inputs);
    this.setState({ result, marketDataYears, minYear, maxYear });
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
    const { initialValue, startYear, endYear } = inputs;

    const marketData = marketDataByYear();
    const startCpi = marketData[startYear.value].cpi;
    const endCpi = marketData[endYear.value].cpi;

    const inflation = inflationFromCpi({startCpi, endCpi});
    return Number(initialValue.value) * inflation;
  }
}
