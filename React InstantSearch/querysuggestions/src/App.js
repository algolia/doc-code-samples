import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  Index,
  Configure,
  connectRefinementList,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';

import './App.css';
import SuggestionHits from './SuggestionHits';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const VirtualRefinementList = connectRefinementList(() => null);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchState: {},
      query: '',
      category: null,
    };
    this.setQuery = this.setQuery.bind(this);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
  }

  setQuery(queryNext, categoryNext) {
    const { query, category, ...searchState } = this.state.searchState; // eslint-disable-line no-unused-vars
    if (searchState.indices && searchState.indices.instant_search) {
      searchState.indices.instant_search.page = 0;
    }
    this.setState({
      query: queryNext,
      searchState,
      category: categoryNext,
      displaySuggestions: false,
    });
  }

  onSearchStateChange(searchState) {
    this.setState({ searchState });
  }

  render() {
    return (
      <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">react-querysuggestions</a>
          </h1>
          <p className="header-subtitle">
            using{' '}
            <a href="https://github.com/algolia/react-instantsearch">
              React InstantSearch
            </a>
          </p>
        </header>

        <div className="container">
          <InstantSearch
            searchClient={searchClient}
            indexName="instant_search"
            onSearchStateChange={this.onSearchStateChange}
            searchState={this.state.searchState}
          >
            <div className="search-panel">
              <div className="search-panel__results">
                <SearchBox
                  className="searchbox"
                  placeholder=""
                  defaultRefinement={this.state.query}
                />

                <Index indexName="instant_search_demo_query_suggestions">
                  <Configure hitsPerPage={5} />
                  <Configure page={0} />
                  <SuggestionHits onPressItem={this.setQuery} />
                </Index>

                <Index indexName="instant_search">
                  <VirtualRefinementList
                    attribute="categories"
                    defaultRefinement={
                      this.state.category ? [this.state.category] : []
                    }
                  />
                  <Hits hitComponent={Hit} />
                </Index>

                <div className="pagination">
                  <Pagination />
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
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
