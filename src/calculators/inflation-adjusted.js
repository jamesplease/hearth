import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import _ from 'lodash';
import marketDataByYear from './utils/market-data-by-year';
import inflationFromCpi from './utils/inflation-from-cpi';
import formatOutputDollars from './utils/format-output-dollars';
import maxDollarInput from './utils/max-dollar-input';
import getYearRange from './utils/get-year-range';
import errorMessages from './utils/error-messages';
import {
  isRequired,
  greaterThanZero,
  withinDollarLimit,
  integerRequired,
  withinYearLimit,
  numberRequired
} from './utils/validators';

function startYearBeforeEndYear(val, state) {
  const valueToVerify = Number(val);
  const { endYear } = state.inputs;

  if (Number(endYear.value) < valueToVerify) {
    return 'laterThanEnd';
  }
}

function endYearAfterStartYear(val, state) {
  const valueToVerify = Number(val);
  const { startYear } = state.inputs;

  if (Number(startYear.value) > valueToVerify) {
    return 'earlierThanStart';
  }
}

const validators = {
  initialValue: [
    isRequired,
    numberRequired,
    greaterThanZero,
    withinDollarLimit
  ],
  startYear: [
    isRequired,
    numberRequired,
    integerRequired,
    withinYearLimit,
    startYearBeforeEndYear
  ],
  endYear: [
    isRequired,
    numberRequired,
    integerRequired,
    withinYearLimit,
    endYearAfterStartYear
  ]
};

export default class InflationAdjusted extends Component {
  render() {
    const { inputs, result } = this.state;
    const { initialValue, startYear, endYear } = inputs;

    const { minYear, maxYear } = getYearRange();

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
                htmlFor="inflationAdjusted_initialValue"
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
                pattern="\d*"
                inputMode="numeric"
                step="1"
                min="0"
                max={maxDollarInput}
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
                htmlFor="inflationAdjusted_startYear"
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
                pattern="\d*"
                inputMode="numeric"
                step="1"
                min={minYear}
                max={maxYear}
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
                htmlFor="inflationAdjusted_endYear"
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
                pattern="\d*"
                inputMode="numeric"
                step="1"
                min={minYear}
                max={maxYear}
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

    const result = this.computeResult(this.state.inputs);
    this.setState({ result, marketDataYears });
  }

  // The entire form needs to be revalidated when a value changes due to the
  // fact that validation depends on multiple fields.
  updateValue = (valueName, newValue) => {
    const { inputs } = this.state;
    const currentValue = inputs[valueName];

    const validationFns = validators[valueName];

    let validationError;
    _.forEach(validationFns, fn => {
      validationError = fn(newValue, this.state);
      if (validationError) {
        return false;
      }
    });

    let validationErrorFn = validationError && errorMessages[validationError];

    const newInputObj = {
      ...currentValue,
      error: validationError ? validationError : null,
      value: newValue
    };

    let errorMsg;
    if (validationError && validationErrorFn) {
      errorMsg = validationErrorFn(valueName, newInputObj, inputs);
    } else if (validationError) {
      // The intention is that this LoC is _never_ called! There should
      // always be a more descriptive error for each type of error. But
      // just in case...
      errorMsg = 'This input is invalid.';
    } else {
      errorMsg = null;
    }

    const newInputs = {
      ...inputs,
      [valueName]: {
        ...newInputObj,
        errorMsg
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

    return formatOutputDollars(rawNumber);
  };
}
