import React from 'react';
import {
  InstantSearch,
  Configure,
  Index,
  SearchBox,
} from 'react-instantsearch-dom';

import { searchClient } from '../searchClient';
import { InjectedInfiniteHits } from '../InjectedInfiniteHits';
import { RecipeHit } from '../components/RecipeHit';
import { IngredientHit } from '../components/IngredientHit';

export function HitsFromIndex() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="instantsearch_content_injection_ingredients"
    >
      <Configure
        hitsPerPage={14}
        attributesToSnippet={['summary:20']}
        snippetEllipsisText="…"
      />
      <Index indexName="instantsearch_content_injection_recipes">
        <Configure hitsPerPage={1} page={0} />
      </Index>
      <div className="search-panel">
        <div className="search-panel__results">
          <SearchBox
            className="searchbox"
            translations={{
              placeholder: 'Search for ingredients like "potato" or "rice"',
            }}
          />
          <InjectedInfiniteHits
            slots={() => [
              {
                injectAt: 2,
                getHits: ({ resultsByIndex }) => {
                  const recipesIndex =
                    resultsByIndex['instantsearch_content_injection_recipes'];

                  return (recipesIndex && recipesIndex.hits) || [];
                },
                slotComponent: RecipeHit,
              },
            ]}
            hitComponent={IngredientHit}
          />
        </div>
      </div>
    </InstantSearch>
  );
}
