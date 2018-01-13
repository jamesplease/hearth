// Add new calculators here. This will automatically
// register routes and add them to the calculator page nav.

import CompoundInterest from '../compound-interest';
import CompoundInterestAbout from '../compound-interest-about';
import HistoricalSuccess from '../historical-success';
import HistoricalSuccessAbout from '../historical-success-about';
import InflationAdjusted from '../inflation-adjusted';
import InflationAdjustedAbout from '../inflation-adjusted-about';
import EffectOfInflation from '../effect-of-inflation';
import EffectOfInflationAbout from '../effect-of-inflation-about';

export default [
  {
    name: 'Historical Success',
    url: '/historical-success',
    component: HistoricalSuccess,
    aboutComponent: HistoricalSuccessAbout,
    description:
      "The Trinity Study popularized a method of evaluating retirement portfolios that looks at historical data. This calculator is an advanced version of the Trinity Study's calculation."
  },
  {
    name: 'Compound Interest',
    url: '/compound-interest',
    component: CompoundInterest,
    aboutComponent: CompoundInterestAbout,
    description:
      'Compound interest is key to how early retirement works. This calculator computes the growth of principal over a number of years given an interest rate.'
  },
  {
    name: 'Inflation-Adjusted Spending',
    url: '/inflation-adjusted-spending',
    pastUrls: ['/inflation-adjusted'],
    component: InflationAdjusted,
    aboutComponent: InflationAdjustedAbout,
    description:
      'Inflation is the tendency for the US Dollar to be worth less each year. Many FIRE portfolios involve adjusting spending to account for inflation. This calculator helps with that.'
  },
  {
    name: 'Effect of Inflation',
    url: '/effect-of-inflation',
    component: EffectOfInflation,
    aboutComponent: EffectOfInflationAbout,
    description:
      'This calculator computes how inflation reduces the purchasing power of the dollar over time.'
  }
];
