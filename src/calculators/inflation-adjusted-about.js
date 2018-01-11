import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class InflationAdjustedAbout extends Component {
  render() {
    return (
      <div className="standardPage-contentWithSideNavBody">
        <Link
          to="/calculators/inflation-adjusted"
          className="navBackLink navBackLink_persistent">
          <i className="mdi mdi-chevron-left navBackLink-icon" />
          Return to Calculator
        </Link>
        <h1 className="primaryHeader">About "Inflation Adjusted"</h1>
        <p className="appParagraph">
          Due to inflation, the value of a dollar tends to decrease over time.
          Most retirement strategies involve adjusting your spending for
          inflation, which can be a difficult calculation to figure out.
        </p>
        <p className="appParagraph">
          This calculator helps you to adjust your withdrawal amount to
          counterattack the effect of inflation.
        </p>
        <h2 className="secondaryHeader">Example Usage</h2>
        <p className="appParagraph">
          Let’s say you retired in the year 2000, and you had planned to live
          off of $30,000 per year. In the year 2017, you know that $30,000 won’t
          buy you same amount of stuff on account of inflation. To keep your
          quality of life the same, you need to withdraw a larger amount of
          money.
        </p>
        <p className="appParagraph">
          You can use this calculator to find out how much you need to withdraw.
          Your Start Value is $30,000, the Start Year is 2000, and the End Year
          is 2017. Inputting these into the calculator yields the answer:
          $43,158.59.
        </p>
        <p className="appParagraph">
          View this calculation{' '}
          <Link to="/calculators/inflation-adjusted?endYear=2017&startValue=30000&startYear=2000">
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
