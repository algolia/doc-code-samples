import algoliasearch from 'algoliasearch/lite';

export const appId = '93MWK2GLFE';
export const apiKey = '9f51610affadbae8e687ce009418c497';
export const indexName = 'prod_ECOM';

export const searchClient = algoliasearch(appId, apiKey);
