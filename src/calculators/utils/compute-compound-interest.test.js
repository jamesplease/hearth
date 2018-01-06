import computeCompoundInterest from './compute-compound-interest';

describe('computeCompoundInterest', () => {
  it('computes no inputs as 0', () => {
    const result = computeCompoundInterest();
    expect(result).toEqual(0);
  });

  it('computes one year correctly; no contributions; contributions made at end', () => {
    const result = computeCompoundInterest({
      principal: 1000,
      annualContribution: 0,
      numberOfYears: 1,
      interestRate: 0.07,
      contributionsMadeAtStart: false
    });

    expect(result).toEqual(1070);
  });

  it('computes 10 years correctly with no interest', () => {
    const result = computeCompoundInterest({
      principal: 1000,
      annualContribution: 100,
      numberOfYears: 10,
      interestRate: 0.0,
      contributionsMadeAtStart: false
    });

    expect(result).toEqual(2000);
  });

  it('computes 5 years correctly with 7% interest; no contribution; contributions made at end', () => {
    const result = computeCompoundInterest({
      principal: 1000,
      annualContribution: 0,
      numberOfYears: 5,
      interestRate: 0.07,
      contributionsMadeAtStart: false
    });

    expect(result).toBeCloseTo(1402.5517307);
  });

  it('computes 10 years correctly with 10% interest; substantial contribution; contributions made at start', () => {
    const result = computeCompoundInterest({
      principal: 365000,
      annualContribution: 365000,
      numberOfYears: 10,
      interestRate: 0.1,
      contributionsMadeAtStart: true
    });

    expect(result).toBeCloseTo(7345591.975238);
  });
});
