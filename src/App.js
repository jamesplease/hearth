import React, { Component } from 'react';
import './app.css';
import CompoundInterest from './compound-interest';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">
            Compound Interest Calculator
          </h1>
        </header>
        <div className="app-body">
          <CompoundInterest/>
        </div>
      </div>
    );
  }
}

export default App;
