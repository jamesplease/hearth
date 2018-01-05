import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import CalculatorResultsModal from './calculator-results-modal';
import getStartYears from './utils/get-start-years';
import computeCycle from './utils/compute-cycle';
import evaluateCycles from './utils/evaluate-cycles';
import { fromInvestments } from './utils/normalize-portfolio';
import maxDollarInput from './utils/max-dollar-input';
import errorMessages from './utils/error-messages';
import {
  isRequired,
  numberRequired,
  integerRequired,
  greaterThanZero,
  withinDollarLimit
} from './utils/validators';

const validators = {
  // Ensure this is larger than firstYearWithdrawal
  stockInvestmentValue: [
    isRequired,
    numberRequired,
    greaterThanZero,
    withinDollarLimit
  ],
  // Ensure this is smaller than stockInvestmentValue
  firstYearWithdrawal: [
    isRequired,
    numberRequired,
    greaterThanZero,
    withinDollarLimit
  ],
  // Add limit: 300
  duration: [isRequired, numberRequired, integerRequired, greaterThanZero]
};

const summaryMaps = {
  SUCCESSFUL: {
    emoji: '1f44d-1f3fe.png'
  },
  UNSUCCESSFUL: {
    emoji: '26a0-fe0f.png'
  }
};

export default class HistoricalSuccess extends Component {
  render() {
    const { inputs, result, isResultsModalOpen } = this.state;
    const { stockInvestmentValue, firstYearWithdrawal, duration } = inputs;
    const { summary, successRate } = result;

    const summaryText = `This portfolio succeeded ${successRate} of the time.`;

    let summaryImg;
    if (summary) {
      const resultData = summaryMaps[summary];
      summaryImg = resultData.emoji;
    } else {
      summaryImg = '';
    }

    return (
      <div className="historicalSuccess calculatorPage">
        <Link
          to="/calculators"
          className="navBackLink calculatorPage-navBackLink">
          <i className="zmdi zmdi-chevron-left navBackLink-icon" />
          Calculators
        </Link>
        <h1 className="primaryHeader calculatorPage-primaryHeader">
          Historical Success
        </h1>
        <div className="panel calculatorPage-contents">
          <div className="calculatorPage-calculator">
            <div className="calculatorPage-formRow">
              <label
                className={classnames('form-label calculatorPage-label', {
                  'form-label_error': stockInvestmentValue.error
                })}
                htmlFor="historicalSuccess_stockInvestmentValue">
                Initial Portfolio Value
              </label>
              <input
                value={stockInvestmentValue.value}
                className={classnames('input calculatorPage-input', {
                  input_error: stockInvestmentValue.error
                })}
                type="number"
                pattern="\d*"
                inputMode="numeric"
                min="0"
                max={maxDollarInput}
                id="historicalSuccess_stockInvestmentValue"
                onChange={event =>
                  this.updateValue('stockInvestmentValue', event.target.value)
                }
              />
              {stockInvestmentValue.errorMsg && (
                <div className="calculatorPage-errorMsg">
                  {stockInvestmentValue.errorMsg}
                </div>
              )}
            </div>
            <div className="calculatorPage-formRow">
              <label
                className={classnames('form-label calculatorPage-label', {
                  'form-label_error': firstYearWithdrawal.error
                })}
                htmlFor="inflationAdjusted_firstYearWithdrawal">
                First Year Withdrawal
              </label>
              <input
                value={firstYearWithdrawal.value}
                className={classnames('input calculatorPage-input', {
                  input_error: firstYearWithdrawal.error
                })}
                type="number"
                pattern="\d*"
                min="0"
                max={maxDollarInput}
                inputMode="numeric"
                id="inflationAdjusted_firstYearWithdrawal"
                onChange={event =>
                  this.updateValue('firstYearWithdrawal', event.target.value)
                }
              />
              {firstYearWithdrawal.errorMsg && (
                <div className="calculatorPage-errorMsg">
                  {firstYearWithdrawal.errorMsg}
                </div>
              )}
            </div>
            <div className="calculatorPage-formRow">
              <label
                className={classnames('form-label calculatorPage-label', {
                  'form-label_error': duration.error
                })}
                htmlFor="inflationAdjusted_duration">
                Duration
              </label>
              <input
                value={duration.value}
                className={classnames('input calculatorPage-input', {
                  input_error: duration.error
                })}
                type="number"
                pattern="\d*"
                inputMode="numeric"
                step="1"
                min="0"
                max="300"
                id="inflationAdjusted_duration"
                onChange={event =>
                  this.updateValue('duration', event.target.value)
                }
              />
              {duration.errorMsg && (
                <div className="calculatorPage-errorMsg">
                  {duration.errorMsg}
                </div>
              )}
            </div>
          </div>
          <div className="calculatorPage-expandingResult">
            <span>
              {summaryImg && (
                <img
                  alt=""
                  className="emoji-img calculatorPage-emojiResult"
                  src={`/${summaryImg}`}
                />
              )}
            </span>
            <span>{summaryText}</span>
            <button
              onClick={() => this.setState({ isResultsModalOpen: true })}
              className="calculatorPage-viewResultsBtn">
              View results
            </button>
          </div>
        </div>
        <CalculatorResultsModal
          active={isResultsModalOpen}
          onClose={() => this.setState({ isResultsModalOpen: false })}
        />
      </div>
    );
  }

  state = {
    test: '1000',
    inputs: {
      stockInvestmentValue: {
        value: '625000',
        error: null
      },
      firstYearWithdrawal: {
        value: '25000',
        error: null
      },
      duration: {
        value: '30',
        error: null
      },
      spendingMethod: {
        value: 'inflationAdjusted',
        error: null
      }
    },
    result: {
      successRate: '',
      dipRate: '',
      summary: '',
      lowestDippedValue: {
        year: '',
        startYear: '',
        value: ''
      }
    },
    isResultsModalOpen: false
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
      stockInvestmentValue,
      spendingMethod
    } = inputs;

    // An array of years that we use as a starting year for cycles
    const startYears = getStartYears();

    const dipPercentage = 0.9;

    const rebalancePortfolioAnnually = false;
    const investments = [
      {
        type: 'equity',
        fees: 0.0,
        value: Number(stockInvestmentValue.value),
        percentage: 1
      }
    ];

    const spendingConfiguration = {
      spendingMethod: spendingMethod.value,
      firstYearWithdrawal: Number(firstYearWithdrawal.value)
    };

    //
    // The example configuration below demonstrates using the percentOfPortfolio
    // withdrawal method
    //
    // const spendingConfiguration = {
    //   spendingMethod: 'percentOfPortfolio',
    //   percentageOfPortfolio: 0.05,
    //   minWithdrawal: 20000,
    //   maxWithdrawal: 35000
    // };

    const portfolio = fromInvestments({ investments });

    const cycles = _.map(startYears, startYear =>
      computeCycle({
        startYear,
        dipPercentage,
        rebalancePortfolioAnnually,
        portfolio,
        spendingConfiguration,
        duration: Number(duration.value)
      })
    );

    const results = evaluateCycles({ cycles });
    const dipRate = `${(results.dipRate * 100).toFixed(2)}%`;
    const successRate = `${(results.successRate * 100).toFixed(2)}%`;
    const summary = this.computeSummary(results.successRate);

    return {
      summary,
      dipRate,
      successRate,
      lowestDippedValue: results.lowestDippedValue
    };
  };

  computeSummary = successRate => {
    if (successRate > 0.95) {
      return 'SUCCESSFUL';
    } else {
      return 'UNSUCCESSFUL';
    }
  };

  onToggleResultsModal = () => {
    const { isResultsModalOpen } = this.state;

    this.setState({ isResultsModalOpen: !isResultsModalOpen });
  };
}
