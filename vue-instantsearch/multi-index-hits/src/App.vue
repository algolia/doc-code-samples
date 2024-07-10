<template>
  <div>
    <header class="header">
      <h1 class="header-title"><a href="/">Multi index</a></h1>
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
        index-name="instant_search_price_desc"
        :insights="true"
      >
        <ais-search-box v-model="query" />
        <ais-configure
          :restrictSearchableAttributes="['name']"
          :hitsPerPage="8"
        />
        <ais-hits>
          <template slot="item" slot-scope="{ item }">
            <h3><ais-highlight :hit="item" attribute="name" /></h3>
            <img :src="item.image" />
          </template>
        </ais-hits>
        <hr />
        <ais-index index-name="instant_search">
          <ais-hits>
            <template slot="item" slot-scope="{ item }">
              <h3><ais-highlight :hit="item" attribute="name" /></h3>
              <img :src="item.image" />
            </template>
          </ais-hits>
        </ais-index>
      </ais-instant-search>
    </div>
  </div>
</template>

<script>
import { liteClient as algoliasearch } from 'algoliasearch-v5/lite';
import 'instantsearch.css/themes/algolia-min.css';

export default {
  data() {
    return {
      searchClient: algoliasearch(
        'latency',
        '6be0576ff61c053d5f9a3225e2a90f76'
      ),
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
