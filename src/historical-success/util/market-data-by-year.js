import _ from 'lodash';
import marketData from '../../common/data/market-data.json';

let memoizedMarketDataByYear;

// The market-data.json file is an Array. Finding the data
// within that can be slow, so we memoize an Object, by year,
// for quick lookups.
export default function marketDataByYear() {
  if (!memoizedMarketDataByYear) {
    memoizedMarketDataByYear = _.chain(marketData)
      // We only look at the first month. Why? Because cFIREsim does, and
      // this is trying to replicate cFIREsim's behavior (for now).
      .filter(data => data.month === '01')
      .keyBy('year')
      .value();
  }

  return memoizedMarketDataByYear;
}