package com.algolia;

import com.algolia.search.APIClient;
import com.algolia.search.ApacheAPIClientBuilder;
import com.algolia.search.Index;
import com.algolia.search.exceptions.AlgoliaException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URL;
import java.util.List;

public class Indexing {

  public static void main(String[] args) throws IOException, AlgoliaException {
    List<Product> products =
      new ObjectMapper()
        .readValue(new URL("https://alg.li/doc-ecommerce.json"), new TypeReference<List<Product>>() {});

    APIClient client =
      new ApacheAPIClientBuilder("YourApplicationID", "YourAdminAPIKey").build();

    Index<Product> index = client.initIndex("demo_ecommerce", Product.class);
    index.addObjects(products);
  }

}
