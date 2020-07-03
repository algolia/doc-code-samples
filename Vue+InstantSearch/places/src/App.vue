<template>
  <div>
    <app-places
      :type="type"
      :api-key="apiKey"
      :app-id="appId"
      :key="`${appId}-${apiKey}`"
      @change="suggestion = $event.suggestion"
    />
    <HelloWorld/>
    <Box/>
  </div>
</template>

<script>
import AppPlaces from "./components/Places";
import HelloWorld from "./components/HelloWorld";
import Box from "./components/Box";
export default {
  components: { AppPlaces, HelloWorld, Box },
  data() {
    return {
      suggestion: undefined,
      appId: undefined,
      apiKey: undefined,
      type: "city"
    };
  },
  methods: {
    toggleApiKey() {
      if (this.apiKey) {
        this.apiKey = undefined;
        this.appId = undefined;
      } else {
        this.apiKey = "your-api-key";
        this.appId = "your-appId-key";
      }
    },
    toggleType() {
      if (this.type === "city") {
        this.type = "country";
      } else {
        this.type = "city";
      }
    }
  }
};
</script>
