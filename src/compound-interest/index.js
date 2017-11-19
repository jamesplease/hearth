import React, { Component } from 'react';
import _ from 'lodash';
import './index.css';
import compoundInterest from './util/compound-interest';

// These return `undefined` if validation succeeds. Otherwise,
// return a string that represents the error.
const validators = {
  principal(val) {
    const valueToVerify = Number(val);

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    }
  },

  annualContribution(val) {
    const valueToVerify = Number(val);

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    }
  },

  numberOfYears(val) {
    const valueToVerify = Number(val);

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    }

    else if (!Number.isInteger(valueToVerify)) {
      return 'nonInteger';
    }

    else if (valueToVerify < 0) {
      return 'negativeNumber';
    }
  },

  interestRate(val) {
    const valueToVerify = Number(val);

    if (!_.isFinite(valueToVerify)) {
      return 'NaN';
    }
  },
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

    const formInvalid = _.chain(inputs)
      .mapValues('error')
      .some()
      .value();

    return (
      <form className="compoundInterest">
        <div className="compoundInterest-inputContainer">
          <label className="compoundInterest-label">
            Principal
          </label>
          <input
            className="compoundInterest-input"
            type="text"
            onChange={event => this.updateValue('principal', event.target.value)}
            value={principal.value}/>
          <label className="compoundInterest-label">
            Annual Contribution
          </label>
          <input
            className="compoundInterest-input"
            type="text"
            onChange={event => this.updateValue('annualContribution', event.target.value)}
            value={annualContribution.value}/>
          <label className="compoundInterest-label">
            Number of Years
          </label>
          <input
            className="compoundInterest-input"
            type="text"
            onChange={event => this.updateValue('numberOfYears', event.target.value)}
            value={numberOfYears.value}/>
          <label className="compoundInterest-label">
            Interest Rate
          </label>
          <input
            className="compoundInterest-input"
            type="text"
            onChange={event => this.updateValue('interestRate', event.target.value)}
            value={interestRate.value}/>
        </div>
        <div className="compoundInterest-result">
          {result}
        </div>
        <button onClick={this.computeResult} disabled={formInvalid}>
          Compute
        </button>
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
      },
    },
    result: ''
  }

  updateValue = (valueName, newValue) => {
    const currentValue = this.state.inputs[valueName];

    const validationFn = validators[valueName];
    let validationError;
    if (typeof validationFn === 'function') {
      validationError = validationFn(newValue);
    }

    this.setState({
      inputs: {
        ...this.state.inputs,
        [valueName]: {
          ...currentValue,
          error: validationError ? validationError : null,
          value: newValue
        }
      }
    });
  }

  computeResult = (event) => {
    event.preventDefault();

    const { inputs } = this.state;
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

    let result = compoundInterest({
      principal: Number(principal.value),
      annualContribution: Number(annualContribution.value),
      numberOfYears: Number(numberOfYears.value),
      contributionsMadeAtStart: Number(contributionsMadeAtStart.value),
      interestRate: decimalInterest,
    });

    // There shouldn't be any problems with the utility, but just in case we show
    // a better error message to the user.
    if (Number.isNaN(result)) {
      result = 'There was an error.';
    } else {
      result = Number(result).toFixed(2);
    }

    this.setState({ result });
  }
}