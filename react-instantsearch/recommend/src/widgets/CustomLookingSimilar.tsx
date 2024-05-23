import React from 'react';

import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import { UseLookingSimilarProps, useLookingSimilar } from 'react-instantsearch';

import type { BaseHit } from 'instantsearch.js';

type CustomLookingSimilarProps<THit extends BaseHit> =
  UseLookingSimilarProps<THit> & {
    itemComponent: (props: { item: THit }) => JSX.Element;
  };

export function CustomLookingSimilar<THit extends BaseHit>({
  itemComponent: ItemComponent,
  ...props
}: CustomLookingSimilarProps<THit>) {
  const { items } = useLookingSimilar<THit>(props);

  return (
    <section className="ais-LookingSimilar">
      <h2 className="ais-LookingSimilar-title">Looking Similar</h2>
      <div className="ais-LookingSimilar-container">
        <HorizontalSlider items={items} itemComponent={ItemComponent} />
      </div>
    </section>
  );
}
