<?php

require __DIR__ . '/vendor/autoload.php';

$client = new \AlgoliaSearch\Client(
  'YourApplicationID',
  'YourAdminAPIKey'
);

$index->setSettings({
  'searchableAttributes' => [
    'searchable(brand)',
    'type',
    'name',
    'categories',
    'description',
  ],
  'customRanking' => [
    'popularity'
  ],
  'attributesForFaceting' => [
    'categories',
    'brand',
    'price'
  ]
});
