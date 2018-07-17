import React, { Component } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import Mentions from './Mentions';
import './App.css';

class App extends Component {
  render() {
    return (
      <InstantSearch
        appId="latency"
        apiKey="6be0576ff61c053d5f9a3225e2a90f76"
        indexName="actors"
      >
        <h1>React InstantSearch - Mention with autocomplete</h1>
        <Mentions />
      </InstantSearch>
    );
  }
}

export default App;
