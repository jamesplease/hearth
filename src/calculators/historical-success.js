import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import CalculatorResultsModal from './calculator-results-modal';
import getStartYears from './utils/get-start-years';
import computeCycle from './utils/compute-cycle';
import evaluateCycles from './utils/evaluate-cycles';
import { fromInvestments } from './utils/normalize-portfolio';

function isNumber(val) {
  if (typeof val === 'string' && val.length === 0) {
    return 'Empty';
  }

  const valueToVerify = Number(val);

  if (!_.isFinite(valueToVerify)) {
    return 'NaN';
  }
}

const validators = {
  stockInvestmentValue: isNumber,
  firstYearWithdrawal: isNumber,
  duration: isNumber
};

const successSummaryMap = {
  SUCCESSFUL: 'This portfolio and withdrawal rate succeeded most of the time.',
  MODERATE: 'This portfolio and withdrawal rate succeeded some of the time.',
  UNSUCCESSFUL: 'This portfolio and withdrawal rate frequently failed.'
};

export default class HistoricalSuccess extends Component {
  render() {
    const { inputs, result, isResultsModalOpen } = this.state;
    const { stockInvestmentValue, firstYearWithdrawal, duration } = inputs;
    const { summary } = result;

    let summaryText;
    if (summary) {
      summaryText = successSummaryMap[summary];
    } else {
      summaryText = '';
    }

    return (
      <div className="historicalSuccess calculatorPage">
        <Link to="/calculators" className="navBackLink">
          <i className="zmdi zmdi-chevron-left navBackLink-icon" />
          Calculators
        </Link>
        <h1 className="primaryHeader">Historical Success</h1>
        <div className="panel calculatorPage-contents">
          <div className="calculatorPage-twoColumn calculatorPage_calculator">
            <label className="historicalSuccess-label">
              Initial Portfolio Value
            </label>
            <div>
              <input
                value={stockInvestmentValue.value}
                className="input"
                type="number"
                inputMode="numeric"
                id="historicalSuccess_stockInvestmentValue"
                onChange={event =>
                  this.updateValue('stockInvestmentValue', event.target.value)
                }
              />
            </div>
            <label className="historicalSuccess-label">
              First Year Withdrawal
            </label>
            <div>
              <input
                value={firstYearWithdrawal.value}
                className="input"
                type="number"
                inputMode="numeric"
                id="inflationAdjusted_firstYearWithdrawal"
                onChange={event =>
                  this.updateValue('firstYearWithdrawal', event.target.value)
                }
              />
            </div>
            <label className="historicalSuccess-label">Duration</label>
            <div>
              <input
                value={duration.value}
                className="input"
                type="number"
                inputMode="numeric"
                id="inflationAdjusted_duration"
                onChange={event =>
                  this.updateValue('duration', event.target.value)
                }
              />
            </div>
          </div>
          <div className="calculatorPage-expandingResult">
            <span>{summaryText}</span>
            <button onClick={() => this.setState({ isResultsModalOpen: true })}>
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
        fees: 0.01,
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
    } else if (successRate > 0.85) {
      return 'MODERATE';
    } else {
      return 'UNSUCCESSFUL';
    }
  };

  onToggleResultsModal = () => {
    const { isResultsModalOpen } = this.state;

    this.setState({ isResultsModalOpen: !isResultsModalOpen });
  };
}
