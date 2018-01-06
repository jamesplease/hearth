import React, { Component } from 'react';

export default class Privacy extends Component {
  render() {
    return (
      <div className="standardPage">
        <h1 className="primaryHeader">Privacy Policy</h1>
        <h2 className="secondaryHeader">Information We Collect</h2>
        <p className="appParagraph">
          Hearth uses common technologies for all visitors, such as cookies, to
          track the same basic information that all websites collect. This
          occurs whether or not you have an account with us.
        </p>
        <h2 className="secondaryHeader">
          How We Share the Information We Collect
        </h2>
        <p className="appParagraph">
          We do not share or sell any information we collect.
        </p>
      </div>
    );
  }
}
