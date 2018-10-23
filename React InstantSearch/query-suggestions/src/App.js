import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  Hits,
  connectSearchBox,
  connectRefinementList,
} from 'react-instantsearch-dom';
import Autocomplete from './Autocomplete';
import Hit from './Hit';
import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const VirtualSearchBox = connectSearchBox(() => null);
const VirtualRefinementList = connectRefinementList(() => null);

class App extends Component {
  state = {
    query: '',
    categories: [],
  };

  onQueryChange = (_, { suggestion }) => {
    const [
      category,
    ] = suggestion.instant_search.facets.exact_matches.categories;

    this.setState({
      query: suggestion.query,
      categories: category.value !== 'ALL_CATEGORIES' ? [category.value] : [],
    });
  };

  onSuggestionCleared = () => {
    this.setState({
      query: '',
      categories: [],
    });
  };

  render() {
    const { query, categories } = this.state;

    return (
      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName="instant_search_demo_query_suggestions"
        >
          <Configure hitsPerPage={5} />
          <div className="search-panel">
            <div className="search-panel__results">
              <Autocomplete
                onSuggestionSelected={this.onQueryChange}
                onSuggestionCleared={this.onSuggestionCleared}
              />
            </div>
          </div>
        </InstantSearch>

        <InstantSearch searchClient={searchClient} indexName="instant_search">
          <Configure hitsPerPage={16} />
          <VirtualSearchBox defaultRefinement={query} />
          <VirtualRefinementList
            attribute="categories"
            defaultRefinement={categories}
          />

          <div className="search-panel">
            <div className="search-panel__results">
              <Hits hitComponent={Hit} />
            </div>
          </div>
        </InstantSearch>
      </div>
    );
  }
}

export default App;
