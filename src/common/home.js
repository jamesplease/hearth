import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="centeredText introText">
        <div>
          <h1 className="heroText">Hearth, a FIRE Place.</h1>
          <Link to="/guides/fire" className="heroButton">
            Get Started
          </Link>
        </div>
      </div>
    );
  }
}
