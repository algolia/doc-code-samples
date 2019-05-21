import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import {
  ClearRefinements,
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
} from 'react-instantsearch-dom';
import './App.css';
import { HitWithInsights } from './HitWithInsights';

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
            <Hits hitComponent={HitWithInsights} />
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    );
  }
}

export default App;
