import React, { Component } from 'react';
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
      <div className="standardPage">
        <h1 className="primaryHeader">Glossary</h1>
        <div className="glossary-contents">
          {sortedGlossaryData.map(({ term, description, hash }) => (
            <div className="glossary-entry" key={term} id={hash}>
              <h2 className="glossary-entryTitle">
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
            </div>
          ))}
        </div>
      </div>
    );
  }
}
