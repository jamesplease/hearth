import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import _ from 'lodash';
import computeCompoundInterest from './utils/compute-compound-interest';
import formatOutputDollars from './utils/format-output-dollars';
import { getUpdatedFormState, getFormUrl } from './utils/form-utils';
import {
  isRequired,
  numberRequired,
  greaterThanZero,
  withinDollarLimit,
  integerRequired
} from './utils/validators';

// These return `undefined` if validation succeeds. Otherwise,
// return a string that represents the error.
const validators = {
  principal: [isRequired, numberRequired, greaterThanZero, withinDollarLimit],
  annualContribution: [
    isRequired,
    numberRequired,
    greaterThanZero,
    withinDollarLimit
  ],
  // Add numberLimit: 1000
  numberOfYears: [isRequired, numberRequired, integerRequired, greaterThanZero],
  // Add numberLimit: 1000000
  interestRate: [isRequired, numberRequired]
};

function computeResult(inputs) {
  const {
    principal,
    annualContribution,
    numberOfYears,
    interestRate,
    contributionsMadeAtStart
  } = inputs;

  // Users input the interest rate as a percentage, such as 7%.
  // We convert that to the decimal form for the computation.
  const decimalInterest = Number(interestRate.value) / 100;

  let result = computeCompoundInterest({
    principal: Number(principal.value),
    annualContribution: Number(annualContribution.value),
    numberOfYears: Number(numberOfYears.value),
    contributionsMadeAtStart: Number(contributionsMadeAtStart.value),
    interestRate: decimalInterest
  });

  return formatOutputDollars(result);
}

export default class CompoundInterest extends Component {
  render() {
    const { location } = this.props;
    const { inputs, result, displayingShareLink, isFormValid } = this.state;
    const {
      principal,
      annualContribution,
      numberOfYears,
      interestRate
    } = inputs;

    const formUrl = getFormUrl(location, inputs);

    return (
      <div className="compoundInterest calculatorPage">
        <Link
          to="/calculators"
          className="navBackLink calculatorPage-navBackLink">
          <i className="zmdi zmdi-chevron-left navBackLink-icon" />
          Calculators
        </Link>
        <h1 className="primaryHeader calculatorPage-primaryHeader">
          Compound Interest
        </h1>
        <div className="panel calculatorPage-contents">
          <form className="calculatorPage-calculator">
            <div className="calculatorPage-formRow">
              <label
                className={classnames('form-label calculatorPage-label', {
                  'form-label_error': principal.error
                })}
                htmlFor="compoundInterest_principal">
                Principal
              </label>
              <input
                id="compoundInterest_principal"
                className={classnames('input calculatorPage-input', {
                  input_error: principal.error
                })}
                type="number"
                inputMode="numeric"
                onChange={event =>
                  this.updateValue('principal', event.target.value)
                }
                value={principal.value}
              />
              {principal.errorMsg && (
                <div className="calculatorPage-errorMsg">
                  {principal.errorMsg}
                </div>
              )}
            </div>
            <div className="calculatorPage-formRow">
              <label
                className={classnames('form-label calculatorPage-label', {
                  'form-label_error': annualContribution.error
                })}
                htmlFor="compoundInterest_annualContribution">
                Annual Contribution
              </label>
              <input
                id="compoundInterest_annualContribution"
                className={classnames('input calculatorPage-input', {
                  input_error: annualContribution.error
                })}
                type="number"
                inputMode="numeric"
                onChange={event =>
                  this.updateValue('annualContribution', event.target.value)
                }
                value={annualContribution.value}
              />
              {annualContribution.errorMsg && (
                <div className="calculatorPage-errorMsg">
                  {annualContribution.errorMsg}
                </div>
              )}
            </div>
            <div className="calculatorPage-formRow">
              <label
                className={classnames('form-label calculatorPage-label', {
                  'form-label_error': numberOfYears.error
                })}
                htmlFor="compoundInterest_numberOfYears">
                Number of Years
              </label>
              <input
                id="compoundInterest_numberOfYears"
                className={classnames('input calculatorPage-input', {
                  input_error: numberOfYears.error
                })}
                type="number"
                pattern="\d*"
                inputMode="numeric"
                min="0"
                onChange={event =>
                  this.updateValue('numberOfYears', event.target.value)
                }
                value={numberOfYears.value}
              />
              {numberOfYears.errorMsg && (
                <div className="calculatorPage-errorMsg">
                  {numberOfYears.errorMsg}
                </div>
              )}
            </div>
            <div className="calculatorPage-formRow">
              <label
                className={classnames('form-label calculatorPage-label', {
                  'form-label_error': interestRate.error
                })}
                htmlFor="compoundInterest_interestRate">
                Interest Rate (%)
              </label>
              <input
                id="compoundInterest_interestRate"
                className={classnames('input calculatorPage-input', {
                  input_error: interestRate.error
                })}
                type="number"
                inputMode="numeric"
                onChange={event =>
                  this.updateValue('interestRate', event.target.value)
                }
                value={interestRate.value}
              />
              {interestRate.errorMsg && (
                <div className="calculatorPage-errorMsg">
                  {interestRate.errorMsg}
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
                      onChange={() => {}}
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
      principal: {
        value: '10000',
        error: null
      },
      interestRate: {
        value: '7',
        error: null
      },
      annualContribution: {
        value: '1000',
        error: null
      },
      numberOfYears: {
        value: '10',
        error: null
      },
      contributionsMadeAtStart: {
        value: false,
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
      computeResult,
      validators
    });
    this.setState(newFormState);
  }

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
