import React from 'react';
import { InstantSearch, Configure, SearchBox } from 'react-instantsearch-dom';

import { searchClient } from '../searchClient';
import { InjectedInfiniteHits } from '../InjectedInfiniteHits';
import { IngredientHit } from '../components/IngredientHit';

export function HitsFromRule() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="instantsearch_content_injection_ingredients"
    >
      <Configure
        hitsPerPage={16}
        attributesToSnippet={['summary:20']}
        snippetEllipsisText="…"
      />
      <div className="search-panel">
        <div className="search-panel__results">
          <SearchBox
            className="searchbox"
            translations={{
              placeholder: 'Search for ingredients like "chicken"',
            }}
          />
          <InjectedInfiniteHits
            slots={() => [
              {
                injectAt: 2,
                getHits: ({ resultsByIndex }) => {
                  const recipesIndex =
                    resultsByIndex[
                      'instantsearch_content_injection_ingredients'
                    ];

                  return (
                    (recipesIndex &&
                      recipesIndex.userData &&
                      recipesIndex.userData.filter(
                        ({ type }) => type === 'banner'
                      )) ||
                    []
                  );
                },
                slotComponent: BannerHit,
              },
            ]}
            hitComponent={IngredientHit}
          />
        </div>
      </div>
    </InstantSearch>
  );
}

function BannerHit(props) {
  return (
    <article
      className="Banner Block-1/2 sm:Block-full"
      style={{
        backgroundImage: `url(./assets/${props.hit.image})`,
      }}
    >
      <h1>{props.hit.title}</h1>
    </article>
  );
}
