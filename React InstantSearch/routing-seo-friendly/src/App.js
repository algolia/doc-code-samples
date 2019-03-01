import React, { Component } from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  RefinementList,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import qs from 'qs';
import PropTypes from 'prop-types';
import './App.css';

const DEBOUNCE_TIME = 700;
const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const createURL = state => {
  const brands =
    state.refinementList &&
    state.refinementList.brand &&
    state.refinementList.brand.join('~');

  const isDefaultRoute =
    !state.query &&
    state.page === 1 &&
    state.refinementList.brand &&
    state.refinementList.brand.length === 0;

  if (isDefaultRoute) {
    return '';
  }

  const queryParams = qs.stringify({
    q: state.query,
    p: state.page,
  });

  return `/search${brands ? `/brands/${brands}` : ''}?${queryParams}`;
};

const searchStateToUrl = (props, searchState) =>
  searchState ? createURL(searchState) : '';

const urlToSearchState = location => {
  const [, brand] = location.pathname.split('/brands/');
  const routeState = qs.parse(location.search.slice(1));

  const searchState = {
    query: routeState.q,
    refinementList: {
      brand: (brand && brand.split('~')) || [],
    },
    page: routeState.p || 1,
  };

  return searchState;
};

class App extends Component {
  state = {
    searchState: urlToSearchState(this.props.location),
    lastLocation: this.props.location,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.location !== state.lastLocation) {
      return {
        searchState: urlToSearchState(props.location),
        lastLocation: props.location,
      };
    }

    return null;
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState);

    this.debouncedSetState = setTimeout(() => {
      this.props.history.push(
        searchStateToUrl(this.props, searchState),
        searchState
      );
    }, DEBOUNCE_TIME);

    this.setState({ searchState });
  };

  render() {
    return (
      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName="instant_search"
          searchState={this.state.searchState}
          onSearchStateChange={this.onSearchStateChange}
          createURL={createURL}
        >
          <div className="search-panel">
            <div className="search-panel__filters">
              <RefinementList attribute="brand" />
            </div>

            <div className="search-panel__results">
              <SearchBox className="searchbox" placeholder="Search" />
              <Hits hitComponent={Hit} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
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

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export default App;
