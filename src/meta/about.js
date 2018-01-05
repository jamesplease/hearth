import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className="standardPage">
        <h1 className="primaryHeader">About</h1>
        <p className="appParagraph">
          Hearth is a collection of resources for Financial Independence and
          Retiring Early (FIRE).
        </p>
        <p className="appParagraph">
          Reaching early retirement sounds like a dream, but it's not without
          its own unique set of challenges. Ensuring that your investments last
          as long as you do can involve some tricky math, as well as esoteric
          knowledge of the US Tax Code.
        </p>
        <p className="appParagraph">
          For those of us who aren't yet FIRE'd, you may have a lot of
          questions. How does one FIRE? Am I on track to fire? There's a lot to
          learn when it comes to FIRE, and information about FIRE is scattered
          across the web.
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
