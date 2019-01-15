<template>
  <div v-if="state" class="ais-GeoSearch">
    <googlemaps-map
      :center="center"
      :zoom.sync="zoom"
      class="ais-GeoSearch-map"
    >
      <googlemaps-marker
        v-for="item of state.items"
        :key="item.objectID"
        :title="item.city"
        :position="item._geoloc"
      />
    </googlemaps-map>
  </div>
</template>

<script>
import { createWidgetMixin } from 'vue-instantsearch';
import { connectGeoSearch } from 'instantsearch.js/es/connectors';

export default {
  mixins: [createWidgetMixin({ connector: connectGeoSearch })],
  data() {
    return {
      zoom: 8,
    };
  },
  computed: {
    center() {
      return this.state.items[0]._geoloc;
    },
  },
};
</script>

<style>
.ais-GeoSearch {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.ais-GeoSearch-map {
  flex: 100% 1 1;
}
</style>
