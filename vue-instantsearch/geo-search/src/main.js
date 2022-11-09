import Vue from 'vue';
import App from './App.vue';
import InstantSearch from 'vue-instantsearch';
import 'vue-googlemaps/dist/vue-googlemaps.css';
import VueGoogleMaps from 'vue-googlemaps';

Vue.use(InstantSearch);

Vue.use(VueGoogleMaps, {
  load: {
    // Google API key
    apiKey: 'AIzaSyBawL8VbstJDdU5397SUX7pEt9DslAwWgQ',
    // Use new renderer
    useBetaRenderer: true,
  },
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
});
