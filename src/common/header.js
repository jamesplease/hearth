import React, { Component } from 'react';
import './header.css';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="header-title">
          <a href="/" className="header-titleLink">
            Hearth
          </a>
        </h1>
      </header>
    );
  }
}
