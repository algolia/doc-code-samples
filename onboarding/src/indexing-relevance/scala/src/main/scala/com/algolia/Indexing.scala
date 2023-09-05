package com.algolia

import algolia.AlgoliaClient
import algolia.AlgoliaDsl._

import scala.io.Source
import org.json4s._
import org.json4s.native.JsonMethods._

object Indexing {

  def main(args: Array[String]): Unit = {
    val json = Source.fromURL("https://alg.li/doc-ecommerce.json").bufferedReader()
    val products = parse(json).extract[Iterable[Product]]

    val client = new AlgoliaClient("YourApplicationID", "YourAPIKey")
    for {
      result <- client.execute(index into "demo_ecommerce" objects products)
    } yield result
  }

}


