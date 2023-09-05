<template>
  <div class="hit">
    <h2 class="hit-name">
      <span class="hit-airport-name">
        <ais-highlight attribute-name="name" :result="result"/>
        <ais-highlight attribute-name="city" :result="result"/>
      </span>
      <span class="hit-airport-code">
        (<ais-highlight attribute-name="airport_id" :result="result"/>)
      </span>
    </h2>
    
    <p class="hit-location">
      <ais-highlight attribute-name="country" :result="result"/><br>
      <span class="hit-distance">
        <span v-if="result._rankingInfo && result._rankingInfo.matchedGeoLocation">
          {{ getFormattedDistance(result._rankingInfo.matchedGeoLocation.distance) }} km away,
        </span> {{ result.nb_airline_liaisons }} liaisons
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    result: Object
  },
  methods: {
    getFormattedDistance(distance) {
      return parseInt(distance / 1000, 10)
    }
  }
}
</script>
