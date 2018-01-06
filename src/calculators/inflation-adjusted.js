import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import queryString from 'query-string';
import _ from 'lodash';
import marketDataByYear from './utils/market-data-by-year';
import inflationFromCpi from './utils/inflation-from-cpi';
import formatOutputDollars from './utils/format-output-dollars';
import maxDollarInput from './utils/max-dollar-input';
import getYearRange from './utils/get-year-range';
import errorMessages from './utils/error-messages';
import {
  isRequired,
  numberRequired,
  integerRequired,
  greaterThanZero,
  withinDollarLimit,
  withinYearLimit
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
    const { inputs, result, displayingShareLink, isFormValid } = this.state;
    const { initialValue, startYear, endYear } = inputs;

    const { minYear, maxYear } = getYearRange();

    const formUrl = this.getFormUrl(inputs);

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
          <div className="calculatorPage-result">
            <div className="calculatorPage-shareResult">
              <button
                disabled={!isFormValid}
                className="calculatorPage-shareResultBtn"
                onClick={this.clickShareButton}>
                <i className="zmdi zmdi-link calculatorPage-shareResultIcon" />
                Share
              </button>
              {displayingShareLink && (
                <Fragment>
                  <div
                    className="overlay"
                    onClick={() =>
                      this.setState({ displayingShareLink: false })
                    }
                  />
                  <div className="calculatorPage-shareResultLink">
                    Share a link to this result:
                    <input
                      ref={this.shareResultLinkRef}
                      type="text"
                      value={formUrl}
                      readOnly
                      onClick={event => event.target.select()}
                      className="calculatorPage-shareResultInput"
                    />
                  </div>
                </Fragment>
              )}
            </div>
            <span className="calculatorPage-resultText">{result}</span>
          </div>
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
    isFormValid: true,
    result: '',
    displayingShareLink: false
  };

  componentDidMount() {
    const { location } = this.props;
    const { query } = location;

    // We read the input values from the query parameters to set the initial
    // inputs. This allows users to bookmark their calculations
    const initialInputs = _.mapValues(this.state.inputs, (value, key) => {
      const queryParamValue = query[key];
      if (queryParamValue !== undefined) {
        return {
          ...value,
          value: queryParamValue
        };
      } else {
        return value;
      }
    });

    const newFormState = this.getUpdatedFormState(initialInputs);
    this.setState(newFormState);
  }

  getUpdatedFormState(inputs) {
    const errors = this.getInputErrors(inputs);
    // I could avoid this `merge` if `errors` just returned the inputs as well
    const newInputs = _.merge(inputs, errors);

    const formIsInvalid = _.chain(newInputs)
      .mapValues('error')
      .some()
      .value();

    let newResult;
    if (!formIsInvalid) {
      newResult = this.computeResult(newInputs);
    } else {
      newResult = '–';
    }

    return {
      isFormValid: !formIsInvalid,
      inputs: newInputs,
      result: newResult
    };
  }

  getInputErrors(inputs) {
    // This can be avoided if I instead pass just the inputs to the
    // validation function, rather than the entire state (which makes more sense I think)
    const stateToPass = _.merge({}, this.state, {
      inputs
    });

    return _.mapValues(inputs, (inputObj, inputName) => {
      const validationFns = validators[inputName];

      let validationError;
      _.forEach(validationFns, fn => {
        validationError = fn(inputObj.value, stateToPass);
        if (validationError) {
          return false;
        }
      });

      if (!validationError) {
        return {
          error: null,
          errorMsg: null
        };
      }

      let validationErrorFn = errorMessages[validationError];

      let validationErrorMsg;
      if (validationErrorFn) {
        validationErrorMsg = validationErrorFn(inputName, inputObj, inputs);
      } else {
        validationErrorMsg = null;
      }

      return {
        error: validationError,
        errorMsg: validationErrorMsg
      };
    });
  }

  // The entire form needs to be revalidated when a value changes due to the
  // fact that validation depends on multiple fields.
  updateValue = (valueName, newValue) => {
    const { inputs } = this.state;

    const newInputs = _.merge({}, inputs, {
      [valueName]: {
        value: newValue
      }
    });

    const newFormState = this.getUpdatedFormState(newInputs);
    this.setState({
      ...newFormState,
      displayingShareLink: false
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

  getFormUrl = inputs => {
    const { location } = this.props;
    const { pathname } = location;

    const inputValues = _.mapValues(inputs, 'value');
    const qs = queryString.stringify(inputValues);

    return `${window.location.origin}${pathname}?${qs}`;
  };

  clickShareButton = () => {
    const { displayingShareLink } = this.state;

    this.setState({ displayingShareLink: !displayingShareLink }, () => {
      if (!displayingShareLink && this.shareResultLinkEl) {
        this.shareResultLinkEl.select();
      }
    });
  };

  shareResultLinkRef = ref => {
    this.shareResultLinkEl = ref;
  };
}
