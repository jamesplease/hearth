import _ from 'lodash';
import inflationFromCpi from '../../common/util/inflation-from-cpi';
import marketDataByYear from '../../common/util/market-data-by-year';

const CURRENT_YEAR = (new Date()).getFullYear();

// A cycle is one "simulation." Given a start year, a "duration,"
// which is an integer number of years, and initial portfolio information,
// it computes the changes to that portfolio over time.
export default function computeCycle(options = {}) {
  const {
    startYear, duration, firstYearWithdrawal, initialPortfolioValue
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

  // Whether or not this cycle "failed," where failure is defined as the portfolio
  // value being equal to or less than 0.
  let isCycleFailed = false;

  _.times(duration, n => {
    const year = Number(startYear) + n;
    const previousYear = n === 0 ? null : resultsByYear[n - 1];

    // `isFailed` represents whether the portfolio has hit 0 or not.
    let isFailed;

    // If the previous year failed, then this one did, too. There's no
    // recovery from a failed state, even if gains bring you back into
    // the positive numbers (however unlikely that may be).
    if (previousYear && previousYear.isFailed) {
      isFailed = true;
    }

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
    const inflationAdjustedWithdrawal = cumulativeInflation * firstYearWithdrawal;
    const naiveEndValue = previousValue - inflationAdjustedWithdrawal;
    const realisticEndValue = Math.max(0, naiveEndValue);

    // Assume 0.07 growth for the current year
    const stockMarketGrowth = yearMarketData.stockMarketGrowth || 0.07;
    const investmentGains = realisticEndValue * stockMarketGrowth;
    const dividendGains = realisticEndValue * yearMarketData.dividendYields;

    const endValue = realisticEndValue + dividendGains + investmentGains;

    // We only compute `isFailed` if we didn't already compute it as true before.
    if (!isFailed) {
      isFailed = realisticEndValue === 0;

      // If this year failed, and we haven't updated the cycle fail status yet,
      // then we set that.
      if (isFailed && !isCycleFailed) {
        isCycleFailed = true;
      }
    }

    resultsByYear.push({
      year,
      marketData: yearMarketData,
      computedData: {
        cumulativeInflation,
        inflationAdjustedWithdrawal,
        naiveEndValue,
        realisticEndValue,
        endValue,
        investmentGains,
        dividendGains,
        isFailed
      }
    });
  });

  return {
    startYear,
    duration,
    isComplete,
    resultsByYear,
    isFailed: isCycleFailed
  };
}