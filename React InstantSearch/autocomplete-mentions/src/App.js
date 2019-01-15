import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import Mentions from './Mentions';
import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

class App extends Component {
  render() {
    return (
      <InstantSearch indexName="actors" searchClient={searchClient}>
        <h1>React InstantSearch - Mention with autocomplete</h1>
        <Mentions />
      </InstantSearch>
    );
  }
}

export default App;
