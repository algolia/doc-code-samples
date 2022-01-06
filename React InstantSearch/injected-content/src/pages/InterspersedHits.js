import React from 'react';
import {
  InstantSearch,
  Configure,
  Index,
  SearchBox,
  Highlight,
  Snippet,
} from 'react-instantsearch-dom';

import { searchClient } from '../searchClient';
import { InjectedInfiniteHits } from '../InjectedInfiniteHits';

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

function RecipeHit(props) {
  return (
    <article>
      <div>
        <h1>
          <Highlight attribute="name" hit={props.hit} />
          <span className="badge">{props.hit.course}</span>
        </h1>
        <p>
          {typeof props.hit.state === 'string' && (
            <Highlight attribute="state" hit={props.hit} />
          )}{' '}
          {typeof props.hit.region === 'string' && (
            <Highlight attribute="region" hit={props.hit} />
          )}
        </p>
      </div>
      <p>
        <strong>Ingredients:</strong>{' '}
        <Highlight attribute="ingredients" hit={props.hit} />
      </p>
    </article>
  );
}

function IngredientHit(props) {
  return (
    <article>
      <h1>
        <Highlight attribute="title" hit={props.hit} />
      </h1>
      <p>
        <Snippet attribute="summary" hit={props.hit} />
      </p>
      {props.hit.pageId ? (
        <p>
          <a
            href={`http://en.wikipedia.org/?curid=${props.hit.pageId}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            More on Wikipedia
          </a>
        </p>
      ) : null}
    </article>
  );
}
