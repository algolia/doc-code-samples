/* eslint-disable import/no-commonjs */

const path = require('path');
const fs = require('fs');
const util = require('util');
const express = require('express');
const algoliasearch = require('algoliasearch');

const app = express();
const readFileAsync = util.promisify(fs.readFile);

const client = algoliasearch('B1G2GM9NG0', 'aadef574be1f9252bb48d4ea09b5cfe5');
const securedApiKey = client.generateSecuredApiKey(
  'aadef574be1f9252bb48d4ea09b5cfe5',
  {
    restrictIndices: 'demo_ecommerce',
  }
);

app.use(
  express.static(path.join(__dirname, 'dist'), {
    index: false,
  })
);

app.get('/', async (_, res) => {
  const index = await readFileAsync(
    path.join(__dirname, 'dist', 'index.html'),
    'utf-8'
  );

  const indexWithServerData = index.replace(
    '__SERVER_DATA__',
    JSON.stringify({
      ALGOLIA_API_KEY: securedApiKey,
    })
  );

  res.send(indexWithServerData);
});

app.listen(8080);
