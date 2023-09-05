package com.algolia;

import com.algolia.search.APIClient;
import com.algolia.search.ApacheAPIClientBuilder;
import com.algolia.search.Index;
import com.algolia.search.exceptions.AlgoliaException;
import com.algolia.search.objects.IndexSettings;

import java.util.Arrays;
import java.util.Collections;

public class Relevance {

  public static void main(String[] args) throws AlgoliaException {
    APIClient client =
      new ApacheAPIClientBuilder("YourApplicationID", "YourAdminAPIKey").build();

    Index<Product> index = client.initIndex("demo_ecommerce", Product.class);
    index.setSettings(
      new IndexSettings()
        .setSearchableAttributes(Arrays.asList(
          "searchable(brand)",
          "type",
          "name",
          "categories",
          "description"
        ))
        .setCustomRanking(Collections.singletonList("popularity"))
        .setAttributesForFaceting(Arrays.asList(
          "categories",
          "brand",
          "price"
        ))
    );
  }
}
