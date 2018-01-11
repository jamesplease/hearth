import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import _ from 'lodash';
import marketDataByYear from './utils/market-data-by-year';
import inflationFromCpi from './utils/inflation-from-cpi';
import formatOutputDollars from './utils/format-output-dollars';
import maxDollarInput from './utils/max-dollar-input';
import getYearRange from './utils/get-year-range';
import { getUpdatedFormState, getFormUrl } from './utils/form-utils';
import {
  isRequired,
  numberRequired,
  integerRequired,
  greaterThanZero,
  withinDollarLimit,
  withinYearLimit
} from './utils/validators';

function startYearBeforeEndYear(val, inputs) {
  const valueToVerify = Number(val);
  const { endYear } = inputs;

  if (Number(endYear.value) < valueToVerify) {
    return 'laterThanEnd';
  }
}

function endYearAfterStartYear(val, inputs) {
  const valueToVerify = Number(val);
  const { startYear } = inputs;

  if (Number(startYear.value) > valueToVerify) {
    return 'earlierThanStart';
  }
}

function computeResult(inputs) {
  const { startValue, startYear, endYear } = inputs;

  const marketData = marketDataByYear();
  const startCpi = marketData[startYear.value].cpi;
  const endCpi = marketData[endYear.value].cpi;

  const inflation = inflationFromCpi({ startCpi, endCpi });
  const rawNumber = Number(startValue.value) * inflation;

  return formatOutputDollars(rawNumber);
}

const validators = {
  startValue: [isRequired, numberRequired, greaterThanZero, withinDollarLimit],
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
    const { location } = this.props;
    const { inputs, result, displayingShareLink, isFormValid } = this.state;
    const { startValue, startYear, endYear } = inputs;

    const { minYear, maxYear } = getYearRange();
    const formUrl = getFormUrl(location, inputs);

    return (
      <div className="inflationAdjusted calculatorPage">
        <Link
          to="/calculators"
          className="navBackLink calculatorPage-navBackLink">
          <i className="mdi mdi-chevron-left navBackLink-icon" />
          Calculators
        </Link>
        <h1 className="primaryHeader calculatorPage-primaryHeader">
          Inflation Adjusted
        </h1>
        <div className="panel calculatorPage-contents">
          <form className="calculatorPage-calculator">
            <div className="calculatorPage-formRow">
              <label
                htmlFor="inflationAdjusted_startValue"
                className={classnames('form-label calculatorPage-label', {
                  'form-label_error': startValue.error
                })}>
                Start Value ($)
              </label>
              <input
                className={classnames('input calculatorPage-input', {
                  input_error: startValue.error
                })}
                id="inflationAdjusted_startValue"
                type="number"
                inputMode="numeric"
                step="1"
                min="0"
                max={maxDollarInput}
                onChange={event =>
                  this.updateValue('startValue', event.target.value)
                }
                value={startValue.value}
              />
              {startValue.errorMsg && (
                <div className="calculatorPage-errorMsg">
                  {startValue.errorMsg}
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
          </form>
          <div className="calculatorPage-result">
            <div className="calculatorPage-shareResult">
              <button
                disabled={!isFormValid}
                className="calculatorPage-shareResultBtn"
                onClick={this.clickShareButton}>
                <i className="mdi mdi-link calculatorPage-shareResultIcon" />
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
                      onChange={() => {}}
                      ref={this.shareResultLinkRef}
                      type="text"
                      value={formUrl}
                      onClick={event => event.target.select()}
                      className="calculatorPage-shareResultInput"
                    />
                  </div>
                </Fragment>
              )}
            </div>
            <span className="calculatorPage-resultText">{result}</span>
            {isFormValid && (
              <span className="calculatorPage-summaryText">
                {result} in the year {endYear.value} can buy the same amount of
                things as {formatOutputDollars(startValue.value)} could buy in
                the year {startYear.value}.
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  state = {
    inputs: {
      startValue: {
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

    const newFormState = getUpdatedFormState({
      inputs: initialInputs,
      validators,
      computeResult
    });
    this.setState(newFormState);
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

    const newFormState = getUpdatedFormState({
      inputs: newInputs,
      computeResult,
      validators
    });
    this.setState({
      ...newFormState,
      displayingShareLink: false
    });
  };

  clickShareButton = event => {
    const { displayingShareLink } = this.state;
    event.preventDefault();

    this.setState({ displayingShareLink: !displayingShareLink }, () => {
      if (!displayingShareLink && this.shareResultLinkEl) {
        // This doesn't select the text on iOS. Instead, users must manually
        // highlight the text and copy it.
        // Android testing is needed.
        this.shareResultLinkEl.select();
      }
    });
  };

  shareResultLinkRef = ref => {
    this.shareResultLinkEl = ref;
  };
}
