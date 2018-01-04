import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import guidesData from './utils/guides-data';

export default class GuidesLandingPage extends Component {
  render() {
    const { match } = this.props;

    return (
      <div className="landingPage">
        <div className="landingPage-introduction">
          <h1 className="primaryHeader primaryHeader_centered">Guides</h1>
          <p className="subheaderText subheaderText_centered">
            These guides provide useful information to FIRE'd individuals.
          </p>
        </div>
        <div className="panelContainer">
          {guidesData.map(guide => (
            <div className="panel panel-padding" key={guide.name}>
              <h2 className="panel-header">
                <Link
                  to={`${match.url}${guide.url}`}
                  className="panel-headerLink">
                  {guide.name}
                </Link>
              </h2>
              <p className="panel-description">{guide.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
