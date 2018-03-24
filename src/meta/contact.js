import React, { Component } from 'react';

export default class Contact extends Component {
  render() {
    return (
      <div className="standardPage">
        <h1 className="primaryHeader">Contact Us</h1>
        <p className="appParagraph">
          Send us feedback, bug reports, feature requests; we’re always looking
          for ways to improve Hearth.
        </p>
        <p className="appParagraph">
          The best way to reach us is through email at{' '}
          <a href="mailto:jellyes2@gmail.com">jellyes2@gmail.com</a>.
        </p>
      </div>
    );
  }
}
