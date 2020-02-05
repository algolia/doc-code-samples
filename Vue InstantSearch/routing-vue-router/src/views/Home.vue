<template>
  <div>
    <header class="header">
      <h1 class="header-title"><a href="/">Vue InstantSearch v2 starter</a></h1>
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
        index-name="demo_ecommerce"
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
import 'instantsearch.css/themes/algolia-min.css';

export default {
  data() {
    const vueRouter = this.$router;
    return {
      searchClient: algoliasearch(
        'B1G2GM9NG0',
        'aadef574be1f9252bb48d4ea09b5cfe5'
      ),
      routing: {
        router: {
          read() {
            return vueRouter.currentRoute.query;
          },
          write(routeState) {
            vueRouter.push({
              query: routeState,
            });
          },
          createURL(routeState) {
            return vueRouter.resolve({
              query: routeState,
            }).href;
          },
          onUpdate(cb) {
            this._onPopState = event => {
              const routeState = event.state;
              // at initial load, the state is read from the URL without
              // update. Therefore the state object is not there. In this
              // case we fallback and read the URL.
              if (!routeState) {
                cb(this.read());
              } else {
                cb(routeState);
              }
            };
            window.addEventListener('popstate', this._onPopState);
          },
          dispose() {
            window.removeEventListener('popstate', this._onPopState);
            this.write();
          },
        },
        stateMapping: {
          stateToRoute(uiState) {
            return {
              query: uiState.instant_search.query,
              brands:
                uiState.instant_search.refinementList &&
                uiState.instant_search.refinementList.brand &&
                uiState.instant_search.refinementList.brand.join('~'),
              page: uiState.instant_search.page,
            };
          },
          routeToState(routeState) {
            return {
              instant_search: {
                query: routeState.query,
                refinementList: {
                  brand: routeState.brands && routeState.brands.split('~'),
                },
                page: routeState.page,
              },
            };
          },
        },
      },
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
