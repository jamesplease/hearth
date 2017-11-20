import _ from 'lodash';
import inflationFromCpi from './inflation-from-cpi';
import marketData from '../../common/data/market-data.json';

const CURRENT_YEAR = (new Date()).getFullYear();

export default function computeCycle({ startYear, duration, initialWithdrawal }) {
  // This Boolean represents whether this is cycle contains the entire
  // duration or not.
  const isComplete = startYear + duration <= CURRENT_YEAR;
  const firstYearMarketData = _.find(marketData, {
    year: String(startYear),
    month: '01'
  });
  const firstYearCpi = firstYearMarketData.cpi;

  const resultsByYear = _.times(duration, n => {
    const year = Number(startYear) + n;

    // Attempt to find the data for this year in the cycle
    const yearMarketData = _.find(marketData, {
      year: String(year),
      // Why do we use January for each year? Because cFIREcalc does, and
      // the first goal of this project is to recreate those same results.
      month: '01'
    });

    // If we have no data for this year, then we have nothing to return.
    if (!yearMarketData) {
      return null;
    }

    const cumulativeInflation = inflationFromCpi({
      startCpi: firstYearCpi,
      endCpi: yearMarketData.cpi
    });

    // For now, we use a simple inflation-adjusted withdrawal approach
    const adjustedWithdrawal = cumulativeInflation * initialWithdrawal;

    return {
      year,
      marketData: yearMarketData,
      computedData: {
        cumulativeInflation,
        adjustedWithdrawal
      }
    };
  });

  // Remove any null values
  const filteredResultsByYear = _.filter(resultsByYear)

  return {
    startYear,
    duration,
    isComplete,
    resultsByYear: filteredResultsByYear
  };
}