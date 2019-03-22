import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import {
  InstantSearch,
  Index,
  Configure,
  Hits,
  SearchBox,
  Highlight,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

class App extends Component {
  render() {
    return (
      <InstantSearch indexName="instant_search" searchClient={searchClient}>
        <h1>React InstantSearch - Hits from multiple indices</h1>

        <SearchBox />

        <Index indexName="instant_search">
          <h2>index: instant_search</h2>
          <Configure hitsPerPage={8} />
          <Hits hitComponent={Hit} />
        </Index>

        <Index indexName="instant_search_price_desc">
          <h2>index: instant_search_price_desc</h2>
          <Configure hitsPerPage={16} />
          <Hits hitComponent={Hit} />
        </Index>
      </InstantSearch>
    );
  }
}

function Hit(props) {
  return (
    <div>
      <Highlight attribute="name" hit={props.hit} />
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
