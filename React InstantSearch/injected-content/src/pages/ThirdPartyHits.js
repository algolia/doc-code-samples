import React, { useEffect, useState } from 'react';
import { InstantSearch, Configure, SearchBox } from 'react-instantsearch-dom';

import { searchClient } from '../searchClient';
import { InjectedInfiniteHits } from '../InjectedInfiniteHits';
import { IngredientHit } from '../components/IngredientHit';
import { api } from '../api';

export function ThirdPartyHits() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="instantsearch_content_injection_ingredients"
    >
      <Configure
        hitsPerPage={17}
        attributesToSnippet={['summary:20']}
        snippetEllipsisText="…"
      />
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
                injectAt: 3,
                slotComponent: SnackHit,
                className: 'ais-Hits-injected--small',
              },
              {
                injectAt: 8,
                slotComponent: BookHit,
              },
            ]}
            hitComponent={IngredientHit}
          />
        </div>
      </div>
    </InstantSearch>
  );
}

function SnackHit() {
  return <BannerHit id="snacks" />;
}

function BookHit() {
  return <BannerHit id="book" />;
}

function BannerHit({ id }) {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    api.get(id).then(setBanner);
  }, []);

  if (!banner) {
    return <div>Loading...</div>;
  }

  return (
    <article
      className="banner"
      style={{
        backgroundImage: `url(./assets/${banner.image})`,
      }}
    >
      <h1>{banner.title}</h1>
    </article>
  );
}
