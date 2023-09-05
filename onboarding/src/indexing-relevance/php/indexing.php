<?php

require __DIR__ . '/vendor/autoload.php';

$contacts = json_decode(file_get_contents(
  'https://alg.li/doc-ecommerce.json'
), true);

$client = new \AlgoliaSearch\Client(
  'YourApplicationID',
  'YourAdminAPIKey'
);
$index = $client->initIndex('demo_ecommerce');

$index->addObjects($contacts);
