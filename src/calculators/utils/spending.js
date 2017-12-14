import clamp from './clamp';

// These are different methods to calculate the spending amount
// for a given year.
// They all receive the same arguments.

export function inflationAdjusted({ inflation, firstYearWithdrawal }) {
  return inflation * firstYearWithdrawal;
}

export function notInflatedAdjusted({ firstYearWithdrawal }) {
  return firstYearWithdrawal;
}

// Should the min/max values be inflation adjusted? Most likely, right?
export function percentOfPortfolio({
  portfolioTotalValue,
  percentageOfPortfolio,
  minWithdrawal,
  maxWithdrawal
}) {
  const naiveComputation = portfolioTotalValue * percentageOfPortfolio;
  return clamp(naiveComputation, minWithdrawal, maxWithdrawal);
}
