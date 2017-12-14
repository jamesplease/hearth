import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import guidesData from './utils/guides-data';

export default class GuidesNav extends Component {
  render() {
    return (
      <div className="sideNav">
        <h2 className="sideNav-header">
          <Link to="/guides" className="sideNav-headerLink">
            Guides
          </Link>
        </h2>
        <ul className="sideNav-list">
          {guidesData.map(guide => (
            <li className="sideNav-listItem" key={guide.name}>
              <NavLink
                to={`/guides${guide.url}`}
                className="sideNav-link"
                activeClassName="sideNav-link_active">
                {guide.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
