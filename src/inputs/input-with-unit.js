import React, { Component } from 'react';
import './input-with-unit.css';

export default class InputWithUnit extends Component {
  render() {
    const {
      value,
      unit,
      unitOptions,
      formatValue,
      onChange,
      inputProps
    } = this.props;
    const { isDisplayMode } = this.state;

    const valueToDisplay = formatValue(value, unit);

    return [
      isDisplayMode && (
        <div
          key="inputWithUnit_display"
          className="inputWithUnit inputWithUnit-display"
          onClick={() => this.setState({ isDisplayMode: false })}>
          {valueToDisplay}
        </div>
      ),
      !isDisplayMode && (
        <div
          {...inputProps}
          key="inputWithUnit_edit"
          className="inputWithUnit inputWithUnit-edit">
          <input
            className="inputWithUnit-inputField"
            ref={this.inputRef}
            value={value}
            onChange={event => onChange(event.target.value)}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      )
    ];
  }

  state = {
    isDisplayMode: true
  };

  static defaultProps = {
    formatValue(value, unit) {
      return `${value} ${unit}`;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { isDisplayMode } = this.state;
    if (prevState.isDisplayMode && !isDisplayMode && this.inputEl) {
      this.inputEl.focus();
      this.inputEl.selectionEnd = this.inputEl.value.length;
    }
  }

  inputRef = el => {
    this.inputEl = el;
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.setState({ isDisplayMode: true });
    }
  };
}
