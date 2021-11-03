import React, { useRef, useState } from 'react';
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

const DEBOUNCE_TIME = 400;
const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const createURL = state => `?${qs.stringify(state)}`;

const searchStateToUrl = (props, searchState) =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : '';

const urlToSearchState = location => qs.parse(location.search.slice(1));

export function App(props) {
  const { location, history } = props;
  const [searchState, setSearchState] = useState(urlToSearchState(location));
  const debouncedSetState = useRef(null);

  function onSearchStateChange(updatedSearchState) {
    clearTimeout(debouncedSetState.current);

    debouncedSetState.current = setTimeout(() => {
      history.push(searchStateToUrl(props, updatedSearchState));
    }, DEBOUNCE_TIME);

    setSearchState(updatedSearchState);
  }

  return (
    <div className="container">
      <InstantSearch
        searchClient={searchClient}
        indexName="instant_search"
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
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

function Hit({ hit }) {
  return (
    <div>
      <Highlight attribute="name" hit={hit} />
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
