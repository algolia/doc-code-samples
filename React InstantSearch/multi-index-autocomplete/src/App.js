import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import { InstantSearch, Index, Configure } from 'react-instantsearch-dom';
import AutoComplete from './AutoComplete';
import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

class App extends Component {
  render() {
    return (
      <InstantSearch indexName="instant_search" searchClient={searchClient}>
        <h1>React InstantSearch - Autocomplete with multiple indices</h1>

        <Configure hitsPerPage={3} />
        <AutoComplete
          onSuggestionSelected={(event, { suggestion, suggestionValue }) => {
            console.log('Suggestion:', suggestion);
            console.log('Suggestion value:', suggestionValue);
          }}
        />

        <Index indexName="instant_search" />
        <Index indexName="instant_search_price_desc" />
      </InstantSearch>
    );
  }
}

export default App;
