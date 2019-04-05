const client = algoliasearch("B1G2GM9NG0", "aadef574be1f9252bb48d4ea09b5cfe5");
const players = client.initIndex("demo_ecommerce");

autocomplete("#aa-search-input", {}, [
  {
    source: autocomplete.sources.hits(players, {
      hitsPerPage: 10,
      clickAnalytics: true
    }),
    displayKey: "name",
    templates: {
      header: '<div class="aa-suggestions-category">Products</div>',
      suggestion: (suggestion, results) => {
        suggestion._queryID = results.queryID;
        suggestion._position = results.hits.findIndex(
          hit => hit.objectID === suggestion.objectID
        );
        return `<span>${suggestion._highlightResult.name.value}</span>`;
      }
    }
  }
]).on("autocomplete:selected", function(event, suggestion) {
  aa("clickedObjectIDsAfterSearch", {
    eventName: "clicked",
    index: "demo_ecommerce",
    queryID: suggestion._queryID,
    objectIDs: [suggestion.objectID],
    positions: [suggestion._position]
  });
});
