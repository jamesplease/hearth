import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footerContent">
          <div>Copyright © Hearth 2017.</div>
          <ul className="footerLinks">
            <li className="footerLinkItem">
              <Link to="/terms" className="footerLink">
                Terms
              </Link>
            </li>
            <li className="footerLinkItem">
              <Link to="/privacy" className="footerLink">
                Privacy
              </Link>
            </li>
            <li className="footerLinkItem">
              <Link to="/contact" className="footerLink">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}
