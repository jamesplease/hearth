import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="header-title">
          <Link to="/" className="header-titleLink">
            Hearth
          </Link>
        </h1>
      </header>
    );
  }
}
