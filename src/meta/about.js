import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className="standardPage">
        <h1 className="primaryHeader">About</h1>
        <p className="appParagraph">
          Being financially independent or early retired comes with its own set
          of challenges. It can be difficult to determine where and when to
          withdraw your funds from, or how to minimize your tax burden each
          year.
        </p>
        <p className="appParagraph">
          If you're not yet FIRE'd, you may have a lot of questions. There is a
          lot of jargon to learn to prepare and plan to one day be FIRE'd.
        </p>
        <p className="appParagraph">
          No matter where you are in your journey to FIRE, Hearth is intended to
          provide tools to help you achieve your goals.
        </p>
      </div>
    );
  }
}
