<template>
  <div>
    <ais-autocomplete>
      <template slot-scope="{ currentRefinement, indices, refine }">
        <vue-autosuggest
          :suggestions="indicesToSuggestions(indices)"
          :on-selected="onSelect"
          :input-props="{
            placeholder,
            style: 'width: 100%',
            onInputChange: refine,
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
    <details v-if="selected">
      <summary><code>selected item</code></summary>
      <pre>{{ selected.item }}</pre>
    </details>
  </div>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest';

export default {
  props: {
    placeholder: {
      type: String,
      default: 'Search here…',
    },
  },
  components: {
    VueAutosuggest,
  },
  data() {
    return {
      selected: undefined,
    };
  },
  methods: {
    onSelect(selected) {
      this.selected = selected;
    },
    indicesToSuggestions(indices) {
      return indices.map(({ hits }) => ({ data: hits }));
    },
  },
};
</script>

<style>
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
</style>
