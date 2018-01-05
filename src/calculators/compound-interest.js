import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import _ from 'lodash';
import computeCompoundInterest from './utils/compute-compound-interest';
import formatOutputDollars from './utils/format-output-dollars';
import errorMessages from './utils/error-messages';
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

export default class CompoundInterest extends Component {
  render() {
    const { inputs, result } = this.state;
    const {
      principal,
      annualContribution,
      numberOfYears,
      interestRate
    } = inputs;

    return (
      <form className="compoundInterest calculatorPage">
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
          <div className="calculatorPage-calculator">
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
                pattern="\d*"
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
                pattern="\d*"
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
          </div>
          <div className="calculatorPage-result">{result}</div>
        </div>
      </form>
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
    result: ''
  };

  componentDidMount() {
    const result = this.computeResult(this.state.inputs);

    this.setState({ result });
  }

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
      newResult = '-';
    }

    this.setState({
      inputs: newInputs,
      result: newResult
    });
  };

  computeResult = inputs => {
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
  };
}
