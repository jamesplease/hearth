import _ from 'lodash';
import inflationFromCpi from './inflation-from-cpi';
import marketDataByYear from './market-data-by-year';

const CURRENT_YEAR = (new Date()).getFullYear();

// A cycle is one "simulation." Given a start year, a "duration,"
// which is an integer number of years, and initial portfolio information,
// it computes the changes to that portfolio over time.
export default function computeCycle(options = {}) {
  const {
    startYear, duration, initialWithdrawal, initialPortfolioValue
  } = options;

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

  _.times(duration, n => {
    const year = Number(startYear) + n;
    const previousYear = n === 0 ? null : resultsByYear[n - 1];

    let previousValue;
    if (n === 0) {
      previousValue = initialPortfolioValue;
    } else if (!previousYear) {
      previousValue = 0;
    } else {
      previousValue = previousYear.computedData.endValue;
    }

    const yearMarketData = marketData[String(year)];

    // If we have no data for this year, then we have nothing to return.
    if (!yearMarketData) {
      return null;
    }

    const cumulativeInflation = inflationFromCpi({
      startCpi: firstYearCpi,
      endCpi: yearMarketData.cpi
    });

    // For now, we use a simple inflation-adjusted withdrawal approach
    const inflationAdjustedWithdrawal = cumulativeInflation * initialWithdrawal;
    const endValue = previousValue - inflationAdjustedWithdrawal;

    resultsByYear.push({
      year,
      marketData: yearMarketData,
      computedData: {
        cumulativeInflation,
        inflationAdjustedWithdrawal,
        endValue
      }
    });
  });

  return {
    startYear,
    duration,
    isComplete,
    resultsByYear
  };
}