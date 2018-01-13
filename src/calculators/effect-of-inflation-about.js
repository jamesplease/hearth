import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class EffectOfInflationAbout extends Component {
  render() {
    return (
      <div className="standardPage-contentWithSideNavBody">
        <Link
          to="/calculators/effect-of-inflation"
          className="navBackLink navBackLink_persistent">
          <i className="mdi mdi-chevron-left navBackLink-icon" />
          Return to Calculator
        </Link>
        <h1 className="primaryHeader">About "Effect of Inflation"</h1>
        <p className="appParagraph">
          Over time, a U.S. dollar loses value. This is called{' '}
          <Link to="/guides/inflation">inflation</Link>. The effect of inflation
          is that buying the same amount of things in the year 2017 required a
          lot more money than what one needed in, say, 1950.
        </p>
        <p className="appParagraph">
          This has ramifications for individuals looking to retire, because
          retiring involves saving money. If you decide leave your money in a
          low-interest checking account, then it may <i>appear</i> to be the
          same amount of money throughout the years, when in reality it is
          decreasing in value, or "purchasing power."
        </p>
        <h2 className="secondaryHeader">Example Usage</h2>
        <p className="appParagraph">
          Imagine if you put $10,000 into a 0% interest checking account in the
          year 2000. It's now 2017, and you're wondering how much inflation has
          decreased the purchasing power of your savings.
        </p>
        <p className="appParagraph">
          Typing $10,000 as the Start Value, 2000 as the Start Year, and 2017 as
          the End Year computes our result: $6,951.11.
        </p>
        <p className="appParagraph">
          View this calculation{' '}
          <Link to="/calculators/effect-of-inflation?endYear=2017&startValue=10000&startYear=2000">
            here
          </Link>.
        </p>
        <h2 className="secondaryHeader">Caveats</h2>
        <p className="appParagraph">
          If you’re trying to calculate inflation for the current year, and the
          calculator prevents you from doing that, then you should use the
          previous year.
        </p>
        <p className="appParagraph">
          This is because there is sometimes a delay in getting the latest data
          from the Bureau of Labor Statistics.
        </p>
        <h2 className="secondaryHeader">Further Reading</h2>
        <ul>
          <li>
            <Link to="/guides/inflation">Inflation Guide</Link>
          </li>
        </ul>
        <h2 className="secondaryHeader">Data Source</h2>
        <ul>
          <li>
            <a href="http://www.econ.yale.edu/%7Eshiller/data.htm">
              U.S. Stock Data - Robert Schiller
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
