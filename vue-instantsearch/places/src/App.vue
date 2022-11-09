<template>
  <div>
    <app-places
      :type="type"
      :api-key="apiKey"
      :app-id="appId"
      :key="`${appId}-${apiKey}`"
      @change="suggestion = $event.suggestion"
    />
    <button @click="toggleType">Toggle <code>type</code> ({{ type }})</button>
    <button @click="toggleApiKey">
      Toggle <code>apiKey</code> ({{ apiKey }} - {{ appId }})
    </button>
    <pre>{{ suggestion }}</pre>
  </div>
</template>

<script>
import AppPlaces from './components/Places';

export default {
  components: { AppPlaces },
  data() {
    return {
      suggestion: undefined,
      appId: undefined,
      apiKey: undefined,
      type: 'city',
    };
  },
  methods: {
    toggleApiKey() {
      if (this.apiKey) {
        this.apiKey = undefined;
        this.appId = undefined;
      } else {
        this.apiKey = 'your-api-key';
        this.appId = 'your-appId-key';
      }
    },
    toggleType() {
      if (this.type === 'city') {
        this.type = 'country';
      } else {
        this.type = 'city';
      }
    },
  },
};
</script>
