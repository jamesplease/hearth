import _ from 'lodash';
import marketDataByYear from './market-data-by-year';

let yearRange;
export default function getYearRange() {
  if (!yearRange) {
    const marketData = marketDataByYear();
    const marketDataYears = _.chain(marketData)
      .map(data => Number(data.year))
      .value();

    const minYear = Math.min(...marketDataYears);
    const maxYear = Math.max(...marketDataYears);

    yearRange = { minYear, maxYear };
  }

  return yearRange;
}
