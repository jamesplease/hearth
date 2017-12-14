import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className="standardPage">
        <h1 className="primaryHeader">About</h1>
        <p className="appParagraph">
          Reaching early retirement sounds like a dream, but it's not without
          its own unique set of challenges. Ensuring that your investments last
          as long as you do can involve some tricky math and knowledge of the US
          Tax Code.
        </p>
        <p className="appParagraph">
          For those of us who aren't yet FIRE'd, you may have a lot of
          questions. What even is this FIRE thing, anyway? Perhaps you know the
          answer to that question, and are already working toward your own
          financial independence. Either way, learning the ropes takes time, and
          resources are scattered all throughout the internet.
        </p>
        <p className="appParagraph">
          To make matters worse, searching the web for resources related to
          investing and money often leads to misleading, or otherwise bad
          advice.
        </p>
        <p className="appParagraph">
          Hearth is intended to provide a easy-to-understand information on
          financial independence, as well as tools to help you plan and execute
          your early retirement. No matter where you are in your path to FIRE,
          we hope that you find Hearth useful.
        </p>
      </div>
    );
  }
}
