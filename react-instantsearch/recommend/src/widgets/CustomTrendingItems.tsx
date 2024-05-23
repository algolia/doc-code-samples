import React from 'react';

import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import { UseTrendingItemsProps, useTrendingItems } from 'react-instantsearch';

import type { BaseHit } from 'instantsearch.js';

type CustomTrendingItemsProps<THit extends BaseHit> =
  UseTrendingItemsProps<THit> & {
    itemComponent: Parameters<typeof HorizontalSlider>[0]['itemComponent'];
  };

export function CustomTrendingItems<THit extends BaseHit>({
  itemComponent: ItemComponent,
  ...props
}: CustomTrendingItemsProps<THit>) {
  const { items } = useTrendingItems<THit>(props);

  return (
    <section className="ais-TrendingItems">
      <h2 className="ais-TrendingItems-title">Trending Products</h2>
      <div className="ais-TrendingItems-container">
        <HorizontalSlider items={items} itemComponent={ItemComponent} />
      </div>
    </section>
  );
}
