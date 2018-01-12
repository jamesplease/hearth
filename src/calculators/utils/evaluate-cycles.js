import _ from 'lodash';

export default function evaluateCycles({ cycles }) {
  // For now, we only considered completed cycles
  const completedCycles = _.filter(cycles, 'isComplete');

  // If nothing completed, then we have nothing to analyze
  if (!completedCycles.length) {
    return {};
  }

  const successfulCycles = _.reject(completedCycles, 'isFailed');
  const dippedCycles = _.filter(completedCycles, 'didDip');

  const succeededAndDippedCycles = _.intersection(
    successfulCycles,
    dippedCycles
  );

  const lowestDippedValues = _.map(
    succeededAndDippedCycles,
    'lowestSuccessfulDip'
  );

  const lowestDippedValue = _.minBy(lowestDippedValues, 'value');

  const successRate = successfulCycles.length / completedCycles.length;
  const dipRate = dippedCycles.length / completedCycles.length;

  return {
    successRate,
    dipRate,
    lowestDippedValue
  };
}
