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
  Hits,
  connectHitInsights,
} from 'react-instantsearch-dom';

import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

const HitWithInsights = connectHitInsights(window.aa)(Hit);

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
            <Hits hitComponent={HitWithInsights} />
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    );
  }
}

function Hit({ hit, insights }) {
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
          insights('clickedObjectIDsAfterSearch', {
            eventName: 'Add to favorite',
          });
        }}
      >
        Send click
      </button>{' '}
      <button
        className="hit-action"
        onClick={() => {
          insights('convertedObjectIDsAfterSearch', {
            eventName: 'Add to basket',
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
