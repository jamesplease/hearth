import React, { Component } from 'react';
import classnames from 'classnames';
import './calculator-results-modal.css';

const modalTransitionSpeed = 250;

export default class CalculatorResultsModal extends Component {
  render() {
    const { active } = this.props;

    const className = classnames('calculatorResultsModal', {
      calculatorResultsModal_open: active
    });

    return (
      <div className={className}>
        <div className="modalContents">
          <div className="modalHeader">
            Modal Results here.
            <button onClick={this.onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  onClose = () => {
    const { onClose } = this.props;
    setTimeout(onClose, modalTransitionSpeed);
  };
}
