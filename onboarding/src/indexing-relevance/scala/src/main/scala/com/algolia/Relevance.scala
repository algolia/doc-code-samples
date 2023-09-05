package com.algolia

import algolia.AlgoliaClient
import algolia.AlgoliaDsl._
import algolia.objects.{IndexSettings, Ranking, SearchableAttributes}

object Relevance {

  def main(args: Array[String]): Unit = {
    val client = new AlgoliaClient("YourApplicationID", "YourAPIKey")

    val settings = IndexSettings(
      searchableAttributes = Some(Seq(
        SearchableAttributes.attribute("searchable(brand)"),
        SearchableAttributes.attribute("type"),
        SearchableAttributes.attribute("name"),
        SearchableAttributes.attribute("categories"),
        SearchableAttributes.attribute("description")
      )),
      customRanking = Some(Seq(
        Ranking.attribute("popularity")
      )),
      attributesForFaceting = Some(Seq(
        "categories",
        "brand",
        "price"
      ))
    )

    for {
      result <- client.execute(changeSettings of "myIndex" `with` settings)
    } yield result
  }

}
