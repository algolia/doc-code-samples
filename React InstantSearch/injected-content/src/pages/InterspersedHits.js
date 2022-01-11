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

export function InterspersedHits() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="instantsearch_content_injection_ingredients"
    >
      <Configure attributesToSnippet={['summary:20']} snippetEllipsisText="…" />
      <Index indexName="instantsearch_content_injection_recipes">
        <Configure hitsPerPage={100} page={0} />
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
                injectAt: ({ position }) => position > 0 && position % 4 === 0,
                getHits: ({ resultsByIndex, position }) => {
                  const recipesIndex =
                    resultsByIndex['instantsearch_content_injection_recipes'];

                  const index = position / 4 - 1;
                  const item = recipesIndex && recipesIndex.hits[index];

                  return item ? [item] : [];
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
