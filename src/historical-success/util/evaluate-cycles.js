import _ from 'lodash';

export default function evaluateCycles({ cycles }) {
  console.log('da cycles', cycles);
  const successfulCycles = _.filter(cycles, cycle => !cycle.isFailed && cycle.isComplete);

  const successRate = successfulCycles.length / cycles.length;

  return {
    successRate
  };
}