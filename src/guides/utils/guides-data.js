import whatIsFireUrl from '../content/what-is-fire.md';
import inflationUrl from '../content/inflation.md';
import stockMarketInvestingUrl from '../content/stock-market-investing.md';
import riskVersusVolatilityUrl from '../content/risk-versus-volatility.md';
import Glossary from '../glossary';

export default [
  {
    name: 'What is FIRE?',
    url: '/fire',
    description: 'What is this FIRE thing, anyway? Learn all about it here.',
    markdownUrl: whatIsFireUrl
  },
  {
    name: 'Glossary',
    url: '/glossary',
    description:
      'One of the hardest parts of FIRE is the number of terms and concepts to learn. The glossary is a quick reference to many of them.',
    component: Glossary
  },
  {
    name: 'Inflation',
    url: '/inflation',
    description:
      "Over time, the U.S. dollar buys you less and less. Understanding inflation is crucial to living a successful FIRE'd life.",
    markdownUrl: inflationUrl
  },
  {
    name: 'Stock Market Investing',
    url: '/stock-market-investing',
    description:
      "Investing in the stock market isn't just for wealthy people. For many of us it's one of best investments we can make.",
    markdownUrl: stockMarketInvestingUrl
  },
  {
    name: 'Risk versus Volatility',
    url: '/risk-versus-volatility',
    description:
      'Risk and volatility are two important properties of any investment that are often conflated.',
    markdownUrl: riskVersusVolatilityUrl
  }
];
