<template>
  <ais-index
    app-id="B1G2GM9NG0"
    api-key="aadef574be1f9252bb48d4ea09b5cfe5"
    index-name="demo_ecommerce"
    :query-parameters="{
      hitsPerPage: 5,
      attributesToSnippet: ['description:24'],
      snippetEllipsisText: ' [...]'
    }"
  >
    <main class="search-container">
      <div class="right-panel">
        <div id="hits">
          <!-- Uncomment the following widget to add hits list -->
          <!-- <ais-results class="ais-hits">
            <div slot-scope="{ result }">
              <hit :result="result"/>
            </div>
          </ais-results>
          <ais-no-results>
            <div slot-scope="props">
              No results found for <strong>{{ props.query }}</strong>.
            </div>
          </ais-no-results> -->
        </div>
        <div id="searchbox">
          <!-- Uncomment the following widget to add a search bar  -->
          <!-- <ais-search-box placeholder="Search for products" class="ais-search-box"/> -->
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
        <div id="pagination">
          <!-- Uncomment the following widget to add pagination -->
          <!-- <ais-pagination>
            <span slot="first">«</span>
            <span slot="previous">‹</span>
            <span slot="next">›</span>
            <span slot="last">»</span>
          </ais-pagination> -->
        </div>
      </div>
      <div class="left-panel">
        <div id="categories">
          <!-- Uncomment the following widget to add categories list -->
          <!-- <refinement-list attribute-name="categories" header-title="Categories"/> -->
        </div>
        <div id="brands">
          <!-- Uncomment the following widget to add brands list -->
          <!-- <refinement-list attribute-name="brand" header-title="Brands"/> -->
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
import Hit from "./components/Hit";
import RefinementList from "./components/RefinementList";

export default {
  components: { Hit, RefinementList }
};
</script>

<style src="./assets/styles.css"></style>
