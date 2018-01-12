import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class FireGuide extends Component {
  render() {
    return (
      <div className="standardPage-contentWithSideNavBody">
        <Link to="/guides" className="navBackLink">
          <i className="mdi mdi-chevron-left navBackLink-icon" />
          Guides
        </Link>
        <h1 className="primaryHeader">Inflation</h1>
        <p className="appParagraph">
          Older people love sharing what life was like when they were growing
          up: how far they had to walk places, or how they could buy a candy bar
          with a nickel. Our abundance of cars may explain why we don't walk as
          much these days, but what about those cheap candy bars? Where did they
          go?
        </p>
        <p className="appParagraph">
          Over time, goods and services in the U.S. tend to cost more. To put it
          another way, a single U.S. dollar buys less as time goes on.
        </p>
        <p className="appParagraph">
          The tendency for a currency to decrease in value over time is called
          inflation.
        </p>
        <h2 className="secondaryHeader">How is Inflation Computed?</h2>
        <p className="appParagraph">
          The idea that a dollar becomes worth less over time may seem a little
          odd. How is it possible that a dollar, which is itself an arbitrary
          unit of value, could gain or lose value?
        </p>
        <p className="appParagraph">
          The answer to this philosophical question is decidedly mundane.
          Measuring the value of the dollar is done by simply looking at how the
          price of common goods and services changes from year to year.
        </p>
        <p className="appParagraph">
          Consider this: if a milk chocolate bar costs $1 in 2015, but in 2016
          it cost $1.05 (an increase of 5%), then it could be that dairy farms
          had some extra expenses in 2016 that were passed along to consumers.
          Maybe there was a cow illness, so less milk was produced, driving up
          the price of milk chocolate. The chocolate price increase could be
          explained by the law of supply and demand.
        </p>
        <p className="appParagraph">
          But what if <i>everything</i> in the United States cost 5% more in
          2016 compared to 2015? When that happens, it's much less likely that
          supply and demand is driving up the price. Instead, it seems more
          correct to say the U.S. dollar itself has become worth less. And
          that's what economists do.
        </p>
        <p className="appParagraph">
          Although it would be a lot of work to look at the cost of everything,
          a good estimate can be found by looking at some of the most common
          items that people buy to see if, on average, they cost more from year
          to year.
        </p>
        <h2 className="secondaryHeader">Who Measures These Prices?</h2>
        <p className="appParagraph">
          The U.S. Federal Government does. More specifically, the Bureau of
          Labor Statistics. Each year, they measure the cost of different things
          and moosh them together into a number called the "consumer price
          index" (CPI). The CPI represents how much all of those goods and
          services cost in a given year. A higher CPI means that things were
          more expensive that year. The inflation between two years is computed
          by comparing their CPIs.
        </p>
        <p className="appParagraph">
          The CPI data is freely available from the U.S. government. You can
          download it <a href="https://www.bls.gov/cpi/data.htm">here</a>.
        </p>
        <p className="appParagraph">
          If you're interested in learning more about the CPI, the Bureau of
          Labor Statistics has put together{' '}
          <a href="https://www.bls.gov/cpi/questions-and-answers.htm">
            an informative FAQ
          </a>. One{' '}
          <a href="https://www.bls.gov/cpi/questions-and-answers.htm#Question_7">
            interesting question
          </a>{' '}
          lists the goods and services that they look at from year to year to
          compute the CPI.
        </p>
        <h2 className="secondaryHeader">
          Does the Dollar <i>Always</i> Lose Value From Year to Year?
        </h2>
        <p className="appParagraph">
          Not always. Sometimes it gains value (which over time is called
          deflation), but this is less common. Between 2014 and 2015 the dollar
          slightly increased in value, for instance.
        </p>
        <h2 className="secondaryHeader">
          It Doesn't Feel Like the Dollar Gets Less Valuable
        </h2>
        <p className="appParagraph">
          This is because inflation is typically small in the U.S., averaging
          around 3% per year. From one year to the next, it's easy not to notice
          the price of goods increasing by a few cents. However, those cents add
          up over many years, which is why inflation matters when planning for
          your retirement.
        </p>
        <h2 className="secondaryHeader">Inflation for Retirement</h2>
        <p className="appParagraph">
          Typical retirees plan to spend a certain amount of money each year.
          For instance, you might plan on retiring on $30,000 per year. However,
          because of inflation, $30,000 toward the end of a long retirement will
          be able to buy a lot less stuff than it could at the start.
        </p>
        <p className="appParagraph">
          If you don't adjust your annual spending for inflation, then your
          quality of life will steadily decrease as the dollar is able to buy
          you less.
        </p>
        <p className="appParagraph">
          Because of this, when you're retired, you'll need to know how to
          compute the inflation-adjusted value based on the CPI. If you wanted
          to, you could pull the CPI from the U.S. federal government's website
          above, and run the calculations by hand.
        </p>
        <p className="appParagraph">
          Alternatively, Hearth provides a calculator that makes things easier:
          the{' '}
          <Link to="/calculators/inflation-adjusted-spending">
            Inflation Calculator
          </Link>. With that calculator, you input a Start Value, a Start Year,
          and an End Year. The calculator outputs how many dollars you'll need
          in the End Year to be able to purchase the same amount of stuff as you
          could with the Start Value in Start Year.
        </p>
        <p className="appParagraph">
          Here's an example: let's say you retired in the 2000 on $25,000 per
          year. Adjusting for inflation, in 2017 you would need to withdraw
          $35,965 to be able to purchase the same amount of stuff.{' '}
          <Link to="/calculators/inflation-adjusted-spending?endYear=2017&startValue=25000&startYear=2000">
            Click here
          </Link>{' '}
          to see this calculation.
        </p>
        <p className="appParagraph">
          This example demonstrates the profound effect of inflation over long
          time scales, and suggests that we, too, will soon be telling youngters
          how cheap candy bars once were.
        </p>
      </div>
    );
  }
}
