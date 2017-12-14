import _ from 'lodash';
import * as spending from './spending';
import inflationFromCpi from './inflation-from-cpi';
import marketDataByYear from './market-data-by-year';

const CURRENT_YEAR = new Date().getFullYear();

// This maps an investment type to the key on marketData that
// represents its changes in a given year
const investmentTypeToGrowthMap = {
  equity: 'stockMarketGrowth'
};

// A cycle is one "simulation." Given a start year, a "duration,"
// which is an integer number of years, and initial portfolio information,
// it computes the changes to that portfolio over time.
export default function computeCycle(options = {}) {
  const {
    startYear,
    duration,
    portfolio,
    spendingConfiguration,
    rebalancePortfolioAnnually,
    dipPercentage
  } = options;

  const initialPortfolioValue = portfolio.totalValue;
  const initialPortfolio = portfolio;

  const dipThreshold = dipPercentage * initialPortfolioValue;

  const marketData = marketDataByYear();

  // This Boolean represents whether this is cycle contains the entire
  // duration or not.
  const isComplete = startYear + duration <= CURRENT_YEAR;
  const firstYearMarketData = _.find(marketData, {
    year: String(startYear),
    month: '01'
  });
  const firstYearCpi = firstYearMarketData.cpi;

  const resultsByYear = [];

  // Whether or not this cycle "failed," where failure is defined as the portfolio
  // value being equal to or less than 0.
  let isFailed = false;
  let didDip = false;
  let lowestValue = Infinity;
  let lowestSuccessfulDip = {
    year: null,
    value: Infinity
  };

  // This can be used to simulate a "previous" year for the 0th year,
  // simplifying the logic below.
  const initialComputedData = {
    cumulativeInflation: 1,
    withdrawalAmount: 0,
    naiveEndValue: initialPortfolioValue,
    realisticEndValue: initialPortfolioValue,
    investmentGains: 0,
    dividendGains: 0,
    portfolio
  };

  _.times(duration, n => {
    const isFirstYear = n === 0;
    const year = Number(startYear) + n;
    const nextYear = year + 1;
    const previousResults = resultsByYear[n - 1];

    // If we had no results for last year, then we can't compute anything
    // for this year either.
    if (!isFirstYear && !previousResults) {
      return null;
    }

    const previousComputedData = isFirstYear
      ? initialComputedData
      : resultsByYear[n - 1].computedData;

    const yearStartValue = previousComputedData.portfolio.totalValue;

    const yearMarketData = marketData[year];
    const nextYearMarketData = marketData[nextYear];

    // If we have no data for this year, then we have nothing to return.
    // Likewise, if there is no data for _next_ year, then this year is the
    // last datapoint in our set, so it cannot be used.
    if (!yearMarketData || !nextYearMarketData) {
      return null;
    }

    const cumulativeInflation = inflationFromCpi({
      startCpi: firstYearCpi,
      endCpi: yearMarketData.cpi
    });

    const { spendingMethod } = spendingConfiguration;

    // For now, we use a simple inflation-adjusted withdrawal approach
    const totalWithdrawalAmount = spending[spendingMethod]({
      ...spendingConfiguration,
      portfolioTotalValue: yearStartValue,
      inflation: cumulativeInflation
    });

    const notEnoughMoney = totalWithdrawalAmount > yearStartValue;

    let adjustedInvestmentValues = _.map(
      portfolio.investments,
      (investment, index) => {
        if (notEnoughMoney) {
          return {
            ...investment,
            valueBeforeChange: investment.value,
            valueAfterWithdrawal: 0,
            growth: 0,
            dividends: 0,
            percentage: 0,
            value: 0
          };
        }

        const previousYearInvestment =
          previousComputedData.portfolio.investments[index];

        // If we rebalance yearly, then we keep the original percentage from the previous year.
        // This assumes that the investor reinvests at the very beginning (or very end) of each year.
        const percentage = rebalancePortfolioAnnually
          ? initialPortfolio[index].percentage
          : previousYearInvestment.percentage;

        // We assume that the total yearly withdrawal is divided evenly between the different
        // investments.
        const withdrawalAmount = percentage * totalWithdrawalAmount;
        const valueAfterWithdrawal =
          previousYearInvestment.value - withdrawalAmount;
        const growthKey = investmentTypeToGrowthMap[investment.type];
        const growthPercentage = yearMarketData[growthKey];
        const growth = valueAfterWithdrawal * growthPercentage;

        // This allows you to specify a fixed annual addition to this investment. This replaces
        // the "growth of cash" feature of cFIREsim.
        let annualGrowthAmount = investment.annualGrowthAmount
          ? investment.annualGrowthAmount
          : 0;

        let dividends =
          investment.type === 'equity'
            ? valueAfterWithdrawal * yearMarketData.dividendYields
            : 0;

        const valueWithGrowth =
          valueAfterWithdrawal + growth + annualGrowthAmount;

        // Fees aren't applied to dividends. This behavior matches cFIREsim.
        const fees = investment.fees * valueWithGrowth;

        // We factor everything in to get our end result for this investment
        const value = valueWithGrowth + dividends - fees;

        return {
          ...investment,
          percentage,
          growth,
          fees,
          dividends,
          valueBeforeChange: investment.value,
          valueAfterWithdrawal,
          valueWithGrowth,
          value
        };
      }
    );

    const endValue = _.reduce(
      adjustedInvestmentValues,
      (result, investment) => result + investment.value,
      0
    );

    // We only compute `isFailed` if we didn't already compute it as true before.
    if (!isFailed) {
      isFailed = endValue === 0;
    }

    if (!didDip) {
      didDip = endValue <= dipThreshold;
    }

    if (endValue < lowestValue) {
      lowestValue = endValue;
    }

    if (didDip) {
      if (lowestValue < lowestSuccessfulDip.value) {
        lowestSuccessfulDip = {
          value: lowestValue,
          startYear,
          year
        };
      }
    }

    resultsByYear.push({
      year,
      marketData: yearMarketData,
      computedData: {
        cumulativeInflation,
        totalWithdrawalAmount,
        portfolio: {
          totalValue: endValue,
          investments: adjustedInvestmentValues
        }
      }
    });
  });

  return {
    startYear,
    duration,
    isComplete,
    resultsByYear,
    isFailed,
    didDip,
    lowestSuccessfulDip
  };
}
