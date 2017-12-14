import _ from 'lodash';

export function fromTotalAndPercentages({ totalValue, investments }) {
  const newInvestments = _.map(investments, investment => {
    return {
      ...investment,
      value: investment.percentage * totalValue
    };
  });

  return {
    investments: newInvestments,
    totalValue
  };
}

export function fromInvestments({ investments }) {
  const totalValue = _.reduce(
    investments,
    (result, investment) => result + investment.value,
    0
  );

  const newInvestments = _.map(investments, investment => {
    return {
      ...investment,
      percentage: investment.value / totalValue
    };
  });

  return {
    investments: newInvestments,
    totalValue
  };
}
