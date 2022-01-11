import React from 'react';

import algoliasearch from 'algoliasearch';
import {
  Configure,
  Highlight,
  InstantSearch,
  SearchBox,
} from 'react-instantsearch-dom';

import recommend from '@algolia/recommend';
import { useFrequentlyBoughtTogether } from '@algolia/recommend-react';

import { InjectedInfiniteHits } from '../InjectedInfiniteHits';

const searchClient = algoliasearch(
  'XX85YRZZMV',
  'd17ff64e913b3293cfba3d3665480217'
);

const recommendClient = recommend(
  'XX85YRZZMV',
  'd17ff64e913b3293cfba3d3665480217'
);

export function Recommend() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="test_FLAGSHIP_ECOM_recommend"
    >
      <Configure hitsPerPage={18} />
      <div className="search-panel">
        <div className="search-panel__results">
          <SearchBox
            className="searchbox"
            translations={{
              placeholder: 'Search for articles like "dress" or "jeans"',
            }}
          />
          <InjectedInfiniteHits
            slots={() => [
              {
                injectAt: 2,
                slotComponent: RelatedProducts,
              },
            ]}
            hitComponent={ProductHit}
          />
        </div>
      </div>
    </InstantSearch>
  );
}

function RelatedProducts({ resultsByIndex }) {
  const { recommendations } = useFrequentlyBoughtTogether({
    recommendClient,
    indexName: 'test_FLAGSHIP_ECOM_recommend',
    objectIDs: resultsByIndex.test_FLAGSHIP_ECOM_recommend.hits
      .slice(0, 2)
      .map(({ objectID }) => objectID),
    maxRecommendations: 2,
  });

  return (
    <article className="Recommend Block-1/2 sm:Block-full">
      <h2>Frequently bought together</h2>
      <ul>
        {recommendations.map(recommendation => (
          <li key={recommendation.objectID}>
            <ProductHit hit={recommendation} />
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProductHit({ hit }) {
  return (
    <article
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <img
        src={hit.image_urls[0]}
        alt={hit.name}
        style={{
          width: '100%',
          objectFit: 'contain',
        }}
      />
      <p style={{ marginBottom: 0 }}>
        <Highlight attribute="name" hit={hit} />
      </p>
    </article>
  );
}
