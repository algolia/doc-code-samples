import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import { InstantSearch, SearchBox, Configure } from 'react-instantsearch-dom';
import InfiniteHits from './InfiniteHits';
import './App.css';

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

class App extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
        <h1>React InstantSearch infinite scroll demo</h1>
        <InstantSearch indexName="demo_ecommerce" searchClient={searchClient}>
          <Configure hitsPerPage={16} />
          <SearchBox />
          <InfiniteHits minHitsPerPage={16} />
        </InstantSearch>
      </div>
    );
  }
}

export default App;
