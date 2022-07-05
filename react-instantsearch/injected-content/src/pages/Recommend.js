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
      <Configure hitsPerPage={17} />
      <div className="search-panel">
        <div className="search-panel__results Recommend">
          <SearchBox
            className="searchbox"
            translations={{
              placeholder: 'Search for articles like "dress" or "jacket"',
            }}
          />
          <InjectedInfiniteHits
            slots={() => [
              {
                injectAt: 5,
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
    objectIDs: [resultsByIndex.test_FLAGSHIP_ECOM_recommend.hits[4].objectID],
    maxRecommendations: 3,
  });

  return (
    <article className="FrequentlyBoughtTogether">
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
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          maxWidth: '100%',
          maxHeight: '200px',
          aspectRatio: '9/10',
          overflow: 'hidden',
        }}
      >
        <img
          src={hit.image_urls[0]}
          alt={hit.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <p style={{ marginBottom: 0 }}>
        <Highlight attribute="name" hit={hit} />
      </p>
    </article>
  );
}
