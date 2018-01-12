import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HistoricalSuccessAbout extends Component {
  render() {
    return (
      <div className="standardPage-contentWithSideNavBody">
        <Link
          to="/calculators/historical-success"
          className="navBackLink navBackLink_persistent">
          <i className="mdi mdi-chevron-left navBackLink-icon" />
          Return to Calculator
        </Link>
        <h1 className="primaryHeader">About "Historical Success"</h1>
        <p className="appParagraph">
          The Trinity Study popularized a method for determining the safe
          withdrawal rate for a retirement portfolio. This method involves
          looking at historical data to see how frequently the portfolio
          succeeded or failed.
        </p>
        <p className="appParagraph">
          The well known 4% rule is the result of this study. It states that for
          a portfolio comprised of mostly stocks, a withdrawal rate of 4% is
          likely to last at least as long as you do.
        </p>
        <p className="appParagraph">
          This calculator allows you to tweak the variables used in the Trinity
          Study to see how it effects the outcome.
        </p>
        <h2 className="secondaryHeader">Example Usage</h2>
        <p className="appParagraph">
          Let’s say you plan to retire with $700,000, and want to see how
          frequently your portfolio would have succeeded or failed with a
          withdrawal of $30,000 (which is just above 4%). Because you're
          relatively young, you're planning for a 45 year long retirement.
        </p>
        <p className="appParagraph">
          Throw these numbers into the calculator and you see the success rate:
          93.22%.
        </p>
        <p className="appParagraph">
          View this calculation{' '}
          <Link to="/calculators/historical-success?duration=30&firstYearWithdrawal=30000&spendingMethod=inflationAdjusted&stockInvestmentValue=700000">
            here
          </Link>.
        </p>
        <h2 className="secondaryHeader">Caveats</h2>
        <p className="appParagraph">
          This calculator currently only supports a portfolio of 100% stocks.
        </p>
      </div>
    );
  }
}
