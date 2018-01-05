import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import computeCompoundInterest from './utils/compute-compound-interest';
import formatOutputDollars from './utils/format-output-dollars';
import errorMessages from './utils/error-messages';
import maxDollarInput from './utils/max-dollar-input';

// These return `undefined` if validation succeeds. Otherwise,
// return a string that represents the error.
const validators = {
  principal(val) {
    const valueToVerify = Number(val);

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    } else if (valueToVerify < 0) {
      return 'lessThanZero';
    } else if (valueToVerify > maxDollarInput) {
      return 'tooManyDollars';
    }
  },

  annualContribution(val) {
    const valueToVerify = Number(val);

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    } else if (valueToVerify < 0) {
      return 'lessThanZero';
    } else if (valueToVerify > maxDollarInput) {
      return 'tooManyDollars';
    }
  },

  numberOfYears(val) {
    const valueToVerify = Number(val);

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    } else if (!Number.isInteger(valueToVerify)) {
      return 'nonInteger';
    } else if (valueToVerify < 0) {
      return 'lessThanZero';
    } else if (valueToVerify >= 1000) {
      return 'tooManyYears';
    }
  },

  interestRate(val) {
    const valueToVerify = Number(val);

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    }
  }
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
                className="calculatorPage-label"
                htmlFor="compoundInterest_principal">
                Principal
              </label>
              <input
                id="compoundInterest_principal"
                className="input"
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
                className="calculatorPage-label"
                htmlFor="compoundInterest_annualContribution">
                Annual Contribution
              </label>
              <input
                id="compoundInterest_annualContribution"
                className="input"
                type="number"
                pattern="\d*"
                inputMode="numeric"
                onChange={event =>
                  this.updateValue('annualContribution', event.target.value)
                }
                value={annualContribution.value}
              />
            </div>
            <div className="calculatorPage-formRow">
              <label
                className="calculatorPage-label"
                htmlFor="compoundInterest_numberOfYears">
                Number of Years
              </label>
              <input
                id="compoundInterest_numberOfYears"
                className="input"
                type="number"
                pattern="\d*"
                inputMode="numeric"
                min="0"
                onChange={event =>
                  this.updateValue('numberOfYears', event.target.value)
                }
                value={numberOfYears.value}
              />
            </div>
            <div className="calculatorPage-formRow">
              <label
                className="calculatorPage-label"
                htmlFor="compoundInterest_interestRate">
                Interest Rate (%)
              </label>
              <input
                id="compoundInterest_interestRate"
                className="input"
                type="number"
                inputMode="numeric"
                onChange={event =>
                  this.updateValue('interestRate', event.target.value)
                }
                value={interestRate.value}
              />
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

    const validationFn = validators[valueName];
    let validationError;
    if (typeof validationFn === 'function') {
      validationError = validationFn(newValue);
    }

    let validationErrorFn = validationError && errorMessages[validationError];

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
