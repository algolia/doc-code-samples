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

class App extends Component {
  render() {
    return (
      <InstantSearch
        appId="latency"
        apiKey="6be0576ff61c053d5f9a3225e2a90f76"
        indexName="instant_search"
      >
        <h1>React InstantSearch - Hits from multiple indices</h1>

        <SearchBox />

        <Index indexName="instant_search">
          <h2>
            index: <code>instant_search</code>
          </h2>
          <Configure hitsPerPage={8} />
          <Hits hitComponent={Hit} />
        </Index>

        <Index indexName="bestbuy">
          <h2>
            index: <code>bestbuy</code>
          </h2>
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
