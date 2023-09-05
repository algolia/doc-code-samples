<template>
  <google-map
    ref="gmap"
    :center="{ lat: 0, lng: 0 }"
    :zoom="4"
    :options="{
      streetViewControl: false,
      mapTypeControl: false,
      minZoom: 3,
      maxZoom: 7,
      styles: [{ stylers: [{ hue: '#3596D2' }] }]
    }"
  >
    <google-map-marker
      v-for="(marker, index) in markers"
      :key="marker.key"
      :position="marker.position"
      :clickable="true"
      :draggable="false"
      @click="openInfoWindow(marker, getMarkerId(marker, index))"
    />
    <google-map-infowindow
      v-for="(marker, index) in markers"
      :key="getMarkerId(marker, index)"
      :opened="openedInfoWindow === getMarkerId(marker, index)"
      :position="{
        lat: marker.position.lat + 0.3,
        lng: marker.position.lng
      }">
      <div v-html="getInfoWindowTemplate(marker)"></div>
    </google-map-infowindow>
  </google-map>
</template>

<script>
import { Component } from 'vue-instantsearch'
import { Map, Marker, InfoWindow } from 'vue2-google-maps'

export default {
  mixins: [Component],
  components: {
    'google-map-marker': Marker,
    'google-map': Map,
    'google-map-infowindow': InfoWindow
  },
  data() {
    return {
      openedInfoWindow: false
    }
  },
  computed: {
    markers() {
      return this.searchStore.results.map(
        ({ objectID, _geoloc, name, city, country, nb_airline_liaisons }) => ({
          key: objectID,
          position: _geoloc,
          name,
          city,
          country,
          nb_airline_liaisons
        })
      )
    },
    getMapBounds() {
      const mapBounds = new google.maps.LatLngBounds()
      for (let marker of this.markers) {
        mapBounds.extend(marker.position)
      }
      return mapBounds
    }
  },
  methods: {
    getMarkerId(marker, index) {
      return parseInt(marker.key + index)
    },
    getInfoWindowTemplate(item) {
      return `${item.name} - ${
        item.name === item.city ? '' : `${item.city}, `
      }${item.country}<br>${item.nb_airline_liaisons} liaisons`
    },
    openInfoWindow(item, index) {
      this.openedInfoWindow = index
    },
    fitBounds(bounds) {
      this.$refs.gmap.$mapObject.fitBounds(bounds)
    }
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.gmap.$mapPromise.then(map => {
        this.fitBounds(this.getMapBounds)
      })
    })
  }
}
</script>

