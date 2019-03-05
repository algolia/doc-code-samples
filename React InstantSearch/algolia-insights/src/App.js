import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import {
  InstantSearch,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  connectStateResults,
  connectHits,
} from 'react-instantsearch-dom';

import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

class App extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
        <h1>React InstantSearch e-commerce demo</h1>
        <InstantSearch indexName="demo_ecommerce" searchClient={searchClient}>
          <div className="left-panel">
            <ClearRefinements />
            <h2>Brands</h2>
            <RefinementList attribute="brand" />
            <Configure hitsPerPage={8} clickAnalytics />
          </div>
          <div className="right-panel">
            <SearchBox />
            <CustomHits />
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    );
  }
}

const CustomHits = connectHits(
  connectStateResults(({ hits, searchResults }) => (
    <div className="ais-Hits">
      <ul className="ais-Hits-list">
        {hits.map((hit, index) => (
          <li className="ais-Hits-item" key={hit.objectID}>
            <Hit hit={hit} searchResults={searchResults} index={index} />
          </li>
        ))}
      </ul>
    </div>
  ))
);

function Hit({ hit, index, searchResults }) {
  return (
    <div>
      <img src={hit.image} align="left" alt={hit.name} />
      <div className="hit-name">
        <Highlight attribute="name" hit={hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={hit} />
      </div>
      <div className="hit-price">${hit.price}</div>
      <button
        className="hit-action"
        onClick={() => {
          window.aa('clickedObjectIDsAfterSearch', {
            index: 'demo_ecommerce',
            eventName: 'Add to favorite',
            queryID: searchResults.queryID,
            objectIDs: [hit.objectID],
            positions: [
              searchResults.hitsPerPage * searchResults.page + index + 1,
            ],
          });
        }}
      >
        Send click
      </button>{' '}
      <button
        className="hit-action"
        onClick={() => {
          window.aa('convertedObjectIDsAfterSearch', {
            index: 'demo_ecommerce',
            eventName: 'Add to basket',
            queryID: searchResults.queryID,
            objectIDs: [hit.objectID],
          });
        }}
      >
        Send conversion
      </button>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
