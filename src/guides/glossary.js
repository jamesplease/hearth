import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './glossary.css';
import glossaryData from './utils/glossary-data';

// The glossary should always be alphabetical, even if the original data is not
// This lazily-sorts the glossary, when needed, then caches it
let sortedGlossaryData;
function getSortedGlossaryData() {
  if (sortedGlossaryData) {
    return sortedGlossaryData;
  }

  return _.chain(glossaryData)
    .sortBy('term')
    .map(entry => ({
      ...entry,
      hash: _.kebabCase(entry.term)
    }))
    .value();
}

export default class Glossary extends Component {
  render() {
    sortedGlossaryData = getSortedGlossaryData();

    return (
      <div className="standardPage-contentWithSideNavBody">
        <Link to="/guides" className="navBackLink">
          <i className="zmdi zmdi-chevron-left navBackLink-icon" />
          Guides
        </Link>
        <h1 className="primaryHeader">Glossary</h1>
        <div className="glossary-contents">
          {sortedGlossaryData.map(({ term, description, hash }) => (
            <Fragment key={term}>
              <h2 className="glossary-entryTitle" id={hash}>
                <Link
                  to={{
                    pathname: '/guides/glossary/',
                    hash: `#${hash}`
                  }}
                  className="glossary-entryTitleLink">
                  <i className="zmdi zmdi-link glossary-entryTitleLinkIcon" />
                </Link>
                {term}
              </h2>
              <p className="glossary-entryDescription">{description}</p>
            </Fragment>
          ))}
        </div>
      </div>
    );
  }
}
