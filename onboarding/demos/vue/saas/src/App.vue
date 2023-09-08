<template>
  <ais-index
    app-id="B1G2GM9NG0"
    api-key="aadef574be1f9252bb48d4ea09b5cfe5"
    index-name="demo_saas"
    :query-parameters="{
      distinct: 3
    }"
  >
    <main class="search-container">
      <div class="right-panel">
        <div id="hits">
          <!-- Uncomment the following widget to add hits list -->
          <!-- <table-results attribute-for-distinct="type"/>
          <ais-no-results>
            <div slot-scope="props">
              No results found for <strong>{{ props.query }}</strong>.
            </div>
          </ais-no-results> -->
        </div>
        <div id="searchbox">
          <!-- Uncomment the following widget to add a search bar  -->
          <!-- <ais-search-box placeholder="Search in your CRM" class="ais-search-box"/> -->
        </div>
        <div id="stats">
          <!-- Uncomment the following widget to add search stats -->
          <!-- <div>
            <ais-stats>
              <div slot-scope="{ totalResults, processingTime, query, resultStart, resultEnd }">
                <span role="img" aria-label="emoji">⚡️</span> <strong>{{ totalResults }}</strong> results found
                <span v-if="query !== ''">for <strong>"{{ query }}"</strong></span>
                in <strong>{{ processingTime }}ms</strong>
              </div>
            </ais-stats>
          </div> -->
        </div>
      </div>
      <div class="left-panel">
        <div id="type">
          <!-- Uncomment the following widget to add types list -->
          <!-- <refinement-list attribute-name="type" header-title="Categories"/> -->
        </div>
      </div>
    </main>
    <footer>
      Source Code on
      <a href="https://github.com/algolia/doc-onboarding">GitHub</a> | Powered by
      <a href="https://www.algolia.com">Algolia</a>
    </footer>
  </ais-index>
</template>

<script>
import RefinementList from './components/RefinementList'
import TableResults from './components/TableResults'

export default {
  components: {
    RefinementList,
    TableResults
  }
}
</script>

<style src="./assets/styles.css"></style>
