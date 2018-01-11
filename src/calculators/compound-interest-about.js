import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CompoundInterestAbout extends Component {
  render() {
    return (
      <div className="standardPage-contentWithSideNavBody">
        <Link
          to="/calculators/compound-interest"
          className="navBackLink navBackLink_persistent">
          <i className="mdi mdi-chevron-left navBackLink-icon" />
          Return to Calculator
        </Link>
        <h1 className="primaryHeader">About "Compound Interest"</h1>
        <p className="appParagraph">
          Compound interest is what happens when you reinvest your interest
          gains, so that interest in the next period includes your principal
          investment as well as the previous interest gains.
        </p>
        <p className="appParagraph">
          Colloquially, it can be thought of as “interest on interest.” Compound
          interest is crucial to early retirement, because it allows us to
          accumulate wealth much more quickly than we could otherwise.
        </p>
        <h2 className="secondaryHeader">Example Usage</h2>
        <p className="appParagraph">
          Consider an individual who has $10,000 to invest into their retirement
          portfolio, and they plan to contribute an additional $10,000 every
          year. They’re investing in the total stock market, so they plan for a
          7% annual return. They want to find out how much they will end up with
          after 20 years.
        </p>
        <p className="appParagraph">
          Plugging these numbers into the calculator, we can see the answer:
          $448,651.77.
        </p>
        <p className="appParagraph">
          View this calculation{' '}
          <Link to="/calculators/compound-interest?annualContribution=10000&contributionsMadeAtStart=false&interestRate=7&numberOfYears=20&principal=10000">
            here
          </Link>.
        </p>
      </div>
    );
  }
}
