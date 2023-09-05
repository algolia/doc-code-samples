package com.algolia

case class Product(name: String,
                   description: String,
                   brand: String,
                   categories: Iterable[String],
                   price: Double,
                   image: String,
                   popularity: Integer)
