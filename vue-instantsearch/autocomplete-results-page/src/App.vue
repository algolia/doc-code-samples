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
      >
        <ais-index index-name="demo_ecommerce">
          <ais-configure
            :hitsPerPage="5"
            :restrictSearchableAttributes="['name']"
          />
          <ais-autocomplete>
            <template slot-scope="{ currentRefinement, indices, refine }">
              <vue-autosuggest
                :suggestions="indicesToSuggestions(indices)"
                @selected="onSelect"
                :input-props="{
                  style: 'width: 100%',
                  onInputChange: refine,
                  placeholder: 'Search here…',
                }"
              >
                <template slot-scope="{ suggestion }">
                  <ais-highlight
                    :hit="suggestion.item"
                    attribute="name"
                    v-if="suggestion.item.name"
                  />
                  <strong>$ {{ suggestion.item.price }}</strong>
                  <img :src="suggestion.item.image" />
                </template>
              </vue-autosuggest>
            </template>
          </ais-autocomplete>
        </ais-index>
        <ais-configure :query="query" />
        <ais-hits>
          <div slot="item" slot-scope="{ item }">
            <ais-highlight :hit="item" attribute="name" v-if="item.name" />
            <strong>$ {{ item.price }}</strong> <img :src="item.image" />
          </div>
        </ais-hits>
        <ais-pagination />
      </ais-instant-search>
    </div>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';
import { VueAutosuggest } from 'vue-autosuggest';

export default {
  components: { VueAutosuggest },
  data() {
    return {
      searchClient: algoliasearch(
        'B1G2GM9NG0',
        'aadef574be1f9252bb48d4ea09b5cfe5'
      ),
      query: '',
    };
  },
  methods: {
    onSelect(selected) {
      if (selected) {
        this.query = selected.item.name;
      }
    },
    indicesToSuggestions(indices) {
      return indices.map(({ hits }) => ({ data: hits }));
    },
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

#autosuggest input {
  font: inherit;
}

.autosuggest__results-container {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.autosuggest__results-container ul {
  margin: 0;
  padding: 0;
}

.autosuggest__results_item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  list-style-type: none;
  padding: 0.5em;
  display: grid;
  grid-template-columns: 5fr 1fr 1fr;
  align-items: center;
  justify-content: space-between;
}

.autosuggest__results_item img {
  height: 3em;
}

.autosuggest__results_item-highlighted {
  background-color: rgba(0, 0, 0, 0.24);
}

.ais-Hits-item img {
  max-width: 100%;
}
</style>
