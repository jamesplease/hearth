import React, { Component } from 'react';
import Dialog from '../common/dialog';
import './calculator-results-modal.css';

export default class CalculatorResultsModal extends Component {
  render() {
    const { active, onClose } = this.props;

    return (
      <Dialog active={active}>
        <div>
          Modal Results here.
          <button onClick={onClose}>Close</button>
          </div>
      </Dialog>
    );
  }
}
