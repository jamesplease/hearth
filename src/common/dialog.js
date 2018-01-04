import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import './dialog.css';

export default class Dialog extends Component {
  render() {
    const { className = '', children, active, actions, title } = this.props;
    const { isOpen } = this.state;

    const modalClassname = classnames('dialog', {
      'dialog-active': active,
    });

    const hasActions = Boolean(actions && actions.length);
    const displayContents = isOpen || active;

    return (
      <div className={`${modalClassname} ${className}`} onClick={this.onOverlayClick} ref={this.setDialogRef}>
        <div className="dialog_body" onClick={this.onBodyClick}>
          {displayContents && (
            <div className="dialog_contents">
              {Boolean(title) && (
                <div className="dialog_title">{title}</div>
              )}
              <div className="dialog_content">
                {children}
              </div>
              {hasActions && (<div className="dialog_actions">
                {actions.map((action, idx) => (<button flat {...action} key={idx}>{action.label}</button>))}
              </div>)}
            </div>
          )}
        </div>
      </div>
    );
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    title: PropTypes.string,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    active: PropTypes.bool.isRequired,
    actions: PropTypes.arrayOf(PropTypes.object),
    onOverlayClick: PropTypes.func,
  };

  state = {
    isOpen: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.dialogEl) {
      let transition;
      if (nextProps.active && !this.props.active) {
        transition = 'in';
      } else if (!nextProps.active && this.props.active) {
        transition = 'out';
      }

      if (transition) {
        const transitionSpeed = getComputedStyle(this.dialogEl).getPropertyValue('--_dialog-transition-speed');
        const { onOpen, onClose } = this.props;
        const isOpening = transition === 'in';

        const transitionPropName = isOpening ? 'openingTimeout' : 'closingTimeout';
        clearTimeout(this[transitionPropName]);
        this[transitionPropName] = setTimeout(() => {
          this.setState({
            isOpen: isOpening
          });

          if (isOpening && onOpen) {
            onOpen();
          } else if (!isOpening && onClose) {
            onClose();
          }
        }, transitionSpeed);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.openingTimeout);
    clearTimeout(this.closingTimeout);
  }

  setDialogRef = (el) => {
    this.dialogEl = el;
  }

  onOverlayClick = (e) => {
    const { onOverlayClick } = this.props;
    if (onOverlayClick) {
      onOverlayClick(e);
    }
  };

  onBodyClick = (e) => {
    e.stopPropagation();
  };
}