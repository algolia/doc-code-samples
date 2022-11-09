import React, { useEffect, useRef, useState } from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Menu,
  RefinementList,
  Pagination,
  Highlight,
  Panel,
  ClearRefinements,
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

const encodedCategories = {
  Cameras: 'Cameras & Camcorders',
  Cars: 'Car Electronics & GPS',
  Phones: 'Cell Phones',
  TV: 'TV & Home Theater',
};

const decodedCategories = Object.keys(encodedCategories).reduce((acc, key) => {
  const newKey = encodedCategories[key];
  const newValue = key;

  return {
    ...acc,
    [newKey]: newValue,
  };
}, {});

// Returns a slug from the category name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
function getCategorySlug(name) {
  const encodedName = decodedCategories[name] || name;

  return encodedName
    .split(' ')
    .map(encodeURIComponent)
    .join('+');
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug) {
  const decodedSlug = encodedCategories[slug] || slug;

  return decodedSlug
    .split('+')
    .map(decodeURIComponent)
    .join(' ');
}

const createURL = state => {
  const isDefaultRoute =
    !state.query &&
    state.page === 1 &&
    (state.refinementList && state.refinementList.brand.length === 0) &&
    (state.menu && !state.menu.categories);

  if (isDefaultRoute) {
    return '';
  }

  const categoryPath = state.menu.categories
    ? `${getCategorySlug(state.menu.categories)}/`
    : '';
  const queryParameters = {};

  if (state.query) {
    queryParameters.query = encodeURIComponent(state.query);
  }
  if (state.page !== 1) {
    queryParameters.page = state.page;
  }
  if (state.refinementList.brand) {
    queryParameters.brands = state.refinementList.brand.map(encodeURIComponent);
  }

  const queryString = qs.stringify(queryParameters, {
    addQueryPrefix: true,
    arrayFormat: 'repeat',
  });

  return `/search/${categoryPath}${queryString}`;
};

const searchStateToUrl = searchState =>
  searchState ? createURL(searchState) : '';

const urlToSearchState = location => {
  const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
  const category = getCategoryName(
    (pathnameMatches && pathnameMatches[1]) || ''
  );
  const { query = '', page = 1, brands = [] } = qs.parse(
    location.search.slice(1)
  );
  // `qs` does not return an array when there's a single value.
  const allBrands = Array.isArray(brands) ? brands : [brands].filter(Boolean);

  return {
    query: decodeURIComponent(query),
    page,
    menu: {
      categories: decodeURIComponent(category),
    },
    refinementList: {
      brand: allBrands.map(decodeURIComponent),
    },
  };
};

const Hit = ({ hit }) => (
  <div>
    <Highlight attribute="name" hit={hit} />
  </div>
);

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

const App = ({ location, history }) => {
  const [searchState, setSearchState] = useState(urlToSearchState(location));
  const debouncedSetStateRef = useRef(null);

  const onSearchStateChange = updatedSearchState => {
    clearTimeout(debouncedSetStateRef.current);

    debouncedSetStateRef.current = setTimeout(() => {
      history.push(searchStateToUrl(updatedSearchState), updatedSearchState);
    }, DEBOUNCE_TIME);

    setSearchState(updatedSearchState);
  };

  useEffect(() => {
    setSearchState(urlToSearchState(location));
  }, [location]);

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
            <ClearRefinements />

            <Panel header="Category">
              <Menu attribute="categories" />
            </Panel>

            <Panel header="Brands">
              <RefinementList attribute="brand" />
            </Panel>
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
};

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export default App;
