// These are different methods to calculate the spending amount
// for a given year.
// They all receive the same arguments.

export function inflationAdjusted({ inflation, firstYearWithdrawal }) {
  return inflation * firstYearWithdrawal;
}

export function notInflatedAdjusted({ firstYearWithdrawal }) {
  return firstYearWithdrawal;
}
