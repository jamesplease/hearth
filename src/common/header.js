import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Nav from './nav';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">
            <Link to="/" className="header-titleLink">
              <img src="/hearth-logo.svg" alt="Hearth" className="appLogo" />
            </Link>
          </h1>
          <Nav />
        </div>
      </header>
    );
  }
}
