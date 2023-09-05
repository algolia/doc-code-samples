package com.algolia

case class Airport(name: String,
                   city: String,
                   country: String,
                   airportId: String,
                   _geoLoc: GeoLoc,
                   linksCount: Int)

case class GeoLoc(lat: Double, lng: Double)
