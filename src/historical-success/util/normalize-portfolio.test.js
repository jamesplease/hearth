import {
  fromTotalAndPercentages,
  fromInvestments
} from './normalize-portfolio';

describe('normalizePortfolio', () => {
  describe('fromInvestments', () => {
    it('computes a single-investment portfolio correctly', () => {
      const result = fromInvestments({
        investments: [
          {
            type: 'stocks',
            value: 10000
          }
        ]
      });

      expect(result).toEqual({
        totalValue: 10000,
        investments: [
          {
            type: 'stocks',
            value: 10000,
            percentage: 1
          }
        ]
      });
    });

    it('computes a two-investment portfolio correctly', () => {
      const result = fromInvestments({
        investments: [
          {
            type: 'stocks',
            value: 10000
          },
          {
            type: 'bonds',
            value: 10000
          }
        ]
      });

      expect(result).toEqual({
        totalValue: 20000,
        investments: [
          {
            type: 'stocks',
            value: 10000,
            percentage: 0.5
          },
          {
            type: 'bonds',
            value: 10000,
            percentage: 0.5
          }
        ]
      });
    });
  });

  describe('fromTotalAndPercentages', () => {
    it('computes a single-investment portfolio correctly', () => {
      const result = fromTotalAndPercentages({
        totalValue: 10000,
        investments: [
          {
            type: 'stocks',
            percentage: 1
          }
        ]
      });

      expect(result).toEqual({
        totalValue: 10000,
        investments: [
          {
            type: 'stocks',
            value: 10000,
            percentage: 1
          }
        ]
      });
    });

    it('computes a two-investment portfolio correctly', () => {
      const result = fromTotalAndPercentages({
        totalValue: 20000,
        investments: [
          {
            type: 'stocks',
            percentage: 0.5
          },
          {
            type: 'bonds',
            percentage: 0.5
          }
        ]
      });

      expect(result).toEqual({
        totalValue: 20000,
        investments: [
          {
            type: 'stocks',
            value: 10000,
            percentage: 0.5
          },
          {
            type: 'bonds',
            value: 10000,
            percentage: 0.5
          }
        ]
      });
    });
  });
});
