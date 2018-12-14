<template>
  <!-- container for places.js -->
  <div />
</template>

<script>
import places from 'places.js';

export default {
  props: {
    apiKey: {
      type: String,
      required: false,
    },
    appId: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
  },
  data() {
    return { instance: null };
  },
  mounted() {
    // make sure Vue does not know about the input
    // this way it can properly unmount
    this.input = document.createElement('input');
    this.$el.appendChild(this.input);

    this.instance = places({
      apiKey: this.apiKey,
      appId: this.appId,
      type: this.type,
      container: this.input,
    });
  },
  beforeDestroy() {
    // if you had any "this.instance.on", also call "off" here
    this.instance.destroy();
  },
  watch: {
    type(newVal) {
      this.instance.configure({
        type: newVal,
      });
    },
  },
};
</script>
