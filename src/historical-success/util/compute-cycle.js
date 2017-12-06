import _ from 'lodash';
import * as spending from './spending';
import inflationFromCpi from '../../common/util/inflation-from-cpi';
import marketDataByYear from '../../common/util/market-data-by-year';

const CURRENT_YEAR = new Date().getFullYear();

// A cycle is one "simulation." Given a start year, a "duration,"
// which is an integer number of years, and initial portfolio information,
// it computes the changes to that portfolio over time.
export default function computeCycle(options = {}) {
  const {
    startYear,
    duration,
    firstYearWithdrawal,
    initialPortfolioValue,
    spendingMethod,
    dipPercentage
  } = options;

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

  _.times(duration, n => {
    const year = Number(startYear) + n;
    const nextYear = year + 1;
    const previousYear = n === 0 ? null : resultsByYear[n - 1];

    let previousValue;
    if (n === 0) {
      previousValue = initialPortfolioValue;
    } else if (!previousYear) {
      previousValue = 0;
    } else {
      previousValue = previousYear.computedData.endValue;
    }

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

    // For now, we use a simple inflation-adjusted withdrawal approach
    const withdrawalAmount = spending[spendingMethod]({
      inflation: cumulativeInflation,
      firstYearWithdrawal
    });

    const naiveEndValue = previousValue - withdrawalAmount;
    const realisticEndValue = Math.max(0, naiveEndValue);

    const investmentGains =
      realisticEndValue * yearMarketData.stockMarketGrowth;
    const dividendGains = realisticEndValue * yearMarketData.dividendYields;

    const endValue = realisticEndValue + dividendGains + investmentGains;

    // We only compute `isFailed` if we didn't already compute it as true before.
    if (!isFailed) {
      isFailed = realisticEndValue === 0;
    }

    if (!didDip) {
      didDip = realisticEndValue <= dipThreshold;
    }

    if (realisticEndValue < lowestValue) {
      lowestValue = realisticEndValue;
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
        withdrawalAmount,
        naiveEndValue,
        realisticEndValue,
        endValue,
        investmentGains,
        dividendGains,
        lowestValue
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
