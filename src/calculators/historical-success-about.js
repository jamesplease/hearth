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
        <p className="appParagraph">Trinity Study pls.</p>
      </div>
    );
  }
}
