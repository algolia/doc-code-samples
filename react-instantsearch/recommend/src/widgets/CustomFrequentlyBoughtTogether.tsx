import React from 'react';

import {
  UseFrequentlyBoughtTogetherProps,
  useFrequentlyBoughtTogether,
  useInstantSearch,
} from 'react-instantsearch';

import type { BaseHit } from 'instantsearch.js';

type CustomFrequentlyBoughtTogetherProps<THit extends BaseHit> =
  UseFrequentlyBoughtTogetherProps<THit> & {
    containerComponent: (props: {
      items: THit[];
      itemComponent: CustomFrequentlyBoughtTogetherProps<THit>['itemComponent'];
    }) => JSX.Element;
    itemComponent: (props: { item: THit }) => JSX.Element;
    fallbackComponent: () => JSX.Element;
  };

export function CustomFrequentlyBoughtTogether<THit extends BaseHit>({
  containerComponent: ContainerComponent,
  itemComponent: ItemComponent,
  fallbackComponent: FallbackComponent,
  ...props
}: CustomFrequentlyBoughtTogetherProps<THit>) {
  const { items } = useFrequentlyBoughtTogether<THit>(props);
  const { status } = useInstantSearch();

  if (items.length === 0 && status === 'idle') {
    return <FallbackComponent />;
  }

  return (
    <section className="ais-FrequentlyBoughtTogether">
      <h2 className="ais-FrequentlyBoughtTogether-title">
        Frequently Bought Together
      </h2>
      <div className="ais-FrequentlyBoughtTogether-container">
        <ContainerComponent items={items} itemComponent={ItemComponent} />
      </div>
    </section>
  );
}
