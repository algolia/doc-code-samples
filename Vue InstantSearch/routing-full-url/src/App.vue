<template>
  <div>
    <header class="header">
      <h1 class="header-title"><a href="/">Full URL routing</a></h1>
      <p class="header-subtitle">
        using
        <a href="https://github.com/algolia/vue-instantsearch">
          Vue InstantSearch
        </a>
      </p>
    </header>

    <div class="container">
      <ais-instant-search
        :search-client="searchClient"
        index-name="instant_search"
        :routing="routing"
      >
        <div class="search-panel">
          <div class="search-panel__filters">
            <ais-refinement-list attribute="brand" searchable />
          </div>

          <div class="search-panel__results">
            <ais-search-box placeholder="Search here…" class="searchbox" />
            <ais-hits>
              <template slot="item" slot-scope="{ item }">
                <h1><ais-highlight :hit="item" attribute="name" /></h1>
                <p><ais-highlight :hit="item" attribute="description" /></p>
              </template>
            </ais-hits>

            <div class="pagination"><ais-pagination /></div>
          </div>
        </div>
      </ais-instant-search>
    </div>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import { history as historyRouter } from 'instantsearch.js/es/lib/routers';
import 'instantsearch.css/themes/algolia-min.css';

// Returns a slug from the category name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
function getCategorySlug(name) {
  return name.split(' ').map(encodeURIComponent).join('+');
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug) {
  return slug.split('+').map(decodeURIComponent).join(' ');
}

const routing = {
  router: historyRouter({
    windowTitle({ category, query }) {
      const queryTitle = query ? `Results for "${query}"` : 'Search';

      if (category) {
        return `${category} – ${queryTitle}`;
      }

      return queryTitle;
    },

    createURL({ qsModule, routeState, location }) {
      const urlParts = location.href.match(/^(.*?)\/search/);
      const baseUrl = `${urlParts ? urlParts[1] : ''}/`;

      const categoryPath = routeState.category
        ? `${getCategorySlug(routeState.category)}/`
        : '';
      const queryParameters = {};

      if (routeState.query) {
        queryParameters.query = encodeURIComponent(routeState.query);
      }
      if (routeState.page !== 1) {
        queryParameters.page = routeState.page;
      }
      if (routeState.brands) {
        queryParameters.brands = routeState.brands.map(encodeURIComponent);
      }

      const queryString = qsModule.stringify(queryParameters, {
        addQueryPrefix: true,
        arrayFormat: 'repeat',
      });

      return `${baseUrl}search/${categoryPath}${queryString}`;
    },

    parseURL({ qsModule, location }) {
      const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
      const category = getCategoryName(
        (pathnameMatches && pathnameMatches[1]) || ''
      );
      const { query = '', page, brands = [] } = qsModule.parse(
        location.search.slice(1)
      );
      // `qs` does not return an array when there's a single value.
      const allBrands = Array.isArray(brands)
        ? brands
        : [brands].filter(Boolean);

      return {
        query: decodeURIComponent(query),
        page,
        brands: allBrands.map(decodeURIComponent),
        category,
      };
    },
  }),

  stateMapping: {
    stateToRoute(uiState) {
      const indexUiState = uiState['instant_search'] || {};

      return {
        query: indexUiState.query,
        page: indexUiState.page,
        brands:
          indexUiState.refinementList && indexUiState.refinementList.brand,
        category: indexUiState.menu && indexUiState.menu.categories,
      };
    },

    routeToState(routeState) {
      return {
        instant_search: {
          query: routeState.query,
          page: routeState.page,
          menu: {
            categories: routeState.category,
          },
          refinementList: {
            brand: routeState.brands,
          },
        },
      };
    },
  },
};

export default {
  data() {
    return {
      searchClient: algoliasearch(
        'latency',
        '6be0576ff61c053d5f9a3225e2a90f76'
      ),
      routing,
    };
  },
};
</script>

<style>
body,
h1 {
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

.ais-Highlight-highlighted {
  background: cyan;
  font-style: normal;
}

.header {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(to right, #4dba87, #2f9088);
  color: #fff;
  margin-bottom: 1rem;
}

.header a {
  color: #fff;
  text-decoration: none;
}

.header-title {
  font-size: 1.2rem;
  font-weight: normal;
}

.header-title::after {
  content: ' ▸ ';
  padding: 0 0.5rem;
}

.header-subtitle {
  font-size: 1.2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.search-panel {
  display: flex;
}

.search-panel__filters {
  flex: 1;
  margin-right: 1em;
}

.search-panel__results {
  flex: 3;
}

.searchbox {
  margin-bottom: 2rem;
}

.pagination {
  margin: 2rem auto;
  text-align: center;
}
</style>
