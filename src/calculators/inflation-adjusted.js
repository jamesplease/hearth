import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import _ from 'lodash';
import marketDataByYear from './utils/market-data-by-year';
import inflationFromCpi from './utils/inflation-from-cpi';

// These should be pulled from the market data at some point, but for
// now the values are hard-coded.
const MIN_YEAR = 1871;
const MAX_YEAR = 2017;

const ONE_BILLION = 1000000000;
const ONE_TRILLION = ONE_BILLION * 1000;
const ONE_QUADRILLION = ONE_TRILLION * 1000;
const ONE_QUINTILLION = ONE_QUADRILLION * 1000;
// The GDP of the USA in 2016 was 18 trillion
const MAX_DOLLARS = ONE_TRILLION * 100;

const mapError = {
  tooSmall(inputName) {
    const displayName = _.startCase(inputName);
    return `${displayName} must be later than ${MIN_YEAR - 1}.`;
  },
  tooLarge(inputName, inputValue, inputs) {
    const displayName = _.startCase(inputName);
    return `${displayName} must be earlier than ${MAX_YEAR + 1}.`;
  },
  lessThanZero(inputName) {
    const displayName = _.startCase(inputName);
    return `${displayName} must be greater than 0.`;
  },
  NaN(inputName) {
    const displayName = _.startCase(inputName);
    return `${displayName} must be a number.`;
  },
  nonInteger(inputName) {
    const displayName = _.startCase(inputName);
    return `${displayName} must be an integer.`;
  },
  tooManyDollars(inputName) {
    const displayName = _.startCase(inputName);
    return `${displayName} must be less than 100 trillion dollars.`;
  },
  earlierThanEnd() {
    return 'The Start Year must be earlier than the End Year.';
  },
  laterThanStart() {
    return 'The End Year must be later than the Start Year.';
  }
};

const validators = {
  initialValue(val) {
    const valueToVerify = Number(val);

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    } else if (valueToVerify < 0) {
      return 'lessThanZero';
    } else if (valueToVerify > MAX_DOLLARS) {
      return 'tooManyDollars';
    }
  },

  startYear(val, state) {
    const valueToVerify = Number(val);
    const { minYear, maxYear, inputs } = state;
    const { endYear } = inputs;

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    } else if (!Number.isInteger(valueToVerify)) {
      return 'nonInteger';
    } else if (valueToVerify > maxYear) {
      return 'tooLarge';
    } else if (valueToVerify < minYear) {
      return 'tooSmall';
    } else if (Number(endYear.value) < valueToVerify) {
      return 'earlierThanEnd';
    }
  },

  endYear(val, state) {
    const valueToVerify = Number(val);
    const { minYear, maxYear, inputs } = state;
    const { startYear } = inputs;

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    } else if (!Number.isInteger(valueToVerify)) {
      return 'nonInteger';
    } else if (valueToVerify > maxYear) {
      return 'tooLarge';
    } else if (valueToVerify < minYear) {
      return 'tooSmall';
    } else if (Number(startYear.value) > valueToVerify) {
      return 'laterThanStart';
    }
  }
};

export default class InflationAdjusted extends Component {
  render() {
    const { inputs, result } = this.state;
    const { initialValue, startYear, endYear } = inputs;

    return (
      <div className="inflationAdjusted calculatorPage">
        <Link
          to="/calculators"
          className="navBackLink calculatorPage-navBackLink">
          <i className="zmdi zmdi-chevron-left navBackLink-icon" />
          Calculators
        </Link>
        <h1 className="primaryHeader calculatorPage-primaryHeader">
          Inflation Adjusted
        </h1>
        <div className="panel calculatorPage-contents">
          <div className="calculatorPage-calculator">
            <div className="calculatorPage-formRow">
              <label
                className={classnames('form-label calculatorPage-label', {
                  'form-label_error': initialValue.error
                })}>
                Initial Value
              </label>
              <input
                className={classnames('input calculatorPage-input', {
                  input_error: initialValue.error
                })}
                id="inflationAdjusted_initialValue"
                type="number"
                inputMode="numeric"
                step="1"
                min="0"
                max={MAX_DOLLARS}
                onChange={event =>
                  this.updateValue('initialValue', event.target.value)
                }
                value={initialValue.value}
              />
              {initialValue.errorMsg && (
                <div className="calculatorPage-errorMsg">
                  {initialValue.errorMsg}
                </div>
              )}
            </div>
            <div className="calculatorPage-formRow">
              <label
                className={classnames('form-label calculatorPage-label', {
                  'form-label_error': startYear.error
                })}>
                Start Year
              </label>
              <input
                className={classnames('input calculatorPage-input', {
                  input_error: startYear.error
                })}
                id="inflationAdjusted_startYear"
                type="number"
                inputMode="numeric"
                step="1"
                min={MIN_YEAR}
                max={MAX_YEAR}
                onChange={event =>
                  this.updateValue('startYear', event.target.value)
                }
                value={startYear.value}
              />
              {startYear.errorMsg && (
                <div className="calculatorPage-errorMsg">
                  {startYear.errorMsg}
                </div>
              )}
            </div>
            <div className="calculatorPage-formRow">
              <label
                className={classnames('form-label calculatorPage-label', {
                  'form-label_error': endYear.error
                })}>
                End Year
              </label>
              <input
                className={classnames('input calculatorPage-input', {
                  input_error: endYear.error
                })}
                id="inflationAdjusted_endYear"
                type="number"
                inputMode="numeric"
                step="1"
                min={MIN_YEAR}
                max={MAX_YEAR}
                onChange={event =>
                  this.updateValue('endYear', event.target.value)
                }
                value={endYear.value}
              />
              {endYear.errorMsg && (
                <div className="calculatorPage-errorMsg">
                  {endYear.errorMsg}
                </div>
              )}
            </div>
          </div>
          <div className="calculatorPage-result">{result}</div>
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
  };

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

    let validationErrorFn = validationError && mapError[validationError];

    const newInputObj = {
      ...currentValue,
      error: validationError ? validationError : null,
      value: newValue
    };

    const newInputs = {
      ...inputs,
      [valueName]: {
        ...newInputObj,
        errorMsg: validationErrorFn
          ? validationErrorFn(valueName, newInputObj, inputs)
          : null
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
      newResult = '–';
    }

    this.setState({
      inputs: newInputs,
      result: newResult
    });
  };

  computeResult = inputs => {
    const { initialValue, startYear, endYear } = inputs;

    const marketData = marketDataByYear();
    const startCpi = marketData[startYear.value].cpi;
    const endCpi = marketData[endYear.value].cpi;

    const inflation = inflationFromCpi({ startCpi, endCpi });
    const rawNumber = Number(initialValue.value) * inflation;

    let adjustedNumber;
    let suffix = '';

    if (rawNumber >= ONE_QUINTILLION) {
      adjustedNumber = rawNumber / ONE_QUINTILLION;
      suffix = ' quintillion';
    } else if (rawNumber >= ONE_QUADRILLION) {
      adjustedNumber = rawNumber / ONE_QUADRILLION;
      suffix = ' quadrillion';
    } else if (rawNumber >= ONE_TRILLION) {
      adjustedNumber = rawNumber / ONE_TRILLION;
      suffix = ' trillion';
    } else if (rawNumber >= ONE_BILLION) {
      adjustedNumber = rawNumber / ONE_BILLION;
      suffix = ' billion';
    } else {
      adjustedNumber = rawNumber;
    }

    return `$${adjustedNumber.toLocaleString('en', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    })}${suffix}`;
  };
}
