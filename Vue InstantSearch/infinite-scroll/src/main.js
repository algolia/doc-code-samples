import Vue from 'vue';
import App from './App.vue';
import InstantSearch from 'vue-instantsearch';
import VueObserveVisibility from 'vue-observe-visibility';

Vue.use(VueObserveVisibility);
Vue.use(InstantSearch);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
});
