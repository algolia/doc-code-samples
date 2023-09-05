import Vue from 'vue'
import App from './App.vue'
import InstantSearch from 'vue-instantsearch'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBawL8VbstJDdU5397SUX7pEt9DslAwWgQ'
  }
})

Vue.use(InstantSearch)

new Vue({
  el: '#app',
  render: h => h(App)
})
