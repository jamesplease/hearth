import React, { Component } from 'react';
import './calculator-results.css';

export default class Results extends Component {
  render() {
    return (
      <div className="calculatorResults">
        <div className="calculatorResults-header">
          This one was a success! Nice work!
        </div>
      </div>
    );
  }

  state = {
    isOpen: false
  };
}
