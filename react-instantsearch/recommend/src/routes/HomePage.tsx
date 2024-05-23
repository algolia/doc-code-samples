import React from 'react';
import { InstantSearch } from 'react-instantsearch';
import { useNavigate } from 'react-router-dom';

import { Hit } from '../components';
import { indexName, searchClient } from '../config';
import { ProductHit } from '../types';

import { useApplicationContext } from './Root';
import { CustomTrendingItems } from '../widgets';

export function HomePage() {
  const navigate = useNavigate();
  const [{ insights, setSelectedProduct }] = useApplicationContext();

  return (
    <>
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <CustomTrendingItems<ProductHit>
          itemComponent={({ item }) => (
            <Hit
              hit={item}
              insights={insights}
              onSelect={(item) => {
                setSelectedProduct(item);
                navigate(`/product/${item.objectID}`);
              }}
            />
          )}
          limit={10}
        />
      </InstantSearch>
    </>
  );
}
