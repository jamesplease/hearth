import React, { Component, Fragment } from 'react';

export default class DataSources extends Component {
  render() {
    return (
      <Fragment>
        <p>Data is sourced from these locations:</p>
        <ul>
          <li>
            <a href="http://www.econ.yale.edu/%7Eshiller/data.htm">
              U.S. Stock Market Data (1871 - 2015)
            </a>{' '}
            - Robert Shiller
          </li>
        </ul>
      </Fragment>
    );
  }
}
