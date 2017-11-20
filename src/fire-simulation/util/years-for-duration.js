import _ from 'lodash';
import marketData from '../../common/data/market-data.json';

const EARLIEST_YEAR = Number(marketData[0].year);
const CURRENT_YEAR = (new Date()).getFullYear();
const YEARS_DIFF = CURRENT_YEAR - EARLIEST_YEAR;

// Given a "duration," which is an integer number of years to
// simulate, returns an object of start years of this format:
//
// [
//   {
//     year: 1871,
//     complete: true
//   },
//   {
//     year: 1872,
//     complete: false
//   }
// ]
//
// `complete` indicates whether or not that start year contains the
// entire `duration`. `false` values can be useful for detecting
// portfolios that would fail in that partial timeframe, although
// of course it says nothing about successful portfolios.
export default function(duration) {
  return _.times(YEARS_DIFF, n => {
    const year = EARLIEST_YEAR + n;
    const complete = year + duration <= CURRENT_YEAR;

    const yearMarketData = _.find(marketData, { year: String(year) });

    return {
      year,
      complete,
      marketData: yearMarketData
    }
  });
}