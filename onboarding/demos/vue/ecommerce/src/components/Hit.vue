<template>
  <div class="ais-hits--item">
    <div class="hit">
      <div class="hit-image">
        <img :src="result.image"/>
      </div>
      <div class="hit-content">
        <div>
          <div class="hit-name">
            <ais-highlight :result="result" attribute-name="name"/>
          </div>
          <div class="hit-description">
            <ais-snippet :result="result" attribute-name="description"/>
          </div>
        </div>
        <div class="hit-price">${{ result.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: Object,
  },
};
</script>
