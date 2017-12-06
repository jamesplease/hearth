import _ from 'lodash';

export default function evaluateCycles({ cycles }) {
  // For now, we only considered completed cycles
  const completedCycles = _.filter(cycles, 'isComplete');
  const successfulCycles = _.reject(completedCycles, 'isFailed');

  const successRate = successfulCycles.length / completedCycles.length;

  return {
    successRate
  };
}
